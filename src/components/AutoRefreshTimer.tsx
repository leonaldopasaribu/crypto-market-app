"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface AutoRefreshTimerProps {
  onRefresh: () => void;
  intervalSeconds?: number;
}

export default function AutoRefreshTimer({
  onRefresh,
  intervalSeconds = 60,
}: AutoRefreshTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(intervalSeconds);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 500);
  }, [onRefresh]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          return intervalSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [intervalSeconds]);

  useEffect(() => {
    if (secondsLeft === intervalSeconds) {
      // schedule the refresh asynchronously to avoid synchronous setState inside the effect
      timeoutRef.current = window.setTimeout(() => {
        handleRefresh();
        timeoutRef.current = null;
      }, 0);
    }

    return () => {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [secondsLeft, intervalSeconds, handleRefresh]);

  const handleManualRefresh = () => {
    setSecondsLeft(intervalSeconds);
    handleRefresh();
  };

  return (
    <div className="flex items-center gap-4 text-sm text-white/70 drop-shadow">
      <div className="flex items-center gap-2">
        <svg
          className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        <span>
          Auto refresh in <span className="font-semibold">{secondsLeft}s</span>
        </span>
      </div>

      <button
        onClick={handleManualRefresh}
        disabled={isRefreshing}
        className="cursor-pointer rounded-lg bg-white/10 px-3 py-1 text-white/70 transition-all hover:bg-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isRefreshing ? "Refreshing..." : "Refresh Now"}
      </button>

      <span className="hidden md:inline">• Powered by CoinGecko API</span>
    </div>
  );
}
