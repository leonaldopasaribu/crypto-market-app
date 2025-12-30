"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Currency, CoinDetail, ChartData } from "@/types/coin";
import { fetchCoinDetail, fetchCoinChart } from "@/lib/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { FormatterUtil } from "@/utils/formatter";

interface CoinDetailModalProps {
  coinId: string;
  currency: Currency;
  onClose: () => void;
}

export default function CoinDetailModal({
  coinId,
  currency,
  onClose,
}: CoinDetailModalProps) {
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
        <div className="glass w-full max-w-4xl rounded-3xl p-8 shadow-2xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-1/3 rounded bg-white/20"></div>
            <div className="h-64 rounded bg-white/20"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 rounded bg-white/20"></div>
              <div className="h-20 rounded bg-white/20"></div>
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
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md"
      onClick={handleOverlayClick}
    >
      <div className="flex min-h-screen items-center justify-center p-4 py-8">
        <div className="glass my-8 w-full max-w-4xl rounded-3xl p-6 shadow-2xl md:p-8">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between">
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
              className="cursor-pointer text-white/70 transition-colors hover:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Price */}
          <div className="mb-6">
            <p className="mb-2 text-4xl font-bold text-white drop-shadow-lg">
              {FormatterUtil.formatCurrency(currentPrice, currency)}
            </p>
            <p
              className={`text-lg font-medium ${isPositive ? "text-emerald-300" : "text-red-300"}`}
            >
              {FormatterUtil.formatPercentage(priceChange24h)} (24h)
            </p>
          </div>

          {/* Chart Period Selector */}
          <div className="mb-4 flex gap-2">
            {[
              { label: "1D", days: 1 },
              { label: "7D", days: 7 },
              { label: "30D", days: 30 },
              { label: "1Y", days: 365 },
            ].map((period) => (
              <button
                key={period.days}
                onClick={() => setChartDays(period.days)}
                className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-medium transition-all ${
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
          <div className="mb-6 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#ffffff"
                  opacity={0.2}
                />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={formatDate}
                  stroke="#ffffff"
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  tickFormatter={(value) =>
                    FormatterUtil.formatCurrency(value, currency).replace(
                      /\.\d+/,
                      ""
                    )
                  }
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
                  formatter={(value) => [
                    FormatterUtil.formatCurrency(Number(value) || 0, currency),
                    "Price",
                  ]}
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
          <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="mb-1 text-xs text-white/70">Market Cap</p>
              <p className="text-lg font-semibold text-white">
                {FormatterUtil.formatLargeNumber(
                  coinDetail.market_data.market_cap[currency],
                  currency
                )}
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="mb-1 text-xs text-white/70">24h Volume</p>
              <p className="text-lg font-semibold text-white">
                {FormatterUtil.formatLargeNumber(
                  coinDetail.market_data.total_volume[currency],
                  currency
                )}
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="mb-1 text-xs text-white/70">24h High</p>
              <p className="text-lg font-semibold text-white">
                {FormatterUtil.formatCurrency(
                  coinDetail.market_data.high_24h[currency],
                  currency
                )}
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="mb-1 text-xs text-white/70">24h Low</p>
              <p className="text-lg font-semibold text-white">
                {FormatterUtil.formatCurrency(
                  coinDetail.market_data.low_24h[currency],
                  currency
                )}
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="mb-1 text-xs text-white/70">All-Time High</p>
              <p className="text-lg font-semibold text-white">
                {FormatterUtil.formatCurrency(
                  coinDetail.market_data.ath[currency],
                  currency
                )}
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="mb-1 text-xs text-white/70">All-Time Low</p>
              <p className="text-lg font-semibold text-white">
                {FormatterUtil.formatCurrency(
                  coinDetail.market_data.atl[currency],
                  currency
                )}
              </p>
            </div>
          </div>

          {/* Description */}
          {coinDetail.description.en && (
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <h3 className="mb-2 text-sm font-semibold text-white">
                About {coinDetail.name}
              </h3>
              <p
                className="line-clamp-4 text-sm text-white/80"
                dangerouslySetInnerHTML={{
                  __html:
                    coinDetail.description.en
                      .split(". ")
                      .slice(0, 3)
                      .join(". ") + ".",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
