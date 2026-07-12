import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './scripts',
  globalSetup: './scripts/auth-cdp.global-setup.ts',
  timeout: 0,
  fullyParallel: false,
  retries: 0,
  reporter: [['list']],
  projects: [
    {
      name: 'auth-cdp',
      testMatch: 'auth-cdp.setup.ts',
    },
  ],
});
