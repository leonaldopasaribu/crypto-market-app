export type Currency = "usd" | "idr";

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
}

export interface MarketStats {
  totalMarketCap: number;
  total24hVolume: number;
  btcDominance: number;
}

export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  image: {
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
      idr: number;
    };
    market_cap: {
      usd: number;
      idr: number;
    };
    total_volume: {
      usd: number;
      idr: number;
    };
    high_24h: {
      usd: number;
      idr: number;
    };
    low_24h: {
      usd: number;
      idr: number;
    };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    circulating_supply: number;
    total_supply: number;
    ath: {
      usd: number;
      idr: number;
    };
    atl: {
      usd: number;
      idr: number;
    };
  };
  description: {
    en: string;
  };
}

export interface ChartData {
  timestamp: number;
  price: number;
}

export interface TrendingCoin {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
  };
}
