import { check } from 'k6';
import http, { type Response } from 'k6/http';
import type { Options } from 'k6/options';

// The targets are live production services this project does not own. Every
// profile therefore keeps a single-digit arrival rate, caps virtual users, and
// the error-rate threshold below aborts the run instead of retrying a failing
// service. This is a latency and contract baseline gate, not a stress test.
const PROFILES = {
  smoke: { rate: 1, duration: '30s', preAllocatedVUs: 2, maxVUs: 4 },
  baseline: { rate: 2, duration: '90s', preAllocatedVUs: 4, maxVUs: 8 },
} as const;

type ProfileName = keyof typeof PROFILES;

const profileName = (__ENV.PROFILE ?? 'smoke') as ProfileName;
if (!(profileName in PROFILES)) {
  throw new Error(
    `Unknown PROFILE "${profileName}"; expected one of: ${Object.keys(PROFILES).join(', ')}`,
  );
}

const profile = PROFILES[profileName];
const coreApiBaseUrl = __ENV.CORE_API_BASE_URL ?? 'https://core-api.mb.io';
const marketDataApiBaseUrl =
  __ENV.MARKET_DATA_API_BASE_URL ?? 'https://mbg-market-data-service.mb.io';

export const options: Options = {
  userAgent: 'trade-mb-qa-k6/1.0 (+https://github.com/zhukoff-av/trade.mb)',
  scenarios: {
    market_data: {
      executor: 'constant-arrival-rate',
      rate: profile.rate,
      timeUnit: '1s',
      duration: profile.duration,
      preAllocatedVUs: profile.preAllocatedVUs,
      maxVUs: profile.maxVUs,
    },
  },
  thresholds: {
    http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true, delayAbortEval: '10s' }],
    checks: ['rate>0.99'],
    'http_req_duration{endpoint:crypto_price}': ['p(95)<1000'],
    'http_req_duration{endpoint:market_prices}': ['p(95)<1000'],
  },
  summaryTrendStats: ['avg', 'min', 'med', 'p(90)', 'p(95)', 'max'],
};

export default function (): void {
  checkCryptoPriceContract();
  checkMarketPricesContract();
}

function checkCryptoPriceContract(): void {
  const response = http.get(`${coreApiBaseUrl}/api/v1/exchange/api/get_crypto_price`, {
    tags: { endpoint: 'crypto_price' },
  });

  check(response, {
    'crypto price responds 200 with JSON': (r) => r.status === 200 && isJsonResponse(r),
    'crypto price reports success': (r) => {
      const body = parseJson(r);
      return isJsonRecord(body) && body.status === 'Success';
    },
    'crypto price lists positive USD rates': (r) => {
      const body = parseJson(r);
      if (!isJsonRecord(body) || !isJsonRecord(body.data)) {
        return false;
      }

      const rateList = body.data.rateList;
      return (
        body.data.baseCurrency === 'USD' &&
        Array.isArray(rateList) &&
        rateList.length > 0 &&
        rateList.every(
          (entry) =>
            isJsonRecord(entry) &&
            isNonEmptyString(entry.currency) &&
            isPositiveFiniteNumber(entry.rate),
        )
      );
    },
  });
}

function checkMarketPricesContract(): void {
  const response = http.get(`${marketDataApiBaseUrl}/api/io/v1/marketdata/prices?quote=USD`, {
    tags: { endpoint: 'market_prices' },
  });

  check(response, {
    'market prices respond 200 with JSON': (r) => r.status === 200 && isJsonResponse(r),
    'market prices list complete USD quotes': (r) => {
      const body = parseJson(r);
      return (
        Array.isArray(body) &&
        body.length > 0 &&
        body.every(
          (entry) =>
            isJsonRecord(entry) &&
            isNonEmptyString(entry.base) &&
            entry.quote === 'USD' &&
            isPositiveFiniteNumber(entry.close),
        )
      );
    },
  });
}

type JsonRecord = Record<string, unknown>;

function isJsonResponse(response: Response): boolean {
  return /^application\/json\b/i.test(response.headers['Content-Type'] ?? '');
}

function parseJson(response: Response): unknown {
  try {
    return response.json();
  } catch {
    return undefined;
  }
}

function isJsonRecord(value: unknown): value is JsonRecord {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isPositiveFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}
