// Sistema de Productos de Marcas para Canje
// Las marcas pagan con productos físicos en lugar de publicidad tradicional

export interface Product {
  id: string;
  brand: string;
  name: string;
  category: 'zapatos' | 'joyas' | 'bisuteria' | 'ropa' | 'accesorios' | 'tecnologia' | 'hogar';
  description: string;
  pointsCost: number;
  stock: number;
  image: string;
  sponsorMessage: string;
  city?: string; // Ciudad donde se patrocina (opcional)
  channel?: string; // Canal temático donde se patrocina (opcional)
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  products: Product[];
  totalProductsSponsored: number;
}

// Base de datos de productos de marcas
export const productsDatabase: Product[] = [
  // ZAPATOS
  {
    id: 'prod-001',
    brand: 'Nike',
    name: 'Air Max 270',
    category: 'zapatos',
    description: 'Zapatillas deportivas con tecnología Air Max para máximo confort',
    pointsCost: 5000,
    stock: 50,
    image: '👟',
    sponsorMessage: 'Estas zapatillas son patrocinadas por Nike. Escucha Quawe Rock y gana puntos para canjearlas',
    channel: 'rock'
  },
  {
    id: 'prod-002',
    brand: 'Adidas',
    name: 'Ultraboost 22',
    category: 'zapatos',
    description: 'Zapatillas de running con tecnología Boost para máxima energía',
    pointsCost: 4500,
    stock: 40,
    image: '👟',
    sponsorMessage: 'Estas zapatillas son patrocinadas por Adidas. Escucha Quawe Electrónica y gana puntos',
    channel: 'electronica'
  },
  {
    id: 'prod-003',
    brand: 'Puma',
    name: 'RS-X³',
    category: 'zapatos',
    description: 'Zapatillas retro-futuristas con diseño único',
    pointsCost: 3500,
    stock: 60,
    image: '👟',
    sponsorMessage: 'Estas zapatillas son patrocinadas por Puma. Escucha Quawe Hip Hop y gana puntos',
    channel: 'hiphop'
  },

  // JOYAS
  {
    id: 'prod-004',
    brand: 'Tous',
    name: 'Collar Osito',
    category: 'joyas',
    description: 'Collar de plata con el icónico osito de Tous',
    pointsCost: 8000,
    stock: 20,
    image: '💎',
    sponsorMessage: 'Este collar es patrocinado por Tous. Escucha Quawe Pop y gana puntos para canjearlo',
    channel: 'pop'
  },
  {
    id: 'prod-005',
    brand: 'Swarovski',
    name: 'Pulsera Crystal',
    category: 'joyas',
    description: 'Pulsera de cristal con acabados premium',
    pointsCost: 6000,
    stock: 30,
    image: '💎',
    sponsorMessage: 'Esta pulsera es patrocinada por Swarovski. Escucha Quawe Clásica y gana puntos',
    channel: 'clasica'
  },
  {
    id: 'prod-006',
    brand: 'Pandora',
    name: 'Brazalete Moments',
    category: 'joyas',
    description: 'Brazalete personalizable con charms intercambiables',
    pointsCost: 7000,
    stock: 25,
    image: '💎',
    sponsorMessage: 'Este brazalete es patrocinado por Pandora. Escucha Quawe Jazz y gana puntos',
    channel: 'jazz'
  },

  // BISUTERÍA
  {
    id: 'prod-007',
    brand: 'Bimba y Lola',
    name: 'Pendientes Flower',
    category: 'bisuteria',
    description: 'Pendientes de diseño floral en metal dorado',
    pointsCost: 2500,
    stock: 100,
    image: '✨',
    sponsorMessage: 'Estos pendientes son patrocinados por Bimba y Lola. Escucha Quawe Latina y gana puntos',
    channel: 'latin'
  },
  {
    id: 'prod-008',
    brand: 'Parfois',
    name: 'Collar Boho',
    category: 'bisuteria',
    description: 'Collar estilo bohemio con detalles étnicos',
    pointsCost: 2000,
    stock: 120,
    image: '✨',
    sponsorMessage: 'Este collar es patrocinado por Parfois. Escucha Quawe Reggae y gana puntos',
    channel: 'reggae'
  },
  {
    id: 'prod-009',
    brand: 'Lovely',
    name: 'Set de Pulseras',
    category: 'bisuteria',
    description: 'Set de 5 pulseras combinables en diferentes colores',
    pointsCost: 1500,
    stock: 150,
    image: '✨',
    sponsorMessage: 'Este set es patrocinado por Lovely. Escucha Quawe Folk y gana puntos',
    channel: 'folk'
  },

  // ROPA
  {
    id: 'prod-010',
    brand: 'Zara',
    name: 'Chaqueta Denim',
    category: 'ropa',
    description: 'Chaqueta vaquera clásica con lavado moderno',
    pointsCost: 4000,
    stock: 45,
    image: '👕',
    sponsorMessage: 'Esta chaqueta es patrocinada por Zara. Escucha Quawe Rock y gana puntos',
    channel: 'rock'
  },
  {
    id: 'prod-011',
    brand: 'H&M',
    name: 'Vestido Floral',
    category: 'ropa',
    description: 'Vestido con estampado floral perfecto para primavera',
    pointsCost: 3000,
    stock: 55,
    image: '👗',
    sponsorMessage: 'Este vestido es patrocinado por H&M. Escucha Quawe Pop y gana puntos',
    channel: 'pop'
  },
  {
    id: 'prod-012',
    brand: 'Mango',
    name: 'Blazer Oversize',
    category: 'ropa',
    description: 'Blazer de corte oversize tendencia actual',
    pointsCost: 3500,
    stock: 40,
    image: '🧥',
    sponsorMessage: 'Este blazer es patrocinado por Mango. Escucha Quawe Electrónica y gana puntos',
    channel: 'electronica'
  },

  // ACCESORIOS
  {
    id: 'prod-013',
    brand: 'Ray-Ban',
    name: 'Gafas Aviator',
    category: 'accesorios',
    description: 'Gafas de sol icónicas con montura dorada',
    pointsCost: 5500,
    stock: 35,
    image: '🕶️',
    sponsorMessage: 'Estas gafas son patrocinadas por Ray-Ban. Escucha Quawe Hip Hop y gana puntos',
    channel: 'hiphop'
  },
  {
    id: 'prod-014',
    brand: 'Fossil',
    name: 'Reloj Minimal',
    category: 'accesorios',
    description: 'Reloj de pulsera con diseño minimalista',
    pointsCost: 4500,
    stock: 30,
    image: '⌚',
    sponsorMessage: 'Este reloj es patrocinado por Fossil. Escucha Quawe Jazz y gana puntos',
    channel: 'jazz'
  },
  {
    id: 'prod-015',
    brand: 'Herschel',
    name: 'Mochila Classic',
    category: 'accesorios',
    description: 'Mochila urbana con diseño clásico y funcional',
    pointsCost: 3000,
    stock: 50,
    image: '🎒',
    sponsorMessage: 'Esta mochila es patrocinada por Herschel. Escucha Quawe Flamenco y gana puntos',
    channel: 'flamenco'
  },

  // TECNOLOGÍA
  {
    id: 'prod-016',
    brand: 'Apple',
    name: 'AirPods Pro',
    category: 'tecnologia',
    description: 'Auriculares inalámbricos con cancelación de ruido',
    pointsCost: 15000,
    stock: 15,
    image: '🎧',
    sponsorMessage: 'Estos auriculares son patrocinados por Apple. Escucha Quawe Rock y gana puntos',
    channel: 'rock'
  },
  {
    id: 'prod-017',
    brand: 'Sony',
    name: 'Walkman NW-A55',
    category: 'tecnologia',
    description: 'Reproductor de música de alta resolución',
    pointsCost: 10000,
    stock: 20,
    image: '📱',
    sponsorMessage: 'Este Walkman es patrocinado por Sony. Escucha Quawe Clásica y gana puntos',
    channel: 'clasica'
  },
  {
    id: 'prod-018',
    brand: 'JBL',
    name: 'Altavoz Flip 6',
    category: 'tecnologia',
    description: 'Altavoz portátil resistente al agua',
    pointsCost: 6000,
    stock: 40,
    image: '🔊',
    sponsorMessage: 'Esta altavoz es patrocinada por JBL. Escucha Quawe Electrónica y gana puntos',
    channel: 'electronica'
  },

  // HOGAR
  {
    id: 'prod-019',
    brand: 'IKEA',
    name: 'Lámpara Dekad',
    category: 'hogar',
    description: 'Lámpara de mesa con diseño moderno',
    pointsCost: 2000,
    stock: 80,
    image: '💡',
    sponsorMessage: 'Esta lámpara es patrocinada por IKEA. Escucha Quawe Folk y gana puntos',
    channel: 'folk'
  },
  {
    id: 'prod-020',
    brand: 'Zara Home',
    name: 'Set de Cojines',
    category: 'hogar',
    description: 'Set de 3 cojines decorativos con diseños étnicos',
    pointsCost: 2500,
    stock: 60,
    image: '🛋️',
    sponsorMessage: 'Este set es patrocinado por Zara Home. Escucha Quawe Reggae y gana puntos',
    channel: 'reggae'
  }
];

