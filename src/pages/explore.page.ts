import type { Locator, Page, Response } from '@playwright/test';
import { BasePage } from './base-page';
import { publicRoutes } from '../data/public-site';

export class ExplorePage extends BasePage {
  readonly spotMarketSection: Locator;

  constructor(page: Page) {
    super(page);
    this.spotMarketSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Spot market', exact: true }),
    });
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
}
