"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
  currentFilter: string;
}

export default function SearchBar({
  onSearch,
  onFilterChange,
  currentFilter,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const filters = [
    { value: "all", label: "All Coins" },
    { value: "gainers", label: "🚀 Top Gainers" },
    { value: "losers", label: "📉 Top Losers" },
    { value: "volume", label: "💰 High Volume" },
    { value: "watchlist", label: "⭐ Watchlist" },
  ];

  return (
    <div className="mb-6 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <svg
            className="h-5 w-5 text-white/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search coin name or symbol..."
          className="glass w-full rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              onSearch("");
            }}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/50 transition-colors hover:text-white"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              currentFilter === filter.value
                ? "bg-white/30 text-white shadow-lg backdrop-blur-md"
                : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
