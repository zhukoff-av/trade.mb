import type { Locator, Page, Response } from '@playwright/test';
import { otcContent, publicRoutes } from '../data/public-site';
import { BasePage } from './base-page';

export class OtcDeskPage extends BasePage {
  readonly quoteSection: Locator;
  readonly benefitsSection: Locator;
  readonly processSection: Locator;

  constructor(page: Page) {
    super(page);
    this.quoteSection = this.sectionWithHeading(otcContent.quoteHeading);
    this.benefitsSection = this.sectionWithHeading(otcContent.benefitsHeading);
    this.processSection = this.sectionWithHeading(otcContent.processHeading);
  }

  open(): Promise<Response | null> {
    return this.goto(publicRoutes.otcDesk);
  }

  heading(name: string): Locator {
    return this.page.getByRole('heading', { name, exact: true });
  }

  quoteInput(placeholder: string): Locator {
    return this.quoteSection.getByPlaceholder(placeholder, { exact: true });
  }

  quoteSelectors(): Locator {
    return this.quoteSection.getByRole('combobox');
  }

  nextButton(): Locator {
    return this.quoteSection.getByRole('button', { name: 'Next', exact: true });
  }

  benefitArticle(name: string): Locator {
    return this.benefitsSection.getByRole('article').filter({
      has: this.page.getByRole('heading', { name, exact: true }),
    });
  }

  processStep(name: string): Locator {
    return this.processSection.getByRole('heading', { name, exact: true });
  }

  quoteAnchor(): Locator {
    return this.processSection.getByRole('link', { name: otcContent.quoteHeading, exact: true });
  }

  private sectionWithHeading(name: string): Locator {
    return this.page.locator('section').filter({
      has: this.page.getByRole('heading', { name, exact: true }),
    });
  }
}
