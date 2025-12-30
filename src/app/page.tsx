"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchCoins } from "@/lib/api";
import CoinTable from "@/components/CoinTable";
import MarketSummary from "@/components/MarketSummary";
import CurrencySwitcher from "@/components/CurrencySwitcher";
import SearchBar from "@/components/SearchBar";
import AutoRefreshTimer from "@/components/AutoRefreshTimer";
import CoinDetailModal from "@/components/CoinDetailModal";
import { Currency, Coin } from "@/types/coin";
import { useWatchlist } from "@/hooks/useWatchlist";

export default function Home() {
  const [currency, setCurrency] = useState<Currency>("usd");
  const [coins, setCoins] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>(null);

  const { watchlist, toggleWatchlist, isInWatchlist } = useWatchlist();

  // Fetch coins whenever currency changes
  const loadCoins = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchCoins(currency, 100);
      setCoins(data);
    } catch (error) {
      console.error("Failed to fetch coins:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currency]);

  useEffect(() => {
    loadCoins();
  }, [loadCoins]);

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
  };

  // Filter and search coins
  const filteredCoins = useMemo(() => {
    let filtered = [...coins];

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filter
    switch (currentFilter) {
      case "gainers":
        filtered = filtered
          .filter((coin) => coin.price_change_percentage_24h > 0)
          .sort(
            (a, b) =>
              b.price_change_percentage_24h - a.price_change_percentage_24h
          );
        break;
      case "losers":
        filtered = filtered
          .filter((coin) => coin.price_change_percentage_24h < 0)
          .sort(
            (a, b) =>
              a.price_change_percentage_24h - b.price_change_percentage_24h
          );
        break;
      case "volume":
        filtered = filtered.sort((a, b) => b.total_volume - a.total_volume);
        break;
      case "watchlist":
        filtered = filtered.filter((coin) => watchlist.includes(coin.id));
        break;
      default:
        // "all" - keep market cap order
        break;
    }

    return filtered;
  }, [coins, searchQuery, currentFilter, watchlist]);

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
            <div className="glass h-64 animate-pulse rounded-2xl" />
            <div className="glass h-96 animate-pulse rounded-2xl" />
          </div>
        ) : (
          <>
            {/* Market Summary */}
            <MarketSummary coins={coins} currency={currency} />

            {/* Search & Filter */}
            <SearchBar
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              currentFilter={currentFilter}
            />

            {/* Results Count */}
            {(searchQuery || currentFilter !== "all") && (
              <div className="mb-4 text-sm text-white/70">
                Showing {filteredCoins.length} coin
                {filteredCoins.length !== 1 ? "s" : ""}
                {currentFilter === "watchlist" && watchlist.length === 0 && (
                  <span className="ml-2 text-white/50">
                    (Click the star icon on any coin to add to watchlist)
                  </span>
                )}
              </div>
            )}

            {/* Crypto Table */}
            <div className="glass overflow-hidden rounded-2xl shadow-2xl">
              {filteredCoins.length > 0 ? (
                <CoinTable
                  coins={filteredCoins}
                  currency={currency}
                  onToggleWatchlist={toggleWatchlist}
                  isInWatchlist={isInWatchlist}
                />
              ) : (
                <div className="py-20 text-center text-white/70">
                  <svg
                    className="mx-auto mb-4 h-16 w-16 text-white/30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-lg font-medium">No coins found</p>
                  <p className="mt-2 text-sm text-white/50">
                    Try adjusting your search or filter
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Footer with Auto Refresh */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <AutoRefreshTimer onRefresh={loadCoins} intervalSeconds={60} />
        </div>
      </div>

      {/* Coin Detail Modal */}
      {selectedCoinId && (
        <CoinDetailModal
          coinId={selectedCoinId}
          currency={currency}
          onClose={() => setSelectedCoinId(null)}
        />
      )}
    </div>
  );
}
