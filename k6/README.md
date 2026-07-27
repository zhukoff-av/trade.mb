# k6 performance smoke

[Grafana k6](https://grafana.com/docs/k6/latest/) is a load-testing tool that runs JavaScript or
TypeScript test scripts inside a Go runtime. This directory holds one script,
[`market-data.perf.ts`](market-data.perf.ts), which gates the two public, credential-free
market-data endpoints:

- `GET /api/v1/exchange/api/get_crypto_price` on `core-api.mb.io`
- `GET /api/io/v1/marketdata/prices?quote=USD` on `mbg-market-data-service.mb.io`

The targets are live production services this project does not own. The scripts therefore measure
a latency and contract baseline at a polite request rate; they never stress the service, and they
abort as soon as the error-rate gate is breached.

## Running locally

Install the binary once (`brew install k6` on macOS, other platforms in the
[installation docs](https://grafana.com/docs/k6/latest/set-up/install-k6/)); k6 1.0+ compiles
TypeScript natively, so no build step is needed.

```sh
bun run perf:smoke      # 1 iteration/s for 30s — the PR gate
bun run perf:baseline   # 2 iterations/s for 90s — on-demand baseline
```

Each iteration requests both endpoints once, so the smoke profile issues about 60 requests total.
The process exits non-zero when any threshold fails, which is what turns a local run or CI job
red. Base URLs follow the same environment overrides as the Playwright suites, passed with k6's
`-e` flag: `k6 run -e CORE_API_BASE_URL=https://... k6/market-data.perf.ts`.

## How the script works

k6 concepts the script uses, in the order they appear:

- **Init context and the default function.** Everything at module top level runs once per virtual
  user during initialization: reading `__ENV`, choosing the profile, building `options`. The
  exported `default` function is the code one virtual user (VU) executes per iteration. k6 also
  supports optional `setup()`, `teardown()`, and `handleSummary()` lifecycle hooks; this script
  does not need them and uses `--summary-export` instead of `handleSummary` for CI reporting.
- **Scenarios and executors.** The `scenarios` block declares how load is shaped. The
  `constant-arrival-rate` executor is an _open_ workload model: it starts a fixed number of
  iterations per second regardless of how long responses take, which is how real traffic arrives
  at a service. A _closed_ model (for example `per-vu-iterations` or `constant-vus`) would slow
  down whenever the target slows down, hiding latency degradation exactly when it matters.
- **VU caps.** `preAllocatedVUs` sets how many VUs are prepared upfront; `maxVUs` is a hard upper
  bound. If responses become so slow that the arrival rate cannot be met with `maxVUs`, k6 drops
  iterations rather than piling on more concurrency — a deliberate protection for a production
  target.
- **Checks.** `check()` records functional pass/fail signals per response — status code, content
  type, and the same JSON contract shape the authenticated Playwright suite asserts. Checks alone
  never fail a run; they feed the `checks` metric.
- **Thresholds.** The `thresholds` block turns metrics into pass/fail gates and sets the process
  exit code. This script gates the error rate (`http_req_failed`), the check success rate, and
  p95 latency per endpoint. The error-rate threshold uses `abortOnFail`, stopping the whole run
  early instead of continuing to hit a failing production service.
- **Tags and sub-metrics.** Each request carries an `endpoint` tag. A threshold on
  `http_req_duration{endpoint:crypto_price}` then applies to that endpoint's latency only, so one
  slow endpoint cannot hide behind the other's average.
- **Metrics.** k6 emits built-in metrics of four types: Counter (`http_reqs`), Rate
  (`http_req_failed`), Trend (`http_req_duration`), and Gauge (`vus`). `summaryTrendStats` selects
  which aggregations the end-of-test summary prints; custom metrics can be added with
  `Trend`/`Counter`/`Rate`/`Gauge` from `k6/metrics` when built-ins are not enough.

## Thresholds

Observed p95 during calibration was roughly 460 ms per endpoint from a residential connection.
The gates leave headroom for network variance without becoming meaningless:

| Gate                                        | Threshold    | Behavior on breach          |
| ------------------------------------------- | ------------ | --------------------------- |
| `http_req_failed`                           | `rate<0.01`  | Abort the run, fail the job |
| `checks`                                    | `rate>0.99`  | Fail the job                |
| `http_req_duration{endpoint:crypto_price}`  | `p(95)<1000` | Fail the job                |
| `http_req_duration{endpoint:market_prices}` | `p(95)<1000` | Fail the job                |

## CI integration

The [`k6` workflow](../.github/workflows/k6.yml) installs a pinned k6 version with
`grafana/setup-k6-action`, runs the smoke profile on pull requests and `main` pushes, and can be
dispatched manually with the `baseline` profile. `--summary-export` writes the end-of-test summary
to JSON; [`scripts/github-k6-summary.js`](../scripts/github-k6-summary.js) renders it as a
threshold and check table in the job summary, and the raw JSON is kept as a seven-day artifact.
The script is covered by the same Prettier, ESLint, and `tsc` gates as the rest of the repository
through [`k6/tsconfig.json`](tsconfig.json) and the `@types/k6` package.

## Extending

Natural next steps, in rough order of value:

- **Ramping profiles** with the `ramping-arrival-rate` executor to find the knee in the latency
  curve — only against an environment this project owns, never the production site.
- **Custom Trend metrics** (for example time-to-first-price) when a business-level timing matters
  more than raw request duration.
- **Browser-level timings** with the `k6/browser` module, which drives a headless Chromium and
  reports Core Web Vitals alongside protocol-level metrics.
- **Streaming outputs** (`--out`) to Prometheus or Grafana Cloud k6 for trend dashboards across
  runs instead of per-run snapshots.
