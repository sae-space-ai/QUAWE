// Configuración de canales temáticos para Radio Quawe
// Cada canal filtra los tracks de Audius por género/temática

export interface ThematicChannel {
  id: string;
  name: string;
  genre: string;
  keywords: string[]; // Palabras clave para filtrar tracks
  color: string;
  emoji: string;
  description: string;
}

// Definición de canales temáticos
export const thematicChannels: ThematicChannel[] = [
  {
    id: 'flamenco',
    name: 'Quawe Flamenco',
    genre: 'Flamenco',
    keywords: ['flamenco', 'flamenca', 'bulerías', 'soleá', 'alegrías', 'tangos', 'rumba'],
    color: '#DC2626',
    emoji: '💃',
    description: 'Flamenco puro y fusión'
  },
  {
    id: 'rock',
    name: 'Quawe Rock',
    genre: 'Rock',
    keywords: ['rock', 'rock and roll', 'alternative', 'indie rock'],
    color: '#7C3AED',
    emoji: '🎸',
    description: 'Rock en todas sus formas'
  },
  {
    id: 'electronica',
    name: 'Quawe Electrónica',
    genre: 'Electrónica',
    keywords: ['electronic', 'edm', 'house', 'techno', 'trance', 'dance'],
    color: '#06B6D4',
    emoji: '🎧',
    description: 'Música electrónica y dance'
  },
  {
    id: 'pop',
    name: 'Quawe Pop',
    genre: 'Pop',
    keywords: ['pop', 'pop rock', 'synth pop', 'indie pop'],
    color: '#EC4899',
    emoji: '🎤',
    description: 'Pop contemporáneo'
  },
  {
    id: 'jazz',
    name: 'Quawe Jazz',
    genre: 'Jazz',
    keywords: ['jazz', 'blues', 'swing', 'bebop'],
    color: '#F59E0B',
    emoji: '🎷',
    description: 'Jazz y blues'
  },
  {
    id: 'clasica',
    name: 'Quawe Clásica',
    genre: 'Clásica',
    keywords: ['classical', 'orchestra', 'symphony', 'piano', 'violin'],
    color: '#8B5CF6',
    emoji: '🎻',
    description: 'Música clásica e instrumental'
  },
  {
    id: 'hiphop',
    name: 'Quawe Hip Hop',
    genre: 'Hip Hop',
    keywords: ['hip hop', 'rap', 'trap', 'urban'],
    color: '#EF4444',
    emoji: '🎤',
    description: 'Hip hop y rap'
  },
  {
    id: 'reggae',
    name: 'Quawe Reggae',
    genre: 'Reggae',
    keywords: ['reggae', 'ska', 'dub', 'roots'],
    color: '#10B981',
    emoji: '🌿',
    description: 'Reggae y ritmos caribeños'
  },
  {
    id: 'latin',
    name: 'Quawe Latina',
    genre: 'Latina',
    keywords: ['latin', 'salsa', 'bachata', 'merengue', 'cumbia', 'reggaeton'],
    color: '#F97316',
    emoji: '💃',
    description: 'Ritmos latinos'
  },
  {
    id: 'folk',
    name: 'Quawe Folk',
    genre: 'Folk',
    keywords: ['folk', 'acoustic', 'singer-songwriter', 'traditional'],
    color: '#84CC16',
    emoji: '🪕',
    description: 'Folk y música acústica'
  }
];

// Función para filtrar tracks por canal temático
export function filterTracksByChannel(
  tracks: any[],
  channel: ThematicChannel
): any[] {
  return tracks.filter((track) => {
    const searchText = `${track.genre || ''} ${track.tags || ''} ${track.mood || ''} ${track.title || ''}`.toLowerCase();
    
    // Verificar si algún keyword coincide
    return channel.keywords.some(keyword => 
      searchText.includes(keyword.toLowerCase())
    );
  });
}

// Función para obtener el canal por ID
export function getChannelById(id: string): ThematicChannel | undefined {
  return thematicChannels.find(channel => channel.id === id);
}

// Función para obtener todos los canales
export function getAllChannels(): ThematicChannel[] {
  return thematicChannels;
}
