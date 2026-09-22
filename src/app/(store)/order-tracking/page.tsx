'use client';

import { useState } from 'react';
import { Search, Package } from 'lucide-react';

export default function OrderTrackingPage() {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) setSearched(true);
  }

  return (
    <div className="mx-auto max-w-lg px-4 md:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl font-bold text-stone-900 mb-2">Захиалга шалгах</h1>
      <p className="text-sm text-stone-500 mb-6">Захиалгын дугаар эсвэл утасны дугаараар хайна уу.</p>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSearched(false); }}
            placeholder="ORI-2024-0001 эсвэл 99112233"
            className="w-full h-11 pl-9 pr-4 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
          />
        </div>
        <button type="submit" className="h-11 px-5 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors">
          Хайх
        </button>
      </form>

      {searched && (
        <div className="mt-8 text-center py-10">
          <Package className="h-12 w-12 text-stone-300 mx-auto" />
          <p className="mt-3 text-sm text-stone-500">Захиалга олдсонгүй.</p>
          <p className="text-xs text-stone-400 mt-1">Дугаараа дахин шалгана уу эсвэл {' '}
            <a href={`tel:+97695950720`} className="text-stone-700 underline">бидэнтэй холбогдоно уу</a>.
          </p>
        </div>
      )}
    </div>
  );
}
