import type { Locator, Page } from '@playwright/test';

export class HeaderComponent {
  readonly root: Locator;
  readonly mainNavigation: Locator;

  constructor(private readonly page: Page) {
    this.root = page.getByRole('banner');
    this.mainNavigation = this.root.getByRole('navigation', { name: 'Main' });
  }

  desktopNavigationLink(name: string): Locator {
    return this.mainNavigation.getByRole('link', { name, exact: true });
  }

  desktopAccountLink(name: 'Sign in' | 'Sign up'): Locator {
    return this.root.getByRole('link', { name, exact: true });
  }

  mobileMenuButton(): Locator {
    return this.root.getByRole('button', { name: 'Open menu' });
  }

  async openMobileMenu(): Promise<void> {
    await this.page.waitForLoadState('load');
    await this.mobileMenuButton().click();
  }

  mobileMenu(): Locator {
    return this.page.getByRole('dialog');
  }

  mobileNavigationLink(name: string): Locator {
    return this.mobileMenu().getByRole('navigation').getByRole('link', { name, exact: true });
  }

  mobileAccountLink(name: 'Sign in' | 'Sign up'): Locator {
    return this.mobileMenu().getByRole('link', { name, exact: true });
  }
}
