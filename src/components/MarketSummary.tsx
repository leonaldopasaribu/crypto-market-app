import { Coin, Currency } from "@/types/coin";
import { formatLargeNumber } from "@/lib/api";

interface MarketSummaryProps {
  coins: Coin[];
  currency: Currency;
}

export default function MarketSummary({ coins, currency }: MarketSummaryProps) {
  const totalMarketCap = coins.reduce((sum, coin) => sum + coin.market_cap, 0);
  const total24hVolume = coins.reduce((sum, coin) => sum + coin.total_volume, 0);
  const bitcoin = coins.find((coin) => coin.id === "bitcoin");
  const btcDominance = bitcoin
    ? ((bitcoin.market_cap / totalMarketCap) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
          Market Cap
        </p>
        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {formatLargeNumber(totalMarketCap, currency)}
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
          24h Volume
        </p>
        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {formatLargeNumber(total24hVolume, currency)}
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
          BTC Dominance
        </p>
        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {btcDominance}%
        </p>
      </div>
    </div>
  );
}
