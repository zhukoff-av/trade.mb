const fs = require('node:fs');

const reportPath = process.env.K6_SUMMARY_PATH ?? 'k6-summary.json';
const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const profile = process.env.K6_PROFILE ?? 'smoke';
const runResult = process.env.K6_RUN_RESULT ?? 'unknown';

if (!summaryPath) {
  throw new Error('GITHUB_STEP_SUMMARY must be set when generating the k6 job summary.');
}

function appendSummary(lines) {
  fs.appendFileSync(summaryPath, `${lines.join('\n')}\n`);
}

if (!fs.existsSync(reportPath)) {
  appendSummary([
    '# k6 performance summary',
    '',
    `- Profile: \`${profile}\``,
    `- Run result: \`${runResult}\``,
    '',
    'No k6 summary export was produced; the run failed before reaching the end-of-test summary.',
  ]);
  process.exit(0);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const metrics = report.metrics ?? {};

function observedValue(metric, expression) {
  const stat = expression.split(/[<>=]/, 1)[0].trim();
  if (typeof metric[stat] === 'number') {
    return `${stat}=${metric[stat].toFixed(2)}ms`;
  }

  if (typeof metric.value === 'number') {
    return `${stat}=${(metric.value * 100).toFixed(2)}%`;
  }

  return 'unavailable';
}

const thresholdRows = Object.entries(metrics)
  .flatMap(([name, metric]) =>
    Object.entries(metric.thresholds ?? {}).map(([expression, breached]) => [
      name,
      expression,
      observedValue(metric, expression),
      breached ? '❌ failed' : '✅ passed',
    ]),
  )
  .sort((left, right) => left[0].localeCompare(right[0]))
  .map((row) => `| \`${row[0]}\` | \`${row[1]}\` | ${row[2]} | ${row[3]} |`);

const checkRows = Object.values(report.root_group?.checks ?? {}).map(
  (checkResult) => `| ${checkResult.name} | ${checkResult.passes} | ${checkResult.fails} |`,
);

const totalRequests = metrics.http_reqs?.count ?? 0;
const failedRate = metrics.http_req_failed?.value ?? 0;

appendSummary([
  '# k6 performance summary',
  '',
  `- Profile: \`${profile}\``,
  `- Run result: \`${runResult}\``,
  `- Requests: ${totalRequests} (${(failedRate * 100).toFixed(2)}% failed)`,
  '',
  '## Thresholds',
  '',
  '| Metric | Threshold | Observed | Status |',
  '| --- | --- | --- | --- |',
  ...thresholdRows,
  '',
  '## Contract checks',
  '',
  '| Check | Passes | Fails |',
  '| --- | --- | --- |',
  ...checkRows,
]);
