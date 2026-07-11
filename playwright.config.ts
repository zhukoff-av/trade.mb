import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

const baseURL = new URL(process.env.BASE_URL ?? 'https://mb.io').toString();
const authBaseURL = new URL(process.env.AUTH_BASE_URL ?? 'https://trade.mb.io').toString();
const authStatePath = process.env.AUTH_STATE_PATH ?? '.auth/user.json';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [['list'], ['html', { open: 'never' }], ['blob', { outputDir: 'blob-report' }]]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'ui',
      testMatch: 'ui/web-ui/**/*.spec.ts',
      grepInvert: /@api/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'api',
      testMatch: 'ui/web-ui/**/*.spec.ts',
      grep: /@api/,
    },
    {
      name: 'auth-ui',
      testMatch: 'ui/auth/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: authBaseURL,
        storageState: authStatePath,
      },
    },
  ],
});
