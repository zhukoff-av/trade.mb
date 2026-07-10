# trade.mb.io Playwright tests

Playwright end-to-end coverage for the signed-out public experience at [mb.io](https://mb.io).
The project uses Bun, TypeScript, and Playwright with Chromium. It contains tests and supporting
test framework code only.

## Prerequisites

- Bun 1.3.14
- Chromium installed through Playwright

```sh
bun install
bunx playwright install chromium
```

The default target is `https://mb.io`. To use another compatible environment, copy `.env.example`
to `.env` and set `BASE_URL`.

Existing local configurations must also set `BASE_URL` to the public website; legacy API,
authentication, and secondary public-URL variables are no longer read by this lean suite.

## Commands

```sh
bun run test             # all configured Playwright test levels
bun run test:ui          # all Chromium UI tests
bun run test:api         # browserless API and network contract tests
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
```

## Architecture

```text
specs/                  Plan-ID scenarios and expected behavior
tests/ui/web-ui/        Plan-ID scenarios with UI and tagged API contracts
src/components/         Reusable page regions such as the public header
src/pages/              Focused Home, Explore, and Company page objects
src/fixtures/           Test fixture composition
src/data/               Stable expected navigation and content contracts
src/utils/              Request-level link validation
scripts/                Plan-to-automation contract enforcement
```

Tests import `test` and `expect` from `src/fixtures/ui.ts`. Page objects expose business-relevant
regions and actions; test data holds expected content and destination contracts. Live prices and
other mutable market values are deliberately excluded from assertions.

Tests tagged `@api` use only Playwright's request context. The `api` project selects those contracts
without launching Chromium, while the `ui` project excludes them and exercises the rendered site.

## Coverage

The 11 Plan IDs cover:

- complete desktop and mobile navigation;
- navigation destination and broken-link checks;
- two desktop layout breakpoints and one mobile breakpoint;
- home-page promotions and market groups;
- Explore spot-market content;
- iOS App Store and Android Google Play smart-link routing;
- all required Why MultiBank Group content;
- exact 404 handling and signed-out gated destinations.

Every `*.spec.ts` file declares its source plan and Plan ID. `bun run plan-coverage` rejects missing,
duplicate, stale, or incorrectly mapped IDs.

## CI and completion evidence

GitHub Actions reports four independent required checks:

```text
install
  └── quality-gates
        ├── api-tests
        └── ui-tests
```

- `install` verifies the frozen Bun lockfile and dependency graph.
- `quality-gates` enforces Plan-ID coverage, Prettier, zero-warning lint, and TypeScript.
- `api-tests` runs browserless navigation and app-store redirect contracts.
- `ui-tests` installs Chromium and runs the complete browser suite.

API and UI reports are uploaded separately when their job fails.

Work is complete only when these commands pass:

```sh
bun run plan-coverage
bun run format:check
bun run lint
bun run typecheck
bun run test:api
bun run test:ui
```

Project-specific contribution standards are documented in
[`PLAYWRIGHT_TESTING_GUIDELINES.md`](PLAYWRIGHT_TESTING_GUIDELINES.md).
