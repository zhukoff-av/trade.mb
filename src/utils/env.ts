import 'dotenv/config';

function urlFromEnvironment(name: string, fallback: string): string {
  const value = process.env[name] || fallback;
  return new URL(value).toString();
}

export const env = {
  baseUrl: urlFromEnvironment('AUTH_BASE_URL', 'https://trade.mb.io'),
  authStatePath: process.env.AUTH_STATE_PATH || '.auth/user.json',
  authCdpUrl: urlFromEnvironment('AUTH_CDP_URL', 'http://127.0.0.1:9222'),
  authChromeProfilePath: process.env.AUTH_CHROME_PROFILE_PATH || '.auth/chrome-profile',
  chromePath:
    process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
} as const;
