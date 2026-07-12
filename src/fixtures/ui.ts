import { expect, test as base } from '@playwright/test';
import { CompanyPage } from '../pages/company.page';
import { ExplorePage } from '../pages/explore.page';
import { FeaturesPage } from '../pages/features.page';
import { HomePage } from '../pages/home.page';
import { OtcDeskPage } from '../pages/otc-desk.page';
import { SupportPage } from '../pages/support.page';
import { TokenPage } from '../pages/token.page';
import { FooterComponent } from '../components/footer.component';
import { HeaderComponent } from '../components/header.component';
import { LinkChecker } from '../utils/link-checker';

type UiFixtures = {
  companyPage: CompanyPage;
  explorePage: ExplorePage;
  featuresPage: FeaturesPage;
  footer: FooterComponent;
  header: HeaderComponent;
  homePage: HomePage;
  linkChecker: LinkChecker;
  otcDeskPage: OtcDeskPage;
  supportPage: SupportPage;
  tokenPage: TokenPage;
};

export const test = base.extend<UiFixtures>({
  companyPage: async ({ page }, use) => {
    await use(new CompanyPage(page));
  },
  explorePage: async ({ page }, use) => {
    await use(new ExplorePage(page));
  },
  featuresPage: async ({ page }, use) => {
    await use(new FeaturesPage(page));
  },
  footer: async ({ page }, use) => {
    await use(new FooterComponent(page));
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
  otcDeskPage: async ({ page }, use) => {
    await use(new OtcDeskPage(page));
  },
  supportPage: async ({ page }, use) => {
    await use(new SupportPage(page));
  },
  tokenPage: async ({ page }, use) => {
    await use(new TokenPage(page));
  },
});

export { expect };
