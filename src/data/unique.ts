import { randomUUID } from 'node:crypto';

/** Unique suffixes keep test data collision-free across parallel workers. */
export function uniqueId(prefix = 'qa'): string {
  return `${prefix}-${randomUUID().slice(0, 8)}`;
}

export function uniqueEmail(prefix = 'qa'): string {
  return `${uniqueId(prefix)}@example.com`;
}
