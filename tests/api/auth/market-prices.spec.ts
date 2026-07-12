// spec: specs/trading.md
// plan-id: TRADEMB-TRADING-007

import { expect, test } from '../../../src/fixtures/auth-api';
import {
  asJsonRecord,
  expectJsonResponse,
  isFiniteNumber,
  isNonEmptyString,
  isPositiveFiniteNumber,
} from './contract';

test.describe('1.7 Authenticated market prices expose complete comparable fields', () => {
  test('USD market entries contain complete price fields and valid ranges', async ({
    authenticatedApi,
  }) => {
    const response = await test.step('Request authenticated USD market prices', () =>
      authenticatedApi.getMarketPrices());

    await test.step('Inspect every returned market entry', async () => {
      const payload = await expectJsonResponse(response);
      expect(Array.isArray(payload)).toBe(true);

      const entries = payload as unknown[];
      expect(entries.length).toBeGreaterThan(0);

      for (const item of entries) {
        const entry = asJsonRecord(item);
        expect(isPositiveFiniteNumber(entry.timestamp)).toBe(true);
        expect(isNonEmptyString(entry.base)).toBe(true);
        expect(entry.quote).toBe('USD');
        expect(isNonEmptyString(entry.source)).toBe(true);

        for (const field of ['open', 'close', 'high', 'low', 'change', 'changePercent']) {
          expect(isFiniteNumber(entry[field])).toBe(true);
        }
        for (const field of [
          'openFormatted',
          'closeFormatted',
          'highFormatted',
          'lowFormatted',
          'changeFormatted',
          'changePercentFormatted',
        ]) {
          expect(isNonEmptyString(entry[field])).toBe(true);
        }

        expect(typeof entry.inverted).toBe('boolean');
        expect(typeof entry.triangulated).toBe('boolean');
        expect(entry.high as number).toBeGreaterThanOrEqual(entry.low as number);
      }
    });
  });
});
