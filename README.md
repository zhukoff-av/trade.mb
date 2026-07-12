# trade.mb.io Playwright tests

[![Tests](https://github.com/zhukoff-av/trade.mb/actions/workflows/playwright.yml/badge.svg?branch=main&label=tests)](https://github.com/zhukoff-av/trade.mb/actions/workflows/playwright.yml)
[![Maintainability](https://img.shields.io/codefactor/grade/github/zhukoff-av/trade.mb/main?label=maintainability)](https://www.codefactor.io/repository/github/zhukoff-av/trade.mb)
[![Language](https://img.shields.io/github/languages/top/zhukoff-av/trade.mb?label=language)](https://github.com/zhukoff-av/trade.mb)
[![Sample report](https://img.shields.io/badge/Playwright-report-45ba4b?logo=playwright)](https://zhukoff-av.github.io/trade.mb/)

Playwright end-to-end coverage for the signed-out public experience at [mb.io](https://mb.io) and
authenticated market discovery and API contracts at [trade.mb.io](https://trade.mb.io). The project
uses Bun, TypeScript, and Playwright. It contains tests and supporting test framework code only.

## Reviewer quick start

Install [Bun 1.3.14](https://bun.sh/docs/installation), clone the repository, and run one command:

```sh
bun run test:review
```

The command installs the frozen dependencies and Playwright's Chromium, Firefox, and WebKit
engines, runs all static quality gates, then executes the credential-free API and public UI suites.
Runtime depends on the host and live-site response times; local browser projects run sequentially,
while CI runs them in parallel. Open the generated local report with `bun run report`, or view the
[latest successful public report](https://zhukoff-av.github.io/trade.mb/).

The only prerequisite is Bun on a Playwright-supported operating system. On Linux, Playwright may
request permission to install required system packages.

The public target defaults to `https://mb.io`; the authenticated portal defaults to
`https://trade.mb.io`. To use compatible alternative environments, copy `.env.example` to `.env`
and set `BASE_URL` and/or `AUTH_BASE_URL`.

## Commands

```sh
bun run test:review      # fresh-clone setup, quality gates, and credential-free suite
bun run test             # public API plus Chromium, Firefox, and WebKit UI tests
bun run test:ui          # complete public UI suite on all three browser engines
bun run test:ui:chromium # public UI tests on Chromium
bun run test:ui:firefox  # public UI tests on Firefox
bun run test:ui:webkit   # public UI tests on WebKit
bun run test:api         # browserless API and network contract tests
bun run auth:setup       # save a manually authenticated local browser state
bun run test:api:auth    # authenticated browserless API contracts
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
bunx playwright test tests/ui/web-ui/<scenario>.spec.ts --project=ui-firefox
bunx playwright test tests/ui/web-ui/<scenario>.spec.ts --project=ui-webkit
bunx playwright test tests/ui/auth/<scenario>.spec.ts --project=auth-ui
bunx playwright test tests/api/auth/<scenario>.spec.ts --project=auth-api
```

## Authenticated UI and API tests

Public and authenticated tests are separate Playwright projects. `ui`, `ui-firefox`, `ui-webkit`,
and `api` never load account state. `auth-ui` selects `tests/ui/auth/` and stays Chromium-only,
while `auth-api` selects `tests/api/auth/`; both read `AUTH_STATE_PATH` (default:
`.auth/user.json`). The default `bun run test` and `bun run test:review` commands remain
credential-free.

Create local state with a regular Chrome session so login and OTP are completed manually:

```sh
bun run auth:setup
bun run test:api:auth
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
decodes it only on the ephemeral runner, validates its JSON shape, and runs authenticated UI and API
tests. Rotate the secret whenever the session expires. Base64 is transport encoding; GitHub's
encrypted secret store provides the protection.

## Architecture

```text
specs/                  Plan-ID scenarios and expected behavior
tests/ui/web-ui/        Plan-ID scenarios with UI and tagged API contracts
tests/ui/auth/          Authenticated market UI scenarios
tests/api/auth/         Authenticated API contracts
src/api/                Authenticated service clients
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
once without launching a browser, while the three public UI projects exclude them and exercise the
rendered site on Chromium, Firefox, and WebKit.

## Coverage

The Plan IDs cover:

- complete desktop and mobile navigation;
- navigation destination and broken-link checks;
- two desktop layout breakpoints and one mobile breakpoint;
- home-page promotions and market groups;
- Explore spot-market content;
- iOS App Store and Android Google Play smart-link routing;
- all required Why MultiBank Group content;
- exact 404 handling and signed-out gated destinations;
- authenticated market rendering, category membership, and complete market row fields;
- authenticated crypto rates, wallet PnL, wallet balance, and market-price contracts.

Every `*.spec.ts` file declares its source plan and Plan ID. `bun run plan-coverage` rejects missing,
duplicate, stale, or incorrectly mapped IDs.

## CI and completion evidence

GitHub Actions reports independent quality, API, authenticated, and browser-matrix checks:

```text
install
  └── quality-gates
        ├── api-tests
        ├── ui-tests (chromium)
        ├── ui-tests (firefox)
        ├── ui-tests (webkit)
        ├── auth-ui-tests
        └── auth-api-tests
                    ↓
              public-report → GitHub Pages
```

- `install` verifies the frozen Bun lockfile and dependency graph.
- `quality-gates` enforces Plan-ID coverage, Prettier, zero-warning lint, and TypeScript.
- `api-tests` runs browserless navigation and app-store redirect contracts.
- `ui-tests` runs the complete public UI suite in parallel on Chromium, Firefox, and WebKit.
- `auth-ui-tests` restores protected storage state and runs only authenticated market tests.
- `auth-api-tests` restores the same protected state and runs authenticated contracts without a
  browser.

Credential-free API and public cross-browser results are merged into a seven-day
`playwright-html-report` artifact. After every fully successful `main` run, the same public report is
published to [GitHub Pages](https://zhukoff-av.github.io/trade.mb/). Authenticated job outcomes are
listed in the Actions summary, but their reports, traces, screenshots, cookies, and account data are
excluded from the public report.

GitHub Pages must be enabled once in the repository settings with **GitHub Actions** selected as the
publishing source. The workflow itself then deploys with only Pages write and OIDC permissions.

Framework decisions, assumptions, the complete test plan, release gates, and known risks are kept
in [`RELEASE_READINESS.md`](RELEASE_READINESS.md).

Work is complete only when these commands pass:

```sh
bun run test:review
AUTH_STATE_PATH=.auth/user.json bun run test:api:auth
AUTH_STATE_PATH=.auth/user.json bun run test:ui:auth
```

Project-specific contribution standards are documented in
[`PLAYWRIGHT_TESTING_GUIDELINES.md`](PLAYWRIGHT_TESTING_GUIDELINES.md).
