"use client";

import { useState } from "react";
import Image from "next/image";
import { Coin, Currency } from "@/types/coin";
import CoinDetailModal from "./CoinDetailModal";
import { FormatterUtil } from "@/utils/formatter";

interface CoinTableProps {
  coins: Coin[];
  currency: Currency;
  onToggleWatchlist?: (coinId: string) => void;
  isInWatchlist?: (coinId: string) => boolean;
}

export default function CoinTable({
  coins,
  currency,
  onToggleWatchlist,
  isInWatchlist,
}: CoinTableProps) {
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>(null);

  const handleStarClick = (
    e: React.MouseEvent,
    coinId: string
  ) => {
    e.stopPropagation();
    onToggleWatchlist?.(coinId);
  };

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
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    {onToggleWatchlist && (
                      <button
                        onClick={(e) => handleStarClick(e, coin.id)}
                        className="cursor-pointer text-white/40 transition-all hover:scale-125 hover:text-yellow-400"
                      >
                        {isInWatchlist?.(coin.id) ? (
                          <svg
                            className="h-5 w-5 fill-yellow-400 text-yellow-400"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        )}
                      </button>
                    )}
                    <span className="text-sm text-white/70">
                      {coin.market_cap_rank}
                    </span>
                  </div>
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
                  {FormatterUtil.formatCurrency(coin.current_price, currency)}
                </td>
                <td className="px-4 py-4 text-right font-medium">
                  <span
                    className={
                      coin.price_change_percentage_24h >= 0
                        ? "font-semibold text-emerald-300"
                        : "font-semibold text-red-300"
                    }
                  >
                    {FormatterUtil.formatPercentage(coin.price_change_percentage_24h)}
                  </span>
                </td>
                <td className="hidden px-4 py-4 text-right text-white/80 sm:table-cell">
                  {FormatterUtil.formatLargeNumber(coin.market_cap, currency)}
                </td>
                <td className="hidden px-4 py-4 text-right text-white/80 lg:table-cell">
                  {FormatterUtil.formatLargeNumber(coin.total_volume, currency)}
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
