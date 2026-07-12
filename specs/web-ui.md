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

### 1.12 Home supporting cards render

**Plan ID:** `TRADEMB-WEBUI-012`
**Coverage:** UI
**Risk:** Medium - supporting product cards communicate the platform's core capabilities.
**Automation:** `tests/ui/web-ui/home-supporting-cards.spec.ts`

**Steps:**

1. Open the public English home page.
2. Inspect the funding and platform-benefit card groups.

**Expected:**

- The fastest-trading and card-or-bank-transfer content renders.
- Move funds effortlessly, Stay informed, and Security of funds render as distinct card content.

### 1.13 Home footer renders required navigation

**Plan ID:** `TRADEMB-WEBUI-013`
**Coverage:** UI
**Risk:** Medium - visitors rely on footer navigation for policy and compliance information.
**Automation:** `tests/ui/web-ui/home-footer.spec.ts`

**Steps:**

1. Open the public English home page.
2. Inspect the Footer navigation inside the page footer.

**Expected:**

- Corporate, Privacy, and Compliance groups are visible.
- The test scopes assertions to the page footer, so page-body content cannot satisfy them.

### 1.14 Home Explore all assets opens Explore

**Plan ID:** `TRADEMB-WEBUI-014`
**Coverage:** UI
**Risk:** High - the home market CTA is the primary transition into public asset discovery.
**Automation:** `tests/ui/web-ui/home-explore-navigation.spec.ts`

**Steps:**

1. Open the public English home page.
2. Locate Explore all assets inside Catch your next trade.
3. Activate the link.

**Expected:**

- The CTA has the locale-aware Explore destination.
- Navigation ends on the public Explore route.
- The Explore hero is visible after navigation.

### 1.15 Explore promotional cards render

**Plan ID:** `TRADEMB-WEBUI-015`
**Coverage:** UI
**Risk:** Medium - promotional entry cards expose the primary funding and earning journeys.
**Automation:** `tests/ui/web-ui/explore-promotional-cards.spec.ts`

**Steps:**

1. Open the public Explore page.
2. Inspect the promotional card group beneath the hero.

**Expected:**

- Earn rewards, Instant buy, and Deposit funds cards render with their stable labels.
- Signed-out action cards point to the login destination.

### 1.16 Explore market tabs render complete token rows

**Plan ID:** `TRADEMB-WEBUI-016`
**Coverage:** UI
**Risk:** High - incomplete market rows prevent visitors from comparing discoverable assets.
**Automation:** `tests/ui/web-ui/explore-market-tabs.spec.ts`

**Steps:**

1. Open the public Explore page and locate Today's top crypto prices.
2. Select Hot, Gainers, and Losers in turn.
3. Inspect every rendered token row after each selection.

**Expected:**

- Every tab is visible, enabled, and produces at least one token row.
- Every row contains an asset link, displayed price, percentage, and chart region or explicit no-data fallback.
- The test validates display formats but not live values, token identity, or ordering.

### 1.17 Features page renders feature and solution cards

**Plan ID:** `TRADEMB-WEBUI-017`
**Coverage:** UI
**Risk:** Medium - missing feature content weakens product discovery and conversion.
**Automation:** `tests/ui/web-ui/features-cards.spec.ts`

**Steps:**

1. Open the public Features page.
2. Inspect all named feature sections.
3. Inspect the Solutions with advantages cards.

**Expected:**

- All seven stable feature headings are visible.
- Fiat on/off ramps, Heavily regulated, and Seamless OTC execution render in the solutions section.

### 1.18 OTC quote form renders safely for signed-out visitors

**Plan ID:** `TRADEMB-WEBUI-018`
**Coverage:** UI
**Risk:** High - visitors cannot begin an OTC enquiry if the quote form is incomplete.
**Automation:** `tests/ui/web-ui/otc-quote-form.spec.ts`

**Steps:**

1. Open the public OTC Desk page.
2. Inspect the Request a quote form without entering personal data.
3. Inspect its initial action state.

**Expected:**

- The hero and quote-form heading render.
- First name, last name, email, phone, notes, and three required selectors are present.
- Next is disabled while the required form is empty.
- No quote is submitted.

### 1.19 OTC benefit, process, and FAQ content renders

**Plan ID:** `TRADEMB-WEBUI-019`
**Coverage:** UI
**Risk:** Medium - OTC visitors need clear execution benefits and onboarding steps before enquiring.
**Automation:** `tests/ui/web-ui/otc-content.spec.ts`

**Steps:**

1. Open the public OTC Desk page.
2. Inspect the benefit-card group and How it works steps.
3. Inspect the FAQ region and quote anchor.

**Expected:**

- All six named OTC benefit articles render.
- Apply, Verify, Connect, and Trade render inside How it works.
- Frequently Asked Questions and a Request a quote anchor are visible.

### 1.20 Support page renders discovery and assistance cards

**Plan ID:** `TRADEMB-WEBUI-020`
**Coverage:** UI
**Risk:** High - missing support discovery paths can prevent visitors from finding help.
**Automation:** `tests/ui/web-ui/support-content.spec.ts`

**Steps:**

1. Open the public Support page.
2. Inspect the FAQ search, Quick actions, FAQ categories, and View more link.
3. Inspect the Need help with something else cards.

**Expected:**

- The support hero and FAQ search field render.
- Representative quick actions and FAQ categories have locale-aware support destinations.
- View more points to the FAQ index.
- Chat with us, Submit a request, and Terms and conditions cards render with their expected action types and destinations.

### 1.21 $MBG navigation opens the token landing page

**Plan ID:** `TRADEMB-WEBUI-021`
**Coverage:** UI
**Risk:** High - the public navigation must lead to a usable token-information destination.
**Automation:** `tests/ui/web-ui/mbg-landing.spec.ts`

**Steps:**

1. Open the public English home page and activate $MBG in Main navigation.
2. Follow the redirect to the token site.
3. Inspect stable utility, roadmap, allocation, and purchase content.

**Expected:**

- Navigation ends on the locale-aware token.mb.io landing page.
- A visible $MBG hero and all four utility cards render.
- Roadmap and token-allocation sections are visible.
- Buy $MBG exposes the expected mbio.go.link smart-link path without initiating a purchase.
