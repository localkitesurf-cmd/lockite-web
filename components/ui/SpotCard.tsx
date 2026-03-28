import Link from 'next/link';
import type { Spot, CurrentForecast } from '@/lib/types';
import { WIND_COLORS, WIND_LABELS, LEVEL_LABELS, TYPE_LABELS, MONTH_NAMES } from '@/lib/types';

interface SpotCardProps {
  spot: Spot;
  forecast?: CurrentForecast;
  variant?: 'default' | 'compact';
}

export function SpotCard({ spot, forecast, variant = 'default' }: SpotCardProps) {
  const condColor = forecast ? WIND_COLORS[forecast.condition.score] : '#5A7A8A';

  if (variant === 'compact') {
    return (
      <Link href={`/spots/${spot.slug}`} className="card-hover p-4 flex items-center justify-between group">
        <div>
          <p className="text-[10px] text-dim font-semibold uppercase tracking-widest mb-1">{spot.country}</p>
          <p className="font-bold text-white text-base" style={{ fontFamily: 'Syne, sans-serif' }}>{spot.name}</p>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            <span className="badge-dim">{TYPE_LABELS[spot.type]}</span>
            {spot.level_tags.map(l => <span key={l} className="badge-dim">{LEVEL_LABELS[l]}</span>)}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          {forecast && (
            <span className="text-lg font-bold" style={{ color: condColor, fontFamily: 'Syne, sans-serif' }}>
              {forecast.wind_speed_knots} kn
            </span>
          )}
          <div className="flex items-center gap-1 text-xs text-dim">
            <span className="text-yellow-400">★</span>
            <span className="text-white font-semibold">{spot.avg_rating.toFixed(1)}</span>
          </div>
          <span className="text-dim group-hover:text-white transition-colors text-sm">›</span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/spots/${spot.slug}`} className="card-hover overflow-hidden group flex flex-col">
      {/* Photo / placeholder */}
      <div className="h-44 bg-gradient-to-br from-ocean/20 to-card2 relative overflow-hidden flex-shrink-0">
        {spot.photo_urls[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={spot.photo_urls[0]} alt={spot.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl opacity-30">🪁</div>
        )}
        {/* Wind badge overlay */}
        {forecast && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold"
            style={{ background: `${condColor}20`, border: `1px solid ${condColor}50`, color: condColor }}>
            {forecast.wind_speed_knots} kn · {WIND_LABELS[forecast.condition.score]}
          </div>
        )}
        {spot.verified && (
          <div className="absolute top-3 left-3">
            <span className="badge-cyan">✓ Verifiziert</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] text-dim font-semibold uppercase tracking-widest mb-1">{spot.country}</p>
        <h3 className="font-bold text-white text-lg mb-2 leading-tight group-hover:text-cyan transition-colors"
          style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.03em' }}>
          {spot.name}
        </h3>

        <div className="flex gap-1.5 flex-wrap mb-3">
          <span className="badge-ocean">{TYPE_LABELS[spot.type]}</span>
          {spot.level_tags.map(l => <span key={l} className="badge-dim">{LEVEL_LABELS[l]}</span>)}
        </div>

        {spot.description && (
          <p className="text-dim text-xs leading-relaxed mb-3 line-clamp-2 flex-1">
            {spot.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-xs">★</span>
            <span className="text-white font-semibold text-sm">{spot.avg_rating.toFixed(1)}</span>
            <span className="text-dim text-xs">({spot.review_count})</span>
          </div>
          {spot.best_months.length > 0 && (
            <span className="text-dim text-xs">
              Beste Zeit: {MONTH_NAMES[spot.best_months[0]]}–{MONTH_NAMES[spot.best_months[spot.best_months.length - 1]]}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
