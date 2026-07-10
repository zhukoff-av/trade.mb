### 1.1 Public top navigation renders expected items

**Plan ID:** `TRADEMB-WEBUI-001`
**Coverage:** UI
**Risk:** High - navigation is the primary entry point to public product discovery.
**Automation:** `tests/ui/web-ui/top-navigation-renders.spec.ts`

**Steps:**

1. Open the public English home page at the desktop viewport.
2. Inspect the Main navigation inside the page header.
3. Inspect the signed-out account actions inside the page header.

**Expected:**

- Explore, Features, OTC Desk, Company, Support, and $MBG are visible in Main navigation.
- Sign in and Sign up are visible as signed-out account actions.
- Footer links or duplicate text cannot satisfy the header assertions.

### 1.2 Public navigation links resolve correctly

**Plan ID:** `TRADEMB-WEBUI-002`
**Coverage:** UI + network
**Risk:** High - broken or incorrect navigation blocks discovery and conversion.
**Automation:** `tests/ui/web-ui/navigation-links-resolve.spec.ts`

**Steps:**

1. Open the public English home page.
2. Verify all six Main navigation destinations and both account destinations in the browser.
3. Request every destination from the browserless API project while following normal HTTP redirects.

**Expected:**

- Locale-aware public links point to their exact mb.io paths.
- $MBG, Sign in, and Sign up point to their exact external destinations.
- Every destination resolves below HTTP 400 and ends on its expected host and path.

### 1.3 Desktop home layout is stable

**Plan ID:** `TRADEMB-WEBUI-003`
**Coverage:** UI
**Risk:** Medium - responsive layout regressions can hide primary public content.
**Automation:** `tests/ui/web-ui/desktop-layout.spec.ts`

**Steps:**

1. Open the public English home page at 1280×720 and 1440×900.
2. Inspect the header and hero section at each viewport.
3. Measure the rendered document width.

**Expected:**

- Header, hero heading, download action, and account action are visible at both sizes.
- The document has no meaningful horizontal overflow.

### 1.4 Explore page renders spot market content

**Plan ID:** `TRADEMB-WEBUI-004`
**Coverage:** UI
**Risk:** High - market discovery is the closest public substitute for gated trading.
**Automation:** `tests/ui/web-ui/explore-spot-market.spec.ts`

**Steps:**

1. Open the public Explore page.
2. Inspect the market discovery heading and Spot market section.
3. Confirm stable labels and a recognizable asset render without checking live prices.

**Expected:**

- Markets at your fingertips and Spot market are visible.
- Bitcoin and Today's top crypto prices render inside the Spot market section.

### 1.5 Home market groups render

**Plan ID:** `TRADEMB-WEBUI-005`
**Coverage:** UI
**Risk:** Medium - grouped market content drives public discovery and trading interest.
**Automation:** `tests/ui/web-ui/home-market-groups.spec.ts`

**Steps:**

1. Open the public English home page.
2. Locate the Catch your next trade section.
3. Inspect its grouped market headings without checking live values.

**Expected:**

- Top Gainers, Trending Now, and Top Losers are visible inside the market section.

### 1.6 Marketing banners render in the expected regions

**Plan ID:** `TRADEMB-WEBUI-006`
**Coverage:** UI
**Risk:** Medium - public marketing content communicates the product value proposition.
**Automation:** `tests/ui/web-ui/marketing-content.spec.ts`

**Steps:**

1. Open the public English home page.
2. Inspect the Khabib promotional section and its copy.
3. Inspect the Smarter ways section, its two content blocks, and its CTA.

**Expected:**

- Unblemished. Unstoppable. United. and its expected promotional copy render together.
- Smarter ways to trade and grow contains both expected subheadings and section text.
- View platform features is visible inside the Smarter ways section.

### 1.7 App download link resolves for supported mobile platforms

**Plan ID:** `TRADEMB-WEBUI-007`
**Coverage:** UI + network
**Risk:** Medium - incorrect smart-link routing blocks mobile app acquisition.
**Automation:** `tests/ui/web-ui/app-download-link.spec.ts`

**Steps:**

1. Open the public English home page.
2. Locate Download the app inside the hero section and verify its exact smart-link destination.
3. Request the smart link from the browserless API project as iOS and Android clients without following the first redirect.

**Expected:**

- The hero exposes an HTTPS mbio.go.link destination.
- iOS receives a 3xx redirect to the expected Apple App Store application.
- Android receives a 3xx app intent containing the expected Google Play fallback application.
- The test does not depend on third-party store uptime or content.

### 1.8 Company page renders all Why MultiBank Group content

**Plan ID:** `TRADEMB-WEBUI-008`
**Coverage:** UI
**Risk:** Medium - company trust content is required by the assignment and supports public credibility.
**Automation:** `tests/ui/web-ui/company-why-multibank.spec.ts`

**Steps:**

1. Open the public Company page.
2. Inspect the introduction, statistics, and three editorial sections.
3. Inspect the three trust cards and Community & Media section.

**Expected:**

- The Why MultiBank Group heading and introduction render with exact approved copy.
- Annual turnover, customer, and office statistics render with their expected values and labels.
- Leadership, innovation, and integrity sections render with their expected headings and text.
- Regulation, track-record, and security cards render with their expected text.
- Community & Media and its supporting heading are visible.

### 1.9 Invalid public route has stable not-found handling

**Plan ID:** `TRADEMB-WEBUI-009`
**Coverage:** UI + response
**Risk:** Medium - stable error handling prevents confusing public dead ends.
**Automation:** `tests/ui/web-ui/invalid-route.spec.ts`

**Steps:**

1. Open an intentionally invalid public route.
2. Inspect the main document response and visible error content.
3. Inspect the resulting public URL.

**Expected:**

- The route returns HTTP 404.
- The page renders not-found content.
- The URL retains the invalid public path and does not redirect to trade.mb.io.

### 1.10 Mobile navigation is usable

**Plan ID:** `TRADEMB-WEBUI-010`
**Coverage:** UI
**Risk:** High - mobile users must be able to discover public product pages.
**Automation:** `tests/ui/web-ui/mobile-navigation.spec.ts`

**Steps:**

1. Open the public English home page at 390×844.
2. Open the mobile navigation dialog.
3. Inspect all navigation and account links, then measure document width.

**Expected:**

- The mobile menu opens as a visible dialog.
- All six public navigation items plus Sign in and Sign up are visible.
- The mobile viewport has no meaningful horizontal overflow.

### 1.11 Gated trade links remain signed-out safe

**Plan ID:** `TRADEMB-WEBUI-011`
**Coverage:** UI
**Risk:** Medium - gated links must not attempt trading actions for signed-out users.
**Automation:** `tests/ui/web-ui/gated-trade-links.spec.ts`

**Steps:**

1. Open the public English home page.
2. Inspect exact signed-out account destinations.
3. Inspect exact gated home-page CTA destinations without activating them.

**Expected:**

- Sign in and View platform features point to the trade.mb.io login route.
- Sign up, Open an account, and Start Portfolio point to the registration route.
- No form is submitted and no account or trading state is created.
