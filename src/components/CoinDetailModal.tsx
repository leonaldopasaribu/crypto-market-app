"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Currency, CoinDetail, ChartData } from "@/types/coin";
import { fetchCoinDetail, fetchCoinChart, formatCurrency, formatLargeNumber, formatPercentage } from "@/lib/api";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface CoinDetailModalProps {
  coinId: string;
  currency: Currency;
  onClose: () => void;
}

export default function CoinDetailModal({ coinId, currency, onClose }: CoinDetailModalProps) {
  const [coinDetail, setCoinDetail] = useState<CoinDetail | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [chartDays, setChartDays] = useState<number>(7);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [detail, chart] = await Promise.all([
          fetchCoinDetail(coinId),
          fetchCoinChart(coinId, currency, chartDays),
        ]);
        setCoinDetail(detail);
        setChartData(chart);
      } catch (error) {
        console.error("Failed to fetch coin details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [coinId, currency, chartDays]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 max-w-4xl w-full shadow-2xl border border-zinc-200 dark:border-zinc-800">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3"></div>
            <div className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
              <div className="h-20 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!coinDetail) return null;

  const currentPrice = coinDetail.market_data.current_price[currency];
  const priceChange24h = coinDetail.market_data.price_change_percentage_24h;
  const isPositive = priceChange24h >= 0;

  // Format date for chart
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    if (chartDays === 1) {
      return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    }
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div className="min-h-screen flex items-center justify-center p-4 py-8">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 max-w-4xl w-full shadow-2xl border border-zinc-200 dark:border-zinc-800 my-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <Image
              src={coinDetail.image.large}
              alt={coinDetail.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {coinDetail.name}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 uppercase">
                {coinDetail.symbol}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className= "cursor-pointer text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Price */}
        <div className="mb-6">
          <p className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            {formatCurrency(currentPrice, currency)}
          </p>
          <p className={`text-lg font-medium ${isPositive ? "text-emerald-600 dark:text-emerald-500" : "text-red-600 dark:text-red-500"}`}>
            {formatPercentage(priceChange24h)} (24h)
          </p>
        </div>

        {/* Chart Period Selector */}
        <div className="flex gap-2 mb-4">
          {[
            { label: "1D", days: 1 },
            { label: "7D", days: 7 },
            { label: "30D", days: 30 },
            { label: "1Y", days: 365 },
          ].map((period) => (
            <button
              key={period.days}
              onClick={() => setChartDays(period.days)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                chartDays === period.days
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-zinc-50 dark:bg-zinc-950 rounded-xl p-4 mb-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.3} />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatDate}
                stroke="#71717a"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                tickFormatter={(value) => formatCurrency(value, currency).replace(/\.\d+/, "")}
                stroke="#71717a"
                style={{ fontSize: "12px" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "8px",
                  color: "#fafafa",
                }}
                labelFormatter={formatDate}
                formatter={(value) => [formatCurrency(Number(value) || 0, currency), "Price"]}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={isPositive ? "#10b981" : "#ef4444"}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-zinc-50 dark:bg-zinc-950 rounded-lg p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Market Cap</p>
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {formatLargeNumber(coinDetail.market_data.market_cap[currency], currency)}
            </p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-950 rounded-lg p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">24h Volume</p>
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {formatLargeNumber(coinDetail.market_data.total_volume[currency], currency)}
            </p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-950 rounded-lg p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">24h High</p>
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {formatCurrency(coinDetail.market_data.high_24h[currency], currency)}
            </p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-950 rounded-lg p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">24h Low</p>
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {formatCurrency(coinDetail.market_data.low_24h[currency], currency)}
            </p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-950 rounded-lg p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">All-Time High</p>
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {formatCurrency(coinDetail.market_data.ath[currency], currency)}
            </p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-950 rounded-lg p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">All-Time Low</p>
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {formatCurrency(coinDetail.market_data.atl[currency], currency)}
            </p>
          </div>
        </div>

        {/* Description */}
        {coinDetail.description.en && (
          <div className="bg-zinc-50 dark:bg-zinc-950 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">About {coinDetail.name}</h3>
            <p
              className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-4"
              dangerouslySetInnerHTML={{
                __html: coinDetail.description.en.split(". ").slice(0, 3).join(". ") + ".",
              }}
            />
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
