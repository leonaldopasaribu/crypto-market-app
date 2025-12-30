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
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2">
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
            <div className="h-32 glass rounded-2xl animate-pulse" />
            <div className="h-96 glass rounded-2xl animate-pulse" />
          </div>
        ) : (
          <>
            {/* Market Summary */}
            <MarketSummary coins={coins} currency={currency} />

            {/* Crypto Table */}
            <div className="glass rounded-2xl shadow-2xl overflow-hidden">
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
