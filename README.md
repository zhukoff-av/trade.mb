# trade.mb.io Playwright tests

[![Tests](https://github.com/zhukoff-av/trade.mb/actions/workflows/playwright.yml/badge.svg?branch=main&label=tests)](https://github.com/zhukoff-av/trade.mb/actions/workflows/playwright.yml)
[![Maintainability](https://img.shields.io/codefactor/grade/github/zhukoff-av/trade.mb/main?label=maintainability)](https://www.codefactor.io/repository/github/zhukoff-av/trade.mb)
[![Language](https://img.shields.io/github/languages/top/zhukoff-av/trade.mb?label=language)](https://github.com/zhukoff-av/trade.mb)

Playwright end-to-end coverage for the signed-out public experience at [mb.io](https://mb.io) and
authenticated market discovery at [trade.mb.io](https://trade.mb.io). The project uses Bun,
TypeScript, and Playwright with Chromium. It contains tests and supporting test framework code only.

## Prerequisites

- Bun 1.3.14
- Chromium installed through Playwright

```sh
bun install
bunx playwright install chromium
```

The public target defaults to `https://mb.io`; the authenticated portal defaults to
`https://trade.mb.io`. To use compatible alternative environments, copy `.env.example` to `.env`
and set `BASE_URL` and/or `AUTH_BASE_URL`.

## Commands

```sh
bun run test             # all configured Playwright test levels
bun run test:ui          # all Chromium UI tests
bun run test:api         # browserless API and network contract tests
bun run auth:setup       # save a manually authenticated local browser state
bun run test:ui:auth     # authenticated trading portal tests only
bun run test:headed      # UI tests in a headed browser
bun run test:ui-mode     # Playwright UI mode
bun run plan-coverage    # Plan ID and automation mapping contract
bun run format:check     # Prettier verification
bun run lint             # ESLint and Playwright rules
bun run typecheck        # strict TypeScript check
bun run report           # open the most recent HTML report
```

Run the narrowest affected spec while developing:

```sh
bunx playwright test tests/ui/web-ui/<scenario>.spec.ts --project=ui
bunx playwright test tests/ui/auth/<scenario>.spec.ts --project=auth-ui
```

## Authenticated UI tests

Public and authenticated tests are separate Playwright projects. `ui` and `api` never load account
state, while `auth-ui` only selects `tests/ui/auth/` and reads `AUTH_STATE_PATH` (default:
`.auth/user.json`). The default `bun run test` command remains credential-free.

Create local state with a regular Chrome session so login and OTP are completed manually:

```sh
bun run auth:setup
bun run test:ui:auth
```

The setup command launches Chrome with a dedicated profile and a debug port bound to loopback.
Finish login and OTP in Chrome, open the authenticated portal, then return to the terminal and press
Enter. Close the dedicated Chrome window when the state has been saved.

`.auth/`, `playwright/.auth/`, and `*.auth.json` are ignored because storage state contains live
session credentials. Never commit, share, log, or upload these files. Re-run `auth:setup` whenever
the saved session expires. The setup filters the export to mb.io-owned cookies and origins; CI
rejects state containing cookies for other domains.

CI reads the base64-encoded storage state from the protected `AUTH_STATE_B64` GitHub Actions secret,
decodes it only on the ephemeral runner, validates its JSON shape, and runs `auth-ui`. Rotate the
secret whenever the session expires. Base64 is transport encoding; GitHub's encrypted secret store
provides the protection.

## Architecture

```text
specs/                  Plan-ID scenarios and expected behavior
tests/ui/web-ui/        Plan-ID scenarios with UI and tagged API contracts
tests/ui/auth/          Authenticated market scenarios
src/components/         Reusable page regions such as the public header
src/pages/              Focused Home, Explore, and Company page objects
src/fixtures/           Test fixture composition
src/data/               Stable expected navigation and content contracts
src/utils/              Request-level link validation
scripts/                Plan-to-automation contract enforcement
```

Public tests import `test` and `expect` from `src/fixtures/ui.ts`; authenticated tests use
`src/fixtures/auth-ui.ts`. Page objects expose business-relevant regions and actions; test data holds
expected content and destination contracts. Live prices and other mutable values are deliberately
excluded from assertions.

Tests tagged `@api` use only Playwright's request context. The `api` project selects those contracts
without launching Chromium, while the `ui` project excludes them and exercises the rendered site.

## Coverage

The Plan IDs cover:

- complete desktop and mobile navigation;
- navigation destination and broken-link checks;
- two desktop layout breakpoints and one mobile breakpoint;
- home-page promotions and market groups;
- Explore spot-market content;
- iOS App Store and Android Google Play smart-link routing;
- all required Why MultiBank Group content;
- exact 404 handling and signed-out gated destinations.
- authenticated market rendering, category membership, and complete market row fields.

Every `*.spec.ts` file declares its source plan and Plan ID. `bun run plan-coverage` rejects missing,
duplicate, stale, or incorrectly mapped IDs.

## CI and completion evidence

GitHub Actions reports five independent required checks:

```text
install
  └── quality-gates
        ├── api-tests
        ├── ui-tests
        └── auth-ui-tests
```

- `install` verifies the frozen Bun lockfile and dependency graph.
- `quality-gates` enforces Plan-ID coverage, Prettier, zero-warning lint, and TypeScript.
- `api-tests` runs browserless navigation and app-store redirect contracts.
- `ui-tests` installs Chromium and runs the complete browser suite.
- `auth-ui-tests` restores protected storage state and runs only authenticated market tests.

API, public UI, and authenticated UI results are merged into one `playwright-html-report` artifact.
The `Playwright report` job also adds a run-time summary with totals, outcome, failures, and duration
to each Actions run.

Work is complete only when these commands pass:

```sh
bun run plan-coverage
bun run format:check
bun run lint
bun run typecheck
bun run test:api
bun run test:ui
AUTH_STATE_PATH=.auth/user.json bun run test:ui:auth
```

Project-specific contribution standards are documented in
[`PLAYWRIGHT_TESTING_GUIDELINES.md`](PLAYWRIGHT_TESTING_GUIDELINES.md).
