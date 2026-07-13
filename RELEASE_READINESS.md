# Release readiness

This document records the design decisions, assumptions, validation plan, release gates, and risks
for the reviewer-facing Playwright suite.

## Framework and design decisions

- The public UI suite uses one Playwright project per engine: `ui` for Chromium, `ui-firefox` for
  Firefox, and `ui-webkit` for WebKit. All three projects select the same specs and assertions.
- Public `@api` scenarios run once in the browserless `api` project rather than once per engine.
- Authenticated UI coverage remains Chromium-only in `auth-ui`; authenticated API coverage remains
  browserless in `auth-api`.
- CI uses a browser matrix so engine failures are independently visible and execute in parallel.
- Only credential-free API and public UI blobs are merged into the public HTML report.
  Authenticated artifacts use a separate naming boundary and are never downloaded by the public
  report job.
- GitHub Pages is updated only by a fully successful push to `main`. Pull requests and failed runs
  retain short-lived artifacts but cannot replace the last successful published report.
- Cross-browser execution expands environments rather than behavior, so it introduces no new Plan
  IDs or duplicated test files.

## Assumptions

- Reviewers have Bun 1.3.14 and use a Playwright-supported operating system.
- Reviewers do not receive authentication credentials or saved browser state.
- Mobile coverage remains viewport-based; separate mobile browser projects are out of scope.
- The public site is reachable and its stable content contracts are available during execution.
- GitHub Pages may publish credential-free test names, outcomes, durations, and public-site evidence.
- Existing branch history remains unchanged; commit clarity is applied prospectively.

## Test plan

### Discovery and static checks

- `bunx playwright test --list` must show each public UI scenario under all three browser projects,
  public API scenarios only under `api`, and authenticated scenarios only under their auth projects.
- `bun run plan-coverage`, `bun run format:check`, `bun run lint -- --max-warnings=0`, and
  `bun run typecheck` must pass.
- Generated reports, authentication state, traces, screenshots, and browser binaries must remain
  untracked.

### Execution

- `bun run test:review` must work without `.env` or authentication state and produce a local HTML
  report containing Chromium, Firefox, WebKit, and public API results.
- Each browser project must also pass independently so engine failures remain attributable.
- Authenticated UI and API suites must pass separately with valid storage state.
- Any timing-related fix must pass its narrow affected test three consecutive times on the affected
  engine.

### CI and publication

- Pull requests must show separately labelled Chromium, Firefox, and WebKit checks and artifacts.
- The merged public report must not contain authenticated projects or sensitive attachments.
- A successful `main` run must deploy the report to `https://zhukoff-av.github.io/trade.mb/`.
- Failed and non-`main` runs must not replace the published report.

## Release readiness checklist

- [x] All 28 Plan-ID scenarios remain correctly mapped.
- [x] Formatting, zero-warning lint, and typecheck pass.
- [x] `bun run test:review` passes from a credential-free checkout.
- [x] Complete public UI suite passes on Chromium, Firefox, and WebKit.
- [x] Browserless public API suite passes once.
- [x] Authenticated UI and API regression suites pass with valid state.
- [x] CI exposes separately labelled engine checks and artifacts.
- [x] Public report contains no authenticated results or sensitive data.
- [x] GitHub Pages deploys only from a fully successful `main` run.
- [x] The stable report URL resolves from the README.
- [x] PR title and new commits are descriptive and focused.
- [x] Final GitHub Actions run is green.

## Risk matrix

| Risk                                                   | Likelihood | Impact   | Mitigation and acceptance signal                                                                         |
| ------------------------------------------------------ | ---------- | -------- | -------------------------------------------------------------------------------------------------------- |
| Firefox or WebKit exposes compatibility failures       | Medium     | High     | Investigate product behavior and selectors without weakening assertions; all engines must pass.          |
| Live-site behavior causes cross-browser flakiness      | Medium     | High     | Use web-first assertions and deterministic state; timing fixes require three consecutive narrow passes.  |
| Three-engine execution increases CI duration           | High       | Medium   | Run engines in a parallel matrix, cache them separately, and execute browserless API tests once.         |
| Linux needs additional browser libraries or privileges | Medium     | Medium   | Use Playwright's `--with-deps` installation and validate the one-command flow on a clean runner.         |
| Authenticated data appears on public Pages             | Low        | Critical | Merge only `playwright-public-blob-*` artifacts and inspect the published project list.                  |
| Expired authentication state blocks release            | Medium     | Medium   | Refresh the protected secret before release; failed runs cannot replace the last Pages report.           |
| Pages is disabled or lacks permissions                 | Medium     | High     | Enable GitHub Actions as the Pages source once at repository level; keep deployment permissions minimal. |
| Existing ambiguous commits weaken history clarity      | High       | Medium   | Preserve history as requested, rename the PR, and use descriptive focused commits for new work.          |
| Browser-specific skips reduce coverage                 | Low        | High     | Do not add engine skips or conditional assertions without a documented product requirement.              |
| Published evidence becomes stale                       | Medium     | Medium   | Deploy after every fully successful `main` run and retain the Actions workflow link.                     |
