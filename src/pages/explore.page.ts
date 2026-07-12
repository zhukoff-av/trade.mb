import type { Locator, Page, Response } from '@playwright/test';
import { BasePage } from './base-page';
import { publicRoutes } from '../data/public-site';

export class ExplorePage extends BasePage {
  readonly spotMarketSection: Locator;
  readonly marketTable: Locator;

  constructor(page: Page) {
    super(page);
    this.spotMarketSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Spot market', exact: true }),
    });
    this.marketTable = this.spotMarketSection.getByRole('table');
  }

  open(): Promise<Response | null> {
    return this.goto(publicRoutes.explore);
  }

  heroHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Markets at your fingertips', exact: true });
  }

  spotMarketHeading(): Locator {
    return this.spotMarketSection.getByRole('heading', { name: 'Spot market', exact: true });
  }

  promotionalCardImage(name: string): Locator {
    return this.page.getByRole('img', { name, exact: true });
  }

  promotionalCardLink(imageName: string): Locator {
    return this.page.getByRole('link').filter({
      has: this.page.getByRole('img', { name: imageName, exact: true }),
    });
  }

  marketTab(name: string): Locator {
    return this.spotMarketSection.getByRole('button', { name, exact: true });
  }

  marketTokenRows(): Locator {
    return this.marketTable.getByRole('row').filter({
      has: this.page.getByRole('link'),
    });
  }

  rowCells(row: Locator): Locator {
    return row.getByRole('cell');
  }
}
