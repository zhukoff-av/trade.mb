import type { Locator, Page, Response } from '@playwright/test';
import { BasePage } from './base-page';
import { publicRoutes } from '../data/public-site';

export class HomePage extends BasePage {
  readonly heroSection: Locator;
  readonly khabibPromotionSection: Locator;
  readonly portfolioSection: Locator;
  readonly smartWaysSection: Locator;
  readonly marketSection: Locator;
  readonly body: Locator;

  constructor(page: Page) {
    super(page);
    this.heroSection = this.sectionWithHeading('Crypto for everyone');
    this.khabibPromotionSection = this.sectionWithHeading('Unblemished. Unstoppable. United.');
    this.portfolioSection = this.sectionWithHeading('Securely build your portfolio');
    this.smartWaysSection = this.sectionWithHeading('Smarter ways to trade and grow');
    this.marketSection = this.sectionWithHeading('Catch your next trade');
    this.body = page.locator('body');
  }

  open(): Promise<Response | null> {
    return this.goto(publicRoutes.home);
  }

  openInvalidRoute(): Promise<Response | null> {
    return this.goto(publicRoutes.invalid);
  }

  heroHeading(): Locator {
    return this.heroSection.getByRole('heading', { name: 'Crypto for everyone', exact: true });
  }

  downloadAppLink(): Locator {
    return this.heroSection.getByRole('link', { name: 'Download the app', exact: true });
  }

  openAccountLink(): Locator {
    return this.heroSection.getByRole('link', { name: 'Open an account', exact: true });
  }

  startPortfolioLink(): Locator {
    return this.portfolioSection.getByRole('link', { name: 'Start Portfolio', exact: true });
  }

  viewPlatformFeaturesLink(): Locator {
    return this.smartWaysSection.getByRole('link', {
      name: 'View platform features',
      exact: true,
    });
  }

  marketGroupHeading(name: string): Locator {
    return this.marketSection.getByRole('heading', { name, exact: true });
  }

  currentUrl(): string {
    return this.page.url();
  }

  documentWidth(): Promise<number> {
    return this.page.evaluate(() => document.documentElement.scrollWidth);
  }

  viewportWidth(): Promise<number> {
    return this.page.evaluate(() => document.documentElement.clientWidth);
  }

  private sectionWithHeading(name: string): Locator {
    return this.page.locator('section').filter({
      has: this.page.getByRole('heading', { name, exact: true }),
    });
  }
}
