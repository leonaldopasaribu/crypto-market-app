import { Coin, Currency } from "@/types/coin";
import { FormatterUtil } from "@/utils/formatter";

interface MarketSummaryProps {
  coins: Coin[];
  currency: Currency;
}

export default function MarketSummary({ coins, currency }: MarketSummaryProps) {
  const totalMarketCap = coins.reduce((sum, coin) => sum + coin.market_cap, 0);
  const total24hVolume = coins.reduce(
    (sum, coin) => sum + coin.total_volume,
    0
  );
  const bitcoin = coins.find((coin) => coin.id === "bitcoin");
  const btcDominance = bitcoin
    ? ((bitcoin.market_cap / totalMarketCap) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="glass rounded-2xl p-6 shadow-xl transition-all duration-300">
        <p className="mb-2 text-xs font-medium tracking-wide text-white/70 uppercase">
          Market Cap
        </p>
        <p className="text-2xl font-bold text-white drop-shadow">
          {FormatterUtil.formatLargeNumber(totalMarketCap, currency)}
        </p>
      </div>

      <div className="glass rounded-2xl p-6 shadow-xl transition-all duration-300">
        <p className="mb-2 text-xs font-medium tracking-wide text-white/70 uppercase">
          24h Volume
        </p>
        <p className="text-2xl font-bold text-white drop-shadow">
          {FormatterUtil.formatLargeNumber(total24hVolume, currency)}
        </p>
      </div>

      <div className="glass rounded-2xl p-6 shadow-xl transition-all duration-300">
        <p className="mb-2 text-xs font-medium tracking-wide text-white/70 uppercase">
          BTC Dominance
        </p>
        <p className="text-2xl font-bold text-white drop-shadow">
          {btcDominance}%
        </p>
      </div>
    </div>
  );
}
