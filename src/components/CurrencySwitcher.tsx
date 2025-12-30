"use client";

import { useState, useEffect } from "react";
import { Currency } from "@/types/coin";

interface CurrencySwitcherProps {
  onCurrencyChange?: (currency: Currency) => void;
  currentCurrency?: Currency;
}

export default function CurrencySwitcher({ 
  onCurrencyChange,
  currentCurrency: externalCurrency 
}: CurrencySwitcherProps) {
  // Initialize from localStorage using lazy initializer
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("currency") as Currency;
      if (stored === "usd" || stored === "idr") {
        return stored;
      }
      // Set default if nothing in localStorage
      localStorage.setItem("currency", "usd");
    }
    return "usd";
  });

  // Notify parent of initial currency on mount
  useEffect(() => {
    if (onCurrencyChange) {
      onCurrencyChange(currentCurrency);
    }
  }, [onCurrencyChange, currentCurrency]);

  const handleCurrencyChange = (currency: Currency) => {
    setCurrentCurrency(currency);
    localStorage.setItem("currency", currency);
    onCurrencyChange?.(currency);
  };

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 rounded-lg p-1 border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <button
        onClick={() => handleCurrencyChange("usd")}
        className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
          currentCurrency === "usd"
            ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
        }`}
      >
        USD
      </button>
      <button
        onClick={() => handleCurrencyChange("idr")}
        className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
          currentCurrency === "idr"
            ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
        }`}
      >
        IDR
      </button>
    </div>
  );
}
