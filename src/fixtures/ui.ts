import { expect, test as base } from '@playwright/test';
import { CompanyPage } from '../pages/company.page';
import { ExplorePage } from '../pages/explore.page';
import { HomePage } from '../pages/home.page';
import { HeaderComponent } from '../components/header.component';
import { LinkChecker } from '../utils/link-checker';

type UiFixtures = {
  companyPage: CompanyPage;
  explorePage: ExplorePage;
  header: HeaderComponent;
  homePage: HomePage;
  linkChecker: LinkChecker;
};

export const test = base.extend<UiFixtures>({
  companyPage: async ({ page }, use) => {
    await use(new CompanyPage(page));
  },
  explorePage: async ({ page }, use) => {
    await use(new ExplorePage(page));
  },
  header: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  linkChecker: async ({ request }, use) => {
    await use(new LinkChecker(request));
  },
});

export { expect };
