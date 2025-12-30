import { Currency } from "@/types/coin";

export class FormatterUtil {
  static formatCurrency(value: number, currency: Currency = "usd"): string {
    const currencyCode = currency.toUpperCase();
    const locale = currency === "idr" ? "id-ID" : "en-US";

    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: currency === "idr" ? 0 : 2,
      maximumFractionDigits: currency === "idr" ? 0 : 2,
    }).format(value);
  }

  static formatLargeNumber(value: number, currency: Currency = "usd"): string {
    const symbol = currency === "idr" ? "Rp" : "$";

    if (value >= 1e12) {
      return `${symbol}${(value / 1e12).toFixed(2)}T`;
    }
    if (value >= 1e9) {
      return `${symbol}${(value / 1e9).toFixed(2)}B`;
    }
    if (value >= 1e6) {
      return `${symbol}${(value / 1e6).toFixed(2)}M`;
    }
    return FormatterUtil.formatCurrency(value, currency);
  }

  static formatPercentage(value: number): string {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  }
}
