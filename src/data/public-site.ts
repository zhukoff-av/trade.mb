export const publicRoutes = {
  home: '/en',
  explore: '/en/explore',
  features: '/en/features',
  otcDesk: '/en/features/otc-desk',
  company: '/en/company',
  support: '/en/support',
  invalid: '/en/this-route-should-not-exist',
} as const;

export function localeAwarePath(path: string): RegExp {
  const escapedPath = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^/en(?:-[A-Z]{2})?${escapedPath}$`);
}

export function localeAwarePublicUrl(path: string): RegExp {
  const escapedPath = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^https://mb\\.io/en(?:-[A-Z]{2})?${escapedPath}$`);
}

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

export const gatedDestinations = {
  login: 'https://trade.mb.io/login',
  register: 'https://trade.mb.io/register',
} as const;

export const accountNavigationItems = [
  {
    name: 'Sign in',
    href: /^https:\/\/trade\.mb\.io\/login\/?$/,
    requestUrl: gatedDestinations.login,
    finalUrl: /^https:\/\/trade\.mb\.io\/login\/?$/,
  },
  {
    name: 'Sign up',
    href: /^https:\/\/trade\.mb\.io\/register\/?$/,
    requestUrl: gatedDestinations.register,
    finalUrl: /^https:\/\/trade\.mb\.io\/register\/?$/,
  },
] as const;

export const desktopViewports = [
  { name: 'standard desktop', width: 1280, height: 720 },
  { name: 'large desktop', width: 1440, height: 900 },
] as const;

// Allows for a classic scrollbar's width before layout width counts as horizontal overflow.
export const horizontalOverflowTolerancePx = 8;

export const expectedMarketHeadings = ['Top Gainers', 'Trending Now', 'Top Losers'] as const;

export const homeSupportingCards = [
  'The fastest way to trade',
  'Credit card & Bank transfers',
  'Move funds effortlessly',
  'Stay informed',
  'Security of funds',
] as const;

export const footerNavigationGroups = [
  {
    heading: 'Corporate',
    links: [
      { name: 'Disclaimer', path: '/about/disclaimer-gcc' },
      { name: 'Code of Conduct', path: '/about/code-of-conduct-gcc' },
      { name: 'Public Disclosure', path: '/about/public-disclosure-gcc' },
      { name: 'Acceptable Use Policy', path: '/about/acceptable-use-policy-gcc' },
      { name: 'Leadership Management', path: '/about/leadership-management-gcc' },
    ],
  },
  {
    heading: 'Privacy',
    links: [
      { name: 'Privacy Policy', path: '/about/privacy-policy-gcc' },
      { name: 'Cookie Policy', path: '/about/cookie-policy-gcc' },
      { name: 'Public Complaint Policy', path: '/about/complaint-policy-gcc' },
      { name: 'VA Standards', path: '/about/virtual-asset-standards-gcc' },
    ],
  },
  {
    heading: 'Compliance',
    links: [
      { name: 'Terms & Conditions', path: '/about/terms-conditions-gcc' },
      { name: 'Client Agreement', path: '/about/client-agreement-gcc' },
      { name: 'Anti Bribery Corruption Policy', path: '/about/anti-bribery-corruption-policy-gcc' },
    ],
  },
] as const;

export const explorePromotionalCards = [
  'Earn rewards',
  'Instant buy crypto',
  'Deposit funds',
] as const;

export const exploreLinkedPromotionalCards = [
  { imageName: 'Instant buy crypto', href: gatedDestinations.login },
  { imageName: 'Deposit funds', href: gatedDestinations.login },
] as const;

export const exploreMarketTabs = ['Hot', 'Gainers', 'Losers'] as const;

export const featuresContent = {
  heroHeading: 'The power of crypto is yours',
  featureHeadings: [
    'Easily explore opportunities',
    'Smart asset insights at a glance',
    'Buy, sell, convert in three taps',
    'Earn yield that feels rewarding',
    'Clearly presented wallet portfolio',
    '$MBG unlocks mb.io benefits',
    'VIP Experience benefits that scale with you',
  ],
  solutionsHeading: 'Solutions with advantages',
  solutionCards: ['Fiat on/off ramps', 'Heavily regulated', 'Seamless OTC execution'],
} as const;

export const otcContent = {
  heroHeading: 'Large trades. Zero market impact. Full discretion.',
  quoteHeading: 'Request a quote',
  inputPlaceholders: [
    'First name',
    'Last name',
    'Enter your email',
    'Enter your phone number',
    'Enter any additional notes (optional)',
  ],
  benefitsHeading: 'Trade with the #1 OTC Desk in the UAE',
  benefits: [
    'Best available pricing',
    'Zero market impact',
    'Regulated custody',
    'Fiat settlement',
    'Dedicated relationship manager',
    'Same-day settlement',
  ],
  processHeading: 'How it works',
  processSteps: ['Apply', 'Verify', 'Connect', 'Trade'],
  faqHeading: 'Frequently Asked Questions',
} as const;

export const supportContent = {
  heroHeading: "Got questions? We're always here!",
  quickActionsHeading: 'Quick actions',
  quickActions: [
    { name: 'What is mb.io?', path: '/support/faq/my-account/what-is-mb-io' },
    {
      name: 'How do I add funds to my mb.io account?',
      path: '/support/faq/adding-funds/how-do-i-add-funds-to-my-mb-io-account',
    },
    {
      name: 'What fees does mb.io charge?',
      path: '/support/faq/trading-fees-2/what-fees-does-mb-io-charge',
    },
  ],
  faqHeading: 'FAQs',
  faqCategories: [
    { name: 'My Account', path: '/support/faq/my-account' },
    { name: 'Adding Funds', path: '/support/faq/adding-funds' },
    { name: 'Trading', path: '/support/faq/trading-2' },
  ],
  faqIndexPath: '/support/faq',
  assistanceHeading: 'Need help with something else?',
  requestPath: '/support/contact-us',
  termsPath: '/terms-and-conditions',
} as const;

export const tokenContent = {
  landingUrl: /^https:\/\/token\.mb\.io\/en(?:-[A-Z]{2})?\/?(?:\?[^#]*)?$/,
  utilityHeading: 'Hold $MBG. Unlock the ecosystem.',
  utilityCards: [
    'Lower trading fees.',
    'Earn interest on $MBG',
    'VIP features',
    'Beyond crypto. Into the real world.',
  ],
  roadmapHeading: '$MBG Roadmap',
  allocationHeading: '$MBG Token Allocation Breakdown Vesting Schedule',
  buyUrl: /^https:\/\/mbio\.go\.link\/price\/MBG(?:\?|$)/,
} as const;

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
