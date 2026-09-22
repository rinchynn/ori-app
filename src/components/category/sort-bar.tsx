'use client';

import { SlidersHorizontal } from 'lucide-react';
import { UI } from '@/lib/constants';

interface SortBarProps {
  count: number;
  sort: string;
  onSortChange: (value: string) => void;
  onFilterToggle: () => void;
}

export function SortBar({ count, sort, onSortChange, onFilterToggle }: SortBarProps) {
  return (
    <div className="flex items-center justify-between gap-2 py-3 sm:py-4 border-b border-stone-200">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={onFilterToggle}
          className="lg:hidden flex items-center gap-1.5 h-8 sm:h-9 px-2.5 sm:px-3 rounded-lg border border-stone-300 text-xs sm:text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors shrink-0"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          {UI.filter.title}
        </button>
        <span className="hidden sm:inline text-sm text-stone-500">
          {count} {UI.filter.showing}
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="hidden sm:inline text-sm text-stone-500">{UI.filter.sort}:</span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="h-8 sm:h-9 px-2 sm:px-3 pr-7 sm:pr-8 rounded-lg border border-stone-300 text-xs sm:text-sm text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-stone-900 cursor-pointer"
        >
          {UI.sort.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
