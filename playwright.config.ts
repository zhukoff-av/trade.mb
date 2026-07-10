import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

const baseURL = new URL(process.env.BASE_URL ?? 'https://mb.io').toString();

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
      testMatch: 'ui/**/*.spec.ts',
      grepInvert: /@api/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'api',
      testMatch: [
        'ui/web-ui/app-download-link.spec.ts',
        'ui/web-ui/navigation-links-resolve.spec.ts',
      ],
      grep: /@api/,
    },
  ],
});
