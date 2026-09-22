'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Search, Eye, Pencil, Trash2, Package, X, Check, ImagePlus } from 'lucide-react';
import { CATEGORY_NAMES } from '@/lib/constants';
import { formatPrice, cn } from '@/lib/utils';
import { useAdminStore, type SimpleProduct } from '@/store/admin-store';
import type { ProductCategory, StockStatus } from '@/types/product';

const STOCK_LABELS: Record<string, { label: string; className: string }> = {
  'in-stock': { label: 'Нөөцтэй', className: 'bg-emerald-50 text-emerald-700' },
  'low-stock': { label: 'Бага', className: 'bg-amber-50 text-amber-700' },
  'out-of-stock': { label: 'Дууссан', className: 'bg-red-50 text-red-700' },
};

const EMPTY_FORM: Omit<SimpleProduct, 'id'> = {
  slug: '',
  name: '',
  category: 'mattress',
  price: 0,
  compareAtPrice: undefined,
  images: [],
  stockStatus: 'in-stock',
  shortDescription: '',
  description: '',
};

export default function AdminProductsPage() {
  const { products, initProducts, addProduct, updateProduct, deleteProduct } = useAdminStore();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<SimpleProduct, 'id'>>(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);

  useEffect(() => {
    initProducts();
  }, [initProducts]);

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.slug.includes(search.toLowerCase());
    const matchCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  function openAdd() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(id: string) {
    const p = products.find((pr) => pr.id === id);
    if (!p) return;
    setEditingId(id);
    setForm({
      slug: p.slug,
      name: p.name,
      category: p.category,
      price: p.price,
      compareAtPrice: p.compareAtPrice,
      images: p.images,
      stockStatus: p.stockStatus,
      shortDescription: p.shortDescription,
      description: p.description,
    });
    setModalOpen(true);
  }

  function handleSave() {
    if (!form.name.trim() || form.price <= 0) return;
    if (editingId) {
      updateProduct(editingId, form);
    } else {
      addProduct(form);
    }
    setModalOpen(false);
    setEditingId(null);
  }

  function handleDelete(id: string) {
    deleteProduct(id);
    setDeleteConfirm(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Бүтээгдэхүүн</h1>
          <p className="text-sm text-stone-500 mt-1">{products.length} бүтээгдэхүүн</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 h-10 px-4 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Нэмэх
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <input
            type="text"
            placeholder="Нэр, slug-р хайх..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-10 px-3 pr-8 rounded-lg border border-stone-300 text-sm text-stone-700 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-stone-900"
        >
          <option value="all">Бүх ангилал</option>
          <option value="mattress">Матрас</option>
          <option value="bed">Ор</option>
          <option value="bed-with-mattress">Ор + Матрас</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/50 text-left">
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Бүтээгдэхүүн</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Ангилал</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Үнэ</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Нөөц</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider text-right">Үйлдэл</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => {
                const stock = STOCK_LABELS[product.stockStatus];
                return (
                  <tr key={product.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                    <td className="px-3 sm:px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                            unoptimized
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-stone-900 truncate">{product.name}</p>
                          <p className="text-xs text-stone-400">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-5 py-3 text-stone-600 whitespace-nowrap">{CATEGORY_NAMES[product.category]}</td>
                    <td className="px-3 sm:px-5 py-3">
                      <span className="font-medium text-stone-900 whitespace-nowrap">{formatPrice(product.price)}</span>
                      {product.compareAtPrice && (
                        <span className="block text-xs text-stone-400 line-through">{formatPrice(product.compareAtPrice)}</span>
                      )}
                    </td>
                    <td className="px-3 sm:px-5 py-3">
                      <span className={cn('inline-flex px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap', stock.className)}>
                        {stock.label}
                      </span>
                    </td>
                    <td className="px-3 sm:px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setPreviewId(product.id)} className="p-2 text-stone-400 hover:text-stone-900 transition-colors" title="Харах">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button onClick={() => openEdit(product.id)} className="p-2 text-stone-400 hover:text-stone-900 transition-colors" title="Засах">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => setDeleteConfirm(product.id)} className="p-2 text-stone-400 hover:text-red-600 transition-colors" title="Устгах">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-stone-400">
            <Package className="h-10 w-10 mb-3" />
            <p className="text-sm">Бүтээгдэхүүн олдсонгүй</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-stone-200">
              <h2 className="text-lg font-bold text-stone-900">
                {editingId ? 'Бүтээгдэхүүн засах' : 'Шинэ бүтээгдэхүүн'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="p-1 text-stone-400 hover:text-stone-900">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-stone-500 mb-1 block">Нэр *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Бүтээгдэхүүний нэр"
                  className="w-full h-10 px-3 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-stone-500 mb-1 block">Ангилал *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as ProductCategory })}
                    className="w-full h-10 px-3 rounded-lg border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
                  >
                    <option value="mattress">Матрас</option>
                    <option value="bed">Ор</option>
                    <option value="bed-with-mattress">Ор + Матрас</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-500 mb-1 block">Нөөцийн төлөв</label>
                  <select
                    value={form.stockStatus}
                    onChange={(e) => setForm({ ...form, stockStatus: e.target.value as StockStatus })}
                    className="w-full h-10 px-3 rounded-lg border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
                  >
                    <option value="in-stock">Нөөцтэй</option>
                    <option value="low-stock">Бага</option>
                    <option value="out-of-stock">Дууссан</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-stone-500 mb-1 block">Үнэ (₮) *</label>
                  <input
                    type="number"
                    value={form.price || ''}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    placeholder="890000"
                    className="w-full h-10 px-3 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-500 mb-1 block">Хуучин үнэ (₮)</label>
                  <input
                    type="number"
                    value={form.compareAtPrice || ''}
                    onChange={(e) => setForm({ ...form, compareAtPrice: Number(e.target.value) || undefined })}
                    placeholder="1100000"
                    className="w-full h-10 px-3 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-stone-500 mb-1 block">Товч тайлбар</label>
                <input
                  type="text"
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  placeholder="Hybrid, 25см, Дунд хатуулаг"
                  className="w-full h-10 px-3 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-stone-500 mb-1 block">Дэлгэрэнгүй</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  placeholder="Бүтээгдэхүүний тайлбар..."
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-stone-500 mb-1 block">Зураг</label>
                {form.images.length > 0 && (
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {form.images.map((img, i) => (
                      <div key={i} className="relative h-16 w-16 rounded-lg overflow-hidden bg-stone-100 group">
                        <Image src={img} alt="" fill className="object-cover" sizes="64px" unoptimized />
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, images: form.images.filter((_, j) => j !== i) })}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                        >
                          <X className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <label className="flex items-center justify-center gap-2 w-full h-20 border-2 border-dashed border-stone-300 rounded-lg cursor-pointer hover:border-stone-400 hover:bg-stone-50 transition-colors">
                  <ImagePlus className="h-5 w-5 text-stone-400" />
                  <span className="text-sm text-stone-500">Зураг нэмэх</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (!files) return;
                      Array.from(files).forEach((file) => {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          const result = ev.target?.result as string;
                          if (result) setForm((prev) => ({ ...prev, images: [...prev.images, result] }));
                        };
                        reader.readAsDataURL(file);
                      });
                      e.target.value = '';
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-5 border-t border-stone-200">
              <button
                onClick={() => setModalOpen(false)}
                className="h-10 px-4 text-sm font-medium text-stone-700 rounded-lg border border-stone-300 hover:bg-stone-50 transition-colors"
              >
                Болих
              </button>
              <button
                onClick={handleSave}
                disabled={!form.name.trim() || form.price <= 0}
                className="h-10 px-5 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-40 flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                {editingId ? 'Хадгалах' : 'Нэмэх'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 p-6 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <Trash2 className="h-5 w-5 text-red-600" />
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-1">Устгах уу?</h3>
            <p className="text-sm text-stone-500 mb-5">
              &ldquo;{products.find((p) => p.id === deleteConfirm)?.name}&rdquo; бүтээгдэхүүнийг устгахад итгэлтэй байна уу?
            </p>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="h-10 px-4 text-sm font-medium text-stone-700 rounded-lg border border-stone-300 hover:bg-stone-50 transition-colors"
              >
                Болих
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="h-10 px-5 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Устгах
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Preview Modal */}
      {previewId && (() => {
        const p = products.find((pr) => pr.id === previewId);
        if (!p) return null;
        const stock = STOCK_LABELS[p.stockStatus];
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" onClick={() => setPreviewId(null)} />
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between p-5 border-b border-stone-200">
                <h2 className="text-lg font-bold text-stone-900 truncate pr-4">{p.name}</h2>
                <button onClick={() => setPreviewId(null)} className="p-1 text-stone-400 hover:text-stone-900 shrink-0">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {/* Images */}
              {p.images.length > 0 && (
                <div className="flex gap-2 p-5 pb-0 overflow-x-auto">
                  {p.images.map((img, i) => (
                    <div key={i} className="relative h-40 w-40 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                      <Image src={img} alt={p.name} fill className="object-cover" sizes="160px" unoptimized />
                    </div>
                  ))}
                </div>
              )}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-stone-900">{formatPrice(p.price)}</span>
                  {p.compareAtPrice && <span className="text-sm text-stone-400 line-through">{formatPrice(p.compareAtPrice)}</span>}
                  <span className={cn('ml-auto px-2 py-0.5 text-xs font-medium rounded-full', stock.className)}>{stock.label}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-500">
                  <span className="px-2 py-0.5 bg-stone-100 rounded text-xs">{CATEGORY_NAMES[p.category]}</span>
                  <span className="text-stone-300">•</span>
                  <span className="text-xs text-stone-400">{p.slug}</span>
                </div>
                {p.shortDescription && <p className="text-sm text-stone-600">{p.shortDescription}</p>}
                {p.description && <p className="text-sm text-stone-500 leading-relaxed">{p.description}</p>}
              </div>
              <div className="flex items-center gap-2 p-5 border-t border-stone-200">
                <button onClick={() => { setPreviewId(null); openEdit(p.id); }} className="flex-1 h-10 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors flex items-center justify-center gap-2">
                  <Pencil className="h-4 w-4" /> Засах
                </button>
                <button onClick={() => setPreviewId(null)} className="h-10 px-4 text-sm font-medium text-stone-700 rounded-lg border border-stone-300 hover:bg-stone-50 transition-colors">
                  Хаах
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
