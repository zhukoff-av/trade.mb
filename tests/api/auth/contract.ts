import { expect, type APIResponse } from '@playwright/test';

export type JsonRecord = Record<string, unknown>;

export async function expectJsonResponse(response: APIResponse): Promise<unknown> {
  expect(response.status()).toBe(200);
  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toMatch(/^application\/json\b/i);
  return response.json();
}

export function asJsonRecord(value: unknown): JsonRecord {
  if (!isJsonRecord(value)) {
    throw new Error('Expected a JSON object');
  }

  return value;
}

export function isJsonRecord(value: unknown): value is JsonRecord {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

export function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function isPositiveFiniteNumber(value: unknown): value is number {
  return isFiniteNumber(value) && value > 0;
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}
