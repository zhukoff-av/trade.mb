import type { Locator, Page, Response } from '@playwright/test';
import { BasePage } from './base-page';
import { publicRoutes } from '../data/public-site';

export class CompanyPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  open(): Promise<Response | null> {
    return this.goto(publicRoutes.company);
  }

  heading(name: string): Locator {
    return this.page.getByRole('heading', { name, exact: true });
  }

  exactText(content: string): Locator {
    return this.page.getByText(content, { exact: true });
  }
}
