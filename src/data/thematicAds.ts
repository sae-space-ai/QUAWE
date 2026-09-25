// Sistema de Anuncios Temáticos por Género Musical
// Cada canal temático tiene sus propios anuncios específicos

export interface ThematicAd {
  id: string;
  channelId: string;
  business: string;
  category: string;
  message: string;
  duration: number;
}

// Base de datos de anuncios por canal temático
export const thematicAdsDatabase: Record<string, ThematicAd[]> = {
  // FLAMENCO
  'flamenco': [
    {
      id: 'flam-1',
      channelId: 'flamenco',
      business: 'Taberna Flamenca El Arenal',
      category: 'Gastronomía y Espectáculos',
      message: 'El flamenco que escuchas está patrocinado por Taberna Flamenca El Arenal. Espectáculos en vivo todos los viernes y sábados. Reserva en elarenal.flamenco',
      duration: 12
    },
    {
      id: 'flam-2',
      channelId: 'flamenco',
      business: 'Academia de Baile Carmen Amaya',
      category: 'Cultura',
      message: 'Esta emisora es posible gracias a Academia de Baile Flamenco Carmen Amaya. Clases de flamenco para todos los niveles. Infórmate en carmenamaya.dance',
      duration: 12
    },
    {
      id: 'flam-3',
      channelId: 'flamenco',
      business: 'Guitarras Flamencas Ramírez',
      category: 'Instrumentos',
      message: 'La música flamenca que escuchas está patrocinada por Guitarras Flamencas Ramírez. Artesanía tradicional desde 1882. Visítanos en guitarrasramirez.com',
      duration: 12
    },
    {
      id: 'flam-4',
      channelId: 'flamenco',
      business: 'Peña Flamenca La Platería',
      category: 'Cultura',
      message: 'Quawe Flamenco es posible gracias a Peña Flamenca La Platería. El templo del flamenco en Granada. Espectáculos todos los días. platería.flamenco',
      duration: 12
    }
  ],

  // ROCK
  'rock': [
    {
      id: 'rock-1',
      channelId: 'rock',
      business: 'Hard Rock Cafe Madrid',
      category: 'Gastronomía y Música',
      message: 'El rock que escuchas está patrocinado por Hard Rock Cafe Madrid. Comida y música rock en el corazón de la ciudad. hardrockcafe.madrid',
      duration: 12
    },
    {
      id: 'rock-2',
      channelId: 'rock',
      business: 'Tienda de Instrumentos Rock & Roll',
      category: 'Instrumentos',
      message: 'Esta emisora es posible gracias a Tienda de Instrumentos Rock & Roll. Guitarras, baterías y todo para músicos. rockandroll.instruments',
      duration: 12
    },
    {
      id: 'rock-3',
      channelId: 'rock',
      business: 'Sala de Conciertos Rock Palace',
      category: 'Entretenimiento',
      message: 'La música rock que escuchas está patrocinada por Sala de Conciertos Rock Palace. Los mejores conciertos de rock en vivo. rockpalace.live',
      duration: 12
    },
    {
      id: 'rock-4',
      channelId: 'rock',
      business: 'Festival Rock en Stock',
      category: 'Eventos',
      message: 'Quawe Rock es posible gracias al Festival Rock en Stock. Tres días de rock intenso. Entradas disponibles en rockenstock.festival',
      duration: 12
    }
  ],

  // ELECTRÓNICA
  'electronica': [
    {
      id: 'elec-1',
      channelId: 'electronica',
      business: 'Club Teatre Barcelona',
      category: 'Ocio Nocturno',
      message: 'La electrónica que escuchas está patrocinada por Club Teatre Barcelona. Los mejores DJs internacionales cada fin de semana. teatre.barcelona',
      duration: 12
    },
    {
      id: 'elec-2',
      channelId: 'electronica',
      business: 'Festival Sónar',
      category: 'Eventos',
      message: 'Esta emisora es posible gracias al Festival Sónar. Música electrónica avanzada y arte digital. Entradas en sonarfestival.com',
      duration: 12
    },
    {
      id: 'elec-3',
      channelId: 'electronica',
      business: 'Tienda DJ Equipment Pro',
      category: 'Equipamiento',
      message: 'La música electrónica que escuchas está patrocinada por DJ Equipment Pro. Todo para DJs y productores. djequipment.pro',
      duration: 12
    },
    {
      id: 'elec-4',
      channelId: 'electronica',
      business: 'Escuela de Producción Musical Beat Factory',
      category: 'Educación',
      message: 'Quawe Electrónica es posible gracias a Beat Factory. Aprende producción musical electrónica. beatfactory.school',
      duration: 12
    }
  ],

  // POP
  'pop': [
    {
      id: 'pop-1',
      channelId: 'pop',
      business: 'Radio Disney España',
      category: 'Medios',
      message: 'El pop que escuchas está patrocinado por Radio Disney España. La música pop que te gusta, las 24 horas. radiodisney.es',
      duration: 12
    },
    {
      id: 'pop-2',
      channelId: 'pop',
      business: 'Festival Pop Spring',
      category: 'Eventos',
      message: 'Esta emisora es posible gracias al Festival Pop Spring. Los mejores artistas pop en un solo evento. entradas en popspring.festival',
      duration: 12
    },
    {
      id: 'pop-3',
      channelId: 'pop',
      business: 'Tienda de Merchandising Pop Store',
      category: 'Moda',
      message: 'La música pop que escuchas está patrocinada por Pop Store. Merchandising oficial de tus artistas favoritos. popstore.merch',
      duration: 12
    },
    {
      id: 'pop-4',
      channelId: 'pop',
      business: 'Academia de Canto Star Voice',
      category: 'Educación',
      message: 'Quawe Pop es posible gracias a Academia de Canto Star Voice. Conviértete en la próxima estrella pop. starvoice.academy',
      duration: 12
    }
  ],

  // JAZZ
  'jazz': [
    {
      id: 'jazz-1',
      channelId: 'jazz',
      business: 'Club de Jazz Harlem',
      category: 'Ocio Nocturno',
      message: 'El jazz que escuchas está patrocinado por Club de Jazz Harlem. Jazz en vivo todos los días. Reservas en harlemjazz.club',
      duration: 12
    },
    {
      id: 'jazz-2',
      channelId: 'jazz',
      business: 'Festival Internacional de Jazz',
      category: 'Eventos',
      message: 'Esta emisora es posible gracias al Festival Internacional de Jazz. Los mejores jazzistas del mundo. jazzfestival.international',
      duration: 12
    },
    {
      id: 'jazz-3',
      channelId: 'jazz',
      business: 'Tienda de Vinilos Jazz Records',
      category: 'Música',
      message: 'La música jazz que escuchas está patrocinada por Jazz Records. La mayor colección de vinilos de jazz. jazzrecords.vinyl',
      duration: 12
    },
    {
      id: 'jazz-4',
      channelId: 'jazz',
      business: 'Escuela de Jazz Barcelona Jazz School',
      category: 'Educación',
      message: 'Quawe Jazz es posible gracias a Barcelona Jazz School. Aprende jazz con los mejores músicos. barcelona.jazz.school',
      duration: 12
    }
  ],

  // CLÁSICA
  'clasica': [
    {
      id: 'clas-1',
      channelId: 'clasica',
      business: 'Orquesta Sinfónica Nacional',
      category: 'Cultura',
      message: 'La música clásica que escuchas está patrocinada por la Orquesta Sinfónica Nacional. Temporada de conciertos en el auditorio nacional. osn.concerts',
      duration: 12
    },
    {
      id: 'clas-2',
      channelId: 'clasica',
      business: 'Teatro Real de Ópera',
      category: 'Cultura',
      message: 'Esta emisora es posible gracias al Teatro Real de Ópera. Las mejores óperas del mundo. Entradas en teatroreal.opera',
      duration: 12
    },
    {
      id: 'clas-3',
      channelId: 'clasica',
      business: 'Conservatorio Superior de Música',
      category: 'Educación',
      message: 'La música clásica que escuchas está patrocinada por el Conservatorio Superior de Música. Formación musical de excelencia. conservatorio.superior',
      duration: 12
    },
    {
      id: 'clas-4',
      channelId: 'clasica',
      business: 'Festival de Música Clásica de Verano',
      category: 'Eventos',
      message: 'Quawe Clásica es posible gracias al Festival de Música Clásica de Verano. Conciertos en los mejores escenarios. classicfest.summer',
      duration: 12
    }
  ],

  // HIP HOP
  'hiphop': [
    {
      id: 'hiphop-1',
      channelId: 'hiphop',
      business: 'Sala de Conciertos Urban Beat',
      category: 'Entretenimiento',
      message: 'El hip hop que escuchas está patrocinado por Sala Urban Beat. Los mejores artistas urbanos en vivo. urbanbeat.live',
      duration: 12
    },
    {
      id: 'hiphop-2',
      channelId: 'hiphop',
      business: 'Festival Hip Hop Nation',
      category: 'Eventos',
      message: 'Esta emisora es posible gracias al Festival Hip Hop Nation. Tres días de rap y cultura urbana. hiphopnation.festival',
      duration: 12
    },
    {
      id: 'hiphop-3',
      channelId: 'hiphop',
      business: 'Tienda de Streetwear Urban Style',
      category: 'Moda',
      message: 'La música hip hop que escuchas está patrocinada por Urban Style. La última moda urbana. urbanstyle.streetwear',
      duration: 12
    },
    {
      id: 'hiphop-4',
      channelId: 'hiphop',
      business: 'Escuela de Producción Beat Makers',
      category: 'Educación',
      message: 'Quawe Hip Hop es posible gracias a Beat Makers Academy. Aprende a producir beats de hip hop. beatmakers.academy',
      duration: 12
    }
  ],

  // REGGAE
  'reggae': [
    {
      id: 'reggae-1',
      channelId: 'reggae',
      business: 'Restaurante Jamaicano One Love',
      category: 'Gastronomía',
      message: 'El reggae que escuchas está patrocinado por Restaurante Jamaicano One Love. Comida caribeña auténtica. onelove.jamaican',
      duration: 12
    },
    {
      id: 'reggae-2',
      channelId: 'reggae',
      business: 'Festival Reggae Sun Splash',
      category: 'Eventos',
      message: 'Esta emisora es posible gracias al Festival Reggae Sun Splash. Tres días de reggae y buena vibra. reggaesunsplash.fest',
      duration: 12
    },
    {
      id: 'reggae-3',
      channelId: 'reggae',
      business: 'Tienda Rastafari Culture',
      category: 'Moda',
      message: 'La música reggae que escuchas está patrocinada por Rastafari Culture. Moda y cultura rastafari. rastafari.culture',
      duration: 12
    },
    {
      id: 'reggae-4',
      channelId: 'reggae',
      business: 'Club de Playa Reggae Beach',
      category: 'Ocio',
      message: 'Quawe Reggae es posible gracias a Reggae Beach Club. Música reggae frente al mar. reggaebeach.club',
      duration: 12
    }
  ],

  // LATINA
  'latin': [
    {
      id: 'latin-1',
      channelId: 'latin',
      business: 'Sala de Baile Latino Caliente',
      category: 'Entretenimiento',
      message: 'La música latina que escuchas está patrocinada por Sala de Baile Latino Caliente. Clases de salsa y bachata. latinocaliente.dance',
      duration: 12
    },
    {
      id: 'latin-2',
      channelId: 'latin',
      business: 'Festival Latino Music Awards',
      category: 'Eventos',
      message: 'Esta emisora es posible gracias al Festival Latino Music Awards. Los mejores artistas latinos. latinmusic.awards',
      duration: 12
    },
    {
      id: 'latin-3',
      channelId: 'latin',
      business: 'Restaurante Cubano La Bodeguita',
      category: 'Gastronomía',
      message: 'La música latina que escuchas está patrocinada por Restaurante Cubano La Bodeguita. Comida cubana auténtica. labodeguita.cuba',
      duration: 12
    },
    {
      id: 'latin-4',
      channelId: 'latin',
      business: 'Academia de Baile Salsa Masters',
      category: 'Educación',
      message: 'Quawe Latina es posible gracias a Salsa Masters Academy. Aprende a bailar salsa con los mejores. salsamasters.academy',
      duration: 12
    }
  ],

  // FOLK
  'folk': [
    {
      id: 'folk-1',
      channelId: 'folk',
      business: 'Taberna Tradicional El Rincón Folk',
      category: 'Gastronomía y Música',
      message: 'El folk que escuchas está patrocinado por Taberna El Rincón Folk. Música folk en vivo todos los jueves. elrincon.folk',
      duration: 12
    },
    {
      id: 'folk-2',
      channelId: 'folk',
      business: 'Festival de Música Folk Internacional',
      category: 'Eventos',
      message: 'Esta emisora es posible gracias al Festival de Música Folk Internacional. Artistas de todo el mundo. folkfestival.international',
      duration: 12
    },
    {
      id: 'folk-3',
      channelId: 'folk',
      business: 'Tienda de Instrumentos Tradicionales',
      category: 'Instrumentos',
      message: 'La música folk que escuchas está patrocinada por Tienda de Instrumentos Tradicionales. Gaitas, zanfoñas y más. instrumentos.traditional',
      duration: 12
    },
    {
      id: 'folk-4',
      channelId: 'folk',
      business: 'Asociación Cultural Raíces',
      category: 'Cultura',
      message: 'Quawe Folk es posible gracias a Asociación Cultural Raíces. Preservando la música tradicional. raices.cultural',
      duration: 12
    }
  ]
};

// Función para obtener anuncios de un canal temático
export function getAdsForChannel(channelId: string): ThematicAd[] {
  return thematicAdsDatabase[channelId] || [];
}

// Función para obtener un anuncio aleatorio de un canal temático
export function getRandomAdForChannel(channelId: string): ThematicAd | null {
  const ads = getAdsForChannel(channelId);
  if (ads.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * ads.length);
  return ads[randomIndex];
}

// Función para verificar si un canal temático tiene anuncios
export function hasAdsForChannel(channelId: string): boolean {
  return channelId in thematicAdsDatabase && thematicAdsDatabase[channelId].length > 0;
}

// Lista de todos los canales temáticos con anuncios
export function getChannelsWithAds(): string[] {
  return Object.keys(thematicAdsDatabase);
}
