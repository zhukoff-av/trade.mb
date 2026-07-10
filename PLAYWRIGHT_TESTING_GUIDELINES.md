# Playwright testing guidelines

These standards apply to the public mb.io test suite. They supplement Playwright's official
[best practices](https://playwright.dev/docs/best-practices) and
[test configuration guidance](https://playwright.dev/docs/test-configuration).

## 1. Start with an approved Plan ID

Every scenario belongs in `specs/*.md` before automation. Each test file must begin with:

```ts
// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-NNN
```

The plan must define risk, coverage type, steps, expected behavior, and either the exact automation
path or `Not automated`. Run `bun run plan-coverage` before and after changing a test.

## 2. Test user-visible behavior

Tests should describe what a signed-out visitor can see or do. Assert headings, links, destinations,
responses, dialogs, and layout outcomes. Do not assert CSS implementation details unless layout is
the explicit contract.

Keep one reason to fail per Plan ID. Multiple parameterized cases are appropriate when they prove
the same rule, such as supported desktop viewports or mobile-platform redirects.

## 3. Scope locators to the correct region

Prefer locators in this order:

1. `getByRole` with an exact accessible name;
2. `getByLabel` or `getByPlaceholder` for form controls;
3. exact visible text when copy is the contract;
4. a stable structural element such as `section` when page-region placement is the contract;
5. test IDs only when no meaningful user-facing locator exists.

Scope repeated names to their component or page section. A footer link must not satisfy a header
assertion. Do not add `.first()`, `.last()`, or `.nth()` merely to silence strictness; duplicates
should make the test fail unless order is an explicit product requirement.

Use Playwright web-first assertions:

```ts
await expect(header.desktopNavigationLink('Explore')).toBeVisible();
await expect(homePage.openAccountLink()).toHaveAttribute('href', 'https://trade.mb.io/register');
```

## 4. Keep page objects focused

- Components own reusable regions such as the public header.
- Page objects own page-specific navigation, regions, and locators.
- Fixtures compose those objects for tests.
- Data modules own expected copy, viewports, and destination contracts.
- Tests own assertions and scenario flow.

Do not put assertions inside page objects. Do not create generic `text()`, `link()`, or `button()`
wrappers that hide locator scope. Extract behavior after it repeats with the same meaning, not merely
to reduce line count.

## 5. Treat production data deliberately

The target is a live public site. Stable headings, approved marketing copy, routes, and account
destinations are valid contracts. Prices, percentages, article ordering, and other frequently
changing values are not.

Locale redirects such as `/en` to `/en-AE` are supported. Match the allowed locale shape while still
requiring the exact feature path.

## 6. Separate execution levels

Use the UI project when rendered browser behavior is the subject. Use an `@api` test when the
contract can be verified through Playwright's request context without a browser, such as HTTP
status, redirect, and final-destination checks.

When one Plan ID spans both concerns, keep both tests in its declared spec file. The `ui` project
excludes `@api` tests and the `api` project selects them, preserving a single automation mapping for
the Plan ID. API tests must not request `page`, page objects, or browser-only fixtures.

## 7. Validate links without testing the internet

For mb.io-owned navigation:

- assert the rendered `href`;
- request the destination;
- require a status below 400;
- assert the final host and path after redirects.

For a third-party store, assert the first-party smart link's redirect target instead of depending on
the third party's page content or availability. Use `maxRedirects: 0` when the redirect itself is the
contract. Do not submit sign-in, registration, or trading forms from public-link tests.

## 8. Wait for state, never time

Do not use `waitForTimeout`. Navigation uses `domcontentloaded`; subsequent actions and assertions
wait for visible UI state, a URL, a response, or another meaningful product outcome.

Do not solve flakes by increasing timeouts or retries. Local runs have zero retries so flakes are
visible immediately. CI retries collect a trace on the first retry and use one worker for stability.

## 9. Keep tests isolated and diagnostic

- Each test receives a fresh browser context.
- Tests must run independently and in parallel locally.
- Use `test.step` for reportable scenario phases.
- Never depend on test order or another test's output.
- Keep secrets in `.env`; never commit `.env`, authentication state, reports, traces, or local tooling
  configuration.

## 10. Review and evidence checklist

Before calling work complete, verify:

- the plan and automation headers agree;
- assertions prove the expected behavior rather than mere element existence;
- locators are exact, scoped, and strict;
- no fixed waits, `.only`, accidental `.skip`, or mutable-value assertions exist;
- request checks have clear ownership and destination expectations;
- page objects contain locators/actions, while specs contain assertions;
- no AI-agent, MCP, authentication, report, trace, or generated inspection files are tracked;
- `plan-coverage`, formatting, zero-warning lint, typecheck, API tests, and UI tests all pass.
