import { Coin, Currency, CoinDetail, ChartData, TrendingCoin } from "@/types/coin";

const COINGECKO_API_BASE = "https://api.coingecko.com/api/v3";

export async function fetchCoins(currency: Currency = "usd", perPage: number = 100): Promise<Coin[]> {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false&price_change_percentage=24h`,
      {
        cache: 'no-store', // Always fetch fresh data
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

export function formatCurrency(
  value: number,
  currency: Currency = "usd"
): string {
  const currencyCode = currency.toUpperCase();
  const locale = currency === "idr" ? "id-ID" : "en-US";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: currency === "idr" ? 0 : 2,
    maximumFractionDigits: currency === "idr" ? 0 : 2,
  }).format(value);
}

export function formatLargeNumber(
  value: number,
  currency: Currency = "usd"
): string {
  const symbol = currency === "idr" ? "Rp" : "$";

  if (value >= 1e12) {
    return `${symbol}${(value / 1e12).toFixed(2)}T`;
  }
  if (value >= 1e9) {
    return `${symbol}${(value / 1e9).toFixed(2)}B`;
  }
  if (value >= 1e6) {
    return `${symbol}${(value / 1e6).toFixed(2)}M`;
  }
  return formatCurrency(value, currency);
}

export function formatPercentage(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export async function fetchCoinDetail(coinId: string): Promise<CoinDetail> {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false`,
      {
        next: {
          revalidate: 60,
        },
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
    const response = await fetch(
      `${COINGECKO_API_BASE}/search/trending`,
      {
        cache: 'no-store',
      }
    );

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
