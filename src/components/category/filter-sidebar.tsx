'use client';

import { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import type { ProductCategory } from '@/types/product';
import { cn } from '@/lib/utils';

interface FilterGroup {
  label: string;
  options: string[];
}

const MATTRESS_FILTERS: FilterGroup[] = [
  { label: 'Хэмжээ', options: ['Single', 'Twin', 'Full', 'Queen', 'King'] },
  { label: 'Хатуулаг', options: ['Зөөлөн', 'Дунд', 'Хатуу', 'Маш хатуу'] },
  { label: 'Материал', options: ['Memory Foam', 'Spring', 'Latex', 'Hybrid'] },
  { label: 'Тулгуурын төрөл', options: ['Ортопед', 'Анатом', 'Стандарт'] },
];

const BED_FILTERS: FilterGroup[] = [
  { label: 'Хэмжээ', options: ['Single', 'Twin', 'Full', 'Queen', 'King'] },
  { label: 'Хүрээ материал', options: ['Мод', 'Металл', 'Бүрээстэй', 'MDF'] },
  { label: 'Загвар', options: ['Орчин үеийн', 'Сонгодог', 'Минимал', 'Скандинав'] },
  { label: 'Өнгө', options: ['Цагаан', 'Саарал', 'Хар', 'Хүрэн', 'Натурал'] },
];

const BUNDLE_FILTERS: FilterGroup[] = [
  { label: 'Хэмжээ', options: ['Single', 'Twin', 'Full', 'Queen', 'King'] },
  { label: 'Хүрээ материал', options: ['Мод', 'Металл', 'Бүрээстэй', 'MDF'] },
  { label: 'Хатуулаг', options: ['Зөөлөн', 'Дунд', 'Хатуу'] },
  { label: 'Багцын төрөл', options: ['Энгийн', 'Стандарт', 'Премиум'] },
];

function getFilters(category: ProductCategory): FilterGroup[] {
  switch (category) {
    case 'mattress': return MATTRESS_FILTERS;
    case 'bed': return BED_FILTERS;
    case 'bed-with-mattress': return BUNDLE_FILTERS;
  }
}

export interface ActiveFilters {
  [key: string]: string[] | boolean | number | undefined;
  inStockOnly?: boolean;
  discountOnly?: boolean;
  storageOnly?: boolean;
  priceMin?: number;
  priceMax?: number;
}

interface FilterSidebarProps {
  category: ProductCategory;
  mobile?: boolean;
  onClose?: () => void;
  activeFilters?: ActiveFilters;
  onFilterChange?: (filters: ActiveFilters) => void;
  maxPrice?: number;
}

export function FilterSidebar({ category, mobile, onClose, activeFilters = {}, onFilterChange, maxPrice = 5000000 }: FilterSidebarProps) {
  const filters = getFilters(category);
  const actualMax = maxPrice;
  const [localMin, setLocalMin] = useState<number>(activeFilters.priceMin ?? 0);
  const [localMax, setLocalMax] = useState<number>(activeFilters.priceMax ?? actualMax);

  useEffect(() => {
    setLocalMin(activeFilters.priceMin ?? 0);
    setLocalMax(activeFilters.priceMax ?? actualMax);
  }, [activeFilters.priceMin, activeFilters.priceMax, actualMax]);

  function handlePriceChange(min: number, max: number) {
    setLocalMin(min);
    setLocalMax(max);
    onFilterChange?.({ ...activeFilters, priceMin: min, priceMax: max });
  }

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  function toggleGroup(label: string) {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  }

  function selectOption(group: string, option: string) {
    const current = (activeFilters[group] as string[] | undefined) ?? [];
    const updated = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    onFilterChange?.({ ...activeFilters, [group]: updated });
  }

  function toggleFlag(flag: 'inStockOnly' | 'discountOnly' | 'storageOnly') {
    onFilterChange?.({ ...activeFilters, [flag]: !activeFilters[flag] });
  }

  function clearFilters() {
    onFilterChange?.({});
  }

  return (
    <div className={mobile ? 'p-4' : ''}>
      {mobile && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-stone-900">Шүүлтүүр</h3>
          <button onClick={onClose} className="p-1 text-stone-500 hover:text-stone-900">
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
      <div className="space-y-1">
        {filters.map((group) => {
          const isOpen = openGroups[group.label] ?? false;
          const groupValues = (activeFilters[group.label] as string[] | undefined) ?? [];
          return (
            <div key={group.label} className="border-b border-stone-100">
              <button
                onClick={() => toggleGroup(group.label)}
                className="flex items-center justify-between w-full py-3 text-sm font-medium text-stone-600 tracking-wide hover:text-stone-900 transition-colors"
              >
                {group.label}
                {isOpen ? <ChevronUp className="h-4 w-4 text-stone-400" /> : <ChevronDown className="h-4 w-4 text-stone-400" />}
              </button>
              {isOpen && (
                <div className="pb-3 space-y-0.5">
                  {group.options.map((option) => {
                    const isActive = groupValues.includes(option);
                    return (
                      <button
                        key={option}
                        onClick={() => selectOption(group.label, option)}
                        className={cn(
                          'flex items-center w-full px-2 py-2 text-sm rounded transition-colors',
                          isActive
                            ? 'text-red-600 font-semibold'
                            : 'text-stone-600 hover:text-stone-900'
                        )}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Price Range Filter */}
        <div>
          <h4 className="text-sm font-medium text-stone-600 tracking-wide py-3">Үнэ</h4>
          <div className="space-y-4 pb-3">
            {/* Min/Max badges */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-stone-600 border border-stone-200 rounded-full px-3 py-1">
                ₮{localMin.toLocaleString()}
              </span>
              <span className="text-xs font-medium text-stone-600 border border-stone-200 rounded-full px-3 py-1">
                ₮{localMax.toLocaleString()}
              </span>
            </div>

            {/* Dual range slider */}
            <div className="relative h-6 flex items-center">
              <div className="absolute inset-x-0 h-[3px] bg-stone-200 rounded-full" />
              <div
                className="absolute h-[3px] bg-stone-400 rounded-full"
                style={{
                  left: `${(localMin / actualMax) * 100}%`,
                  right: `${100 - (localMax / actualMax) * 100}%`,
                }}
              />
              <input
                type="range"
                min={0}
                max={actualMax}
                step={10000}
                value={localMin}
                onChange={(e) => {
                  const v = Math.min(Number(e.target.value), localMax - 10000);
                  handlePriceChange(v, localMax);
                }}
                className="absolute inset-x-0 w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-stone-300 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-stone-300 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:cursor-pointer"
              />
              <input
                type="range"
                min={0}
                max={actualMax}
                step={10000}
                value={localMax}
                onChange={(e) => {
                  const v = Math.max(Number(e.target.value), localMin + 10000);
                  handlePriceChange(localMin, v);
                }}
                className="absolute inset-x-0 w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-stone-300 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-stone-300 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:cursor-pointer"
              />
            </div>

            {/* Input fields */}
            <div className="flex items-center gap-3">
              <div className="flex-1 flex items-center border border-stone-300 rounded-lg overflow-hidden">
                <span className="px-2 text-sm text-stone-500 bg-stone-50 h-9 flex items-center border-r border-stone-300">₮</span>
                <input
                  type="number"
                  value={localMin}
                  onChange={(e) => {
                    const v = Math.max(0, Math.min(Number(e.target.value), localMax - 10000));
                    handlePriceChange(v, localMax);
                  }}
                  className="w-full h-9 px-2 text-sm text-stone-900 focus:outline-none"
                />
              </div>
              <div className="flex-1 flex items-center border border-stone-300 rounded-lg overflow-hidden">
                <span className="px-2 text-sm text-stone-500 bg-stone-50 h-9 flex items-center border-r border-stone-300">₮</span>
                <input
                  type="number"
                  value={localMax}
                  onChange={(e) => {
                    const v = Math.min(actualMax, Math.max(Number(e.target.value), localMin + 10000));
                    handlePriceChange(localMin, v);
                  }}
                  className="w-full h-9 px-2 text-sm text-stone-900 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={!!activeFilters.inStockOnly}
              onChange={() => toggleFlag('inStockOnly')}
              className="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900"
            />
            <span className="text-sm text-stone-600">Зөвхөн нөөцтэй</span>
          </label>
        </div>
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={!!activeFilters.discountOnly}
              onChange={() => toggleFlag('discountOnly')}
              className="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900"
            />
            <span className="text-sm text-stone-600">Зөвхөн хямдралтай</span>
          </label>
        </div>
        {(category === 'bed' || category === 'bed-with-mattress') && (
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!activeFilters.storageOnly}
                onChange={() => toggleFlag('storageOnly')}
                className="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900"
              />
              <span className="text-sm text-stone-600">Хадгалалттай</span>
            </label>
          </div>
        )}
      </div>

      {mobile && (
        <div className="mt-6 flex gap-3">
          <button onClick={clearFilters} className="flex-1 h-10 rounded-lg border border-stone-300 text-sm font-medium text-stone-700 hover:bg-stone-50">
            Цэвэрлэх
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-lg bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800"
          >
            Хайх
          </button>
        </div>
      )}
    </div>
  );
}
