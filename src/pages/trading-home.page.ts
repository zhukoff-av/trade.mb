import type { Locator, Page, Response } from '@playwright/test';
import { BasePage } from './base-page';

export type MarketCategory = 'Watchlist' | 'Hot' | 'Gainers' | 'Losers';

export class TradingHomePage extends BasePage {
  readonly marketHeading: Locator;
  readonly marketTable: Locator;
  readonly marketRows: Locator;

  constructor(page: Page) {
    super(page);
    this.marketHeading = page.getByRole('heading', {
      name: 'Today’s Top Crypto Prices',
      exact: true,
    });
    this.marketTable = page.getByRole('table').filter({
      has: page.getByRole('columnheader', { name: 'Asset', exact: true }),
    });
    this.marketRows = this.marketTable.getByRole('row').filter({
      has: page.getByRole('cell'),
    });
  }

  open(): Promise<Response | null> {
    return this.goto('/en/');
  }

  walletButton(): Locator {
    return this.page.getByRole('button', { name: 'Wallet', exact: true });
  }

  category(name: MarketCategory): Locator {
    return this.page.getByRole('button', { name, exact: true });
  }

  columnHeader(name: string): Locator {
    return this.marketTable.getByRole('columnheader', { name, exact: true });
  }

  cells(row: Locator): Locator {
    return row.getByRole('cell');
  }

  async assetSymbols(): Promise<string[]> {
    const symbols: string[] = [];

    for (const row of await this.marketRows.all()) {
      const symbol = await this.cells(row).first().getByRole('img').getAttribute('alt');
      if (symbol) {
        symbols.push(symbol);
      }
    }

    return symbols;
  }

  watchlistOutcome(): Locator {
    return this.marketRows
      .first()
      .or(this.page.getByText('Your watchlist is empty', { exact: true }));
  }

  chartOrFallback(cell: Locator): Locator {
    return cell.getByRole('region').or(cell.getByText('No Data Found', { exact: true }));
  }
}
