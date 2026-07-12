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

### 1.4 Authenticated crypto conversion rates expose a stable contract

**Plan ID:** `TRADEMB-TRADING-004`
**Coverage:** Authenticated API
**Risk:** High - malformed conversion rates prevent authenticated customers from valuing crypto assets.
**Automation:** `tests/api/auth/crypto-price.spec.ts`

**Steps:**

1. Request the authenticated crypto price endpoint.
2. Inspect the response envelope and USD rate list.

**Expected:**

- The endpoint returns a successful JSON response.
- The response identifies USD as the base currency and contains a positive timestamp.
- The rate list is populated with unique currencies and positive finite rates.
- The test does not assert live rates or a fixed number of currencies.

### 1.5 Authenticated wallet PnL exposes the requested time-series contract

**Plan ID:** `TRADEMB-TRADING-005`
**Coverage:** Authenticated API
**Risk:** High - an invalid PnL contract prevents customers from viewing wallet performance.
**Automation:** `tests/api/auth/wallet-pnl.spec.ts`

**Steps:**

1. Request wallet PnL in USD with a 15-minute interval and a limit of 96 points.
2. Inspect the requested quote, interval, and values collection.

**Expected:**

- The endpoint returns a successful JSON response.
- The response identifies USD and the 15-minute interval.
- Values is an array of JSON objects when populated; an empty array is valid.
- The test does not require a customer to have PnL history.

### 1.6 Authenticated wallet balance exposes a stable contract

**Plan ID:** `TRADEMB-TRADING-006`
**Coverage:** Authenticated API
**Risk:** High - malformed wallet balances prevent customers from understanding their available funds.
**Automation:** `tests/api/auth/wallet-balance.spec.ts`

**Steps:**

1. Request the authenticated wallet balance in USD.
2. Inspect the aggregate balance and its spot, locked, and margin breakdown.

**Expected:**

- The endpoint returns a successful JSON response with a non-negative last-updated timestamp.
- Numeric balance fields contain finite values and formatted fields are populated.
- Optional spot and locked values may be null for an empty portfolio.
- The test does not assert a customer's live balance.

### 1.7 Authenticated market prices expose complete comparable fields

**Plan ID:** `TRADEMB-TRADING-007`
**Coverage:** Authenticated API
**Risk:** High - incomplete market prices prevent customers from comparing tradable assets.
**Automation:** `tests/api/auth/market-prices.spec.ts`

**Steps:**

1. Request authenticated market prices quoted in USD.
2. Inspect every returned market entry.

**Expected:**

- The endpoint returns a successful JSON response with at least one market entry.
- Every entry contains identity, source, timestamp, OHLC, change, formatted, and boolean fields.
- Every entry is quoted in USD and its high is greater than or equal to its low.
- The test does not assert live prices, ordering, asset identities, or a fixed entry count.
