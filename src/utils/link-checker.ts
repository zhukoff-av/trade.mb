import type { APIRequestContext } from '@playwright/test';
import { env } from './env';

export class LinkChecker {
  constructor(private readonly request: APIRequestContext) {}

  async statusFor(url: string): Promise<number> {
    const response = await this.request.get(this.absoluteUrl(url), { maxRedirects: 5 });
    return response.status();
  }

  async resolves(url: string): Promise<boolean> {
    const status = await this.statusFor(url);
    return status < 400;
  }

  private absoluteUrl(url: string): string {
    return new URL(url, env.publicBaseUrl).toString();
  }
}
