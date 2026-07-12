# Task 2 – QA Strategy & Thinking

## 1. Where do I start?

I would start by understanding the main user journeys and the biggest risks. Since real money is involved, I would focus first on:

- Login and account recovery
- Deposits and withdrawals
- Balances and portfolio data
- Buying, selling and cancelling orders
- Fees, prices and calculations
- Security and user data

I would speak with product and developers to understand what is ready, what is still changing and which third-party services are used.

Then I would create a short list of critical and money-loss scenarios. These must be tested before release, even if some lower-risk features are not fully covered.

## 2. How would I test the app?

I would use risk-based testing. Critical money flows come first, then normal features and UI issues.

Important money-loss scenarios include:

- One tap creates two orders
- The app shows a failed order, but it was actually placed
- The app shows success, but the order was not placed
- Wrong price, quantity, fee or currency is used
- Balance is not updated after a trade
- A withdrawal is processed twice
- The user sells more than they own
- A network timeout leaves the transaction in an unknown state
- One user can access another user’s account or data

I would test the app on both iOS and Android, using real devices where possible. I would also test slow networks, offline mode, backgrounding the app, expired sessions, repeated taps and interrupted transactions.

I would combine:

- API tests for business rules, balances and order states
- Mobile UI tests for the main user journeys
- Manual exploratory testing for unexpected behaviour
- Security, performance and integration testing

The backend should always be the source of truth for money and order status.

## 3. What does QA look like inside a sprint?

I would follow a shift-left approach. QA starts during ticket refinement, not after development is finished.

For every ticket, QA should help define:

- Clear acceptance criteria
- Negative and boundary cases
- Money-loss risks
- Test data and environment needs
- What should be automated
- Which existing areas may be affected

While developers build the feature, QA can prepare tests, review API contracts and raise unclear requirements early.

When the feature is ready, I would test the acceptance criteria, negative cases and affected areas. After a bug fix, I would retest the bug and nearby functionality.

Before release, we run smoke tests, automated regression and focused exploratory testing on the final build. Critical financial or security bugs should block the release.

## 4. What does my ideal regression suite look like?

I would keep it practical and layered:

- A small smoke suite for every build
- API tests for calculations, balances, orders and duplicate protection
- Mobile UI tests for the most important end-to-end journeys
- A larger nightly and pre-release regression suite
- Manual exploratory testing for new and risky areas

The most critical automated flows would be login, deposit, buy, sell, cancel order, withdraw and verify balances.

Tests should be stable and provide useful logs, screenshots and request details when they fail. Flaky tests should not be accepted as normal.

## 5. What would keep me up at night?

The biggest concern is the app not knowing whether money moved or an order was placed.

A timeout could show an error even though the trade succeeded. The user tries again and creates a duplicate trade. This is one of the main scenarios I would test.

I would also worry about:

- Incorrect balances or prices
- Duplicate trades or withdrawals
- Security problems and account takeover
- Sensitive data leaking into logs or notifications
- Third-party services failing during busy periods
- Missing audit logs
- Weak monitoring after release
- No rollback or emergency stop option

Before public release, I would want monitoring, alerts, transaction reconciliation, a clear go/no-go checklist and people available to respond to incidents.

If critical money flows are not reliable, I would recommend delaying the release or starting with a small controlled group of users.
:::
