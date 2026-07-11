import type { Page, Response } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  goto(path: string): Promise<Response | null> {
    return this.page.goto(path, {
      waitUntil: 'domcontentloaded',
    });
  }
}
