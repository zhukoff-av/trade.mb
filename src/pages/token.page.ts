import type { Locator, Page } from '@playwright/test';
import { tokenContent } from '../data/public-site';
import { BasePage } from './base-page';

export class TokenPage extends BasePage {
  readonly utilitySection: Locator;

  constructor(page: Page) {
    super(page);
    this.utilitySection = page.locator('section').filter({
      has: page.getByRole('heading', { name: tokenContent.utilityHeading, exact: true }),
    });
  }

  heroHeading(): Locator {
    return this.page.locator('h1');
  }

  utilityCard(name: string): Locator {
    return this.utilitySection.getByRole('heading', { name, exact: true });
  }

  heading(name: string): Locator {
    return this.page.getByRole('heading', { name, exact: true });
  }

  buyLink(): Locator {
    return this.page.getByRole('link', { name: 'Buy $MBG', exact: true });
  }

  currentUrl(): string {
    return this.page.url();
  }
}
