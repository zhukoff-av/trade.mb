// spec: specs/trading.md
// plan-id: TRADEMB-TRADING-004

import { expect, test } from '../../../src/fixtures/auth-api';
import {
  asJsonRecord,
  expectJsonResponse,
  isNonEmptyString,
  isPositiveFiniteNumber,
} from './contract';

test.describe('1.4 Authenticated crypto conversion rates expose a stable contract', () => {
  test('USD conversion rates contain unique currencies and positive rates', async ({
    authenticatedApi,
  }) => {
    const response = await test.step('Request authenticated crypto prices', () =>
      authenticatedApi.getCryptoPrice());

    await test.step('Inspect the response envelope and rate list', async () => {
      const payload = asJsonRecord(await expectJsonResponse(response));
      expect(payload.status).toBe('Success');
      expect(payload.message).toBe('Success!');

      const data = asJsonRecord(payload.data);
      expect(isPositiveFiniteNumber(data.timeStamp)).toBe(true);
      expect(data.baseCurrency).toBe('USD');
      expect(Array.isArray(data.rateList)).toBe(true);

      const rateList = data.rateList as unknown[];
      expect(rateList.length).toBeGreaterThan(0);

      const currencies = rateList.map((item) => {
        const rate = asJsonRecord(item);
        expect(isNonEmptyString(rate.currency)).toBe(true);
        expect(isPositiveFiniteNumber(rate.rate)).toBe(true);
        return rate.currency as string;
      });

      expect(new Set(currencies).size).toBe(currencies.length);
    });
  });
});
