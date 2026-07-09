#!/usr/bin/env node
/**
 * Enforces the plan <-> test contract:
 *   specs/**.md scenarios declare `**Plan ID:** \`ID\`` and `**Automation:** ...`
 *   tests/**.spec.ts declare `// plan-id: ID`
 *
 * Fails (exit 1) on:
 *   - duplicate Plan IDs across specs/
 *   - a test referencing a Plan ID no scenario declares
 *   - an Automation line pointing at a file that does not exist
 *   - a scenario marked automated with no test carrying its Plan ID
 *   - a scenario still `Not automated` although a test carries its Plan ID
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SPECS_DIR = path.join(ROOT, 'specs');
const TESTS_DIR = path.join(ROOT, 'tests');

function walk(dir, suffix) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full, suffix);
    return full.endsWith(suffix) ? [full] : [];
  });
}

function parsePlans(errors) {
  const scenarios = new Map();
  for (const file of walk(SPECS_DIR, '.md')) {
    const rel = path.relative(ROOT, file);
    let current = null;
    for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
      const idMatch = line.match(/\*\*Plan ID:\*\*\s*`?([A-Z][A-Z0-9-]+)`?/);
      if (idMatch) {
        const id = idMatch[1];
        if (scenarios.has(id)) {
          errors.push(
            `Duplicate Plan ID ${id} in ${rel} (already declared in ${scenarios.get(id).plan})`,
          );
          current = null;
        } else {
          current = { id, plan: rel, automation: null };
          scenarios.set(id, current);
        }
        continue;
      }
      const autoMatch = line.match(/\*\*Automation:\*\*\s*(.+)/);
      if (autoMatch && current) {
        current.automation = autoMatch[1].trim().replace(/`/g, '');
      }
    }
  }
  return scenarios;
}

function parseTests() {
  const refs = new Map();
  for (const file of walk(TESTS_DIR, '.spec.ts')) {
    const rel = path.relative(ROOT, file);
    for (const match of fs.readFileSync(file, 'utf8').matchAll(/^\/\/\s*plan-id:\s*(\S+)/gm)) {
      const list = refs.get(match[1]) ?? [];
      list.push(rel);
      refs.set(match[1], list);
    }
  }
  return refs;
}

function main() {
  const errors = [];
  const scenarios = parsePlans(errors);
  const refs = parseTests();

  for (const [id, files] of refs) {
    if (!scenarios.has(id)) {
      errors.push(`Unknown Plan ID ${id} referenced by ${files.join(', ')}`);
    }
  }

  const rows = [];
  for (const [id, scenario] of scenarios) {
    const tests = refs.get(id) ?? [];
    const notAutomated = !scenario.automation || /not automated/i.test(scenario.automation);

    if (notAutomated && tests.length > 0) {
      errors.push(
        `Scenario ${id} is marked "Not automated" in ${scenario.plan} but ${tests.join(', ')} references it — flip its Automation line`,
      );
    }
    if (!notAutomated) {
      if (!fs.existsSync(path.join(ROOT, scenario.automation))) {
        errors.push(
          `Scenario ${id} Automation line points at missing file: ${scenario.automation}`,
        );
      }
      if (tests.length === 0) {
        errors.push(`Scenario ${id} is marked automated but no test carries "// plan-id: ${id}"`);
      }
    }
    rows.push({ id, plan: scenario.plan, automated: !notAutomated, tests });
  }

  console.log('Plan coverage');
  console.log('-------------');
  for (const row of rows) {
    const status = row.automated ? 'automated' : 'not automated';
    console.log(`${row.id.padEnd(24)} ${status.padEnd(15)} ${row.tests.join(', ') || '-'}`);
  }
  const automated = rows.filter((row) => row.automated).length;
  console.log(
    `\n${automated}/${rows.length} scenarios automated, ${refs.size} plan-linked test file group(s)`,
  );

  if (errors.length > 0) {
    console.error('\nContract violations:');
    for (const error of errors) console.error(`  ✗ ${error}`);
    process.exit(1);
  }
  console.log('\nOK: specs/ and tests/ are in sync');
}

main();
