import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  BASE_URL: z.url().default('https://trade.mb.io'),
  API_URL: z.url().optional(),
  API_TOKEN: z.string().min(1).optional(),
  AUTH_STATE_PATH: z.string().min(1).optional(),
  AUTH_CDP_URL: z.url().default('http://127.0.0.1:9222'),
  AUTH_CHROME_PROFILE_PATH: z.string().min(1).default('.auth/chrome-profile'),
  CHROME_PATH: z
    .string()
    .min(1)
    .default('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'),
});

const parsed = envSchema.parse(process.env);

export const env = {
  baseUrl: parsed.BASE_URL,
  apiUrl: parsed.API_URL ?? parsed.BASE_URL,
  apiToken: parsed.API_TOKEN,
  authStatePath: parsed.AUTH_STATE_PATH ?? '.auth/user.json',
  useAuthState: parsed.AUTH_STATE_PATH !== undefined,
  authCdpUrl: parsed.AUTH_CDP_URL,
  authChromeProfilePath: parsed.AUTH_CHROME_PROFILE_PATH,
  chromePath: parsed.CHROME_PATH,
} as const;
