import { chmod, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { chromium, test as setup } from '@playwright/test';
import { env } from '../src/utils/env';

setup('save manually authenticated Chrome state', async () => {
  const cdpUrl = new URL(env.authCdpUrl);
  cdpUrl.port ||= '9222';

  const browser = await chromium.connectOverCDP(cdpUrl.origin, { timeout: 30_000 });
  try {
    const context = browser.contexts()[0];
    if (!context) {
      throw new Error('Chrome has no browser context to export');
    }

    const baseOrigin = new URL(env.baseUrl).origin;
    const page = context.pages().find((candidate) => {
      try {
        return new URL(candidate.url()).origin === baseOrigin;
      } catch {
        return false;
      }
    });

    if (!page) {
      throw new Error(`No open ${baseOrigin} page was found in Chrome`);
    }

    const loginButton = page.getByRole('button', { name: 'Log In', exact: true });
    if (await loginButton.isVisible()) {
      throw new Error('The login form is still visible; finish authentication before saving state');
    }

    await mkdir(dirname(env.authStatePath), { recursive: true });
    await context.storageState({ path: env.authStatePath, indexedDB: true });
    await chmod(env.authStatePath, 0o600);
    console.log(`Authenticated state saved to ${env.authStatePath}. You can now close Chrome.`);
  } finally {
    await browser.close();
  }
});
