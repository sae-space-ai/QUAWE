// Contenido Homogéneo para Canales Temáticos
// Cada canal temático tiene su propia identidad, descripción y programación

export interface ChannelContent {
  id: string;
  name: string;
  description: string;
  tagline: string;
  welcomeMessage: string;
  schedule: ScheduleItem[];
  featuredPlaylists: Playlist[];
  topArtists: string[];
}

export interface ScheduleItem {
  time: string;
  show: string;
  host: string;
  description: string;
}

export interface Playlist {
  name: string;
  description: string;
  trackCount: number;
}

// Contenido completo para cada canal temático
export const channelContent: Record<string, ChannelContent> = {
  // FLAMENCO
  'flamenco': {
    id: 'flamenco',
    name: 'Quawe Flamenco',
    description: 'El alma del flamenco en su estado más puro. Bulerías, soleares, alegrías y todos los palos del flamenco tradicional y contemporáneo.',
    tagline: 'Donde el flamenco vive',
    welcomeMessage: 'Bienvenido a Quawe Flamenco, el canal dedicado al arte jondo. Desde las bulerías de Jerez hasta las soleares de Triana, aquí encontrarás el flamenco en su esencia más pura.',
    schedule: [
      { time: '06:00', show: 'Amanecer Flamenco', host: 'DJ Compás', description: 'Los palos más suaves para empezar el día' },
      { time: '09:00', show: 'Peñas y Tablaos', host: 'María la Serrana', description: 'Historia y actualidad del flamenco' },
      { time: '12:00', show: 'Flamenco Puro', host: 'Antonio Canales', description: 'Los grandes maestros del cante y la guitarra' },
      { time: '15:00', show: 'Nuevas Voces', host: 'Rocío Márquez', description: 'Los jóvenes valores del flamenco actual' },
      { time: '18:00', show: 'Tarde de Bulerías', host: 'Tomatito', description: 'El flamenco más festero para la tarde' },
      { time: '21:00', show: 'Noche de Soleares', host: 'Camarón de Isla', description: 'El cante jondo en su máxima expresión' },
      { time: '00:00', show: 'Madrugá Flamenca', host: 'Automático', description: 'Flamenco para trasnochar' }
    ],
    featuredPlaylists: [
      { name: 'Bulerías de Oro', description: 'Las mejores bulerías de la historia', trackCount: 25 },
      { name: 'Soleares Profundas', description: 'El cante más hondo del flamenco', trackCount: 20 },
      { name: 'Guitarra Flamenca', description: 'Los grandes guitarristas flamencos', trackCount: 30 },
      { name: 'Flamenco Fusión', description: 'Flamenco mezclado con otros géneros', trackCount: 22 }
    ],
    topArtists: ['Camarón de la Isla', 'Paco de Lucía', 'Tomatito', 'Rocío Márquez', 'Antonio Canales']
  },

  // ROCK
  'rock': {
    id: 'rock',
    name: 'Quawe Rock',
    description: 'El rock en todas sus formas. Desde los clásicos del rock and roll hasta el rock alternativo más actual. Guitarras distorsionadas y energía pura.',
    tagline: 'El rock nunca muere',
    welcomeMessage: 'Bienvenido a Quawe Rock, el canal para los que viven con el rock en las venas. Desde Led Zeppelin hasta Arctic Monkeys, aquí suena el rock que mueve el mundo.',
    schedule: [
      { time: '06:00', show: 'Rock Morning', host: 'DJ Power', description: 'Rock clásico para despertar con energía' },
      { time: '09:00', show: 'Leyendas del Rock', host: 'Carlos Rockero', description: 'Los grandes del rock de todos los tiempos' },
      { time: '12:00', show: 'Rock Nacional', host: 'Ana Guitarra', description: 'Lo mejor del rock en español' },
      { time: '15:00', show: 'Rock Alternativo', host: 'DJ Distorsión', description: 'Las bandas más innovadoras del momento' },
      { time: '18:00', show: 'Hard Rock Hour', host: 'Pedro Metal', description: 'El rock más duro y contundente' },
      { time: '21:00', show: 'Rock Sessions', host: 'Laura Rock', description: 'Conciertos en vivo y sesiones exclusivas' },
      { time: '00:00', show: 'Rock Nocturno', host: 'Automático', description: 'Rock para la noche' }
    ],
    featuredPlaylists: [
      { name: 'Clásicos del Rock', description: 'Los himnos del rock de los 60s y 70s', trackCount: 30 },
      { name: 'Rock en Español', description: 'Lo mejor del rock latino', trackCount: 25 },
      { name: 'Rock Alternativo', description: 'Bandas indie y alternativas', trackCount: 28 },
      { name: 'Hard Rock', description: 'El rock más pesado', trackCount: 22 }
    ],
    topArtists: ['Led Zeppelin', 'The Rolling Stones', 'Héroes del Silencio', 'Arctic Monkeys', 'Foo Fighters']
  },

  // ELECTRÓNICA
  'electronica': {
    id: 'electronica',
    name: 'Quawe Electrónica',
    description: 'El universo de la música electrónica. House, techno, trance, EDM y todos los subgéneros electrónicos que mueven las pistas de baile del mundo.',
    tagline: 'Siente el beat',
    welcomeMessage: 'Bienvenido a Quawe Electrónica, el canal para los que viven el ritmo electrónico. Desde el house de Ibiza hasta el techno de Berlín, aquí suena la electrónica que conecta al mundo.',
    schedule: [
      { time: '06:00', show: 'Morning Beats', host: 'DJ Sunrise', description: 'Electrónica suave para empezar el día' },
      { time: '09:00', show: 'Deep House', host: 'DJ Deep', description: 'House profundo y melódico' },
      { time: '12:00', show: 'Techno Time', host: 'DJ Techno', description: 'Techno puro y duro' },
      { time: '15:00', show: 'EDM Power', host: 'DJ Energy', description: 'EDM y big room para la tarde' },
      { time: '18:00', show: 'Trance Journey', host: 'DJ Trance', description: 'Viaje trance para el atardecer' },
      { time: '21:00', show: 'Club Night', host: 'DJ Club', description: 'La música que suena en los clubs' },
      { time: '00:00', show: 'After Hours', host: 'Automático', description: 'Electrónica para después del club' }
    ],
    featuredPlaylists: [
      { name: 'Ibiza Sunset', description: 'House melódico para el atardecer', trackCount: 25 },
      { name: 'Techno Berlin', description: 'Techno industrial alemán', trackCount: 20 },
      { name: 'EDM Festival', description: 'Los himnos de los festivales', trackCount: 30 },
      { name: 'Chill Electronic', description: 'Electrónica relajante', trackCount: 22 }
    ],
    topArtists: ['Daft Punk', 'Carl Cox', 'Armin van Buuren', 'Martin Garrix', 'Charlotte de Witte']
  },

  // POP
  'pop': {
    id: 'pop',
    name: 'Quawe Pop',
    description: 'El pop contemporáneo en su máxima expresión. Los éxitos del momento, los clásicos pop y las nuevas estrellas que dominan las listas.',
    tagline: 'Tu música, tu momento',
    welcomeMessage: 'Bienvenido a Quawe Pop, el canal para los que aman el pop. Desde Michael Jackson hasta Dua Lipa, aquí suena el pop que define generaciones.',
    schedule: [
      { time: '06:00', show: 'Pop Morning', host: 'DJ Pop', description: 'Pop suave para despertar' },
      { time: '09:00', show: 'Pop Clásico', host: 'María Pop', description: 'Los grandes éxitos pop de los 80s y 90s' },
      { time: '12:00', show: 'Top 40', host: 'Carlos Hits', description: 'Los 40 principales del momento' },
      { time: '15:00', show: 'Pop Latino', host: 'Ana Latina', description: 'Lo mejor del pop en español' },
      { time: '18:00', show: 'Pop Rock', host: 'DJ Mix', description: 'La fusión perfecta entre pop y rock' },
      { time: '21:00', show: 'Pop Night', host: 'Laura Pop', description: 'Pop para la noche' },
      { time: '00:00', show: 'Pop Chill', host: 'Automático', description: 'Pop relajante para dormir' }
    ],
    featuredPlaylists: [
      { name: 'Pop Hits 2024', description: 'Los éxitos del año', trackCount: 30 },
      { name: 'Pop 80s', description: 'Los clásicos de los 80', trackCount: 25 },
      { name: 'Pop Latino', description: 'Pop en español', trackCount: 28 },
      { name: 'Pop Love Songs', description: 'Canciones de amor pop', trackCount: 22 }
    ],
    topArtists: ['Michael Jackson', 'Madonna', 'Dua Lipa', 'Ed Sheeran', 'Rosalía']
  },

  // JAZZ
  'jazz': {
    id: 'jazz',
    name: 'Quawe Jazz',
    description: 'El arte del jazz en todas sus formas. Desde el jazz clásico de Nueva Orleans hasta el jazz moderno y la fusión contemporánea.',
    tagline: 'El arte de la improvisación',
    welcomeMessage: 'Bienvenido a Quawe Jazz, el canal para los amantes del jazz. Desde Louis Armstrong hasta Kamasi Washington, aquí suena el jazz que eleva el alma.',
    schedule: [
      { time: '06:00', show: 'Jazz Morning', host: 'DJ Smooth', description: 'Jazz suave para despertar' },
      { time: '09:00', show: 'Jazz Clásico', host: 'Miles Davis Jr', description: 'Los maestros del jazz clásico' },
      { time: '12:00', show: 'Bebop & Swing', host: 'Charlie Parker', description: 'El jazz más vibrante' },
      { time: '15:00', show: 'Jazz Latino', host: 'Tito Puente', description: 'La fusión del jazz con ritmos latinos' },
      { time: '18:00', show: 'Cool Jazz', host: 'Chet Baker', description: 'Jazz relajado para el atardecer' },
      { time: '21:00', show: 'Jazz Club', host: 'John Coltrane', description: 'Jazz en vivo desde los mejores clubs' },
      { time: '00:00', show: 'Jazz Nocturno', host: 'Automático', description: 'Jazz para la noche' }
    ],
    featuredPlaylists: [
      { name: 'Jazz Clásico', description: 'Los maestros del jazz', trackCount: 25 },
      { name: 'Bebop Revolution', description: 'La revolución del bebop', trackCount: 20 },
      { name: 'Jazz Latino', description: 'Fusión jazz-latina', trackCount: 22 },
      { name: 'Modern Jazz', description: 'Jazz contemporáneo', trackCount: 28 }
    ],
    topArtists: ['Miles Davis', 'John Coltrane', 'Louis Armstrong', 'Ella Fitzgerald', 'Kamasi Washington']
  },

  // CLÁSICA
  'clasica': {
    id: 'clasica',
    name: 'Quawe Clásica',
    description: 'La música clásica en su máxima expresión. Desde Bach hasta compositores contemporáneos, pasando por los grandes maestros del romanticismo.',
    tagline: 'La eternidad en notas',
    welcomeMessage: 'Bienvenido a Quawe Clásica, el canal para los amantes de la música clásica. Desde Bach hasta John Williams, aquí suena la música que trasciende el tiempo.',
    schedule: [
      { time: '06:00', show: 'Morning Classics', host: 'Maestro Bach', description: 'Música clásica suave para despertar' },
      { time: '09:00', show: 'Barroco', host: 'Vivaldi', description: 'La elegancia del barroco' },
      { time: '12:00', show: 'Clasicismo', host: 'Mozart', description: 'La perfección del clasicismo' },
      { time: '15:00', show: 'Romanticismo', host: 'Beethoven', description: 'La pasión del romanticismo' },
      { time: '18:00', show: 'Ópera', host: 'Puccini', description: 'Las mejores óperas de la historia' },
      { time: '21:00', show: 'Sinfonías', host: 'Mahler', description: 'Las grandes sinfonías' },
      { time: '00:00', show: 'Nocturnos', host: 'Automático', description: 'Música clásica para dormir' }
    ],
    featuredPlaylists: [
      { name: 'Grandes Sinfonías', description: 'Las sinfonías más famosas', trackCount: 20 },
      { name: 'Óperas Inmortales', description: 'Las mejores óperas', trackCount: 15 },
      { name: 'Piano Clásico', description: 'Obras para piano', trackCount: 25 },
      { name: 'Música de Cine', description: 'Bandas sonoras clásicas', trackCount: 22 }
    ],
    topArtists: ['Bach', 'Mozart', 'Beethoven', 'Chopin', 'John Williams']
  },

  // HIP HOP
  'hiphop': {
    id: 'hiphop',
    name: 'Quawe Hip Hop',
    description: 'El hip hop en todas sus formas. Desde el old school hasta el trap más actual, pasando por el rap consciente y el hip hop underground.',
    tagline: 'La cultura hip hop',
    welcomeMessage: 'Bienvenido a Quawe Hip Hop, el canal para los que viven la cultura hip hop. Desde Tupac hasta Bad Bunny, aquí suena el hip hop que mueve al mundo.',
    schedule: [
      { time: '06:00', show: 'Hip Hop Morning', host: 'DJ Flow', description: 'Hip hop suave para despertar' },
      { time: '09:00', show: 'Old School', host: 'Grandmaster Flash', description: 'Los clásicos del hip hop' },
      { time: '12:00', show: 'Golden Era', host: 'Nas', description: 'La época dorada del hip hop' },
      { time: '15:00', show: 'Trap Nation', host: 'Future', description: 'El trap más actual' },
      { time: '18:00', show: 'Rap Latino', host: 'Daddy Yankee', description: 'Lo mejor del rap en español' },
      { time: '21:00', show: 'Underground', host: 'MF DOOM', description: 'Hip hop underground' },
      { time: '00:00', show: 'Hip Hop Night', host: 'Automático', description: 'Hip hop para la noche' }
    ],
    featuredPlaylists: [
      { name: 'Old School Classics', description: 'Los clásicos del hip hop', trackCount: 30 },
      { name: 'Trap Hits', description: 'Los éxitos del trap', trackCount: 25 },
      { name: 'Rap Latino', description: 'Rap en español', trackCount: 28 },
      { name: 'Hip Hop Conscious', description: 'Rap con mensaje', trackCount: 22 }
    ],
    topArtists: ['Tupac', 'The Notorious B.I.G.', 'Bad Bunny', 'Kendrick Lamar', 'C. Tangana']
  },

  // REGGAE
  'reggae': {
    id: 'reggae',
    name: 'Quawe Reggae',
    description: 'El reggae y la música caribeña en su estado más puro. Desde Bob Marley hasta los nuevos artistas del reggae contemporáneo.',
    tagline: 'One love, one heart',
    welcomeMessage: 'Bienvenido a Quawe Reggae, el canal para los que viven la vibra positiva. Desde Bob Marley hasta Chronixx, aquí suena el reggae que une al mundo.',
    schedule: [
      { time: '06:00', show: 'Reggae Morning', host: 'DJ Roots', description: 'Reggae suave para despertar' },
      { time: '09:00', show: 'Roots Reggae', host: 'Bob Marley', description: 'El reggae más puro' },
      { time: '12:00', show: 'Dancehall', host: 'Sean Paul', description: 'El dancehall más actual' },
      { time: '15:00', show: 'Dub & Ska', host: 'King Tubby', description: 'Dub y ska clásico' },
      { time: '18:00', show: 'Reggae Latino', host: 'Café Tacvba', description: 'Reggae en español' },
      { time: '21:00', show: 'Reggae Night', host: 'Peter Tosh', description: 'Reggae para la noche' },
      { time: '00:00', show: 'Chill Reggae', host: 'Automático', description: 'Reggae relajante' }
    ],
    featuredPlaylists: [
      { name: 'Roots Classics', description: 'Los clásicos del reggae', trackCount: 25 },
      { name: 'Dancehall Fire', description: 'Dancehall actual', trackCount: 20 },
      { name: 'Reggae en Español', description: 'Reggae latino', trackCount: 22 },
      { name: 'Dub Master', description: 'Los mejores dubs', trackCount: 18 }
    ],
    topArtists: ['Bob Marley', 'Peter Tosh', 'Sean Paul', 'Chronixx', 'Café Tacvba']
  },

  // LATINA
  'latin': {
    id: 'latin',
    name: 'Quawe Latina',
    description: 'La música latina en todas sus formas. Salsa, bachata, merengue, cumbia, reggaetón y todos los ritmos latinos que mueven al mundo.',
    tagline: 'El ritmo latino',
    welcomeMessage: 'Bienvenido a Quawe Latina, el canal para los que viven con ritmo latino. Desde Celia Cruz hasta Bad Bunny, aquí suena la música latina que conquista al mundo.',
    schedule: [
      { time: '06:00', show: 'Latin Morning', host: 'DJ Salsa', description: 'Música latina suave para despertar' },
      { time: '09:00', show: 'Salsa Clásica', host: 'Celia Cruz', description: 'La reina de la salsa' },
      { time: '12:00', show: 'Bachata & Merengue', host: 'Juan Luis Guerra', description: 'Bachata y merengue dominicano' },
      { time: '15:00', show: 'Cumbia', host: 'Celso Piña', description: 'La cumbia más sabrosa' },
      { time: '18:00', show: 'Reggaetón', host: 'Daddy Yankee', description: 'El reggaetón más actual' },
      { time: '21:00', show: 'Latin Pop', host: 'Shakira', description: 'Pop latino' },
      { time: '00:00', show: 'Latin Night', host: 'Automático', description: 'Música latina para la noche' }
    ],
    featuredPlaylists: [
      { name: 'Salsa Clásica', description: 'Los clásicos de la salsa', trackCount: 30 },
      { name: 'Reggaetón Hits', description: 'Los éxitos del reggaetón', trackCount: 25 },
      { name: 'Cumbia Sabrosa', description: 'La mejor cumbia', trackCount: 22 },
      { name: 'Latin Pop', description: 'Pop latino actual', trackCount: 28 }
    ],
    topArtists: ['Celia Cruz', 'Marc Anthony', 'Bad Bunny', 'Shakira', 'Daddy Yankee']
  },

  // FOLK
  'folk': {
    id: 'folk',
    name: 'Quawe Folk',
    description: 'La música folk y tradicional de todo el mundo. Desde el folk celta hasta la música tradicional latinoamericana, pasando por el folk americano.',
    tagline: 'Las raíces de la música',
    welcomeMessage: 'Bienvenido a Quawe Folk, el canal para los que aman la música tradicional. Desde Bob Dylan hasta Mercedes Sosa, aquí suena el folk que conecta con las raíces.',
    schedule: [
      { time: '06:00', show: 'Folk Morning', host: 'DJ Acoustic', description: 'Folk suave para despertar' },
      { time: '09:00', show: 'Folk Americano', host: 'Bob Dylan', description: 'El folk americano clásico' },
      { time: '12:00', show: 'Folk Celta', host: 'The Chieftains', description: 'Música celta tradicional' },
      { time: '15:00', show: 'Folk Latino', host: 'Mercedes Sosa', description: 'Folk latinoamericano' },
      { time: '18:00', show: 'Folk Español', host: 'Joan Manuel Serrat', description: 'Canción de autor española' },
      { time: '21:00', show: 'Folk Night', host: 'Joni Mitchell', description: 'Folk para la noche' },
      { time: '00:00', show: 'Acoustic Chill', host: 'Automático', description: 'Folk acústico relajante' }
    ],
    featuredPlaylists: [
      { name: 'Folk Americano', description: 'Los clásicos del folk americano', trackCount: 25 },
      { name: 'Folk Latino', description: 'Folk latinoamericano', trackCount: 22 },
      { name: 'Folk Celta', description: 'Música celta tradicional', trackCount: 20 },
      { name: 'Canción de Autor', description: 'Folk en español', trackCount: 28 }
    ],
    topArtists: ['Bob Dylan', 'Mercedes Sosa', 'Joan Manuel Serrat', 'Joni Mitchell', 'The Chieftains']
  }
};

// Función para obtener contenido de un canal temático
export function getChannelContent(channelId: string): ChannelContent | null {
  return channelContent[channelId] || null;
}

// Función para obtener todos los canales con contenido
export function getChannelsWithContent(): string[] {
  return Object.keys(channelContent);
}
