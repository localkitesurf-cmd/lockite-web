export type SpotType  = 'flat' | 'wave' | 'hybrid';
export type Level     = 'beginner' | 'intermediate' | 'pro';
export type WindScore = 'too_light' | 'light' | 'good' | 'great' | 'too_strong';

export interface KiteOption {
  name: string;
  type: SpotType;
  level_tags: Level[];
  wind_directions: string[];
  description: string;
}

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
  description: string;
  options: KiteOption[];
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

export const TYPE_ICONS: Record<SpotType, string> = {
  flat:   '〰️',
  wave:   '🌊',
  hybrid: '◈',
};

export const MONTH_NAMES = ['','Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];

export const MOCK_SPOTS: Spot[] = [
  {
    id:'1', name:'Tarifa', slug:'tarifa-spain',
    country:'Spain', region:'Andalusia',
    latitude:36.014, longitude:-5.601,
    type:'hybrid', level_tags:['beginner','intermediate','pro'],
    best_months:[4,5,6,7,8,9],
    wind_directions:['E','W'],
    description:'Europas Kite-Hauptstadt an der Meerenge von Gibraltar. Levante (Ostwind) und Poniente (Westwind) wehen so verlässlich, dass Tarifa zu den konsistentesten Spots weltweit zählt. Je nach Windrichtung und Level gibt es verschiedene Optionen entlang der Küste.',
    options:[
      { name:'Los Lances', type:'flat', level_tags:['beginner','intermediate'], wind_directions:['E','W'], description:'Der breite Hauptstrand von Tarifa. Flaches Wasser, ideal für Beginner und Kurse. Bei Levante perfekte Side-Shore Bedingungen.' },
      { name:'Valdevaqueros', type:'wave', level_tags:['intermediate','pro'], wind_directions:['E','W'], description:'Wellenspot westlich von Tarifa. Bei Levante brechen perfekte Wellen — einer der besten Wave-Spots Europas. Nur für erfahrene Kiter.' },
      { name:'Dos Mares', type:'flat', level_tags:['intermediate','pro'], wind_directions:['E','W'], description:'Direkt an der Meerenge, wo Atlantik und Mittelmeer aufeinandertreffen. Starker Wind und einzigartige Kulisse.' },
      { name:'Punta Paloma', type:'hybrid', level_tags:['intermediate','pro'], wind_directions:['E'], description:'Naturschutzgebiet mit Sanddünen. Bei Levante side-offshore, spektakuläre Landschaft und wenig Crowd.' },
    ],
    photo_urls:[], verified:true, avg_rating:4.9, review_count:445,
  },
  {
    id:'2', name:'Fuerteventura', slug:'fuerteventura-spain',
    country:'Spain', region:'Canary Islands',
    latitude:28.359, longitude:-14.053,
    type:'hybrid', level_tags:['beginner','intermediate','pro'],
    best_months:[3,4,5,6,7,8,9,10],
    wind_directions:['NE','N'],
    description:'Die windreichste Insel der Kanarischen Inseln. Der Nordostpassat weht hier fast das ganze Jahr verlässlich. Für jeden Level und Stil gibt es den passenden Spot.',
    options:[
      { name:'Flag Beach', type:'flat', level_tags:['beginner','intermediate','pro'], wind_directions:['NE','N'], description:'Der bekannteste Kitespot der Insel. Flaches Wasser, verlässlicher Passatwind und beste Infrastruktur.' },
      { name:'Sotavento Lagoon', type:'flat', level_tags:['intermediate','pro'], wind_directions:['NE','N'], description:'Austragungsort des Kitesurf World Cup. Perfektes Flat-Water bei starkem Wind — Mekka für Freestyle.' },
      { name:'El Cotillo', type:'wave', level_tags:['intermediate','pro'], wind_directions:['NE','N'], description:'Nordwestküste mit Atlantik-Wellen. Starker Wind und gute Wellen für Wave-Kiter.' },
      { name:'Playa de Esquinzo', type:'flat', level_tags:['beginner','intermediate'], wind_directions:['NE'], description:'Ruhigerer Spot im Süden. Flaches Wasser und etwas weniger Wind — gut für Beginner.' },
    ],
    photo_urls:[], verified:true, avg_rating:4.8, review_count:378,
  },
  {
    id:'3', name:'Lanzarote', slug:'lanzarote-spain',
    country:'Spain', region:'Canary Islands',
    latitude:29.020, longitude:-13.620,
    type:'hybrid', level_tags:['intermediate','pro'],
    best_months:[10,11,12,1,2,3,4],
    wind_directions:['N','NW','NE'],
    description:'Vulkaninsel mit starkem Nordwind und atlantischer Dünung. Spektakuläre Landschaft und verschiedene Spots für unterschiedliche Bedingungen.',
    options:[
      { name:'Famara', type:'wave', level_tags:['intermediate','pro'], wind_directions:['N','NW'], description:'Bester Wave-Spot der Insel. Starker Nordwind, atlantische Dünung und dramatische Vulkan-Klippen.' },
      { name:'El Cabezo', type:'flat', level_tags:['beginner','intermediate'], wind_directions:['NE','N'], description:'Flacher Strand an der Ostküste. Ruhigeres Wasser — gut für Einsteiger.' },
      { name:'Playa Quemada', type:'flat', level_tags:['intermediate','pro'], wind_directions:['N','NE'], description:'Versteckter Spot im Süden. Starker Wind und wenig Crowd.' },
    ],
    photo_urls:[], verified:true, avg_rating:4.7, review_count:234,
  },
  {
    id:'4', name:'Neusiedler See', slug:'neusiedler-see-austria',
    country:'Austria', region:'Burgenland',
    latitude:47.830, longitude:16.760,
    type:'flat', level_tags:['beginner','intermediate','pro'],
    best_months:[4,5,6,7,8,9,10],
    wind_directions:['N','NW','S','SW'],
    description:'Europas größter Steppensee und eines der besten Binnensee-Kite-Reviere weltweit. Flaches Wasser, verlässlicher Wind aus verschiedenen Richtungen und perfekte Infrastruktur. Das Kite-Mekka Mitteleuropas.',
    options:[
      { name:'Podersdorf am See', type:'flat', level_tags:['beginner','intermediate','pro'], wind_directions:['N','NW','S'], description:'Der bekannteste Kitespot am Neusiedler See. Breiter Sandstrand, flaches Wasser und ausgezeichnete Schulinfrastruktur. Funktioniert bei fast allen Windrichtungen.' },
      { name:'Breitenbrunn', type:'flat', level_tags:['beginner','intermediate'], wind_directions:['N','NW'], description:'Ruhigerer Spot nördlich von Podersdorf. Flaches Wasser, wenig Crowd und gut für Beginner.' },
      { name:'Neusiedl am See', type:'flat', level_tags:['beginner','intermediate'], wind_directions:['S','SW'], description:'Stadtnaher Spot am Nordufer. Bei Südwind gute Bedingungen und schnell erreichbar.' },
      { name:'Illmitz', type:'flat', level_tags:['intermediate','pro'], wind_directions:['N','NW','W'], description:'Im Nationalpark gelegen. Etwas abgelegener aber wunderschöne Naturkulisse und wenig Crowd.' },
    ],
    photo_urls:[], verified:true, avg_rating:4.6, review_count:312,
  },
  {
    id:'5', name:'Sardinien', slug:'sardinien-italy',
    country:'Italy', region:'Sardinia',
    latitude:41.200, longitude:9.100,
    type:'hybrid', level_tags:['beginner','intermediate','pro'],
    best_months:[4,5,6,7,8,9,10],
    wind_directions:['N','NW','W','SW'],
    description:'Sardinien ist eines der vielfältigsten Kite-Ziele Europas. Türkisblaues Wasser, starker Mistral und Tramontana sowie verschiedenste Spots für alle Level und Stile.',
    options:[
      { name:'Porto Pollo', type:'hybrid', level_tags:['beginner','intermediate','pro'], wind_directions:['N','NW'], description:'Der bekannteste Kitespot Sardiniens. Geschützte Bucht mit Flachwasser auf einer Seite und Welle auf der anderen. Verlässlicher Maestrale.' },
      { name:'Punta Trettu', type:'flat', level_tags:['beginner','intermediate','pro'], wind_directions:['SW','W'], description:'Flache Lagune im Südwesten. Kristallklares Wasser, starker Südwestwind — einer der schönsten Spots Europas.' },
      { name:'La Cinta', type:'flat', level_tags:['beginner','intermediate'], wind_directions:['N','NE'], description:'Langer Sandstreifen bei San Teodoro im Nordosten. Flaches Wasser und verlässlicher Nordwind.' },
      { name:'Capo Mannu', type:'wave', level_tags:['pro'], wind_directions:['NW','W'], description:'Westküste mit massiven Wellen. Nur für sehr erfahrene Wave-Kiter — einer der wildesten Spots Italiens.' },
    ],
    photo_urls:[], verified:true, avg_rating:4.7, review_count:289,
  },
  {
    id:'6', name:'Sizilien — Lo Stagnone', slug:'sizilien-lo-stagnone-italy',
    country:'Italy', region:'Sicily',
    latitude:37.870, longitude:12.470,
    type:'flat', level_tags:['beginner','intermediate','pro'],
    best_months:[4,5,6,7,8,9,10],
    wind_directions:['N','NW','W'],
    description:'Lo Stagnone ist eine flache Lagune nahe Marsala im Westen Siziliens. Das seichte warme Wasser macht es zu einem der besten Flat-Water-Spots des Mittelmeers — ideal für Beginner und Freestyler.',
    options:[
      { name:'Lo Stagnone Lagune', type:'flat', level_tags:['beginner','intermediate','pro'], wind_directions:['N','NW'], description:'Die Hauptlagune — kaum tiefer als hüfthoch, perfekt für Beginner. Starker Nordwind und warmes Mittelmeer.' },
      { name:'Birgi', type:'flat', level_tags:['intermediate','pro'], wind_directions:['NW','W'], description:'Nördlicherer Teil der Lagune mit etwas mehr Wind und Platz für Freestyle.' },
    ],
    photo_urls:[], verified:true, avg_rating:4.7, review_count:198,
  },
  {
    id:'7', name:'Languedoc', slug:'languedoc-france',
    country:'France', region:'Occitanie',
    latitude:43.100, longitude:3.200,
    type:'flat', level_tags:['beginner','intermediate','pro'],
    best_months:[4,5,6,7,8,9,10],
    wind_directions:['N','NW','S'],
    description:'Die Languedoc-Küste ist Frankreichs bestes Kite-Revier. Starker Tramontane und Mistral, flache Lagunen und viele verschiedene Spots zwischen Montpellier und der spanischen Grenze.',
    options:[
      { name:'Leucate', type:'flat', level_tags:['intermediate','pro'], wind_directions:['N','NW','S'], description:'Einer der windstärksten Spots Frankreichs. Verlässlicher Tramontane und flaches Wasser — Mekka für Freestyle und Speed.' },
      { name:'Le Barcarès', type:'flat', level_tags:['beginner','intermediate'], wind_directions:['N','NW'], description:'Breiter Strand nördlich von Perpignan. Gute Infrastruktur und etwas ruhiger als Leucate.' },
      { name:'Gruissan', type:'flat', level_tags:['beginner','intermediate','pro'], wind_directions:['N','NW'], description:'Lagunenspot bei Narbonne. Flaches Wasser und Tramontane.' },
      { name:'Hyères — Almanarre', type:'flat', level_tags:['beginner','intermediate','pro'], wind_directions:['NW','W'], description:'Südöstlich von Toulon. Verlässlicher Mistral, flache Bucht — einer der bekanntesten Spots der Côte d\'Azur.' },
    ],
    photo_urls:[], verified:true, avg_rating:4.6, review_count:267,
  },
  {
    id:'8', name:'Rhodos', slug:'rhodos-greece',
    country:'Greece', region:'Rhodes',
    latitude:35.888, longitude:27.732,
    type:'hybrid', level_tags:['beginner','intermediate','pro'],
    best_months:[5,6,7,8,9],
    wind_directions:['N','NW'],
    description:'Rhodos bietet dank des Meltemi-Winds von Mai bis September perfekte Bedingungen. Die Südspitze Prasonisi ist einzigartig — zwei Meere mit unterschiedlichen Bedingungen.',
    options:[
      { name:'Prasonisi', type:'hybrid', level_tags:['beginner','intermediate','pro'], wind_directions:['N','NW'], description:'Die Südspitze der Insel — Flachwasser auf einer Seite, Wellen auf der anderen. Spektakuläre Lage.' },
      { name:'Kremasti', type:'flat', level_tags:['beginner','intermediate'], wind_directions:['N','NW'], description:'Nordwestküste nahe Flughafen. Flaches Wasser und guter Meltemi — ideal für Kurse.' },
    ],
    photo_urls:[], verified:true, avg_rating:4.6, review_count:234,
  },
  {
    id:'9', name:'Kos', slug:'kos-greece',
    country:'Greece', region:'Kos',
    latitude:36.854, longitude:27.098,
    type:'flat', level_tags:['beginner','intermediate'],
    best_months:[5,6,7,8,9],
    wind_directions:['N','NW'],
    description:'Kos bietet perfekte Bedingungen für Beginner und Intermediate. Flaches Wasser, verlässlicher Meltemi und einfache Anreise aus Mitteleuropa.',
    options:[
      { name:'Tigaki', type:'flat', level_tags:['beginner','intermediate'], wind_directions:['N','NW'], description:'Bester Beginner-Spot der Insel. Breiter Sandstrand, flaches Wasser und sanfter Meltemi.' },
      { name:'Marmari', type:'flat', level_tags:['beginner','intermediate'], wind_directions:['N','NW'], description:'Westlich von Kos-Stadt. Ähnlich wie Tigaki aber etwas ruhiger.' },
    ],
    photo_urls:[], verified:true, avg_rating:4.4, review_count:167,
  },
  {
    id:'10', name:'Naxos', slug:'naxos-greece',
    country:'Greece', region:'Cyclades',
    latitude:37.103, longitude:25.388,
    type:'flat', level_tags:['beginner','intermediate','pro'],
    best_months:[5,6,7,8,9],
    wind_directions:['N','NW'],
    description:'Naxos gehört zu den windstärksten Inseln der Ägäis. Der Meltemi weht hier besonders stark und verlässlich — ideal für Freestyle und Speed.',
    options:[
      { name:'Laguna Beach', type:'flat', level_tags:['beginner','intermediate','pro'], wind_directions:['N','NW'], description:'Die flache Lagune bietet perfektes Flat-Water. Bei starkem Meltemi einer der besten Speed-Spots Griechenlands.' },
      { name:'Plaka', type:'flat', level_tags:['beginner','intermediate'], wind_directions:['N','NW'], description:'Langer Sandstrand südlich der Lagune. Etwas mehr Welle und gut für Intermediate.' },
    ],
    photo_urls:[], verified:true, avg_rating:4.6, review_count:198,
  },
  {
    id:'11', name:'Sylt', slug:'sylt-germany',
    country:'Germany', region:'Schleswig-Holstein',
    latitude:54.902, longitude:8.298,
    type:'hybrid', level_tags:['intermediate','pro'],
    best_months:[4,5,6,7,8,9,10],
    wind_directions:['W','SW','NW'],
    description:'Deutschlands Nordseeinsel Nummer 1 für Kitesurfen. Starker Westwind, Nordsee-Wellen und langer Sandstrand.',
    options:[
      { name:'Westerland', type:'wave', level_tags:['intermediate','pro'], wind_directions:['W','NW'], description:'Hauptstrand mit Nordsee-Wellen. Bei Westwind perfekte Wave-Bedingungen.' },
      { name:'Rantum', type:'hybrid', level_tags:['intermediate','pro'], wind_directions:['W','SW'], description:'Südlicher Teil. Etwas geschützter aber immer noch gute Bedingungen.' },
      { name:'Hörnum', type:'flat', level_tags:['intermediate'], wind_directions:['SW','W'], description:'Südspitze der Insel. Bei Südwestwind flacheres Wasser.' },
    ],
    photo_urls:[], verified:true, avg_rating:4.5, review_count:212,
  },
  {
    id:'12', name:'Fehmarn', slug:'fehmarn-germany',
    country:'Germany', region:'Schleswig-Holstein',
    latitude:54.432, longitude:11.197,
    type:'flat', level_tags:['beginner','intermediate','pro'],
    best_months:[5,6,7,8,9],
    wind_directions:['W','SW','NW','N'],
    description:'Deutschlands Kite-Insel in der Ostsee. Flaches Wasser, verlässlicher Wind und ausgezeichnete Infrastruktur für alle Level.',
    options:[
      { name:'Großenbrode', type:'flat', level_tags:['beginner','intermediate'], wind_directions:['W','NW'], description:'Bester Beginner-Spot. Flaches Wasser und gute Schulinfrastruktur.' },
      { name:'Markelsdorfer Huk', type:'flat', level_tags:['intermediate','pro'], wind_directions:['N','NW'], description:'Nordspitze der Insel. Bei Nordwind gute Bedingungen und wenig Crowd.' },
      { name:'Südstrand', type:'flat', level_tags:['beginner','intermediate'], wind_directions:['SW','W'], description:'Südküste mit flachem Wasser. Bei Südwestwind ideal.' },
    ],
    photo_urls:[], verified:true, avg_rating:4.4, review_count:178,
  },
  {
    id:'13', name:'Dakhla', slug:'dakhla-morocco',
    country:'Morocco', region:'Dakhla-Oued Ed-Dahab',
    latitude:23.718, longitude:-15.936,
    type:'flat', level_tags:['beginner','intermediate','pro'],
    best_months:[3,4,5,6,7,8,9,10],
    wind_directions:['N','NE'],
    description:'Die flache Lagune von Dakhla ist ein Weltklasse-Kitespot. Passatwinde wehen fast das ganze Jahr, warmes Wasser und beeindruckende Wüstenlandschaft.',
    options:[
      { name:'Dakhla Lagoon', type:'flat', level_tags:['beginner','intermediate','pro'], wind_directions:['N','NE'], description:'Die Hauptlagune — flaches warmes Wasser, starker Passatwind und Side-Shore Bedingungen. Weltklasse Flat-Water.' },
      { name:'Dragon Back', type:'flat', level_tags:['intermediate','pro'], wind_directions:['N','NE'], description:'Schmaler Sandstreifen in der Mitte der Lagune. Für Fortgeschrittene mit stärkerem Wind.' },
      { name:'Speed Strip', type:'flat', level_tags:['pro'], wind_directions:['N'], description:'Spezieller Speed-Run-Bereich. Starker Wind und optimale Bedingungen für Rekordversuche.' },
    ],
    photo_urls:[], verified:true, avg_rating:4.9, review_count:334,
  },
  {
    id:'14', name:'Essaouira', slug:'essaouira-morocco',
    country:'Morocco', region:'Marrakech-Safi',
    latitude:31.508, longitude:-9.760,
    type:'flat', level_tags:['intermediate','pro'],
    best_months:[4,5,6,7,8,9],
    wind_directions:['N','NE'],
    description:'Die Stadt des Windes. Der Alizé weht von April bis September verlässlich stark. Kombinierbar mit einem Besuch der wunderschönen Medina.',
    options:[
      { name:'Plage d\'Essaouira', type:'flat', level_tags:['intermediate','pro'], wind_directions:['N','NE'], description:'Hauptstrand. Langer Sandstrand, starker Wind und einfacher Zugang.' },
      { name:'Sidi Kaouki', type:'wave', level_tags:['intermediate','pro'], wind_directions:['N','NE'], description:'15km südlich. Wellen und starker Wind — wilder und ursprünglicher.' },
    ],
    photo_urls:[], verified:true, avg_rating:4.6, review_count:212,
  },
  {
    id:'15', name:'Zanzibar', slug:'zanzibar-tanzania',
    country:'Tanzania', region:'Zanzibar',
    latitude:-6.267, longitude:39.533,
    type:'flat', level_tags:['beginner','intermediate','pro'],
    best_months:[6,7,8,9,10],
    wind_directions:['SE','S'],
    description:'Paje Beach auf Sansibar ist Ostafrikas bester Kitespot. Türkisfarbenes flaches Wasser und verlässlicher Kaskazi-Wind. Absolute Bucket-List.',
    options:[
      { name:'Paje Beach', type:'flat', level_tags:['beginner','intermediate','pro'], wind_directions:['SE','S'], description:'Hauptspot. Flaches warmes Wasser bei Ebbe, verlässlicher Südostwind und traumhafter weißer Sandstrand.' },
      { name:'Bwejuu', type:'flat', level_tags:['beginner','intermediate'], wind_directions:['SE'], description:'Nördlich von Paje. Etwas ruhiger — gut für Beginner-Kurse.' },
      { name:'Jambiani', type:'flat', level_tags:['intermediate','pro'], wind_directions:['SE','S'], description:'Südlicher Strand. Weniger Crowd und gute Bedingungen.' },
    ],
    photo_urls:[], verified:true, avg_rating:4.8, review_count:278,
  },
  {
    id:'16', name:'Jericoacoara', slug:'jericoacoara-brazil',
    country:'Brazil', region:'Ceará',
    latitude:-2.795, longitude:-40.513,
    type:'flat', level_tags:['beginner','intermediate','pro'],
    best_months:[7,8,9,10,11,12,1],
    wind_directions:['E','SE'],
    description:'Einer der legendärsten Kitespots weltweit. Ein magisches Dorf ohne Straßen, flache Lagunen und der verlässlichste Passatwind Brasiliens.',
    options:[
      { name:'Lagoa Azul', type:'flat', level_tags:['beginner','intermediate','pro'], wind_directions:['E','SE'], description:'Die blaue Lagune — perfektes Flat-Water, warmes Wasser und starker Side-Shore Wind.' },
      { name:'Praia do Jericoacoara', type:'flat', level_tags:['intermediate','pro'], wind_directions:['E','SE'], description:'Hauptstrand mit direktem Atlantik-Exposure. Etwas mehr Chop aber sehr verlässlich.' },
      { name:'Lagoa do Paraíso', type:'flat', level_tags:['beginner'], wind_directions:['E'], description:'Süßwasserlagune landeinwärts. Absolut flach — perfekt für absolute Beginner.' },
    ],
    photo_urls:[], verified:true, avg_rating:4.9, review_count:423,
  },
  {
    id:'17', name:'Cabarete', slug:'cabarete-dominican-republic',
    country:'Dominican Republic', region:'Puerto Plata',
    latitude:19.758, longitude:-70.414,
    type:'hybrid', level_tags:['beginner','intermediate','pro'],
    best_months:[3,4,5,6,7,8],
    wind_directions:['E','NE'],
    description:'Karibik-Kite-Hauptstadt. Thermischer Wind, warmes Wasser und lebhafte internationale Szene. Flat-Water und Wave in einer Destination.',
    options:[
      { name:'Kite Beach', type:'flat', level_tags:['beginner','intermediate'], wind_directions:['E','NE'], description:'Hauptspot. Flaches Wasser hinter dem Riff — ideal für Beginner und Freestyle.' },
      { name:'Bozo Beach', type:'wave', level_tags:['intermediate','pro'], wind_directions:['E','NE'], description:'Außerhalb des Riffs. Wellen und stärkerer Wind für erfahrene Kiter.' },
    ],
    photo_urls:[], verified:true, avg_rating:4.6, review_count:245,
  },
  {
    id:'18', name:'Maui', slug:'maui-hawaii-usa',
    country:'USA', region:'Hawaii',
    latitude:20.793, longitude:-156.459,
    type:'hybrid', level_tags:['intermediate','pro'],
    best_months:[4,5,6,7,8,9,10,11],
    wind_directions:['NE','N'],
    description:'Maui ist das Mekka des Kitesurfens. Verlässlicher Tradewind, türkisblaues Wasser und epische Wellen.',
    options:[
      { name:'Kanaha Kite Beach', type:'flat', level_tags:['intermediate','pro'], wind_directions:['NE','N'], description:'Hauptspot auf Maui. Flaches Wasser, starker Tradewind und weltklasse Infrastruktur.' },
      { name:'Hookipa', type:'wave', level_tags:['pro'], wind_directions:['NE'], description:'Weltberühmter Wave-Spot. Massive Wellen — nur für Experten.' },
      { name:'Spreckelsville', type:'flat', level_tags:['intermediate'], wind_directions:['NE','N'], description:'Nördlich von Kanaha. Etwas ruhiger — gut für Intermediate.' },
    ],
    photo_urls:[], verified:true, avg_rating:4.9, review_count:356,
  },
  {
    id:'19', name:'Boracay', slug:'boracay-philippines',
    country:'Philippines', region:'Aklan',
    latitude:11.964, longitude:121.929,
    type:'flat', level_tags:['beginner','intermediate','pro'],
    best_months:[11,12,1,2,3,4],
    wind_directions:['NE','E'],
    description:'Asiens bekanntester Kitespot. Bulabog Beach bietet flaches warmes Wasser und verlässlichen Amihan-Wind von November bis April.',
    options:[
      { name:'Bulabog Beach', type:'flat', level_tags:['beginner','intermediate','pro'], wind_directions:['NE','E'], description:'Hauptspot. Geschützte Bucht mit flachem Wasser und konstantem Amihan. Weltklasse.' },
      { name:'Ilig-Iligan', type:'wave', level_tags:['pro'], wind_directions:['NE'], description:'Nordspitze der Insel. Wellen und stärkerer Wind für erfahrene Kiter.' },
    ],
    photo_urls:[], verified:true, avg_rating:4.7, review_count:312,
  },
  {
    id:'20', name:'Mui Ne', slug:'mui-ne-vietnam',
    country:'Vietnam', region:'Bình Thuận',
    latitude:10.933, longitude:108.287,
    type:'flat', level_tags:['beginner','intermediate'],
    best_months:[11,12,1,2,3],
    wind_directions:['NE','E'],
    description:'Asiens zugänglichster Kitespot. Verlässliche Passatwinde, warmes Wasser, günstig. Perfekt für Beginner-Kurse.',
    options:[
      { name:'Mui Ne Main Beach', type:'flat', level_tags:['beginner','intermediate'], wind_directions:['NE','E'], description:'Hauptstrand. Flaches Wasser, verlässlicher Wind und beste Infrastruktur für Kurse.' },
      { name:'Mũi Né Lagoon', type:'flat', level_tags:['beginner'], wind_directions:['NE'], description:'Kleine Lagune abseits. Absolut flach — ideal für absolute Beginner.' },
    ],
    photo_urls:[], verified:true, avg_rating:4.4, review_count:223,
  },
  {
    id:'21', name:'Kapverden', slug:'kapverden-cape-verde',
    country:'Cape Verde', region:'Sal & Boa Vista',
    latitude:16.400, longitude:-22.900,
    type:'flat', level_tags:['beginner','intermediate','pro'],
    best_months:[11,12,1,2,3,4,5,6],
    wind_directions:['NE','N'],
    description:'Die Kapverden bieten einen der verlässlichsten Winde weltweit. Der Passatwind weht fast das ganze Jahr. Zwei Hauptinseln mit unterschiedlichem Charakter.',
    options:[
      { name:'Santa Maria, Sal', type:'flat', level_tags:['beginner','intermediate','pro'], wind_directions:['NE','N'], description:'Hauptspot der Insel Sal. Bestes Infrastruktur-Angebot und verlässlichster Wind.' },
      { name:'Kite Beach Sal', type:'flat', level_tags:['intermediate','pro'], wind_directions:['NE'], description:'Offizieller Kitespot auf Sal. Etwas stärkerer Wind und mehr Platz.' },
      { name:'Chaves Beach, Boa Vista', type:'flat', level_tags:['beginner','intermediate'], wind_directions:['NE','N'], description:'Boa Vista ist ruhiger und naturbelassener als Sal. Endlose weiße Sandstrände.' },
    ],
    photo_urls:[], verified:true, avg_rating:4.7, review_count:289,
  },
  {
    id:'22', name:'Ägypten — Rotes Meer', slug:'aegypten-rotes-meer',
    country:'Egypt', region:'Red Sea',
    latitude:27.200, longitude:33.800,
    type:'flat', level_tags:['beginner','intermediate','pro'],
    best_months:[3,4,5,6,7,8,9,10],
    wind_directions:['N','NW'],
    description:'Europas beliebtestes Winter-Kite-Ziel. Verlässlicher Nordwind, warmes klares Wasser und kurze Flugzeiten aus Mitteleuropa. Mehrere Spots entlang der Küste.',
    options:[
      { name:'Safaga', type:'flat', level_tags:['beginner','intermediate','pro'], wind_directions:['N','NW'], description:'Windstärkster Spot am Roten Meer. Täglich starker Nordwind — beliebt für Speed und Freestyle.' },
      { name:'El Gouna', type:'flat', level_tags:['beginner','intermediate'], wind_directions:['N','NW'], description:'Luxuriöses Resort-Feeling. Flaches Wasser und hervorragende Infrastruktur.' },
      { name:'Soma Bay', type:'flat', level_tags:['beginner','intermediate'], wind_directions:['N','NW'], description:'Halbinsel mit Lagune. Ideal für Beginner.' },
      { name:'Ras Sudr', type:'flat', level_tags:['beginner','intermediate'], wind_directions:['N','NW'], description:'Golf von Suez. Sehr flaches Wasser — beliebtester Beginner-Spot Ägyptens.' },
      { name:'Hamata', type:'flat', level_tags:['beginner','intermediate','pro'], wind_directions:['N','NW'], description:'Geheimtipp im Süden. Kristallklares Wasser und kaum Crowd.' },
    ],
    photo_urls:[], verified:true, avg_rating:4.6, review_count:367,
  },
  {
    id:'23', name:'Langebaan', slug:'langebaan-south-africa',
    country:'South Africa', region:'Western Cape',
    latitude:-33.093, longitude:18.035,
    type:'flat', level_tags:['beginner','intermediate','pro'],
    best_months:[11,12,1,2,3,4],
    wind_directions:['S','SE'],
    description:'Bester Kitespot Südafrikas. Der Cape Doctor weht im Sommer täglich stark. Absolut flaches Wasser in der Lagune.',
    options:[
      { name:'Club Mykonos', type:'flat', level_tags:['beginner','intermediate','pro'], wind_directions:['S','SE'], description:'Hauptspot in der Lagune. Bestes Flat-Water, starker Cape Doctor und ausgezeichnete Schulen.' },
      { name:'Langebaan Lagoon North', type:'flat', level_tags:['intermediate','pro'], wind_directions:['S'], description:'Nördlicher Teil. Etwas mehr Wind und Platz für Fortgeschrittene.' },
    ],
    photo_urls:[], verified:true, avg_rating:4.7, review_count:212,
  },
];

export const MOCK_FORECAST: Record<string, CurrentForecast> = {
  '1':  { wind_speed_knots:22, wind_gusts_knots:28, wind_direction:110, wind_direction_label:'OSO', temperature:24, condition:{ score:'great', label:'Perfekt ✓', color:'#00C2CB' } },
  '2':  { wind_speed_knots:19, wind_gusts_knots:24, wind_direction:45,  wind_direction_label:'NO',  temperature:22, condition:{ score:'good',  label:'Gut',       color:'#4ADE80' } },
  '4':  { wind_speed_knots:16, wind_gusts_knots:20, wind_direction:315, wind_direction_label:'NW',  temperature:18, condition:{ score:'good',  label:'Gut',       color:'#4ADE80' } },
  '5':  { wind_speed_knots:18, wind_gusts_knots:23, wind_direction:315, wind_direction_label:'NW',  temperature:22, condition:{ score:'good',  label:'Gut',       color:'#4ADE80' } },
  '13': { wind_speed_knots:25, wind_gusts_knots:32, wind_direction:45,  wind_direction_label:'NO',  temperature:22, condition:{ score:'great', label:'Perfekt ✓', color:'#00C2CB' } },
  '16': { wind_speed_knots:18, wind_gusts_knots:22, wind_direction:135, wind_direction_label:'SO',  temperature:30, condition:{ score:'good',  label:'Gut',       color:'#4ADE80' } },
  '17': { wind_speed_knots:19, wind_gusts_knots:24, wind_direction:90,  wind_direction_label:'O',   temperature:28, condition:{ score:'good',  label:'Gut',       color:'#4ADE80' } },
  '18': { wind_speed_knots:24, wind_gusts_knots:30, wind_direction:45,  wind_direction_label:'NO',  temperature:27, condition:{ score:'great', label:'Perfekt ✓', color:'#00C2CB' } },
  '20': { wind_speed_knots:14, wind_gusts_knots:18, wind_direction:45,  wind_direction_label:'NO',  temperature:31, condition:{ score:'good',  label:'Gut',       color:'#4ADE80' } },
  '15': { wind_speed_knots:20, wind_gusts_knots:25, wind_direction:157, wind_direction_label:'SSO', temperature:27, condition:{ score:'good',  label:'Gut',       color:'#4ADE80' } },
};

const API = process.env.NEXT_PUBLIC_API_URL ?? '';

export async function fetchSpots(params?: Record<string, string>) {
  if (!API) return { spots: MOCK_SPOTS, total: MOCK_SPOTS.length };
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  const res = await fetch(`${API}/spots${qs}`, { next: { revalidate: 300 } });
  if (!res.ok) return { spots: MOCK_SPOTS, total: MOCK_SPOTS.length };
  return res.json();
}
