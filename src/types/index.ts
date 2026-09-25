// Tipos principales de la aplicación

export interface Station {
  stationuuid: string;
  name: string;
  url: string;
  url_resolved: string;
  homepage: string;
  favicon: string;
  tags: string;
  country: string;
  countrycode: string;
  state: string;
  language: string;
  languagecodes: string;
  votes: number;
  lastchangetime: string;
  codec: string;
  bitrate: number;
  hls: number;
  lastcheckok: number;
  lastchecktime: string;
  clicktimestamp: string;
  clickcount: number;
  clicktrend: number;
  ssl_error: number;
  geo_lat?: number;
  geo_long?: number;
  has_extended_info?: boolean;
}

export interface LocalAd {
  id: string;
  business: string;
  category: string;
  text: string;
  city: string;
  radius: number;
  emoji: string;
  offer: string;
}

export interface ChatMessage {
  id: string;
  user: string;
  message: string;
  city: string;
  time: string;
  avatar: string;
}

export interface ScheduleItem {
  time: string;
  show: string;
  host: string;
  description: string;
  isLive: boolean;
}

export interface Genre {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export interface Country {
  code: string;
  name: string;
  emoji: string;
  stationCount: number;
}

export interface UserLocation {
  lat: number;
  lng: number;
  city: string;
  country: string;
  countryCode: string;
  loading: boolean;
  error: string | null;
}

export interface SleepTimerOption {
  label: string;
  minutes: number;
}

export type ActiveTab = 'stations' | 'favorites' | 'history' | 'schedule' | 'map';
