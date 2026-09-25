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
// Incluye tanto negocios locales como grandes empresas B2B
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
    },
    // Grandes empresas B2B
    {
      id: 'mad-b2b-1',
      business: 'El Corte Inglés',
      category: 'Retail B2B/B2C',
      message: 'Esta música está patrocinada por El Corte Inglés. La mayor empresa de retail de España con soluciones B2B para empresas. elcorteingles.es/empresas',
      duration: 12,
      city: 'Madrid',
      country: 'España'
    },
    {
      id: 'mad-b2b-2',
      business: 'Amazon Business',
      category: 'E-commerce B2B',
      message: 'Quawe Madrid es posible gracias a Amazon Business. La plataforma B2B líder mundial para compras empresariales. amazon.es/business',
      duration: 12,
      city: 'Madrid',
      country: 'España'
    },
    {
      id: 'mad-b2b-3',
      business: 'SAP España',
      category: 'Software Empresarial B2B',
      message: 'Esta música está patrocinada por SAP. El software de gestión empresarial líder mundial. Transforma tu negocio con SAP. sap.com/es',
      duration: 12,
      city: 'Madrid',
      country: 'España'
    },
    {
      id: 'mad-b2b-4',
      business: 'Microsoft 365',
      category: 'Productividad B2B',
      message: 'Quawe Madrid es posible gracias a Microsoft 365. Productividad y colaboración para empresas. Office, Teams, Azure. microsoft.com/es-es/microsoft-365',
      duration: 12,
      city: 'Madrid',
      country: 'España'
    },
    {
      id: 'mad-b2b-5',
      business: 'Salesforce',
      category: 'CRM B2B',
      message: 'Esta música está patrocinada por Salesforce. El CRM líder mundial para gestionar relaciones con clientes. salesforce.com/es',
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
    },
    // Grandes empresas B2B
    {
      id: 'bcn-b2b-1',
      business: 'Amazon Web Services',
      category: 'Cloud Computing B2B',
      message: 'Esta música está patrocinada por AWS. La plataforma de cloud computing más completa del mundo. aws.amazon.com/es',
      duration: 12,
      city: 'Barcelona',
      country: 'España'
    },
    {
      id: 'bcn-b2b-2',
      business: 'Google Cloud',
      category: 'Cloud & IA B2B',
      message: 'Quawe Barcelona es posible gracias a Google Cloud. Infraestructura e inteligencia artificial para empresas. cloud.google.com/es',
      duration: 12,
      city: 'Barcelona',
      country: 'España'
    },
    {
      id: 'bcn-b2b-3',
      business: 'Oracle España',
      category: 'Base de Datos B2B',
      message: 'Esta música está patrocinada por Oracle. Líder mundial en bases de datos y soluciones empresariales. oracle.com/es',
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
    },
    // Grandes empresas B2B
    {
      id: 'cdmx-b2b-1',
      business: 'Alibaba.com',
      category: 'Marketplace B2B',
      message: 'Esta música está patrocinada por Alibaba.com. La plataforma B2B más grande del mundo para comercio internacional. alibaba.com',
      duration: 12,
      city: 'CDMX',
      country: 'México'
    },
    {
      id: 'cdmx-b2b-2',
      business: 'Shopify Plus',
      category: 'E-commerce B2B',
      message: 'Quawe CDMX es posible gracias a Shopify Plus. La plataforma de e-commerce para empresas en crecimiento. shopify.com/plus',
      duration: 12,
      city: 'CDMX',
      country: 'México'
    },
    {
      id: 'cdmx-b2b-3',
      business: 'IBM México',
      category: 'Tecnología B2B',
      message: 'Esta música está patrocinada por IBM. Soluciones de inteligencia artificial y cloud para empresas. ibm.com/mx',
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
    },
    // Grandes empresas B2B
    {
      id: 'ba-b2b-1',
      business: 'Stripe',
      category: 'Pagos Digitales B2B',
      message: 'Esta música está patrocinada por Stripe. La plataforma de pagos online para negocios de todos los tamaños. stripe.com/es',
      duration: 12,
      city: 'Buenos Aires',
      country: 'Argentina'
    },
    {
      id: 'ba-b2b-2',
      business: 'PayPal Business',
      category: 'Pagos B2B',
      message: 'Quawe Buenos Aires es posible gracias a PayPal Business. Pagos seguros para empresas en todo el mundo. paypal.com/ar/business',
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
    },
    // Grandes empresas B2B
    {
      id: 'bog-b2b-1',
      business: 'FedEx Business',
      category: 'Logística B2B',
      message: 'Esta música está patrocinada por FedEx. Soluciones de logística y envío para empresas. fedex.com/es-co',
      duration: 12,
      city: 'Bogotá',
      country: 'Colombia'
    },
    {
      id: 'bog-b2b-2',
      business: 'DHL Business',
      category: 'Logística Internacional B2B',
      message: 'Quawe Bogotá es posible gracias a DHL. Líder mundial en logística internacional para empresas. dhl.com/co-es',
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
    },
    // Grandes empresas B2B
    {
      id: 'san-b2b-1',
      business: 'Bosch Professional',
      category: 'Herramientas Industriales B2B',
      message: 'Esta música está patrocinada por Bosch Professional. Herramientas y tecnología para profesionales e industrias. bosch-professional.com/cl',
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
    },
    // Grandes empresas B2B
    {
      id: 'lim-b2b-1',
      business: 'Siemens Perú',
      category: 'Tecnología Industrial B2B',
      message: 'Esta música está patrocinada por Siemens. Tecnología industrial y soluciones digitales para empresas. siemens.com/pe',
      duration: 12,
      city: 'Lima',
      country: 'Perú'
    },
    {
      id: 'lim-b2b-2',
      business: 'Schneider Electric',
      category: 'Gestión Energética B2B',
      message: 'Quawe Lima es posible gracias a Schneider Electric. Gestión de energía y automatización para industrias. se.com/pe',
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
  ],

};

