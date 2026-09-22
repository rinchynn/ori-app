import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
}

export function StatCard({ title, value, change, changeType = 'neutral', icon: Icon, iconColor = 'bg-stone-100 text-stone-600' }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-3 sm:p-5">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs sm:text-sm text-stone-500 truncate">{title}</p>
          <p className="mt-1 text-lg sm:text-2xl font-bold text-stone-900 truncate">{value}</p>
          {change && (
            <p className={cn(
              'mt-1 text-xs font-medium',
              changeType === 'positive' && 'text-emerald-600',
              changeType === 'negative' && 'text-red-600',
              changeType === 'neutral' && 'text-stone-500',
            )}>
              {change}
            </p>
          )}
        </div>
        <div className={cn('h-8 w-8 sm:h-10 sm:w-10 rounded-lg flex items-center justify-center shrink-0', iconColor)}>
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </div>
    </div>
  );
}
