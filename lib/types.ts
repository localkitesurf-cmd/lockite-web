// ── Types ─────────────────────────────────────────────────────
export type SpotType  = 'flat' | 'wave' | 'hybrid';
export type Level     = 'beginner' | 'intermediate' | 'pro';
export type WindScore = 'too_light' | 'light' | 'good' | 'great' | 'too_strong';

export interface Spot {
  id: string;
  name: string;
  slug: string;
  country: string;
  region?: string;
  latitude: number;
  longitude: number;
  type: SpotType;
  level_tags: Level[];
  best_months: number[];
  wind_directions: string[];
  description?: string;
  photo_urls: string[];
  verified: boolean;
  avg_rating: number;
  review_count: number;
}

export interface WindCondition {
  score: WindScore;
  label: string;
  color: string;
}

export interface DailyForecast {
  date: string;
  day_name: string;
  wind_avg_knots: number;
  wind_max_knots: number;
  temperature_max: number;
  temperature_min: number;
  condition: WindCondition;
}

export interface CurrentForecast {
  wind_speed_knots: number;
  wind_gusts_knots: number;
  wind_direction: number;
  wind_direction_label: string;
  temperature: number;
  condition: WindCondition;
}

export interface SpotForecast {
  spot_id: string;
  current: CurrentForecast;
  daily: DailyForecast[];
}

// ── Constants ─────────────────────────────────────────────────
export const WIND_COLORS: Record<WindScore, string> = {
  too_light: '#94A3B8',
  light:     '#FBBF24',
  good:      '#4ADE80',
  great:     '#00C2CB',
  too_strong:'#F87171',
};

export const WIND_LABELS: Record<WindScore, string> = {
  too_light: 'Zu leicht',
  light:     'Leicht',
  good:      'Gut',
  great:     'Perfekt ✓',
  too_strong:'Zu stark',
};

export const LEVEL_LABELS: Record<Level, string> = {
  beginner:     'Beginner',
  intermediate: 'Intermediate',
  pro:          'Pro',
};

export const TYPE_LABELS: Record<SpotType, string> = {
  flat:   'Flachwasser',
  wave:   'Wave',
  hybrid: 'Hybrid',
};

export const MONTH_NAMES = ['','Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];

// ── API helpers ────────────────────────────────────────────────
const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1';

export async function fetchSpots(params?: Record<string, string>) {
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  const res = await fetch(`${API}/spots${qs}`, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error('Failed to fetch spots');
  return res.json();
}

export async function fetchSpot(id: string) {
  const res = await fetch(`${API}/spots/${id}`, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error('Spot not found');
  return res.json();
}

export async function fetchForecast(spotId: string): Promise<SpotForecast> {
  const res = await fetch(`${API}/forecast/spot/${spotId}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Forecast unavailable');
  return res.json();
}

// ── Mock data for StackBlitz / development ────────────────────
export const MOCK_SPOTS: Spot[] = [
  { id:'1', name:'Tarifa', slug:'tarifa-spain', country:'Spain', region:'Andalusia', latitude:36.014, longitude:-5.601, type:'flat', level_tags:['intermediate','pro'], best_months:[4,5,6,7,8,9], wind_directions:['W','SW','E'], description:'Europas Kite-Hauptstadt. Der Levante und Poniente wehen so zuverlässig, dass Tarifa zu den konsistentesten Spots der Welt zählt.', photo_urls:[], verified:true, avg_rating:4.7, review_count:142 },
  { id:'2', name:'Jericoacoara', slug:'jericoacoara-brazil', country:'Brazil', region:'Ceará', latitude:-2.795, longitude:-40.513, type:'flat', level_tags:['beginner','intermediate','pro'], best_months:[7,8,9,10,11,12,1], wind_directions:['E','SE'], description:'Flache Lagunen, seitlicher Passatwind und ein legendärer Strand. Perfekt für alle Level.', photo_urls:[], verified:true, avg_rating:4.9, review_count:389 },
  { id:'3', name:'Dakhla', slug:'dakhla-morocco', country:'Morocco', region:'Dakhla-Oued', latitude:23.718, longitude:-15.936, type:'flat', level_tags:['beginner','pro'], best_months:[3,4,5,6,7,8,9,10], wind_directions:['N','NE'], description:'Die flache Lagune von Dakhla ist ein Paradiese für Kiter — Passatwinde, warmes Wasser, beeindruckende Wüstenlandschaft.', photo_urls:[], verified:true, avg_rating:4.8, review_count:276 },
  { id:'4', name:'Mui Ne', slug:'mui-ne-vietnam', country:'Vietnam', region:'Bình Thuận', latitude:10.933, longitude:108.287, type:'flat', level_tags:['beginner','intermediate'], best_months:[11,12,1,2,3], wind_directions:['NE','E'], description:'Verlässliche Passatwinde, warmes Wasser und bezahlbare Infrastruktur machen Mui Ne zum Pflichtspot in Asien.', photo_urls:[], verified:true, avg_rating:4.4, review_count:98 },
  { id:'5', name:'Cabarete', slug:'cabarete-dominican-republic', country:'Dominican Republic', region:'Puerto Plata', latitude:19.758, longitude:-70.414, type:'wave', level_tags:['intermediate','pro'], best_months:[3,4,5,6,7,8], wind_directions:['E','NE'], description:'Karibik-Vibes mit konstantem Thermalwind und einer lebhaften Kite-Szene.', photo_urls:[], verified:true, avg_rating:4.6, review_count:211 },
];

export const MOCK_FORECAST: Record<string, CurrentForecast> = {
  '1': { wind_speed_knots:22, wind_gusts_knots:28, wind_direction:110, wind_direction_label:'OSO', temperature:24, condition:{ score:'great', label:'Perfekt ✓', color:'#00C2CB' } },
  '2': { wind_speed_knots:18, wind_gusts_knots:22, wind_direction:135, wind_direction_label:'SO',  temperature:30, condition:{ score:'good',  label:'Gut',      color:'#4ADE80' } },
  '3': { wind_speed_knots:25, wind_gusts_knots:32, wind_direction:45,  wind_direction_label:'NO',  temperature:22, condition:{ score:'great', label:'Perfekt ✓', color:'#00C2CB' } },
  '4': { wind_speed_knots:14, wind_gusts_knots:18, wind_direction:45,  wind_direction_label:'NO',  temperature:31, condition:{ score:'good',  label:'Gut',      color:'#4ADE80' } },
  '5': { wind_speed_knots:19, wind_gusts_knots:24, wind_direction:90,  wind_direction_label:'O',   temperature:28, condition:{ score:'good',  label:'Gut',      color:'#4ADE80' } },
};
