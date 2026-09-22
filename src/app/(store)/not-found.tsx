import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h1 className="text-6xl font-bold text-stone-300">404</h1>
      <p className="mt-4 text-lg font-medium text-stone-900">Хуудас олдсонгүй</p>
      <p className="mt-2 text-sm text-stone-500">Таны хайсан хуудас байхгүй эсвэл шилжүүлэгдсэн байна.</p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center h-10 px-6 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors"
      >
        Нүүр хуудас руу буцах
      </Link>
    </div>
  );
}
