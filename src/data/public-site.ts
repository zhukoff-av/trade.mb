export const publicRoutes = {
  home: '/en',
  explore: '/en/explore',
  company: '/en/company',
  invalid: '/en/this-route-should-not-exist',
} as const;

export const mainNavigationItems = [
  {
    name: 'Explore',
    href: /^\/en(?:-[A-Z]{2})?\/explore$/,
    requestUrl: '/en/explore',
    finalUrl: /^https:\/\/mb\.io\/en(?:-[A-Z]{2})?\/explore$/,
  },
  {
    name: 'Features',
    href: /^\/en(?:-[A-Z]{2})?\/features$/,
    requestUrl: '/en/features',
    finalUrl: /^https:\/\/mb\.io\/en(?:-[A-Z]{2})?\/features$/,
  },
  {
    name: 'OTC Desk',
    href: /^\/en(?:-[A-Z]{2})?\/features\/otc-desk$/,
    requestUrl: '/en/features/otc-desk',
    finalUrl: /^https:\/\/mb\.io\/en(?:-[A-Z]{2})?\/features\/otc-desk$/,
  },
  {
    name: 'Company',
    href: /^\/en(?:-[A-Z]{2})?\/company$/,
    requestUrl: '/en/company',
    finalUrl: /^https:\/\/mb\.io\/en(?:-[A-Z]{2})?\/company$/,
  },
  {
    name: 'Support',
    href: /^\/en(?:-[A-Z]{2})?\/support$/,
    requestUrl: '/en/support',
    finalUrl: /^https:\/\/mb\.io\/en(?:-[A-Z]{2})?\/support$/,
  },
  {
    name: '$MBG',
    href: /^https:\/\/token\.multibankgroup\.com\/en\/?$/,
    requestUrl: 'https://token.multibankgroup.com/en',
    finalUrl: /^https:\/\/token\.mb\.io\/en(?:-[A-Z]{2})?\/?$/,
  },
] as const;

export const accountNavigationItems = [
  {
    name: 'Sign in',
    href: /^https:\/\/trade\.mb\.io\/login\/?$/,
    requestUrl: 'https://trade.mb.io/login',
    finalUrl: /^https:\/\/trade\.mb\.io\/login\/?$/,
  },
  {
    name: 'Sign up',
    href: /^https:\/\/trade\.mb\.io\/register\/?$/,
    requestUrl: 'https://trade.mb.io/register',
    finalUrl: /^https:\/\/trade\.mb\.io\/register\/?$/,
  },
] as const;

export const desktopViewports = [
  { name: 'standard desktop', width: 1280, height: 720 },
  { name: 'large desktop', width: 1440, height: 900 },
] as const;

export const expectedMarketHeadings = ['Top Gainers', 'Trending Now', 'Top Losers'] as const;

export const appDownloadUrl = 'https://mbio.go.link/6OW91';

export const marketingContent = {
  khabib: {
    heading: 'Unblemished. Unstoppable. United.',
    body: 'Unbeaten in the ring. Unmatched in integrity. The discipline that defined Khabib now fuels the real-world-asset-backed $MBG Token.',
  },
  smartWays: {
    heading: 'Smarter ways to trade and grow',
    sections: [
      {
        heading: 'From insight to action in seconds',
        body: 'Everything you need to understand an asset and trade it-all in one fast, intuitive experience.',
      },
      {
        heading: 'Earn more. See more. Stay in control.',
        body: 'A seamless experience that lets you earn yield and manage your portfolio effortlessly, all in one clear, real-time view.',
      },
    ],
  },
} as const;

export const appRedirectCases = [
  {
    platform: 'iOS',
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148',
    location: /^https:\/\/apps\.apple\.com\/app\/id1592119946(?:\?|$)/,
  },
  {
    platform: 'Android',
    userAgent:
      'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/120.0 Mobile Safari/537.36',
    location:
      /^intent:\/\/.*browser_fallback_url=https%3A%2F%2Fplay\.google\.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom\.multibank\.app/,
  },
] as const;

export const companyContent = {
  heading: 'Why MultiBank Group?',
  introduction:
    'For nearly two decades, MultiBank has built a reputation as one of the world’s most trusted financial institutions. With a foundation rooted in regulation, transparency, and technological excellence, we continue to serve millions of clients across the globe with integrity and ambition.',
  statistics: [
    { value: '$2 trillion', label: 'Annual turnover' },
    { value: '2,000,000+', label: 'Customers worldwide' },
    { value: '25+', label: 'Offices globally' },
  ],
  editorialSections: [
    {
      heading: 'A tradition of global leadership',
      body: 'Founded in 2005, MultiBank has grown into one of the largest financial groups worldwide, driven by a commitment to trust, compliance, and innovation. Our global presence reflects the confidence customers, partners, and institutions place in us.',
    },
    {
      heading: 'Innovation with purpose',
      body: 'We believe technology should simplify finance. Everything we build is designed to empower users with clarity, security, and accessibility, evolving with the market while keeping clients at the center.',
    },
    {
      heading: 'Integrity built into every decision',
      body: 'Trust is earned through consistent action. Through rigorous risk management and transparent communication, we prioritise stability, upholding the highest standards across every jurisdiction we operate in.',
    },
  ],
  strengthHeading: 'The strength behind MultiBank Group',
  strengths: [
    {
      heading: 'Regulation at our core',
      body: 'MultiBank operates under strict global oversight to ensure transparency, compliance, and client protection.',
    },
    {
      heading: 'Proven track record',
      body: "With years of global experience, we've remained resilient and reliable through every market cycle.",
    },
    {
      heading: 'Secure & trusted',
      body: 'Institution-grade infrastructure and strong risk controls safeguard client assets and ensure trusted governance.',
    },
  ],
  communityHeading: 'Community & Media',
  communitySubheading: 'The latest news and discussions about MultiBank Group.',
} as const;