// Función para obtener todos los productos
export function getAllProducts(): Product[] {
  return productsDatabase;
}

// Función para obtener productos por categoría
export function getProductsByCategory(category: Product['category']): Product[] {
  return productsDatabase.filter(p => p.category === category);
}

// Función para obtener productos por canal temático
export function getProductsByChannel(channelId: string): Product[] {
  return productsDatabase.filter(p => p.channel === channelId);
}

// Función para obtener productos por rango de puntos
export function getProductsByPointsRange(minPoints: number, maxPoints: number): Product[] {
  return productsDatabase.filter(p => p.pointsCost >= minPoints && p.pointsCost <= maxPoints);
}

// Función para obtener un producto por ID
export function getProductById(productId: string): Product | undefined {
  return productsDatabase.find(p => p.id === productId);
}

// Función para verificar si hay stock de un producto
export function hasStock(productId: string): boolean {
  const product = getProductById(productId);
  return product ? product.stock > 0 : false;
}

// Función para reducir stock de un producto
export function reduceStock(productId: string): boolean {
  const product = getProductById(productId);
  if (product && product.stock > 0) {
    product.stock -= 1;
    return true;
  }
  return false;
}

// Categorías disponibles
export const categories = [
  { id: 'zapatos', name: 'Zapatos', emoji: '👟' },
  { id: 'joyas', name: 'Joyas', emoji: '💎' },
  { id: 'bisuteria', name: 'Bisutería', emoji: '✨' },
  { id: 'ropa', name: 'Ropa', emoji: '👕' },
  { id: 'accesorios', name: 'Accesorios', emoji: '🕶️' },
  { id: 'tecnologia', name: 'Tecnología', emoji: '🎧' },
  { id: 'hogar', name: 'Hogar', emoji: '💡' }
];

// Rangos de puntos
export const pointsRanges = [
  { id: 'low', name: '1,000 - 2,500 puntos', min: 1000, max: 2500 },
  { id: 'medium', name: '2,500 - 5,000 puntos', min: 2500, max: 5000 },
  { id: 'high', name: '5,000 - 10,000 puntos', min: 5000, max: 10000 },
  { id: 'premium', name: '10,000+ puntos', min: 10000, max: Infinity }
];
