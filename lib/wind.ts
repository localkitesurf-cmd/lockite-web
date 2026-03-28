'use client';

import { useEffect, useState } from 'react';

const MS_TO_KNOTS = 1.94384;
const DIRECTIONS = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];

function msToKnots(ms: number) { return Math.round(ms * MS_TO_KNOTS); }
function degToDir(deg: number) { return DIRECTIONS[Math.round(deg / 22.5) % 16]; }
function scoreWind(kn: number): { score: string; label: string; color: string } {
  if (kn < 8)  return { score: 'too_light', label: 'Zu leicht', color: '#94A3B8' };
  if (kn < 12) return { score: 'light',     label: 'Leicht',    color: '#FBBF24' };
  if (kn < 18) return { score: 'good',      label: 'Gut',       color: '#4ADE80' };
  if (kn < 28) return { score: 'great',     label: 'Perfekt ✓', color: '#00C2CB' };
  return        { score: 'too_strong',      label: 'Zu stark',  color: '#F87171' };
}

export interface LiveWind {
  wind_speed_knots: number;
  wind_gusts_knots: number;
  wind_direction: number;
  wind_direction_label: string;
  temperature: number;
  condition: { score: string; label: string; color: string };
}

export interface DayForecast {
  date: string;
  day_name: string;
  wind_avg_knots: number;
  wind_max_knots: number;
  temp_max: number;
  temp_min: number;
  condition: { score: string; label: string; color: string };
}

export interface WindData {
  current: LiveWind;
  daily: DayForecast[];
  fetched_at: string;
}

const cache: Record<string, { data: WindData; ts: number }> = {};
const CACHE_MS = 60 * 60 * 1000;

export async function fetchWindData(lat: number, lng: number, spotId: string): Promise<WindData> {
  const now = Date.now();
  if (cache[spotId] && now - cache[spotId].ts < CACHE_MS) {
    return cache[spotId].data;
  }

  const params = new URLSearchParams({
    latitude:  String(lat),
    longitude: String(lng),
    hourly:    'wind_speed_10m,wind_gusts_10m,wind_direction_10m,temperature_2m',
    daily:     'wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,temperature_2m_max,temperature_2m_min',
    wind_speed_unit: 'ms',
    forecast_days: '7',
    timezone: 'auto',
  });

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!res.ok) throw new Error('Wind data unavailable');
  const raw = await res.json();

  const now2 = new Date();
  const idx = raw.hourly.time.findIndex((t: string) => new Date(t) >= now2);
  const i = idx >= 0 ? idx : 0;

  const windKn = msToKnots(raw.hourly.wind_speed_10m[i]);
  const current: LiveWind = {
    wind_speed_knots:     windKn,
    wind_gusts_knots:     msToKnots(raw.hourly.wind_gusts_10m[i]),
    wind_direction:       raw.hourly.wind_direction_10m[i],
    wind_direction_label: degToDir(raw.hourly.wind_direction_10m[i]),
    temperature:          Math.round(raw.hourly.temperature_2m[i]),
    condition:            scoreWind(windKn),
  };

  const dayNames = ['So','Mo','Di','Mi','Do','Fr','Sa'];
  const daily: DayForecast[] = raw.daily.time.map((date: string, d: number) => {
    const maxKn = msToKnots(raw.daily.wind_speed_10m_max[d]);
    const avgKn = Math.round(maxKn * 0.75);
    return {
      date,
      day_name:      dayNames[new Date(date).getDay()],
      wind_avg_knots:avgKn,
      wind_max_knots:maxKn,
      temp_max:      Math.round(raw.daily.temperature_2m_max[d]),
      temp_min:      Math.round(raw.daily.temperature_2m_min[d]),
      condition:     scoreWind(avgKn),
    };
  });

  const data: WindData = { current, daily, fetched_at: new Date().toISOString() };
  cache[spotId] = { data, ts: now };
  return data;
}

export function useWindData(lat: number, lng: number, spotId: string) {
  const [data,    setData]    = useState<WindData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    fetchWindData(lat, lng, spotId)
      .then(d => { if (!cancelled) { setData(d); setLoading(false); } })
      .catch(() => { if (!cancelled) { setError(true); setLoading(false); } });
    return () => { cancelled = true; };
  }, [lat, lng, spotId]);

  return { data, loading, error };
}
