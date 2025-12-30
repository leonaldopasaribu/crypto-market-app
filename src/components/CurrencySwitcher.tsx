"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Currency } from "@/types/coin";

export default function CurrencySwitcher() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCurrency = (searchParams.get("currency") || "usd") as Currency;

  const handleCurrencyChange = (currency: Currency) => {
    const params = new URLSearchParams(searchParams);
    params.set("currency", currency);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 rounded-lg p-1 border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <button
        onClick={() => handleCurrencyChange("usd")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
          currentCurrency === "usd"
            ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
        }`}
      >
        USD
      </button>
      <button
        onClick={() => handleCurrencyChange("idr")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
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
