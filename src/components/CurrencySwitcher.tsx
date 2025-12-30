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
    <div className="flex items-center gap-2 glass rounded-xl p-1 shadow-lg">
      <button
        onClick={() => handleCurrencyChange("usd")}
        className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          currentCurrency === "usd"
            ? "bg-white/30 text-white shadow-lg backdrop-blur-md"
            : "text-white/70 hover:text-white hover:bg-white/10"
        }`}
      >
        USD
      </button>
      <button
        onClick={() => handleCurrencyChange("idr")}
        className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          currentCurrency === "idr"
            ? "bg-white/30 text-white shadow-lg backdrop-blur-md"
            : "text-white/70 hover:text-white hover:bg-white/10"
        }`}
      >
        IDR
      </button>
    </div>
  );
}
