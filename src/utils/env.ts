import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  BASE_URL: z.string().url().default('https://mb.io'),
  PUBLIC_BASE_URL: z.string().url().default('https://mb.io'),
  API_URL: z.string().url().optional(),
  API_TOKEN: z.string().optional(),
  USE_AUTH_STATE: z.enum(['true', 'false']).default('false'),
  AUTH_STATE_PATH: z.string().optional(),
  AUTH_CDP_URL: z.string().url().default('http://127.0.0.1:9222'),
  AUTH_CHROME_PROFILE_PATH: z.string().default('.auth/chrome-profile'),
  CHROME_PATH: z.string().default('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'),
});

const parsedEnv = envSchema.parse(process.env);

export const env = {
  baseUrl: parsedEnv.BASE_URL,
  publicBaseUrl: parsedEnv.PUBLIC_BASE_URL,
  apiUrl: parsedEnv.API_URL ?? parsedEnv.BASE_URL,
  apiToken: parsedEnv.API_TOKEN,
  authStatePath: parsedEnv.AUTH_STATE_PATH,
  useAuthState: parsedEnv.USE_AUTH_STATE === 'true' && Boolean(parsedEnv.AUTH_STATE_PATH),
  authCdpUrl: parsedEnv.AUTH_CDP_URL,
  authChromeProfilePath: parsedEnv.AUTH_CHROME_PROFILE_PATH,
  chromePath: parsedEnv.CHROME_PATH,
};
