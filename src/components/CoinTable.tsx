"use client";

import { useState } from "react";
import Image from "next/image";
import { Coin, Currency } from "@/types/coin";
import { formatCurrency, formatLargeNumber, formatPercentage } from "@/lib/api";
import CoinDetailModal from "./CoinDetailModal";

interface CoinTableProps {
  coins: Coin[];
  currency: Currency;
}

export default function CoinTable({ coins, currency }: CoinTableProps) {
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>(null);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Coin
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                24h %
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider hidden sm:table-cell">
                Market Cap
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider hidden lg:table-cell">
                Volume (24h)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {coins.map((coin) => (
              <tr
                key={coin.id}
                onClick={() => setSelectedCoinId(coin.id)}
                className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors duration-150 cursor-pointer"
              >
              <td className="px-4 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                {coin.market_cap_rank}
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={coin.image}
                    alt={coin.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {coin.name}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-500 uppercase">
                      {coin.symbol}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-right font-medium text-zinc-900 dark:text-zinc-100">
                {formatCurrency(coin.current_price, currency)}
              </td>
              <td className="px-4 py-4 text-right font-medium">
                <span
                  className={
                    coin.price_change_percentage_24h >= 0
                      ? "text-emerald-600 dark:text-emerald-500"
                      : "text-red-600 dark:text-red-500"
                  }
                >
                  {formatPercentage(coin.price_change_percentage_24h)}
                </span>
              </td>
              <td className="px-4 py-4 text-right text-zinc-700 dark:text-zinc-300 hidden sm:table-cell">
                {formatLargeNumber(coin.market_cap, currency)}
              </td>
              <td className="px-4 py-4 text-right text-zinc-700 dark:text-zinc-300 hidden lg:table-cell">
                {formatLargeNumber(coin.total_volume, currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      {selectedCoinId && (
        <CoinDetailModal
          coinId={selectedCoinId}
          currency={currency}
          onClose={() => setSelectedCoinId(null)}
        />
      )}
    </>
  );
}
