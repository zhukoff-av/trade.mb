// spec: specs/trading.md
// plan-id: TRADEMB-TRADING-005

import { expect, test } from '../../../src/fixtures/auth-api';
import { asJsonRecord, expectJsonResponse, isJsonRecord } from './contract';

test.describe('1.5 Authenticated wallet PnL exposes the requested time-series contract', () => {
  test('USD 15-minute PnL returns a valid values collection', async ({ authenticatedApi }) => {
    const response = await test.step('Request authenticated wallet PnL', () =>
      authenticatedApi.getWalletPnl());

    await test.step('Inspect the requested PnL contract', async () => {
      const payload = asJsonRecord(await expectJsonResponse(response));
      expect(payload.quote).toBe('USD');
      expect(payload.interval).toBe('15m');
      expect(Array.isArray(payload.values)).toBe(true);

      const values = payload.values as unknown[];
      expect(values.every(isJsonRecord)).toBe(true);
    });
  });
});
