import { Station } from '../types';

// Radio Browser API - https://www.radio-browser.info/
// API gratuita con miles de emisoras de radio reales
const API_BASE_URLS = [
  'https://de1.api.radio-browser.info',
  'https://fi1.api.radio-browser.info',
  'https://nl1.api.radio-browser.info',
];

let currentApiIndex = 0;

function getApiUrl(): string {
  return API_BASE_URLS[currentApiIndex];
}

function rotateApi(): void {
  currentApiIndex = (currentApiIndex + 1) % API_BASE_URLS.length;
}

// Headers requeridos por la API
const headers = {
  'User-Agent': 'PulsarFM/1.0 (https://pulsarfm.app)',
};

/**
 * Buscar emisoras por nombre
 */
export async function searchStationsByName(name: string, limit: number = 50): Promise<Station[]> {
  try {
    const url = `${getApiUrl()}/json/stations/search`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        order: 'clickcount',
        reverse: true,
        limit: limit,
        hidebroken: true,
      }),
    });

    if (!response.ok) throw new Error('Error searching stations');
    return await response.json();
  } catch (error) {
    console.error('Error searching stations:', error);
    rotateApi();
    return [];
  }
}

/**
 * Obtener emisoras por país
 */
export async function getStationsByCountry(countryCode: string, limit: number = 50): Promise<Station[]> {
  try {
    const url = `${getApiUrl()}/json/stations/bycountrycodeexact/${countryCode}?limit=${limit}&order=clickcount&reverse=true&hidebroken=true`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error('Error fetching stations by country');
    return await response.json();
  } catch (error) {
    console.error('Error fetching stations by country:', error);
    rotateApi();
    return [];
  }
}

/**
 * Obtener emisoras por tag/género
 */
export async function getStationsByTag(tag: string, limit: number = 50): Promise<Station[]> {
  try {
    const url = `${getApiUrl()}/json/stations/bytag/${encodeURIComponent(tag)}?limit=${limit}&order=clickcount&reverse=true&hidebroken=true`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error('Error fetching stations by tag');
    return await response.json();
  } catch (error) {
    console.error('Error fetching stations by tag:', error);
    rotateApi();
    return [];
  }
}

/**
 * Obtener top emisoras (más escuchadas)
 */
export async function getTopStations(limit: number = 50): Promise<Station[]> {
  try {
    const url = `${getApiUrl()}/json/stations/topclick/${limit}?hidebroken=true`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error('Error fetching top stations');
    return await response.json();
  } catch (error) {
    console.error('Error fetching top stations:', error);
    rotateApi();
    return [];
  }
}

/**
 * Obtener emisoras trending (mayor tendencia)
 */
export async function getTrendingStations(limit: number = 50): Promise<Station[]> {
  try {
    const url = `${getApiUrl()}/json/stations/topclick/${limit}?hidebroken=true&order=clicktrend&reverse=true`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error('Error fetching trending stations');
    return await response.json();
  } catch (error) {
    console.error('Error fetching trending stations:', error);
    rotateApi();
    return [];
  }
}

/**
 * Obtener emisoras por coordenadas geográficas (cercanas)
 */
export async function getStationsByGeo(lat: number, lng: number, limit: number = 30): Promise<Station[]> {
  try {
    const url = `${getApiUrl()}/json/stations/search`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        has_geo_info: 1,
        order: 'clickcount',
        reverse: true,
        limit: limit,
        hidebroken: true,
      }),
    });

    if (!response.ok) throw new Error('Error fetching geo stations');
    const stations: Station[] = await response.json();
    
    // Filtrar y ordenar por distancia
    return stations
      .filter((s) => s.geo_lat && s.geo_long)
      .map((s) => ({
        ...s,
        _distance: getDistance(lat, lng, s.geo_lat!, s.geo_long!),
      }))
      .sort((a, b) => (a as any)._distance - (b as any)._distance)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching geo stations:', error);
    rotateApi();
    return [];
  }
}

/**
 * Obtener todos los tags disponibles
 */
