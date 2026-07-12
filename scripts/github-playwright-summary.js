const fs = require('node:fs');

const reportPath = process.env.PLAYWRIGHT_RESULTS_PATH ?? 'playwright-results.json';
const summaryPath = process.env.GITHUB_STEP_SUMMARY;

if (!summaryPath) {
  throw new Error('GITHUB_STEP_SUMMARY must be set when generating the Playwright job summary.');
}

const testJobs = [
  ['API tests', process.env.API_TEST_RESULT],
  ['UI tests', process.env.UI_TEST_RESULT],
  ['Authenticated UI tests', process.env.AUTH_UI_TEST_RESULT],
  ['Authenticated API tests', process.env.AUTH_API_TEST_RESULT],
];
const testJobResults = testJobs
  .filter(([, result]) => result)
  .map(([name, result]) => `- ${name}: \`${result}\``)
  .join('\n');

if (!fs.existsSync(reportPath)) {
  fs.appendFileSync(
    summaryPath,
    [
      '# Playwright tests summary',
      '',
      'A combined Playwright report could not be generated because no blob reports were available.',
      '',
      testJobResults,
      '',
      '_Job summary generated at run-time._',
      '',
    ].join('\n'),
  );
  process.exit(0);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const { expected: passed, flaky, skipped, unexpected: failed, duration } = report.stats;
const total = passed + flaky + skipped + failed;
const hasFailedJob = testJobs.some(([, result]) => result === 'failure');
const status =
  failed > 0 || hasFailedJob ? '🔴 Failed' : flaky > 0 ? '🟡 Passed with flaky tests' : '🟢 Passed';
const passedLabel = passed > 0 ? `🟢 ${passed}` : `${passed}`;

const failedTests = [];

function collectFailedSpecs(suites) {
  for (const suite of suites ?? []) {
    for (const spec of suite.specs ?? []) {
      if (spec.tests.some((test) => test.status === 'unexpected')) {
        failedTests.push(spec.title);
      }
    }

    collectFailedSpecs(suite.suites);
  }
}

collectFailedSpecs(report.suites);

const failedTestSection = failedTests.length
  ? ['### Failed tests', '', ...failedTests.map((title) => `- ${title}`), ''].join('\n')
  : 'No failed tests in this run.\n';
const artifactUrl = process.env.HTML_REPORT_URL;
const artifact = artifactUrl
  ? `[playwright-html-report](${artifactUrl})`
  : '`playwright-html-report`';

fs.appendFileSync(
  summaryPath,
  [
    '# Playwright tests summary',
    '',
    '## Playwright: all',
    '',
    `**Status:** ${status}`,
    '',
    '| Total | Passed | Failed | Flaky | Skipped | Duration |',
    '| ---: | ---: | ---: | ---: | ---: | ---: |',
    `| ${total} | ${passedLabel} | ${failed} | ${flaky} | ${skipped} | ${(duration / 1000).toFixed(1)}s |`,
    '',
    failedTestSection,
    `HTML report artifact: ${artifact}`,
    '',
    '_Job summary generated at run-time._',
    '',
  ].join('\n'),
);
