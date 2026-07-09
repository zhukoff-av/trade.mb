import { spawn } from 'node:child_process';
import { access, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { env } from '../src/utils/env';

export default async function authCdpGlobalSetup(): Promise<void> {
  const cdpUrl = new URL(env.authCdpUrl);

  if (!['127.0.0.1', 'localhost', '::1'].includes(cdpUrl.hostname)) {
    throw new Error(
      'AUTH_CDP_URL must use a loopback host so the Chrome debug port is not exposed',
    );
  }

  const port = cdpUrl.port || '9222';
  cdpUrl.port = port;
  const profilePath = resolve(env.authChromeProfilePath);

  await access(env.chromePath);
  await mkdir(profilePath, { recursive: true });

  const chrome = spawn(
    env.chromePath,
    [
      `--remote-debugging-address=${cdpUrl.hostname}`,
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profilePath}`,
      '--no-first-run',
      '--no-default-browser-check',
      env.baseUrl,
    ],
    {
      detached: true,
      stdio: 'ignore',
    },
  );
  chrome.unref();

  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(new URL('/json/version', cdpUrl));
      if (response.ok) break;
    } catch {
      // Chrome is still starting.
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
  }

  const ready = await fetch(new URL('/json/version', cdpUrl)).catch(() => undefined);
  if (!ready?.ok) {
    throw new Error(`Chrome did not expose CDP at ${cdpUrl.origin}`);
  }

  const prompt = createInterface({ input: process.stdin, output: process.stdout });
  await prompt.question(
    'Log in completely in Chrome, including OTP. When the authenticated page is open, press Enter here...',
  );
  prompt.close();
}
