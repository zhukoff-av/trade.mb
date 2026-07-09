// spec: specs/smoke.md
// plan-id: TRADEMB-SMOKE-002

import { expect, test } from '../../../src/fixtures/api.fixtures';

test.describe('Application availability', () => {
  test('Application responds over HTTP', async ({ app }) => {
    const response = await test.step('Request the application root', () => app.ping());

    await test.step('The response is a success and serves content', async () => {
      expect(response.status, 'expected a non-error HTTP status').toBeLessThan(400);
      expect(response.contentType, 'expected the response to declare a content type').not.toBe('');
    });
  });
});
