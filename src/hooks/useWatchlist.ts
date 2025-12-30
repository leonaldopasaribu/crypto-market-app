"use client";

import { useState, useEffect } from "react";

const WATCHLIST_KEY = "crypto-watchlist";

export function useWatchlist() {
  // Load watchlist from localStorage on mount with lazy initialization
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(WATCHLIST_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error("Failed to parse watchlist:", error);
        return [];
      }
    }
    return [];
  });

  // Save to localStorage whenever watchlist changes
  useEffect(() => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (coinId: string) => {
    setWatchlist((prev) => {
      if (prev.includes(coinId)) {
        return prev;
      }
      return [...prev, coinId];
    });
  };

  const removeFromWatchlist = (coinId: string) => {
    setWatchlist((prev) => prev.filter((id) => id !== coinId));
  };

  const toggleWatchlist = (coinId: string) => {
    if (watchlist.includes(coinId)) {
      removeFromWatchlist(coinId);
    } else {
      addToWatchlist(coinId);
    }
  };

  const isInWatchlist = (coinId: string) => {
    return watchlist.includes(coinId);
  };

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    isInWatchlist,
  };
}
