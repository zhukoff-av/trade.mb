import { expect, test as base } from '@playwright/test';
import { AuthenticatedApi } from '../api/authenticated-api';

type AuthApiFixtures = {
  authenticatedApi: AuthenticatedApi;
};

export const test = base.extend<AuthApiFixtures>({
  authenticatedApi: async ({ request }, use) => {
    await use(new AuthenticatedApi(request));
  },
});

export { expect };
