import type { Locator, Page, Response } from '@playwright/test';
import { publicRoutes, supportContent } from '../data/public-site';
import { BasePage } from './base-page';

export class SupportPage extends BasePage {
  readonly quickActionsSection: Locator;
  readonly faqSection: Locator;
  readonly assistanceSection: Locator;

  constructor(page: Page) {
    super(page);
    this.quickActionsSection = this.sectionWithHeading(supportContent.quickActionsHeading);
    this.faqSection = this.sectionWithHeading(supportContent.faqHeading);
    this.assistanceSection = this.sectionWithHeading(supportContent.assistanceHeading);
  }

  open(): Promise<Response | null> {
    return this.goto(publicRoutes.support);
  }

  heroHeading(): Locator {
    return this.page.getByRole('heading', { name: supportContent.heroHeading, exact: true });
  }

  searchInput(): Locator {
    return this.page.getByPlaceholder('Search FAQ articles', { exact: true });
  }

  quickAction(name: string): Locator {
    return this.quickActionsSection.getByRole('link', { name, exact: true });
  }

  faqCategory(name: string): Locator {
    return this.faqSection.getByRole('link', { name, exact: true });
  }

  viewMoreLink(): Locator {
    return this.faqSection.getByRole('link', { name: 'View more', exact: true });
  }

  chatButton(): Locator {
    return this.assistanceSection.getByRole('button').filter({ hasText: 'Chat with us' });
  }

  assistanceLink(name: string): Locator {
    return this.assistanceSection.getByRole('link').filter({ hasText: name });
  }

  private sectionWithHeading(name: string): Locator {
    return this.page.locator('section').filter({
      has: this.page.getByRole('heading', { name, exact: true }),
    });
  }
}
