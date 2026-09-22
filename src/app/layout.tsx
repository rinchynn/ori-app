import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Ори Дэлгүүр — Тав тухтай нойрны шийдэл",
  description: "Монголын хамгийн чанартай матрас, ор, болон унтлагын бүтээгдэхүүний дэлгүүр. Матрас, ор, ор + матрас багц.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-stone-50 font-sans text-stone-900">
        {children}
      </body>
    </html>
  );
}
