import { defineConfig, devices } from '@playwright/test';
import { env } from './src/utils/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'ui',
      testMatch: 'ui/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: env.baseUrl,
        storageState: env.useAuthState ? env.authStatePath : undefined,
      },
    },
    {
      name: 'api',
      testMatch: 'api/**/*.spec.ts',
      use: {
        baseURL: env.apiUrl,
        extraHTTPHeaders: env.apiToken ? { Authorization: `Bearer ${env.apiToken}` } : undefined,
      },
    },
  ],
});
