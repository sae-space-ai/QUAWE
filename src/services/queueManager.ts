// Sistema de Colas de Reproducción e Historial
// Cada emisora/canal tiene su propia cola independiente

interface QueueItem {
  trackId: string;
  track: any;
  addedAt: number;
  played: boolean;
}

interface StationQueue {
  stationId: string;
  queue: QueueItem[];
  history: string[]; // IDs de tracks ya reproducidos
  lastPlayed: number;
}

// Almacenamiento de colas por emisora
const stationQueues = new Map<string, StationQueue>();

// Configuración
const MAX_HISTORY_SIZE = 50; // Máximo de tracks en historial
const MIN_QUEUE_SIZE = 10; // Mínimo de tracks en cola antes de regenerar
const MAX_QUEUE_SIZE = 30; // Máximo de tracks en cola

/**
 * Obtener o crear la cola de una emisora
 */
function getStationQueue(stationId: string): StationQueue {
  if (!stationQueues.has(stationId)) {
    stationQueues.set(stationId, {
      stationId,
      queue: [],
      history: [],
      lastPlayed: 0,
    });
  }
  return stationQueues.get(stationId)!;
}

/**
 * Agregar track al historial de una emisora
 */
export function addToHistory(stationId: string, trackId: string): void {
  const stationQueue = getStationQueue(stationId);
  
  // Agregar al historial
  stationQueue.history.push(trackId);
  
  // Mantener solo los últimos MAX_HISTORY_SIZE tracks
  if (stationQueue.history.length > MAX_HISTORY_SIZE) {
    stationQueue.history = stationQueue.history.slice(-MAX_HISTORY_SIZE);
  }
  
  // Actualizar timestamp
  stationQueue.lastPlayed = Date.now();
}

/**
 * Verificar si un track ya fue reproducido recientemente en esta emisora
 */
export function wasRecentlyPlayed(stationId: string, trackId: string): boolean {
  const stationQueue = getStationQueue(stationId);
  return stationQueue.history.includes(trackId);
}

/**
 * Filtrar tracks que no han sido reproducidos recientemente
 */
export function filterUnplayedTracks(stationId: string, tracks: any[]): any[] {
  const stationQueue = getStationQueue(stationId);
  
  return tracks.filter(track => {
    // Excluir tracks en el historial
    if (stationQueue.history.includes(track.id)) {
      return false;
    }
    
    // Excluir tracks en la cola
    if (stationQueue.queue.some(item => item.trackId === track.id)) {
      return false;
    }
    
    return true;
  });
}

/**
 * Seleccionar siguiente track de la cola o generar nueva cola
 */
export async function getNextTrack(
  stationId: string,
  availableTracks: any[]
): Promise<any | null> {
  const stationQueue = getStationQueue(stationId);
  
  // Si la cola está vacía o muy pequeña, regenerar
  if (stationQueue.queue.length === 0) {
    await regenerateQueue(stationId, availableTracks);
  }
  
  // Si todavía está vacía, no hay tracks disponibles
  if (stationQueue.queue.length === 0) {
    return null;
  }
  
  // Obtener el primer track de la cola
  const nextItem = stationQueue.queue.shift()!;
  
  // Agregar al historial
  addToHistory(stationId, nextItem.trackId);
  
  return nextItem.track;
}

/**
 * Regenerar la cola de una emisora con tracks no reproducidos
 */
export async function regenerateQueue(
  stationId: string,
  availableTracks: any[]
): Promise<void> {
  const stationQueue = getStationQueue(stationId);
  
  // Filtrar tracks no reproducidos
  const unplayedTracks = filterUnplayedTracks(stationId, availableTracks);
  
  // Si no hay tracks no reproducidos, limpiar historial parcialmente
  if (unplayedTracks.length === 0) {
    console.log(`[Queue] No hay tracks sin reproducir para ${stationId}, limpiando historial...`);
    
    // Mantener solo el 50% más reciente del historial
    const keepCount = Math.floor(stationQueue.history.length / 2);
    stationQueue.history = stationQueue.history.slice(-keepCount);
    
    // Reintentar filtrado
    const retryTracks = filterUnplayedTracks(stationId, availableTracks);
    
    if (retryTracks.length === 0) {
      console.error(`[Queue] No hay tracks disponibles para ${stationId}`);
      return;
    }
    
    // Mezclar y agregar a la cola
    const shuffled = shuffleArray(retryTracks);
    const toAdd = shuffled.slice(0, Math.min(MAX_QUEUE_SIZE, shuffled.length));
    
    stationQueue.queue = toAdd.map(track => ({
      trackId: track.id,
      track,
      addedAt: Date.now(),
      played: false,
    }));
    
    console.log(`[Queue] Cola regenerada para ${stationId}: ${stationQueue.queue.length} tracks`);
    return;
  }
  
  // Mezclar tracks aleatoriamente
  const shuffled = shuffleArray(unplayedTracks);
  
  // Tomar hasta MAX_QUEUE_SIZE tracks
  const toAdd = shuffled.slice(0, Math.min(MAX_QUEUE_SIZE, shuffled.length));
  
  // Agregar a la cola
  stationQueue.queue = toAdd.map(track => ({
    trackId: track.id,
    track,
    addedAt: Date.now(),
    played: false,
  }));
  
  console.log(`[Queue] Cola generada para ${stationId}: ${stationQueue.queue.length} tracks`);
}

/**
 * Mezclar array usando algoritmo Fisher-Yates
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Obtener estadísticas de una cola
 */
export function getQueueStats(stationId: string): {
  queueSize: number;
  historySize: number;
  lastPlayed: number;
} {
  const stationQueue = getStationQueue(stationId);
  return {
    queueSize: stationQueue.queue.length,
    historySize: stationQueue.history.length,
    lastPlayed: stationQueue.lastPlayed,
  };
}

/**
 * Limpiar cola e historial de una emisora
 */
export function clearStationQueue(stationId: string): void {
  stationQueues.delete(stationId);
  console.log(`[Queue] Cola limpiada para ${stationId}`);
}

/**
 * Limpiar todas las colas
 */
export function clearAllQueues(): void {
  stationQueues.clear();
  console.log(`[Queue] Todas las colas limpiadas`);
}

/**
 * Obtener información de todas las colas (para debugging)
 */
export function getAllQueuesInfo(): Array<{
  stationId: string;
  queueSize: number;
  historySize: number;
  lastPlayed: number;
}> {
  return Array.from(stationQueues.entries()).map(([id, queue]) => ({
    stationId: id,
    queueSize: queue.queue.length,
    historySize: queue.history.length,
    lastPlayed: queue.lastPlayed,
  }));
}
