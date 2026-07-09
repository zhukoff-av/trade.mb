import type { APIRequestContext } from '@playwright/test';
import { healthSchema, type Health } from '../schemas/health.schema';

/**
 * Application-level API client. Clients return typed, parsed data and never
 * assert — assertions belong to the test that owns the scenario.
 */
export class AppClient {
  constructor(private readonly request: APIRequestContext) {}

  async ping(): Promise<{ status: number; contentType: string }> {
    const response = await this.request.get('/');
    return {
      status: response.status(),
      contentType: response.headers()['content-type'] ?? '',
    };
  }

  /**
   * Template for JSON endpoints: responses are parsed through a zod schema so
   * API contract drift fails loudly instead of leaking into assertions.
   * Adapt endpoint + schema per real resource once documented.
   */
  async health(): Promise<Health> {
    const response = await this.request.get('/health');
    return healthSchema.parse(await response.json());
  }
}
