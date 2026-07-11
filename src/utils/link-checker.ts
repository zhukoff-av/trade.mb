import type { APIRequestContext } from '@playwright/test';

export type LinkCheckOptions = {
  maxRedirects?: number;
  userAgent?: string;
};

export type LinkCheckResult = {
  status: number;
  finalUrl: string;
  location?: string;
};

export class LinkChecker {
  constructor(private readonly request: APIRequestContext) {}

  async check(url: string, options: LinkCheckOptions = {}): Promise<LinkCheckResult> {
    const response = await this.request.get(url, {
      failOnStatusCode: false,
      headers: options.userAgent ? { 'user-agent': options.userAgent } : undefined,
      maxRedirects: options.maxRedirects,
    });

    const location = response.headers().location;
    return {
      status: response.status(),
      finalUrl: response.url(),
      ...(location ? { location } : {}),
    };
  }
}
