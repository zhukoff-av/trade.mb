import type { Locator, Page, Response } from '@playwright/test';
import { featuresContent, publicRoutes } from '../data/public-site';
import { BasePage } from './base-page';

export class FeaturesPage extends BasePage {
  readonly solutionsSection: Locator;

  constructor(page: Page) {
    super(page);
    this.solutionsSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: featuresContent.solutionsHeading, exact: true }),
    });
  }

  open(): Promise<Response | null> {
    return this.goto(publicRoutes.features);
  }

  heading(name: string): Locator {
    return this.page.getByRole('heading', { name, exact: true });
  }

  solutionCard(name: string): Locator {
    return this.solutionsSection.getByText(name, { exact: true });
  }
}
