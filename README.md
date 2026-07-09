# trade-mb-qa

Playwright UI + API test automation for the trading web app [trade.mb.io](https://trade.mb.io),
built around an **AI agent workflow**: six specialized agents plan, generate, review, heal, and
verify tests, chained by an orchestrated pipeline with an enforceable plan↔test contract.

## Stack

Bun · TypeScript (strict) · Playwright 1.60 (UI e2e + browser-less API testing) · zod (schema
validation) · ESLint 9 + eslint-plugin-playwright · Prettier

## Setup & run

```sh
bun install
bunx playwright install chromium
cp .env.example .env          # optional — defaults target https://trade.mb.io

bun run test:ui               # UI smoke (Desktop Chrome)
bun run test:api              # API smoke (no browser)
bun run lint && bun run typecheck
bun run plan-coverage         # specs/ ↔ tests/ contract check
bun run report                # open the HTML report
```

## Local authenticated UI runs

Authentication is opt-in so public UI and API checks still run without credentials. Create the
local browser state from a manually authenticated Chrome session:

```sh
bun run auth:setup
```

The command launches regular Google Chrome with a dedicated local profile and a debug port bound
only to loopback. Log in completely in Chrome, including OTP, without Playwright attached. After
the authenticated page opens, return to the terminal and press Enter. Playwright then connects
over CDP only to save cookies, local storage, and IndexedDB state to `.auth/user.json`.

The dedicated Chrome profile is stored under `.auth/chrome-profile` and is also ignored by git.
Close that Chrome window after the state is saved so the local debug port is no longer available.
Run UI tests with the saved state while the session remains valid:

```sh
bun run test:ui:auth
```

`.auth/`, `playwright/.auth/`, and `*.auth.json` are gitignored because storage-state files can
contain live cookies, tokens, and session IDs. Never commit or share them. For CI, prefer a
test-environment OTP bypass or a dedicated email OTP helper. Restoring storage state from a CI
secret is possible but requires rotation whenever the session expires, and Cloudflare may still
challenge a new CI IP or browser.

## Agent architecture

AI agent tooling is **local-only and not committed to git** — the repository ships the test
framework and product code; the agent scaffolding used to build and extend it lives outside
version control (see `.gitignore`: `.claude/`, `AGENTS.md`, `CLAUDE.md`). The only AI-tooling file
that is tracked is [.mcp.json](.mcp.json), which registers the Playwright test MCP server so any
MCP-compatible agent (Claude Code, Codex, ...) gets browser-exploration and test-debug tools.

Locally, `.claude/agents/` holds six subagent playbooks — test-planner, test-generator,
test-reviewer, test-healer, framework-engineer, verifier — chained by a `/qa-pipeline` command
with explicit gates:

```
plan ──► generate ──► review ──► (heal, if failing) ──► verify
 │           │           │              │                  │
 specs/…md   tests/…ts   findings +     root cause +       READY /
 + Plan IDs  + plan-id   quality score  rerun evidence     NOT READY
 [user OK]   [coverage✓] [no Crit/Maj]  [3× stable]        [all gates]
```

The handoff mechanism is the **Plan ID contract** — tracked in git, independent of any agent
tooling: every scenario in `specs/` declares `**Plan ID:**` / `**Automation:**`, every test starts
with `// spec:` + `// plan-id:` headers, and [scripts/plan-coverage.js](scripts/plan-coverage.js)
fails the build when they drift apart.

## Test framework (clean architecture)

```
tests/
  ui/<feature>/*.spec.ts      UI specs (project: ui)
  api/<feature>/*.spec.ts     API specs (project: api, no browser)
src/
  fixtures/                   typed fixtures — specs import test/expect from here
  pages/                      page objects (getByRole-first locator policy)
  api/clients/ + schemas/     typed clients over APIRequestContext + zod schemas
  data/                       unique-by-construction test data builders
  utils/env.ts                zod-validated env config (single process.env entry point)
specs/                        markdown test plans (planner output)
```

Imports point downward only; specs contain no logic and construct nothing directly.

## Design decisions

- **Two Playwright projects** (`ui`, `api`) share one toolchain: browser e2e and request-context
  API tests without a second framework.
- **API responses parse through zod schemas** in the client layer, so contract drift fails loudly
  in one place instead of leaking into assertions.
- **Reviewer/verifier are read-only by tool grant**, not just by instruction — review and evidence
  stages cannot silently "fix" what they judge.
- **CI is intentionally descoped** for this assignment. With more time: a GitHub Actions workflow
  running lint → typecheck → plan-coverage → both projects with trace artifacts on failure, plus a
  scheduled flakiness run feeding test-healer.
- **Agent definitions are gitignored on purpose**: the repository is judged on the test framework
  it produces, not the AI scaffolding that produced it. `.mcp.json` is the one exception — it is
  tool config, not an agent opinion, so it stays tracked.
- `.github/agents/` and `.github/prompts/` are the original `playwright init-agents` output
  (VS Code Copilot format, also gitignored), superseded locally by `.claude/agents/`.
