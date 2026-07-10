import type { Locator, Page, Response } from '@playwright/test';
import { env } from '../utils/env';

export class BasePage {
  constructor(protected readonly page: Page) {}

  goto(path: string): Promise<Response | null> {
    return this.page.goto(new URL(path, env.publicBaseUrl).toString(), {
      waitUntil: 'domcontentloaded',
    });
  }

  heading(name: string | RegExp): Locator {
    return this.page.getByRole('heading', { name });
  }

  link(name: string | RegExp): Locator {
    return this.page.getByRole('link', { name }).first();
  }

  button(name: string | RegExp): Locator {
    return this.page.getByRole('button', { name }).first();
  }
}
