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
            <tr className="border-b border-white/20">
              <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-white/70 uppercase">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-white/70 uppercase">
                Coin
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium tracking-wider text-white/70 uppercase">
                Price
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium tracking-wider text-white/70 uppercase">
                24h %
              </th>
              <th className="hidden px-4 py-3 text-right text-xs font-medium tracking-wider text-white/70 uppercase sm:table-cell">
                Market Cap
              </th>
              <th className="hidden px-4 py-3 text-right text-xs font-medium tracking-wider text-white/70 uppercase lg:table-cell">
                Volume (24h)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {coins.map((coin) => (
              <tr
                key={coin.id}
                onClick={() => setSelectedCoinId(coin.id)}
                className="cursor-pointer backdrop-blur-sm transition-all duration-150 hover:bg-white/10"
              >
                <td className="px-4 py-4 text-sm text-white/70">
                  {coin.market_cap_rank}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={coin.image}
                      alt={coin.name}
                      width={32}
                      height={32}
                      className="rounded-full shadow-lg"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-white">
                        {coin.name}
                      </span>
                      <span className="text-xs text-white/60 uppercase">
                        {coin.symbol}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-right font-medium text-white">
                  {formatCurrency(coin.current_price, currency)}
                </td>
                <td className="px-4 py-4 text-right font-medium">
                  <span
                    className={
                      coin.price_change_percentage_24h >= 0
                        ? "font-semibold text-emerald-300"
                        : "font-semibold text-red-300"
                    }
                  >
                    {formatPercentage(coin.price_change_percentage_24h)}
                  </span>
                </td>
                <td className="hidden px-4 py-4 text-right text-white/80 sm:table-cell">
                  {formatLargeNumber(coin.market_cap, currency)}
                </td>
                <td className="hidden px-4 py-4 text-right text-white/80 lg:table-cell">
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
