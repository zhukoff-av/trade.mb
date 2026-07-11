import type { Locator, Page } from '@playwright/test';

export class FooterComponent {
  readonly root: Locator;
  readonly navigation: Locator;

  constructor(page: Page) {
    this.root = page.getByRole('contentinfo');
    this.navigation = this.root.getByRole('navigation', { name: 'Footer' });
  }

  groupHeading(name: string): Locator {
    return this.navigation.getByRole('heading', { name, exact: true });
  }

  link(name: string): Locator {
    return this.navigation.getByRole('link', { name, exact: true });
  }
}
