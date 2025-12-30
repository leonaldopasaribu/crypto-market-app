import { fetchCoins } from "@/lib/api";
import CoinTable from "@/components/CoinTable";
import MarketSummary from "@/components/MarketSummary";
import CurrencySwitcher from "@/components/CurrencySwitcher";
import { Currency } from "@/types/coin";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ currency?: string }>;
}) {
  const params = await searchParams;
  const currency = (params.currency || "usd") as Currency;
  const coins = await fetchCoins(currency);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              Crypto Market
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Live cryptocurrency prices and market data
            </p>
          </div>
          <Suspense fallback={<div className="h-11 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />}>
            <CurrencySwitcher />
          </Suspense>
        </div>

        {/* Market Summary */}
        <MarketSummary coins={coins} currency={currency} />

        {/* Crypto Table */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <CoinTable coins={coins} currency={currency} />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-500">
          Data updates every 60 seconds • Powered by CoinGecko API
        </div>
      </div>
    </div>
  );
}
