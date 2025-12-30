"use client";

import { useState, useEffect } from "react";
import { fetchCoins } from "@/lib/api";
import CoinTable from "@/components/CoinTable";
import MarketSummary from "@/components/MarketSummary";
import CurrencySwitcher from "@/components/CurrencySwitcher";
import { Currency, Coin } from "@/types/coin";

export default function Home() {
  const [currency, setCurrency] = useState<Currency>("usd");
  const [coins, setCoins] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch coins whenever currency changes
  useEffect(() => {
    const loadCoins = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCoins(currency);
        setCoins(data);
      } catch (error) {
        console.error("Failed to fetch coins:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCoins();
  }, [currency]);

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-white drop-shadow-lg">
              Crypto Market
            </h1>
            <p className="text-white/80 drop-shadow">
              Live cryptocurrency prices and market data
            </p>
          </div>
          <CurrencySwitcher onCurrencyChange={handleCurrencyChange} />
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="space-y-8">
            <div className="glass h-32 animate-pulse rounded-2xl" />
            <div className="glass h-96 animate-pulse rounded-2xl" />
          </div>
        ) : (
          <>
            {/* Market Summary */}
            <MarketSummary coins={coins} currency={currency} />

            {/* Crypto Table */}
            <div className="glass overflow-hidden rounded-2xl shadow-2xl">
              <CoinTable coins={coins} currency={currency} />
            </div>
          </>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-white/70 drop-shadow">
          Data updates every 60 seconds • Powered by CoinGecko API
        </div>
      </div>
    </div>
  );
}
