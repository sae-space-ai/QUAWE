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

export interface TrackMatch {
  track: any;
  score: number;
  matchedKeywords: string[];
  source: 'track' | 'album' | 'playlist';
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

// Función para calcular puntuación de coincidencia
function calculateMatchScore(text: string, keywords: string[]): { score: number; matched: string[] } {
  const textLower = text.toLowerCase();
  let score = 0;
  const matched: string[] = [];
  
  keywords.forEach(keyword => {
    const keywordLower = keyword.toLowerCase();
    
    // Coincidencia exacta en título (mayor peso)
    if (textLower.includes(keywordLower)) {
      score += 10;
      matched.push(keyword);
    }
    
    // Coincidencia en género (peso alto)
    if (textLower.includes(`genre:${keywordLower}`) || 
        textLower.includes(`"genre":"${keywordLower}"`)) {
      score += 15;
      if (!matched.includes(keyword)) matched.push(keyword);
    }
    
    // Coincidencia en tags (peso medio)
    if (textLower.includes(`tags:${keywordLower}`) || 
        textLower.includes(`"tags":"${keywordLower}"`)) {
      score += 8;
      if (!matched.includes(keyword)) matched.push(keyword);
    }
  });
  
  return { score, matched };
}

// Función para filtrar tracks por canal temático (búsqueda inteligente)
export function filterTracksByChannel(
  tracks: any[],
  channel: ThematicChannel
): any[] {
  const matches: TrackMatch[] = [];
  
  // Analizar cada track
  tracks.forEach(track => {
    // Crear texto de búsqueda completo
    const searchText = [
      track.title || '',
      track.genre || '',
      track.tags || '',
      track.mood || '',
      track.description || '',
      track.album_name || '',
      track.artist_name || ''
    ].join(' ').toLowerCase();
    
    const { score, matched } = calculateMatchScore(searchText, channel.keywords);
    
    if (score > 0) {
      matches.push({
        track,
        score,
        matchedKeywords: matched,
        source: 'track'
      });
    }
  });
  
  // Ordenar por puntuación (mayor relevancia primero)
  matches.sort((a, b) => b.score - a.score);
  
  // Devolver solo los tracks
  return matches.map(m => m.track);
}

// Función para buscar en álbumes y playlists
export async function searchInAlbumsAndPlaylists(
  handle: string,
  channel: ThematicChannel,
  getUserAlbums: Function,
  getUserPlaylists: Function,
  getAlbumTracks: Function,
  getPlaylistTracks: Function
): Promise<any[]> {
  const allMatches: TrackMatch[] = [];
  
  try {
    // Buscar en álbumes
    const albums = await getUserAlbums(handle, 50);
    for (const album of albums) {
      const albumText = [
        album.name || '',
        album.description || '',
        album.genre || '',
        album.tags || ''
      ].join(' ').toLowerCase();
      
      const { score, matched } = calculateMatchScore(albumText, channel.keywords);
      
      if (score > 0) {
        // Obtener tracks del álbum
        const albumTracks = await getAlbumTracks(album.id);
        albumTracks.forEach((track: any) => {
          allMatches.push({
            track,
            score: score + 5, // Bonus por venir de un álbum relevante
            matchedKeywords: matched,
            source: 'album'
          });
        });
      }
    }
    
    // Buscar en playlists
    const playlists = await getUserPlaylists(handle, 50);
    for (const playlist of playlists) {
      const playlistText = [
        playlist.name || '',
        playlist.description || '',
        playlist.genre || '',
        playlist.tags || ''
      ].join(' ').toLowerCase();
      
      const { score, matched } = calculateMatchScore(playlistText, channel.keywords);
      
      if (score > 0) {
        // Obtener tracks de la playlist
        const playlistTracks = await getPlaylistTracks(playlist.id);
        playlistTracks.forEach((track: any) => {
          allMatches.push({
            track,
            score: score + 5, // Bonus por venir de una playlist relevante
            matchedKeywords: matched,
            source: 'playlist'
          });
        });
      }
    }
    
    // Eliminar duplicados (mismo track puede estar en varios álbumes/playlists)
    const uniqueTracks = new Map<string, TrackMatch>();
    allMatches.forEach(match => {
      const trackId = match.track.id;
      if (!uniqueTracks.has(trackId) || uniqueTracks.get(trackId)!.score < match.score) {
        uniqueTracks.set(trackId, match);
      }
    });
    
    // Ordenar por puntuación
    const sortedMatches = Array.from(uniqueTracks.values())
      .sort((a, b) => b.score - a.score);
    
    return sortedMatches.map(m => m.track);
    
  } catch (error) {
    console.error('Error searching in albums and playlists:', error);
    return [];
  }
}

// Función para obtener el canal por ID
export function getChannelById(id: string): ThematicChannel | undefined {
  return thematicChannels.find(channel => channel.id === id);
}

// Función para obtener todos los canales
export function getAllChannels(): ThematicChannel[] {
  return thematicChannels;
}
