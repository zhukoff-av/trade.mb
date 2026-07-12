// spec: specs/trading.md
// plan-id: TRADEMB-TRADING-006

import { expect, test } from '../../../src/fixtures/auth-api';
import { asJsonRecord, expectJsonResponse, isFiniteNumber, isNonEmptyString } from './contract';

function isNullableFiniteNumber(value: unknown): boolean {
  return value === null || isFiniteNumber(value);
}

test.describe('1.6 Authenticated wallet balance exposes a stable contract', () => {
  test('USD wallet balance contains finite aggregate and breakdown fields', async ({
    authenticatedApi,
  }) => {
    const response = await test.step('Request authenticated wallet balance', () =>
      authenticatedApi.getWalletBalance());

    await test.step('Inspect the aggregate balance and breakdown', async () => {
      const payload = asJsonRecord(await expectJsonResponse(response));
      expect(isFiniteNumber(payload.lastUpdated)).toBe(true);
      expect(payload.lastUpdated as number).toBeGreaterThanOrEqual(0);
      expect(payload.quote).toBe('USD');
      expect(isFiniteNumber(payload.value)).toBe(true);
      expect(isNonEmptyString(payload.valueFormatted)).toBe(true);

      const breakdown = asJsonRecord(payload.valueBreakdown);
      for (const field of ['spot', 'locked', 'margin']) {
        expect(isFiniteNumber(breakdown[field])).toBe(true);
      }
      for (const field of [
        'spotFormatted',
        'lockedFormatted',
        'spotValueFormatted',
        'lockedValueFormatted',
        'marginFormatted',
      ]) {
        expect(isNonEmptyString(breakdown[field])).toBe(true);
      }

      expect(isNullableFiniteNumber(breakdown.spotValue)).toBe(true);
      expect(isNullableFiniteNumber(breakdown.lockedValue)).toBe(true);
    });
  });
});
