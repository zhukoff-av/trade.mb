import type { Locator, Page, Response } from '@playwright/test';
import { BasePage } from './base-page';
import { publicRoutes } from '../data/public-site';

export class PublicSitePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  openHome(): Promise<Response | null> {
    return this.goto(publicRoutes.home);
  }

  openExplore(): Promise<Response | null> {
    return this.goto(publicRoutes.explore);
  }

  openCompany(): Promise<Response | null> {
    return this.goto(publicRoutes.company);
  }

  openInvalidRoute(): Promise<Response | null> {
    return this.goto(publicRoutes.invalid);
  }

  navLink(name: string | RegExp): Locator {
    return this.link(name);
  }

  ctaLink(name: string | RegExp): Locator {
    return this.link(name);
  }

  mobileMenuButton(): Locator {
    return this.button(/menu|open navigation|navigation/i);
  }

  text(content: string | RegExp): Locator {
    return this.page.getByText(content).first();
  }

  documentWidth(): Promise<number> {
    return this.page.evaluate(() => document.documentElement.scrollWidth);
  }

  viewportWidth(): Promise<number> {
    return this.page.evaluate(() => document.documentElement.clientWidth);
  }

  currentUrl(): string {
    return this.page.url();
  }
}
