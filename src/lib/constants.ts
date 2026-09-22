export const SITE = {
  name: 'Ори Дэлгүүр',
  nameLatin: 'Ori',
  tagline: 'Тав тухтай нойрны шийдэл',
  phone: '+976 9595-0720',
  email: 'info@ori.mn',
  address: 'Хан-Уул дүүрэг, 3-р хороо, Ори Дэлгүүр, Улаанбаатар',
  workingHours: 'Даваа–Бямба: 10:00–20:00',
} as const;

export const NAV = {
  categories: [
    { label: 'Матрас', href: '/mattress' },
    { label: 'Ор', href: '/bed' },
    { label: 'Ор + Матрас', href: '/bed-with-mattress' },
  ],
  sale: { label: 'Хямдрал', href: '/mattress?sale=true' },
  utility: [
    { label: 'Салбарууд', href: '/showroom' },
    { label: 'Захиалга шалгах', href: '/order-tracking' },
  ],
} as const;

export const UI = {
  hero: {
    headline: 'Тав тухыг эрхэмлэнэ',
    subheadline: '',
    cta: 'Бүтээгдэхүүн үзэх',
  },
  categories: {
    headline: 'Ангилал',
    cta: 'Үзэх',
  },
  featured: {
    headline: 'Онцлох бүтээгдэхүүнүүд',
    cta: 'Бүгдийг үзэх',
  },
  discounted: {
    headline: 'Хямдралтай бүтээгдэхүүн',
    cta: 'Бүх хямдралыг үзэх',
  },
  bundle: {
    headline: 'Ор + Матрас багц',
    subheadline: 'Хамтдаа авахад илүү хэмнэлттэй',
    cta: 'Багцууд үзэх',
  },
  installment: {
    headline: 'Төлбөрийн уян шийдлүүд',
    cta: 'Дэлгэрэнгүй',
  },
  trust: {
    headline: 'Яагаад биднийг сонгох вэ?',
    items: [
      { title: 'Үнэгүй хүргэлт', description: 'Улаанбаатар хотод ₮500,000+ захиалгад', icon: 'Truck' as const },
      { title: '30 хоног буцаалт', description: 'Буцаалт, солилтын баталгаа', icon: 'RefreshCcw' as const },
      { title: '5-10 жил баталгаа', description: 'Бүх бүтээгдэхүүнд баталгаат хугацаа', icon: 'ShieldCheck' as const },
      { title: 'Хүүгүй зээл', description: '12 сар хүртэл хүүгүй зээлийн нөхцөл', icon: 'CreditCard' as const },
    ],
  },
  showroom: {
    headline: 'Дэлгүүрт биечлэн зочлоорой',
    subheadline: 'Манай бүтээгдэхүүнийг биечлэн туршиж үзээрэй',
    cta: 'Хаяг, байршил үзэх',
  },
  testimonials: {
    headline: 'Худалдан авагчдын сэтгэгдэл',
  },
  faq: {
    headline: 'Түгээмэл асуултууд',
    cta: 'Бүх асуултыг үзэх',
  },
  cart: {
    title: 'Таны сагс',
    empty: 'Сагс хоосон байна',
    checkout: 'Худалдан авах',
    total: 'Нийт',
    continueShopping: 'Дэлгүүр үргэлжлүүлэх',
  },
  product: {
    addToCart: 'Сагсанд нэмэх',
    buyNow: 'Шууд худалдан авах',
    viewOptions: 'Сонголт үзэх',
    inStock: 'Нөөцөд байгаа',
    lowStock: 'Цөөн үлдсэн',
    outOfStock: 'Дууссан',
    notify: 'Мэдэгдэл авах',
    installmentPrefix: 'Сарын',
    installmentSuffix: '-с зээлтэй',
    deliveryUB: 'Хүргэлт: 3-5 ажлын өдөр (Улаанбаатар)',
    deliveryRegion: 'Орон нутаг: 5-10 ажлын өдөр',
    sizeGuide: 'Хэмжээний зааварчилгаа',
    relatedProducts: 'Төстэй бүтээгдэхүүнүүд',
    relatedBundles: 'Багцаар авах',
    reviews: 'Сэтгэгдлүүд',
    writeReview: 'Сэтгэгдэл бичих',
  },
  filter: {
    title: 'Шүүлтүүр',
    apply: 'Хайх',
    clear: 'Цэвэрлэх',
    sort: 'Эрэмбэлэх',
    showing: 'бүтээгдэхүүн харуулж байна',
    loadMore: 'Дараагийнхыг харуулах',
  },
  badges: {
    new: 'Шинэ',
    sale: 'Хямдрал',
    bestseller: 'Bestseller',
    premium: 'Premium',
    bundle: 'Багц',
    'low-stock': 'Цөөн үлдсэн',
  } as Record<string, string>,
  footer: {
    brand: 'Ори Дэлгүүр',
    brandDescription: 'Монголын хамгийн чанартай унтлагын бүтээгдэхүүний дэлгүүр. Бид таны тав тухтай нойрыг хангахын тулд шилдэг матрас, ор санал болгодог.',
    products: 'Бүтээгдэхүүн',
    info: 'Мэдээлэл',
    contact: 'Холбоо барих',
    copyright: `© ${new Date().getFullYear()} Ори Дэлгүүр. Бүх эрх хуулиар хамгаалагдсан.`,
    links: {
      products: [
        { label: 'Матрас', href: '/mattress' },
        { label: 'Ор', href: '/bed' },
        { label: 'Ор + Матрас', href: '/bed-with-mattress' },
        { label: 'Хямдралтай', href: '/mattress?sale=true' },
      ],
      info: [
        { label: 'Хүргэлт', href: '/delivery' },
        { label: 'Зээлийн нөхцөл', href: '/installment' },
        { label: 'Буцаалт', href: '/returns' },
        { label: 'Түгээмэл асуулт', href: '/faq' },
        { label: 'Нууцлалын бодлого', href: '/privacy' },
        { label: 'Үйлчилгээний нөхцөл', href: '/terms' },
      ],
    },
  },
  breadcrumb: {
    home: 'Нүүр',
  },
  sort: [
    { value: 'recommended', label: 'Санал болгох' },
    { value: 'newest', label: 'Шинээр нэмэгдсэн' },
    { value: 'price_asc', label: 'Үнэ: Багаас их' },
    { value: 'price_desc', label: 'Үнэ: Ихээс бага' },
    { value: 'bestselling', label: 'Эрэлттэй' },
    { value: 'discount', label: 'Хямдрал ихтэй' },
  ],
} as const;

export const CATEGORY_NAMES: Record<string, string> = {
  mattress: 'Матрас',
  bed: 'Ор',
  'bed-with-mattress': 'Ор + Матрас',
};

export const FIRMNESS_LABELS: Record<string, string> = {
  soft: 'Зөөлөн',
  medium: 'Дунд',
  firm: 'Хатуу',
  'extra-firm': 'Маш хатуу',
};
