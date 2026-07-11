### 1.1 Authenticated market table renders

**Plan ID:** `TRADEMB-TRADING-001`
**Coverage:** Authenticated UI
**Risk:** High - a missing market table prevents signed-in customers from discovering assets.
**Automation:** `tests/ui/auth/trading-market-renders.spec.ts`

**Steps:**

1. Open the authenticated trading portal home page.
2. Inspect the signed-in navigation and market heading.
3. Select Hot and inspect the market table and column headers.

**Expected:**

- The signed-in Wallet navigation and Today’s Top Crypto Prices heading are visible.
- The market table exposes Asset, Price, 24h Change, High, Low, and chart columns.
- Hot displays at least one market row.

### 1.2 Market categories group entries correctly

**Plan ID:** `TRADEMB-TRADING-002`
**Coverage:** Authenticated UI
**Risk:** High - incorrect category membership gives customers misleading market discovery data.
**Automation:** `tests/ui/auth/trading-market-categories.spec.ts`

**Steps:**

1. Open the authenticated trading portal home page.
2. Select Watchlist and inspect its personalized outcome.
3. Select Hot, Gainers, and Losers and inspect their rendered rows.

**Expected:**

- Watchlist displays either saved rows or the explicit empty-watchlist state.
- Hot displays at least one row.
- Gainers orders assets from the highest to the lowest signed 24-hour percentage change.
- Losers orders assets from the lowest to the highest signed 24-hour percentage change.

### 1.3 Market entries contain expected data fields

**Plan ID:** `TRADEMB-TRADING-003`
**Coverage:** Authenticated UI
**Risk:** High - incomplete market rows prevent customers from comparing available assets.
**Automation:** `tests/ui/auth/trading-market-row-fields.spec.ts`

**Steps:**

1. Open the authenticated trading portal home page.
2. Select Hot and wait for market rows.
3. Inspect every rendered row without activating an asset or trading action.

**Expected:**

- Every row contains an asset identity and icon, price, 24-hour change, high, low, and chart or explicit no-data fallback.
- Currency and percentage fields use their displayed production formats.
- Each row's high is greater than or equal to its low.
- The test does not assert live values, asset ordering, or fixed asset identities.
