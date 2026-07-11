export function parseDisplayedNumber(value: string): number {
  const normalized = value.replaceAll(',', '').replace(/[\s$%]/g, '');
  const parsed = Number(normalized);

  if (!Number.isFinite(parsed)) {
    throw new Error(`Expected a displayed market number, received: ${value}`);
  }

  return parsed;
}
