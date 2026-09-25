// Sistema de Anuncios Promocionales Locales
// Cada ciudad tiene sus propios negocios y anuncios específicos

export interface LocalAd {
  id: string;
  business: string;
  category: string;
  message: string;
  duration: number; // en segundos (siempre 12)
  city: string;
  country: string;
}

// Base de datos de anuncios por ciudad
export const localAdsDatabase: Record<string, LocalAd[]> = {
  // ESPAÑA
  'Madrid': [
    {
      id: 'mad-1',
      business: 'Restaurante La Barraca',
      category: 'Gastronomía',
      message: 'La música que escuchas está patrocinada por Restaurante La Barraca. Auténtica paella valenciana en el corazón de Madrid. Reserva en labarraca.es',
      duration: 12,
      city: 'Madrid',
      country: 'España'
    },
    {
      id: 'mad-2',
      business: 'Gimnasio FitCenter',
      category: 'Salud',
      message: 'Esta emisora es posible gracias a Gimnasio FitCenter. Tu gimnasio de confianza en Madrid. Primera clase gratis en fitcenter.madrid',
      duration: 12,
      city: 'Madrid',
      country: 'España'
    },
    {
      id: 'mad-3',
      business: 'Taller Mecánico AutoRápido',
      category: 'Servicios',
      message: 'La música de Quawe Madrid está patrocinada por Taller Mecánico AutoRápido. Reparación express en 24 horas. Llama al 915 123 456',
      duration: 12,
      city: 'Madrid',
      country: 'España'
    }
  ],
  'Barcelona': [
    {
      id: 'bcn-1',
      business: 'Cafetería El Gato Negro',
      category: 'Gastronomía',
      message: 'Esta música suena gracias a Cafetería El Gato Negro. El mejor café de especialidad en Barcelona. Visítanos en el barrio gótico',
      duration: 12,
      city: 'Barcelona',
      country: 'España'
    },
    {
      id: 'bcn-2',
      business: 'Tienda de Moda Urban Style',
      category: 'Moda',
      message: 'Quawe Barcelona está patrocinada por Tienda de Moda Urban Style. Las últimas tendencias en el centro de Barcelona. urbanstyle.bcn',
      duration: 12,
      city: 'Barcelona',
      country: 'España'
    },
    {
      id: 'bcn-3',
      business: 'Clínica Dental Somriure',
      category: 'Salud',
      message: 'La música que escuchas es posible gracias a Clínica Dental Somriure. Tu sonrisa es nuestra prioridad. Primera visita gratuita',
      duration: 12,
      city: 'Barcelona',
      country: 'España'
    }
  ],
  'Sevilla': [
    {
      id: 'sev-1',
      business: 'Taberna El Rinconcillo',
      category: 'Gastronomía',
      message: 'Esta emisora de flamenco está patrocinada por Taberna El Rinconcillo. La taberna más antigua de Sevilla desde 1670. Tapas auténticas',
      duration: 12,
      city: 'Sevilla',
      country: 'España'
    },
    {
      id: 'sev-2',
      business: 'Academia de Baile Flamenco María Soler',
      category: 'Cultura',
      message: 'La música flamenca que escuchas es posible gracias a Academia de Baile Flamenco María Soler. Clases para todos los niveles. Infórmate',
      duration: 12,
      city: 'Sevilla',
      country: 'España'
    },
    {
      id: 'sev-3',
      business: 'Hotel Casa Palacio',
      category: 'Turismo',
      message: 'Quawe Flamenco Sevilla está patrocinada por Hotel Casa Palacio. Alojamiento con encanto en el corazón de Sevilla. casapalacio.sev',
      duration: 12,
      city: 'Sevilla',
      country: 'España'
    }
  ],
  // MÉXICO
  'CDMX': [
    {
      id: 'cdmx-1',
      business: 'Taquería El Güero',
      category: 'Gastronomía',
      message: 'Esta música está patrocinada por Taquería El Güero. Los mejores tacos al pastor de la CDMX. Tres sucursales en la ciudad. Elguero.mx',
      duration: 12,
      city: 'CDMX',
      country: 'México'
    },
    {
      id: 'cdmx-2',
      business: 'Gimnasio PowerFit',
      category: 'Salud',
      message: 'Quawe CDMX es posible gracias a Gimnasio PowerFit. Tu gimnasio de confianza en la capital. Membresía mensual desde 499 pesos',
      duration: 12,
      city: 'CDMX',
      country: 'México'
    },
    {
      id: 'cdmx-3',
      business: 'Taller Mecánico Express',
      category: 'Servicios',
      message: 'La música que escuchas está patrocinada por Taller Mecánico Express. Servicio rápido y confiable en CDMX. Llama al 55 1234 5678',
      duration: 12,
      city: 'CDMX',
      country: 'México'
    }
  ],
  'Guadalajara': [
    {
      id: 'gdl-1',
      business: 'Restaurante Tlaquepaque',
      category: 'Gastronomía',
      message: 'Esta emisora está patrocinada por Restaurante Tlaquepaque. Comida jalisciense tradicional en el corazón de Guadalajara. Visítanos hoy',
      duration: 12,
      city: 'Guadalajara',
      country: 'México'
    },
    {
      id: 'gdl-2',
      business: 'Tequila Don Rafael',
      category: 'Bebidas',
      message: 'La música de Quawe Guadalajara es posible gracias a Tequila Don Rafael. Tequila artesanal 100% agave. Disfrútalo con moderación',
      duration: 12,
      city: 'Guadalajara',
      country: 'México'
    }
  ],
  // ARGENTINA
  'Buenos Aires': [
    {
      id: 'ba-1',
      business: 'Parrilla Don Julio',
      category: 'Gastronomía',
      message: 'Esta música está patrocinada por Parrilla Don Julio. La mejor carne argentina en Buenos Aires. Reservá tu mesa en donjulio.ar',
      duration: 12,
      city: 'Buenos Aires',
      country: 'Argentina'
    },
    {
      id: 'ba-2',
      business: 'Café Tortoni',
      category: 'Gastronomía',
      message: 'Quawe Buenos Aires es posible gracias a Café Tortoni. El café más emblemático de Buenos Aires desde 1858. Medrano 825',
      duration: 12,
      city: 'Buenos Aires',
      country: 'Argentina'
    },
    {
      id: 'ba-3',
      business: 'Librería El Ateneo',
      category: 'Cultura',
      message: 'La música que escuchás está patrocinada por Librería El Ateneo. La librería más linda de Buenos Aires en Santa Fe 1860',
      duration: 12,
      city: 'Buenos Aires',
      country: 'Argentina'
    }
  ],
  // COLOMBIA
  'Bogotá': [
    {
      id: 'bog-1',
      business: 'Restaurante Andrés Carne de Res',
      category: 'Gastronomía',
      message: 'Esta emisora está patrocinada por Restaurante Andrés Carne de Res. La experiencia gastronómica más única de Colombia. Chía, Cundinamarca',
      duration: 12,
      city: 'Bogotá',
      country: 'Colombia'
    },
    {
      id: 'bog-2',
      business: 'Café Juan Valdez',
      category: 'Gastronomía',
      message: 'La música de Quawe Bogotá es posible gracias a Café Juan Valdez. El mejor café 100% colombiano. Visítanos en toda la ciudad',
      duration: 12,
      city: 'Bogotá',
      country: 'Colombia'
    }
  ],
  // CHILE
  'Santiago': [
    {
      id: 'san-1',
      business: 'Restaurante Boragó',
      category: 'Gastronomía',
      message: 'Esta música está patrocinada por Restaurante Boragó. Cocina de vanguardia con ingredientes chilenos. Uno de los mejores restaurantes del mundo',
      duration: 12,
      city: 'Santiago',
      country: 'Chile'
    },
    {
      id: 'san-2',
      business: 'Viña Concha y Toro',
      category: 'Bebidas',
      message: 'Quawe Santiago es posible gracias a Viña Concha y Toro. Los mejores vinos de Chile. Consume con moderación. Conchaytoro.cl',
      duration: 12,
      city: 'Santiago',
      country: 'Chile'
    }
  ],
  // PERÚ
  'Lima': [
    {
      id: 'lim-1',
      business: 'Restaurante Central',
      category: 'Gastronomía',
      message: 'Esta emisora está patrocinada por Restaurante Central. Elegido mejor restaurante del mundo. Cocina de altura peruana. central.restaurant',
      duration: 12,
      city: 'Lima',
      country: 'Perú'
    },
    {
      id: 'lim-2',
      business: 'Café Pasadísima',
      category: 'Gastronomía',
      message: 'La música de Quawe Lima es posible gracias a Café Pasadísima. El mejor café peruano en Miraflores. Visítanos hoy',
      duration: 12,
      city: 'Lima',
      country: 'Perú'
    }
  ],
  // VENEZUELA
  'Caracas': [
    {
      id: 'car-1',
      business: 'Restaurante Pisco & Mar',
      category: 'Gastronomía',
      message: 'Esta música está patrocinada por Restaurante Pisco & Mar. La mejor comida peruana en Caracas. Av. Francisco de Miranda. Reservas disponibles',
      duration: 12,
      city: 'Caracas',
      country: 'Venezuela'
    },
    {
      id: 'car-2',
      business: 'Cafetería Café Madrid',
      category: 'Gastronomía',
      message: 'Quawe Caracas es posible gracias a Cafetería Café Madrid. El mejor café de la ciudad en el centro de Caracas. Visítanos en la Av. Libertador',
      duration: 12,
      city: 'Caracas',
      country: 'Venezuela'
    }
  ],
  // REPÚBLICA DOMINICANA
  'Santo Domingo': [
    {
      id: 'sd-1',
      business: 'Restaurante Adrian Tropical',
      category: 'Gastronomía',
      message: 'Esta emisora está patrocinada por Restaurante Adrian Tropical. La cadena de restaurantes más popular de República Dominicana. Comida criolla auténtica',
      duration: 12,
      city: 'Santo Domingo',
      country: 'República Dominicana'
    },
    {
      id: 'sd-2',
      business: 'Hotel Casa de Campo',
      category: 'Turismo',
      message: 'La música de Quawe Santo Domingo es posible gracias a Hotel Casa de Campo. El resort más exclusivo del Caribe. La Romana, República Dominicana',
      duration: 12,
      city: 'Santo Domingo',
      country: 'República Dominicana'
    }
  ],
  // USA
  'Miami': [
    {
      id: 'mia-1',
      business: 'Restaurante Joe\'s Stone Crab',
      category: 'Gastronomía',
      message: 'Esta música está patrocinada por Restaurante Joe\'s Stone Crab. El restaurante más icónico de Miami Beach desde 1913. 11 Washington Avenue',
      duration: 12,
      city: 'Miami',
      country: 'USA'
    },
    {
      id: 'mia-2',
      business: 'Tienda Versace Mansion',
      category: 'Moda',
      message: 'Quawe Miami es posible gracias a Tienda Versace Mansion. Moda de lujo en el corazón de South Beach. Visítanos en Ocean Drive',
      duration: 12,
      city: 'Miami',
      country: 'USA'
    }
  ]
};

// Función para obtener anuncios de una ciudad específica
export function getAdsForCity(city: string): LocalAd[] {
  return localAdsDatabase[city] || [];
}

// Función para obtener un anuncio aleatorio de una ciudad
export function getRandomAdForCity(city: string): LocalAd | null {
  const ads = getAdsForCity(city);
  if (ads.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * ads.length);
  return ads[randomIndex];
}

// Función para verificar si una ciudad tiene anuncios
export function hasAdsForCity(city: string): boolean {
  return city in localAdsDatabase && localAdsDatabase[city].length > 0;
}

// Lista de todas las ciudades con anuncios
export function getCitiesWithAds(): string[] {
  return Object.keys(localAdsDatabase);
}
