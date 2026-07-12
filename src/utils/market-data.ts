type MarketPrice = {
  base: string;
  changePercent: number;
};

function isMarketPrice(value: unknown): value is MarketPrice {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.base === 'string' && typeof candidate.changePercent === 'number';
}

export function marketChangesByAsset(payload: unknown): ReadonlyMap<string, number> {
  if (!Array.isArray(payload) || !payload.every(isMarketPrice)) {
    throw new Error('Market prices response does not contain base and changePercent fields');
  }

  return new Map(payload.map((price) => [price.base, price.changePercent]));
}

export function marketAssetsFollowChangeOrder(
  symbols: string[],
  changeByAsset: ReadonlyMap<string, number>,
  direction: 'ascending' | 'descending',
): boolean {
  const changes = symbols.map((symbol) => changeByAsset.get(symbol));

  if (changes.length === 0 || changes.some((change) => change === undefined)) {
    return false;
  }

  return changes.slice(1).every((change, index) => {
    const previous = changes[index];
    if (change === undefined || previous === undefined) {
      return false;
    }

    return direction === 'ascending' ? previous <= change : previous >= change;
  });
}
