const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const specsDir = path.join(root, 'specs');
const testsDir = path.join(root, 'tests');
const planIdPattern = /`(TRADEMB-[A-Z0-9]+-\d{3})`/;

function listFiles(dir, predicate) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return listFiles(fullPath, predicate);
    }

    return predicate(fullPath) ? [fullPath] : [];
  });
}

function toProjectPath(filePath) {
  return path.relative(root, filePath).split(path.sep).join('/');
}

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

const planFiles = listFiles(specsDir, (file) => file.endsWith('.md'));
const testFiles = listFiles(testsDir, (file) => file.endsWith('.spec.ts'));
const scenarios = new Map();
const duplicatePlanIds = new Set();

for (const planFile of planFiles) {
  const lines = fs.readFileSync(planFile, 'utf8').split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.startsWith('**Plan ID:**')) {
      continue;
    }

    const match = line.match(planIdPattern);
    if (!match) {
      fail(`${toProjectPath(planFile)}:${index + 1} has a malformed Plan ID line`);
      continue;
    }

    const planId = match[1];
    if (scenarios.has(planId)) {
      duplicatePlanIds.add(planId);
    }

    const coverageLine = lines[index + 1] ?? '';
    const riskLine = lines[index + 2] ?? '';
    const automationLine = lines[index + 3] ?? '';

    scenarios.set(planId, {
      planFile,
      line: index + 1,
      coverageLine,
      riskLine,
      automationLine,
    });
  }
}

for (const duplicatePlanId of duplicatePlanIds) {
  fail(`Duplicate Plan ID found: ${duplicatePlanId}`);
}

for (const [planId, scenario] of scenarios) {
  if (!scenario.coverageLine.startsWith('**Coverage:**')) {
    fail(`${toProjectPath(scenario.planFile)}:${scenario.line + 1} missing Coverage line for ${planId}`);
  }

  if (!scenario.riskLine.startsWith('**Risk:**')) {
    fail(`${toProjectPath(scenario.planFile)}:${scenario.line + 2} missing Risk line for ${planId}`);
  }

  if (!scenario.automationLine.startsWith('**Automation:**')) {
    fail(`${toProjectPath(scenario.planFile)}:${scenario.line + 3} missing Automation line for ${planId}`);
  }
}

const automatedPlanIds = new Map();

for (const testFile of testFiles) {
  const content = fs.readFileSync(testFile, 'utf8');
  const projectPath = toProjectPath(testFile);
  const specMatch = content.match(/^\/\/ spec: (.+)$/m);
  const planIdMatch = content.match(/^\/\/ plan-id: (TRADEMB-[A-Z0-9]+-\d{3})$/m);

  if (!specMatch) {
    fail(`${projectPath} missing // spec: header`);
    continue;
  }

  if (!planIdMatch) {
    fail(`${projectPath} missing // plan-id: header`);
    continue;
  }

  const declaredSpec = specMatch[1];
  const planId = planIdMatch[1];
  const scenario = scenarios.get(planId);

  if (!scenario) {
    fail(`${projectPath} references unknown Plan ID ${planId}`);
    continue;
  }

  if (declaredSpec !== toProjectPath(scenario.planFile)) {
    fail(`${projectPath} declares ${declaredSpec}, expected ${toProjectPath(scenario.planFile)}`);
  }

  if (automatedPlanIds.has(planId)) {
    fail(`${planId} is automated by both ${automatedPlanIds.get(planId)} and ${projectPath}`);
  }
  automatedPlanIds.set(planId, projectPath);

  const expectedAutomation = `**Automation:** \`${projectPath}\``;
  if (scenario.automationLine !== expectedAutomation) {
    fail(
      `${toProjectPath(scenario.planFile)}:${scenario.line + 3} automation for ${planId} must be ${expectedAutomation}`,
    );
  }
}

for (const [planId, scenario] of scenarios) {
  if (scenario.automationLine === '**Automation:** Not automated') {
    continue;
  }

  const match = scenario.automationLine.match(/`([^`]+)`/);
  if (!match) {
    fail(`${toProjectPath(scenario.planFile)}:${scenario.line + 3} has malformed Automation path`);
    continue;
  }

  if (!fs.existsSync(path.join(root, match[1]))) {
    fail(`${toProjectPath(scenario.planFile)}:${scenario.line + 3} references missing ${match[1]}`);
  }

  if (!automatedPlanIds.has(planId)) {
    fail(`${planId} automation path exists in plan but no test declares that Plan ID`);
  }
}

if (process.exitCode) {
  process.exit();
}

console.log(`Plan coverage OK: ${scenarios.size} scenarios, ${testFiles.length} automated specs`);
