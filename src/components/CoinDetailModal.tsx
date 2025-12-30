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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
        <div className="glass rounded-3xl p-8 max-w-4xl w-full shadow-2xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-white/20 rounded w-1/3"></div>
            <div className="h-64 bg-white/20 rounded"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 bg-white/20 rounded"></div>
              <div className="h-20 bg-white/20 rounded"></div>
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
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div className="min-h-screen flex items-center justify-center p-4 py-8">
        <div className="glass rounded-3xl p-6 md:p-8 max-w-4xl w-full shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <Image
              src={coinDetail.image.large}
              alt={coinDetail.name}
              width={48}
              height={48}
              className="rounded-full shadow-lg"
            />
            <div>
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                {coinDetail.name}
              </h2>
              <p className="text-sm text-white/70 uppercase">
                {coinDetail.symbol}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Price */}
        <div className="mb-6">
          <p className="text-4xl font-bold text-white drop-shadow-lg mb-2">
            {formatCurrency(currentPrice, currency)}
          </p>
          <p className={`text-lg font-medium ${isPositive ? "text-emerald-300" : "text-red-300"}`}>
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
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                chartDays === period.days
                  ? "bg-white/30 text-white shadow-lg backdrop-blur-md"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" opacity={0.2} />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatDate}
                stroke="#ffffff"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                tickFormatter={(value) => formatCurrency(value, currency).replace(/\.\d+/, "")}
                stroke="#ffffff"
                style={{ fontSize: "12px" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "12px",
                  color: "#ffffff",
                  backdropFilter: "blur(10px)",
                }}
                labelFormatter={formatDate}
                formatter={(value) => [formatCurrency(Number(value) || 0, currency), "Price"]}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={isPositive ? "#6ee7b7" : "#fca5a5"}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-xs text-white/70 mb-1">Market Cap</p>
            <p className="text-lg font-semibold text-white">
              {formatLargeNumber(coinDetail.market_data.market_cap[currency], currency)}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-xs text-white/70 mb-1">24h Volume</p>
            <p className="text-lg font-semibold text-white">
              {formatLargeNumber(coinDetail.market_data.total_volume[currency], currency)}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-xs text-white/70 mb-1">24h High</p>
            <p className="text-lg font-semibold text-white">
              {formatCurrency(coinDetail.market_data.high_24h[currency], currency)}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-xs text-white/70 mb-1">24h Low</p>
            <p className="text-lg font-semibold text-white">
              {formatCurrency(coinDetail.market_data.low_24h[currency], currency)}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-xs text-white/70 mb-1">All-Time High</p>
            <p className="text-lg font-semibold text-white">
              {formatCurrency(coinDetail.market_data.ath[currency], currency)}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-xs text-white/70 mb-1">All-Time Low</p>
            <p className="text-lg font-semibold text-white">
              {formatCurrency(coinDetail.market_data.atl[currency], currency)}
            </p>
          </div>
        </div>

        {/* Description */}
        {coinDetail.description.en && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <h3 className="text-sm font-semibold text-white mb-2">About {coinDetail.name}</h3>
            <p
              className="text-sm text-white/80 line-clamp-4"
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
