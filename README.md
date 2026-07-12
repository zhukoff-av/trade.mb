# trade.mb.io Playwright tests

[![Tests](https://github.com/zhukoff-av/trade.mb/actions/workflows/playwright.yml/badge.svg?branch=main&label=tests)](https://github.com/zhukoff-av/trade.mb/actions/workflows/playwright.yml)

Playwright coverage for the signed-out public experience at [mb.io](https://mb.io), built with Bun and TypeScript. This repository contains test automation only.

## Run it

Prerequisite: Bun 1.3.14. From a clean checkout, install dependencies, install Chromium, and run the full suite with one command:

```sh
bun install && bunx playwright install chromium && bun run test
```

The default target is `https://mb.io`; set `BASE_URL` in `.env` to use a compatible environment. Useful focused commands: `bun run test:ui`, `bun run test:api`, and `bun run report`.

Follow the repository's [Playwright testing guidelines](PLAYWRIGHT_TESTING_GUIDELINES.md) when contributing tests.

## Evidence and scope

Every CI run executes quality gates plus separate API and UI jobs, then publishes a combined Playwright HTML report in the [workflow artifacts](https://github.com/zhukoff-av/trade.mb/actions/workflows/playwright.yml). It includes failures, traces on retry, and failure screenshots.

The UI suite currently runs Desktop Chrome and mobile Chrome emulation; browserless API contracts run separately. Cross-browser desktop runs are not configured, so no cross-browser execution evidence is claimed.

## Design decisions and assumptions

- Plan IDs in `specs/` map each scenario to its test; `bun run plan-coverage` enforces that mapping.
- Page objects and reusable components keep UI tests readable; API-tagged tests use Playwright request context without a browser.
- Assertions cover stable public content and navigation, not live prices or authenticated trading flows.
- The suite assumes the public site is available and its third-party destinations are reachable.

## Test plan

Prioritise signed-out navigation, links, responsive layouts, market and promotional content, app-store routing, company content, 404s, and gated destinations. Run API link/redirect contracts independently; run Chromium UI coverage at desktop and mobile breakpoints. Plan IDs and current coverage are maintained in [`specs/`](specs/).

## Release readiness checklist

- [ ] `bun run plan-coverage`, `bun run format:check`, `bun run lint`, and `bun run typecheck` pass.
- [ ] `bun run test:api` and `bun run test:ui` pass; review the merged CI report for failures or retries.
- [ ] Confirm the target environment and external destinations are available.
- [ ] Assess any changed public journey; add or update its Plan-ID scenario before release.

## Risk matrix

| Risk                                          | Level  | Control                                                                 |
| --------------------------------------------- | ------ | ----------------------------------------------------------------------- |
| Broken public navigation or third-party links | High   | UI and browserless link-contract tests                                  |
| Responsive layout regression                  | Medium | Desktop and mobile viewport checks                                      |
| Live market data causes flaky tests           | Medium | Assert stable structure/content, not mutable prices                     |
| Authenticated financial flows are untested    | High   | Explicitly out of scope; require a separate authenticated test strategy |

## Task 2

Written QA strategy responses, including risk-based coverage for a financial trading app, are in [Task 2 – QA Strategy & Thinking](TASK_2-QAStrategy%26Thinking.md).
