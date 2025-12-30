import {
  Coin,
  Currency,
  CoinDetail,
  ChartData,
  TrendingCoin,
} from "@/types/coin";

const COINGECKO_API_BASE = process.env.NEXT_PUBLIC_COINGECKO_API_BASE;
const COINGECKO_API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (COINGECKO_API_KEY) {
    headers["x-cg-pro-api-key"] = COINGECKO_API_KEY;
  }

  return headers;
}

export async function fetchCoins(
  currency: Currency = "usd",
  perPage: number = 100
): Promise<Coin[]> {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false&price_change_percentage=24h`,
      {
        cache: "no-store",
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch coins:", error);
    throw error;
  }
}

export async function fetchCoinDetail(coinId: string): Promise<CoinDetail> {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false`,
      {
        next: {
          revalidate: 60,
        },
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch coin detail:", error);
    throw error;
  }
}

export async function fetchCoinChart(
  coinId: string,
  currency: Currency = "usd",
  days: number = 7
): Promise<ChartData[]> {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`,
      {
        next: {
          revalidate: 60,
        },
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.prices.map(([timestamp, price]: [number, number]) => ({
      timestamp,
      price,
    }));
  } catch (error) {
    console.error("Failed to fetch coin chart:", error);
    throw error;
  }
}

export async function fetchTrendingCoins(): Promise<TrendingCoin[]> {
  try {
    const response = await fetch(`${COINGECKO_API_BASE}/search/trending`, {
      cache: "no-store",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.coins || [];
  } catch (error) {
    console.error("Failed to fetch trending coins:", error);
    throw error;
  }
}
