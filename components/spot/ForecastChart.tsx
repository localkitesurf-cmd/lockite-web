'use client';
import type { DailyForecast } from '@/lib/types';
import { WIND_COLORS } from '@/lib/types';

export function ForecastChart({ days }: { days: DailyForecast[] }) {
  const maxWind = Math.max(...days.map(d => d.wind_max_knots), 1);

  return (
    <div className="flex gap-1.5">
      {days.map((day) => {
        const barH = Math.max(4, Math.round((day.wind_avg_knots / maxWind) * 64));
        const color = WIND_COLORS[day.condition.score];
        return (
          <div key={day.date} className="flex-1 flex flex-col items-center gap-1.5 group cursor-default">
            <div className="text-[9px] text-dim font-semibold uppercase tracking-wide">{day.day_name}</div>
            <div className="h-16 flex items-end w-full">
              <div
                className="w-full rounded-sm transition-all group-hover:opacity-80 relative"
                style={{ height: barH, background: color }}
                title={`${day.wind_avg_knots} kn – ${day.condition.label}`}
              />
            </div>
            <div className="text-[10px] text-white font-bold">{day.wind_avg_knots}</div>
          </div>
        );
      })}
    </div>
  );
}

// Compact horizontal wind row for spot lists
export function WindRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-white/[0.05] last:border-0">
      <span className="text-dim text-sm">{label}</span>
      <span className="text-sm font-semibold" style={color ? { color } : { color: 'white' }}>{value}</span>
    </div>
  );
}
