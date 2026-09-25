// Audius API Integration
// Documentación: https://api.audius.co

export interface AudiusTrack {
  id: string;
  title: string;
  duration: number;
  artwork: Array<{
    width: number;
    height: number;
    link: string;
  }>;
  user: {
    id: string;
    name: string;
    handle: string;
    artwork: Array<{
      width: number;
      height: number;
      link: string;
    }>;
  };
  stream_url?: string;
  download_url?: string;
  permalink?: string;
  genre?: string;
  mood?: string;
  tags?: string;
  description?: string;
  release_date?: string;
  play_count?: number;
  favorite_count?: number;
  repost_count?: number;
  comment_count?: number;
}

export interface AudiusUser {
  id: string;
  handle: string;
  name: string;
  bio: string;
  location: string;
  artwork: Array<{
    width: number;
    height: number;
    link: string;
  }>;
  cover_photo: Array<{
    width: number;
    height: number;
    link: string;
  }>;
  follower_count: number;
  following_count: number;
  track_count: number;
}

// Hosts de discovery providers de Audius
const DISCOVERY_HOSTS = [
  'https://discoveryprovider.audius.co',
  'https://discovery-au.audius.co',
  'https://discovery-us.audius.co',
];

let currentHostIndex = 0;

function getHost(): string {
  return DISCOVERY_HOSTS[currentHostIndex];
}

function rotateHost(): void {
  currentHostIndex = (currentHostIndex + 1) % DISCOVERY_HOSTS.length;
}

// API Key de Audius (pública para desarrollo)
const API_KEY = 'quawe-radio-app';

/**
 * Obtener perfil de usuario por handle
 */
export async function getUserByHandle(handle: string): Promise<AudiusUser | null> {
  try {
    const url = `${getHost()}/v1/users/handle/${handle}?app_name=${API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error fetching user: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching Audius user:', error);
    rotateHost();
    return null;
  }
}

/**
 * Obtener tracks de un usuario por handle
 */
export async function getUserTracks(
  handle: string,
  limit: number = 50,
  offset: number = 0
): Promise<AudiusTrack[]> {
  try {
    const url = `${getHost()}/v1/users/handle/${handle}/tracks?limit=${limit}&offset=${offset}&app_name=${API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error fetching tracks: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching Audius tracks:', error);
    rotateHost();
    return [];
  }
}

/**
 * Obtener URL de streaming de un track
 */
export async function getTrackStreamUrl(trackId: string): Promise<string | null> {
  try {
    const url = `${getHost()}/v1/tracks/${trackId}/stream?app_name=${API_KEY}`;
    
    // Audius redirige a la URL de streaming real
    const response = await fetch(url, { redirect: 'follow' });
    
    if (!response.ok) {
      throw new Error(`Error fetching stream URL: ${response.statusText}`);
    }
    
    return response.url;
  } catch (error) {
    console.error('Error fetching stream URL:', error);
    rotateHost();
    return null;
  }
}

/**
 * Obtener track por ID
 */
export async function getTrackById(trackId: string): Promise<AudiusTrack | null> {
  try {
    const url = `${getHost()}/v1/tracks/${trackId}?app_name=${API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error fetching track: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching Audius track:', error);
    rotateHost();
    return null;
  }
}

/**
 * Buscar tracks
 */
export async function searchTracks(
  query: string,
  limit: number = 20
): Promise<AudiusTrack[]> {
  try {
    const url = `${getHost()}/v1/tracks/search?query=${encodeURIComponent(query)}&limit=${limit}&app_name=${API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error searching tracks: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error searching Audius tracks:', error);
    rotateHost();
    return [];
  }
}

/**
 * Obtener trending tracks
 */
export async function getTrendingTracks(limit: number = 20): Promise<AudiusTrack[]> {
  try {
    const url = `${getHost()}/v1/tracks/trending?limit=${limit}&app_name=${API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error fetching trending tracks: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching trending tracks:', error);
    rotateHost();
    return [];
  }
}

/**
 * Formatear duración de segundos a MM:SS
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Formatear número de plays
 */
export function formatPlayCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

/**
 * Obtener artwork URL de mayor resolución
 */
export function getArtworkUrl(artwork: Array<{ width: number; height: number; link: string }>, targetSize: number = 480): string {
  if (!artwork || artwork.length === 0) {
    return '';
  }
  
  // Buscar el artwork más cercano al tamaño objetivo
  const sorted = [...artwork].sort((a, b) => {
    const diffA = Math.abs(a.width - targetSize);
    const diffB = Math.abs(b.width - targetSize);
    return diffA - diffB;
  });
  
  return sorted[0].link;
}