// Anuncios de empresas B2B globales (aparecen en todas las ciudades)
export const globalB2BAds: LocalAd[] = [
  {
    id: 'global-b2b-1',
    business: 'Adobe Creative Cloud',
    category: 'Software Creativo B2B',
    message: 'Esta música está patrocinada por Adobe Creative Cloud. Las herramientas creativas líderes para profesionales y empresas. adobe.com/creativecloud',
    duration: 12,
    city: 'Global',
    country: 'Global'
  },
  {
    id: 'global-b2b-2',
    business: 'Zoom Business',
    category: 'Comunicaciones B2B',
    message: 'Quawe es posible gracias a Zoom Business. Videoconferencias y colaboración para empresas de todos los tamaños. zoom.es/business',
    duration: 12,
    city: 'Global',
    country: 'Global'
  },
  {
    id: 'global-b2b-3',
    business: 'Slack',
    category: 'Colaboración B2B',
    message: 'Esta música está patrocinada por Slack. La plataforma de comunicación y colaboración para equipos. slack.com/intl/es-es',
    duration: 12,
    city: 'Global',
    country: 'Global'
  },
  {
    id: 'global-b2b-4',
    business: 'Atlassian',
    category: 'Gestión de Proyectos B2B',
    message: 'Quawe es posible gracias a Atlassian. Jira, Confluence y Trello para gestionar proyectos empresariales. atlassian.com/es',
    duration: 12,
    city: 'Global',
    country: 'Global'
  },
  {
    id: 'global-b2b-5',
    business: 'HubSpot',
    category: 'Marketing & Ventas B2B',
    message: 'Esta música está patrocinada por HubSpot. CRM y marketing automation para hacer crecer tu negocio. hubspot.com/products',
    duration: 12,
    city: 'Global',
    country: 'Global'
  },
  {
    id: 'global-b2b-6',
    business: 'Dropbox Business',
    category: 'Almacenamiento Cloud B2B',
    message: 'Quawe es posible gracias a Dropbox Business. Almacenamiento en la nube y colaboración para equipos. dropbox.com/business',
    duration: 12,
    city: 'Global',
    country: 'Global'
  },
  {
    id: 'global-b2b-7',
    business: 'Canva for Teams',
    category: 'Diseño B2B',
    message: 'Esta música está patrocinada por Canva for Teams. Diseño gráfico colaborativo para empresas. canva.com/es_es/teams',
    duration: 12,
    city: 'Global',
    country: 'Global'
  },
  {
    id: 'global-b2b-8',
    business: 'Notion',
    category: 'Productividad B2B',
    message: 'Quawe es posible gracias a Notion. El espacio de trabajo todo-en-uno para equipos. notion.com/product',
    duration: 12,
    city: 'Global',
    country: 'Global'
  },
  {
    id: 'global-b2b-9',
    business: 'Figma',
    category: 'Diseño UI/UX B2B',
    message: 'Esta música está patrocinada por Figma. La plataforma de diseño colaborativo para equipos de producto. figma.com',
    duration: 12,
    city: 'Global',
    country: 'Global'
  },
  {
    id: 'global-b2b-10',
    business: 'GitHub',
    category: 'Desarrollo B2B',
    message: 'Quawe es posible gracias a GitHub. La plataforma de desarrollo de software más grande del mundo. github.com',
    duration: 12,
    city: 'Global',
    country: 'Global'
  }
];

// Función para obtener anuncios de una ciudad específica
export function getAdsForCity(city: string): LocalAd[] {
  const cityAds = localAdsDatabase[city] || [];
  // Combinar anuncios locales con anuncios globales B2B
  return [...cityAds, ...globalB2BAds];
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
