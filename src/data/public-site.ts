export const publicRoutes = {
  home: '/en',
  explore: '/en/explore',
  features: '/en/features',
  company: '/en/company',
  invalid: '/en/this-route-should-not-exist',
} as const;

export const publicNavItems = {
  explore: { name: 'Explore', path: publicRoutes.explore },
  features: { name: 'Features', path: publicRoutes.features },
  otcDesk: { name: 'OTC Desk', path: '/en/otc' },
  company: { name: 'Company', path: publicRoutes.company },
  support: { name: 'Support', path: '/en/support' },
  mbg: { name: '$MBG', path: '/en/mbg' },
  signIn: { name: 'Sign in', host: 'trade.mb.io' },
  signUp: { name: 'Sign up', host: 'trade.mb.io' },
} as const;

export const expectedMarketHeadings = {
  topGainers: 'Top Gainers',
  trendingNow: 'Trending Now',
  topLosers: 'Top Losers',
} as const;

export const recognizableAssets = ['BTC', 'Bitcoin', 'ETH', 'Ethereum', 'USDT'] as const;

export const companyTrustText = [
  'Why MultiBank Group?',
  'MultiBank',
  'regulated',
  'trusted',
  'clients',
] as const;
