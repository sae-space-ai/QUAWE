// Sistema de Caché para optimizar tiempos de respuesta
// Almacena tracks, URLs de streaming y datos en memoria

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresIn: number; // milisegundos
}

class CacheManager {
  private cache = new Map<string, CacheItem<any>>();
  
  // Configuración de tiempos de expiración
  private static readonly TRACKS_CACHE_TIME = 5 * 60 * 1000; // 5 minutos
  private static readonly STREAM_URL_CACHE_TIME = 30 * 60 * 1000; // 30 minutos
  private static readonly USER_DATA_CACHE_TIME = 10 * 60 * 1000; // 10 minutos
  
  // Obtener dato del caché
  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    // Verificar si expiró
    if (Date.now() - item.timestamp > item.expiresIn) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data as T;
  }
  
  // Guardar dato en caché
  set<T>(key: string, data: T, expiresIn: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresIn
    });
  }
  
  // Limpiar caché específico
  clear(key: string): void {
    this.cache.delete(key);
  }
  
  // Limpiar todo el caché
  clearAll(): void {
    this.cache.clear();
  }
  
  // Verificar si existe y no expiró
  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;
    
    if (Date.now() - item.timestamp > item.expiresIn) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }
  
  // Obtener estadísticas del caché
  getStats() {
    return {
      totalItems: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Instancia global del caché
export const cache = new CacheManager();

// Claves de caché predefinidas
export const CACHE_KEYS = {
  USER_TRACKS: (handle: string) => `tracks_${handle}`,
  USER_ALBUMS: (handle: string) => `albums_${handle}`,
  USER_PLAYLISTS: (handle: string) => `playlists_${handle}`,
  ALBUM_TRACKS: (albumId: string) => `album_tracks_${albumId}`,
  PLAYLIST_TRACKS: (playlistId: string) => `playlist_tracks_${playlistId}`,
  STREAM_URL: (trackId: string) => `stream_url_${trackId}`,
  USER_PROFILE: (handle: string) => `user_profile_${handle}`,
  TRENDING_TRACKS: 'trending_tracks'
};

// Función helper para obtener tracks con caché
export async function getCachedTracks(handle: string, fetchFn: () => Promise<any[]>): Promise<any[]> {
  const key = CACHE_KEYS.USER_TRACKS(handle);
  
  // Intentar obtener del caché
  const cached = cache.get<any[]>(key);
  if (cached) {
    console.log('[Cache] Tracks obtenidos del caché para:', handle);
    return cached;
  }
  
  // Si no está en caché, hacer la llamada
  console.log('[Cache] Obteniendo tracks de API para:', handle);
  const tracks = await fetchFn();
  
  // Guardar en caché
  cache.set(key, tracks, 5 * 60 * 1000);
  
  return tracks;
}

// Función helper para obtener URL de streaming con caché
export async function getCachedStreamUrl(trackId: string, fetchFn: () => Promise<string | null>): Promise<string | null> {
  const key = CACHE_KEYS.STREAM_URL(trackId);
  
  // Intentar obtener del caché
  const cached = cache.get<string>(key);
  if (cached) {
    console.log('[Cache] URL de streaming obtenida del caché para track:', trackId);
    return cached;
  }
  
  // Si no está en caché, hacer la llamada
  console.log('[Cache] Obteniendo URL de streaming de API para track:', trackId);
  const url = await fetchFn();
  
  if (url) {
    // Guardar en caché por 30 minutos
    cache.set(key, url, 30 * 60 * 1000);
  }
  
  return url;
}

// Función para precargar URLs de streaming
export async function preloadStreamUrls(trackIds: string[], fetchFn: (id: string) => Promise<string | null>): Promise<void> {
  console.log('[Cache] Precargando URLs de streaming para', trackIds.length, 'tracks');
  
  const promises = trackIds.map(async (trackId) => {
    const key = CACHE_KEYS.STREAM_URL(trackId);
    
    // Solo precargar si no está en caché
    if (!cache.has(key)) {
      const url = await fetchFn(trackId);
      if (url) {
        cache.set(key, url, 30 * 60 * 1000);
      }
    }
  });
  
  await Promise.all(promises);
  console.log('[Cache] Precarga completada');
}

// Función para limpiar caché de un usuario específico
export function clearUserCache(handle: string): void {
  cache.clear(CACHE_KEYS.USER_TRACKS(handle));
  cache.clear(CACHE_KEYS.USER_ALBUMS(handle));
  cache.clear(CACHE_KEYS.USER_PLAYLISTS(handle));
  cache.clear(CACHE_KEYS.USER_PROFILE(handle));
  console.log('[Cache] Caché limpiado para usuario:', handle);
}

// Función para limpiar caché de URLs de streaming
export function clearStreamUrlsCache(): void {
  const stats = cache.getStats();
  const streamKeys = stats.keys.filter(k => k.startsWith('stream_url_'));
  streamKeys.forEach(key => cache.clear(key));
  console.log('[Cache] URLs de streaming limpiadas:', streamKeys.length);
}
