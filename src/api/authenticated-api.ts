import type { APIRequestContext, APIResponse } from '@playwright/test';
import { env } from '../utils/env';

export class AuthenticatedApi {
  constructor(private readonly request: APIRequestContext) {}

  getCryptoPrice(): Promise<APIResponse> {
    return this.request.get(
      new URL('/api/v1/exchange/api/get_crypto_price', env.coreApiBaseUrl).toString(),
    );
  }

  getWalletPnl(): Promise<APIResponse> {
    return this.request.get(
      new URL(
        '/api/io/v1/wallet/pnl?quote=USD&interval=15m&limit=96',
        env.coreApiBaseUrl,
      ).toString(),
    );
  }

  getWalletBalance(): Promise<APIResponse> {
    return this.request.get(
      new URL('/api/io/v1/wallet/balance?quote=USD', env.coreApiBaseUrl).toString(),
    );
  }

  getMarketPrices(): Promise<APIResponse> {
    return this.request.get(
      new URL('/api/io/v1/marketdata/prices?quote=USD', env.marketDataApiBaseUrl).toString(),
    );
  }
}
