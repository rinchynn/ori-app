export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  product: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Б. Болормаа',
    rating: 5,
    text: 'Cloud Comfort матрасыг авсанаас хойш нойрны чанар маань бүрэн өөрчлөгдсөн. Нуруу өвдөх асуудал арилсан. Маш их баярлалаа!',
    product: 'Cloud Comfort Ортопед Матрас',
    date: '2025-03-15',
  },
  {
    id: 'test-2',
    name: 'Д. Ганбаатар',
    rating: 5,
    text: 'Nordic модон ор маш чанартай, угсралт хурдан хийгдсэн. Хүргэлт цаг тухайд нь ирсэн. Гэр бүлдээ маш их таалагдаж байна.',
    product: 'Nordic Модон Ор',
    date: '2025-02-28',
  },
  {
    id: 'test-3',
    name: 'С. Оюунчимэг',
    rating: 4,
    text: 'Smart Set багцыг авсан. Үнэ зохимжтой, чанар сайн. Агуулахтай ор нь бидний жижиг байрны хувьд маш тохиромжтой болсон.',
    product: 'Smart Set — Агуулахтай ор + Memory Foam',
    date: '2025-01-10',
  },
  {
    id: 'test-4',
    name: 'Э. Мөнхбат',
    rating: 5,
    text: 'SpineGuard матрас миний нуруу өвдөх асуудлыг шийдсэн. Эмч нарын зөвлөмжөөр авсан бөгөөд үнэхээр сэтгэл ханамжтай байна.',
    product: 'SpineGuard Ортопед Матрас',
    date: '2025-03-02',
  },
  {
    id: 'test-5',
    name: 'Н. Сарантуяа',
    rating: 5,
    text: 'Хүүдээ Student Set авч өгсөн. Чанар маш сайн, үнэ хямд. Зээлийн нөхцөл ч хялбар байсан. Дахин авна!',
    product: 'Student Set — Компакт ор + Хөнгөн матрас',
    date: '2025-02-14',
  },
];
