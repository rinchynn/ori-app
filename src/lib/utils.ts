import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return `₮${price.toLocaleString('en-US')}`;
}

export function getDiscountPercent(price: number, compareAt: number): number {
  return Math.round(((compareAt - price) / compareAt) * 100);
}

export function getInstallmentDisplay(monthlyAmount: number): string {
  return `Сарын ${formatPrice(monthlyAmount)}-с`;
}
