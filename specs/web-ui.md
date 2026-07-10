### 1.1 Public top navigation renders expected items

**Plan ID:** `TRADEMB-WEBUI-001`
**Coverage:** UI
**Risk:** High - navigation is the primary entry point to public product discovery.
**Automation:** `tests/ui/web-ui/top-navigation-renders.spec.ts`

**Steps:**

1. Open the public English home page.
2. Inspect the desktop header navigation.
3. Confirm the expected signed-out public navigation items are visible.

**Expected:**

- Explore, Features, OTC Desk, Company, Support, $MBG, Sign in, and Sign up are visible.
- The page remains a signed-out public experience.

### 1.2 Public navigation links resolve correctly

**Plan ID:** `TRADEMB-WEBUI-002`
**Coverage:** UI
**Risk:** High - broken or incorrect navigation blocks discovery and conversion.
**Automation:** `tests/ui/web-ui/navigation-links-resolve.spec.ts`

**Steps:**

1. Open the public English home page.
2. Read each expected desktop navigation destination.
3. Check that public links resolve successfully and gated links point to trade.mb.io.

**Expected:**

- Public navigation links point to the expected mb.io paths.
- Sign in, Sign up, and gated trading links resolve to trade.mb.io without submitting credentials.
- No checked destination returns a server error.

### 1.3 Desktop home layout is stable

**Plan ID:** `TRADEMB-WEBUI-003`
**Coverage:** UI
**Risk:** Medium - responsive layout regressions can hide primary public content.
**Automation:** `tests/ui/web-ui/desktop-layout.spec.ts`

**Steps:**

1. Open the public English home page at a desktop viewport.
2. Inspect the header and hero region.
3. Confirm primary content is visible without horizontal overflow.

**Expected:**

- Header and hero content are visible.
- The desktop viewport has no meaningful horizontal overflow.
- Primary calls to action are visible in the first page region.

### 1.4 Explore page renders spot market content

**Plan ID:** `TRADEMB-WEBUI-004`
**Coverage:** UI
**Risk:** High - market discovery is the closest public substitute for gated trading.
**Automation:** `tests/ui/web-ui/explore-spot-market.spec.ts`

**Steps:**

1. Open the public Explore page.
2. Inspect the market discovery content.
3. Confirm spot market labels and asset content are present.

**Expected:**

- Explore page content renders for signed-out users.
- Spot or market-related content is visible.
- At least one recognizable asset or market row/card is visible.

### 1.5 Home market groups render

**Plan ID:** `TRADEMB-WEBUI-005`
**Coverage:** UI
**Risk:** Medium - grouped market content drives public discovery and trading interest.
**Automation:** `tests/ui/web-ui/home-market-groups.spec.ts`

**Steps:**

1. Open the public English home page.
2. Inspect the market discovery sections.
3. Confirm the expected grouped market headings render.

**Expected:**

- Top Gainers is visible.
- Trending Now is visible.
- Top Losers is visible.

### 1.6 Marketing hero and banners render

**Plan ID:** `TRADEMB-WEBUI-006`
**Coverage:** UI
**Risk:** Medium - public marketing content communicates the product value proposition.
**Automation:** `tests/ui/web-ui/marketing-content.spec.ts`

**Steps:**

1. Open the public English home page.
2. Inspect the hero and promotional banner region.
3. Confirm expected headings and calls to action render.

**Expected:**

- A primary mb.io hero heading is visible.
- Public marketing or promotional copy is visible.
- At least one public call to action is visible and has a destination.

### 1.7 App download link resolves

**Plan ID:** `TRADEMB-WEBUI-007`
**Coverage:** UI
**Risk:** Low - app download links are important conversion paths but do not affect trading state.
**Automation:** `tests/ui/web-ui/app-download-link.spec.ts`

**Steps:**

1. Open the public English home page.
2. Locate the app download link exposed to signed-out users.
3. Verify the destination resolves without a broken response.

**Expected:**

- The app download link is present.
- The link has an HTTP or HTTPS destination.
- The destination does not return a broken response.

### 1.8 Company page renders Why MultiBank Group content

**Plan ID:** `TRADEMB-WEBUI-008`
**Coverage:** UI
**Risk:** Medium - company trust content is required by the assignment and supports public credibility.
**Automation:** `tests/ui/web-ui/company-why-multibank.spec.ts`

**Steps:**

1. Open the public Company page.
2. Inspect the Why MultiBank Group content.
3. Confirm expected trust and leadership sections render.

**Expected:**

- The Company page renders for signed-out users.
- The Why MultiBank Group heading is visible.
- Trust, regulation, leadership, or group credibility content is visible.

### 1.9 Invalid public route has stable not-found handling

**Plan ID:** `TRADEMB-WEBUI-009`
**Coverage:** UI
**Risk:** Medium - stable error handling prevents confusing public dead ends.
**Automation:** `tests/ui/web-ui/invalid-route.spec.ts`

**Steps:**

1. Open an intentionally invalid public route.
2. Inspect the page response and visible error content.
3. Confirm the app handles the route consistently.

**Expected:**

- The invalid route does not produce a 5xx response.
- The page shows not-found or equivalent error handling.
- The user is not asked to log in for the invalid public route.

### 1.10 Mobile navigation is usable

**Plan ID:** `TRADEMB-WEBUI-010`
**Coverage:** UI
**Risk:** High - mobile users must be able to discover public product pages.
**Automation:** `tests/ui/web-ui/mobile-navigation.spec.ts`

**Steps:**

1. Open the public English home page at a mobile viewport.
2. Open the mobile menu.
3. Confirm public navigation options are usable without horizontal overflow.

**Expected:**

- A mobile menu control is visible and opens the navigation.
- Public navigation items are visible after opening the menu.
- The mobile viewport has no meaningful horizontal overflow.

### 1.11 Gated trade links remain signed-out safe

**Plan ID:** `TRADEMB-WEBUI-011`
**Coverage:** UI
**Risk:** Medium - gated links must not attempt trading actions for signed-out users.
**Automation:** `tests/ui/web-ui/gated-trade-links.spec.ts`

**Steps:**

1. Open the public English home page.
2. Inspect signed-out trading, sign-in, and sign-up destinations.
3. Verify they point to trade.mb.io without filling forms or creating an account.

**Expected:**

- Sign in points to trade.mb.io login.
- Sign up points to trade.mb.io registration or onboarding.
- Public trading calls to action point to trade.mb.io gated flows.
