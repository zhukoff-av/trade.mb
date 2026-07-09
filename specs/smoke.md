# Test Plan: trade.mb.io smoke

**Target:** https://trade.mb.io
**Created:** 2026-07-09
**Owner:** test-planner

Baseline availability checks proving the UI and API harnesses work end-to-end.
Deeper feature plans (auth, markets, orders) get their own file in `specs/`.

## 1. Application availability

### 1.1 Home page loads

**Plan ID:** `TRADEMB-SMOKE-001`
**Coverage:** UI
**Risk:** High — nothing else can work if the entry point is down
**Automation:** `tests/ui/smoke/home-page-loads.spec.ts`

**Steps:**

1. Navigate to the home page (`/`).

**Expected:**

- The page renders with a non-empty document title.

### 1.2 Application responds over HTTP

**Plan ID:** `TRADEMB-SMOKE-002`
**Coverage:** API
**Risk:** High — proves the request-context stack, base URL, and auth wiring
**Automation:** `tests/api/smoke/app-responds.spec.ts`

**Steps:**

1. Send `GET /` through the API request context.

**Expected:**

- The response status is below 400.
- The response declares a content type.