export async function getAllTags(limit: number = 100): Promise<{ name: string; stationcount: number }[]> {
  try {
    const url = `${getApiUrl()}/json/tags?order=stationcount&reverse=true&limit=${limit}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error('Error fetching tags');
    return await response.json();
  } catch (error) {
    console.error('Error fetching tags:', error);
    rotateApi();
    return [];
  }
}

/**
 * Obtener todos los países
 */
export async function getAllCountries(): Promise<{ name: string; stationcount: number; iso_3166_1: string }[]> {
  try {
    const url = `${getApiUrl()}/json/countries?order=stationcount&reverse=true`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error('Error fetching countries');
    return await response.json();
  } catch (error) {
    console.error('Error fetching countries:', error);
    rotateApi();
    return [];
  }
}

/**
 * Contar clics en una emisora (feedback a la API)
 */
export async function clickStation(stationId: string): Promise<void> {
  try {
    const url = `${getApiUrl()}/json/url/${stationId}`;
    await fetch(url, { headers });
  } catch (error) {
    console.error('Error clicking station:', error);
  }
}

/**
 * Votar por una emisora
 */
export async function voteStation(stationId: string): Promise<boolean> {
  try {
    const url = `${getApiUrl()}/json/vote/${stationId}`;
    const response = await fetch(url, { headers });
    return response.ok;
  } catch (error) {
    console.error('Error voting station:', error);
    return false;
  }
}

/**
 * Calcular distancia entre dos puntos (Haversine formula)
 */
function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Radio de la Tierra en km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Formatear número de oyentes
 */
export function formatListeners(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}

/**
 * Obtener emoji de género basado en tags
 */
export function getGenreEmoji(tags: string): string {
  const tagsLower = tags.toLowerCase();
  if (tagsLower.includes('pop')) return '🎵';
  if (tagsLower.includes('rock')) return '🎸';
  if (tagsLower.includes('jazz')) return '🎷';
  if (tagsLower.includes('classical') || tagsLower.includes('classic')) return '🎻';
  if (tagsLower.includes('electronic') || tagsLower.includes('edm') || tagsLower.includes('techno')) return '🎧';
  if (tagsLower.includes('hip hop') || tagsLower.includes('rap') || tagsLower.includes('trap')) return '🔥';
  if (tagsLower.includes('reggae') || tagsLower.includes('ska')) return '🌿';
  if (tagsLower.includes('latin') || tagsLower.includes('salsa') || tagsLower.includes('reggaeton')) return '💃';
  if (tagsLower.includes('country')) return '🤠';
  if (tagsLower.includes('blues')) return '🎹';
  if (tagsLower.includes('metal')) return '🤘';
  if (tagsLower.includes('ambient') || tagsLower.includes('chill')) return '🌙';
  if (tagsLower.includes('news') || tagsLower.includes('talk')) return '📰';
  if (tagsLower.includes('sports')) return '⚽';
  if (tagsLower.includes('religious') || tagsLower.includes('gospel')) return '🙏';
  if (tagsLower.includes('children')) return '🧸';
  return '📻';
}

/**
 * Obtener color basado en género
 */
export function getGenreColor(tags: string): string {
  const tagsLower = tags.toLowerCase();
  if (tagsLower.includes('pop')) return '#ec4899';
  if (tagsLower.includes('rock')) return '#ef4444';
  if (tagsLower.includes('jazz')) return '#06b6d4';
  if (tagsLower.includes('classical') || tagsLower.includes('classic')) return '#8b5cf6';
  if (tagsLower.includes('electronic') || tagsLower.includes('edm')) return '#6366f1';
  if (tagsLower.includes('hip hop') || tagsLower.includes('rap')) return '#eab308';
  if (tagsLower.includes('reggae')) return '#10b981';
  if (tagsLower.includes('latin') || tagsLower.includes('salsa')) return '#f97316';
  if (tagsLower.includes('country')) return '#a855f7';
  if (tagsLower.includes('blues')) return '#3b82f6';
  if (tagsLower.includes('metal')) return '#64748b';
  if (tagsLower.includes('ambient') || tagsLower.includes('chill')) return '#14b8a6';
  if (tagsLower.includes('news')) return '#f43f5e';
  return '#6366f1';
}
