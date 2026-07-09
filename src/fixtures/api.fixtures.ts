import { test as base } from '@playwright/test';
import { AppClient } from '../api/clients/app.client';

type ApiFixtures = {
  app: AppClient;
};

export const test = base.extend<ApiFixtures>({
  app: async ({ request }, use) => {
    await use(new AppClient(request));
  },
});

export { expect } from '@playwright/test';
