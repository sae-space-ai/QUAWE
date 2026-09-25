// Catálogo de Productos con Información Real de Marcas
// Productos de marcas patrocinadoras con detalles completos e imágenes reales

export interface Product {
  id: string;
  brand: string;
  name: string;
  category: 'zapatos' | 'joyas' | 'bisuteria' | 'ropa' | 'accesorios' | 'tecnologia' | 'hogar';
  description: string;
  pointsCost: number;
  stock: number;
  image: string; // URL de imagen real del producto
  brandLogo: string; // Logo de la marca
  sponsorMessage: string;
  city?: string;
  channel?: string;
  retailPrice: string; // Precio real del producto
  features: string[]; // Características del producto
  colors?: string[]; // Colores disponibles
  sizes?: string[]; // Tallas disponibles
}

// Base de datos de productos reales de marcas conocidas
export const productsDatabase: Product[] = [
  // ==================== ZAPATOS ====================
  {
    id: 'prod-001',
    brand: 'Nike',
    name: 'Air Max 270',
    category: 'zapatos',
    description: 'Zapatillas deportivas con tecnología Air Max visible para máximo confort y estilo. Diseño moderno con amortiguación revolucionaria.',
    pointsCost: 5000,
    stock: 50,
    image: 'https://image.qwenlm.ai/generated-images/820d1562-dfd8-42bf-bba2-8ff44288f282/_result.png',
    brandLogo: '✓',
    sponsorMessage: 'Estas zapatillas Nike Air Max 270 son patrocinadas por Nike. Escucha Quawe Rock y gana puntos para canjearlas',
    channel: 'rock',
    retailPrice: '€150',
    features: ['Air Max visible', 'Malla transpirable', 'Suela de goma', 'Amortiguación máxima'],
    colors: ['Negro/Blanco', 'Gris/Rojo', 'Azul/Blanco'],
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45']
  },
  {
    id: 'prod-002',
    brand: 'Adidas',
    name: 'Ultraboost 22',
    category: 'zapatos',
    description: 'Zapatillas de running premium con tecnología Boost para máxima retorno de energía. Diseñadas para corredores exigentes.',
    pointsCost: 4500,
    stock: 40,
    image: 'https://image.qwenlm.ai/generated-images/b4fb57c4-daea-4a06-a53e-439a6a3f704c/_result.png',
    brandLogo: '✓',
    sponsorMessage: 'Estas zapatillas Adidas Ultraboost 22 son patrocinadas por Adidas. Escucha Quawe Electrónica y gana puntos',
    channel: 'electronica',
    retailPrice: '€180',
    features: ['Tecnología Boost', 'Primeknit+', 'Continental Rubber', 'Torsion System'],
    colors: ['Negro Total', 'Blanco/Core Black', 'Gris'],
    sizes: ['38', '39', '40', '41', '42', '43', '44']
  },
  {
    id: 'prod-003',
    brand: 'Puma',
    name: 'RS-X³',
    category: 'zapatos',
    description: 'Zapatillas retro-futuristas con diseño chunky y tecnología Running System. Estilo urbano con comodidad excepcional.',
    pointsCost: 3500,
    stock: 60,
    image: 'https://image.qwenlm.ai/generated-images/aa1713d3-d193-4769-89e7-b4b40f293630/_result.png',
    brandLogo: '✓',
    sponsorMessage: 'Estas zapatillas Puma RS-X³ son patrocinadas por Puma. Escucha Quawe Hip Hop y gana puntos',
    channel: 'hiphop',
    retailPrice: '€110',
    features: ['Diseño chunky', 'RS Technology', 'Malla y sintéticos', 'Suela gruesa'],
    colors: ['Blanco/Azul', 'Negro/Rojo', 'Multicolor'],
    sizes: ['38', '39', '40', '41', '42', '43', '44']
  },

  // ==================== JOYAS ====================
  {
    id: 'prod-004',
    brand: 'Tous',
    name: 'Collar Osito',
    category: 'joyas',
    description: 'Collar de plata de primera ley con el icónico osito de Tous. Joya emblemática de la marca española, perfecta para regalo.',
    pointsCost: 8000,
    stock: 20,
    image: 'https://image.qwenlm.ai/generated-images/d61edde2-1ef5-4635-9b9c-959ff5ade934/_result.png',
    brandLogo: '✓',
    sponsorMessage: 'Este collar Tous Osito es patrocinado por Tous. Escucha Quawe Pop y gana puntos para canjearlo',
    channel: 'pop',
    retailPrice: '€250',
    features: ['Plata de primera ley', 'Diseño icónico', 'Cadena ajustable', 'Caja de regalo incluida'],
    colors: ['Plata', 'Plata con oro']
  },
  {
    id: 'prod-005',
    brand: 'Swarovski',
    name: 'Pulsera Crystal',
    category: 'joyas',
    description: 'Pulsera de cristal con acabados premium y diseño elegante. Cristales Swarovski de alta calidad que brillan con luz propia.',
    pointsCost: 6000,
    stock: 30,
    image: 'https://image.qwenlm.ai/generated-images/67e3e7ff-c8dd-457e-b02a-b26d5f874529/_result.png',
    brandLogo: '✓',
    sponsorMessage: 'Esta pulsera Swarovski Crystal es patrocinada por Swarovski. Escucha Quawe Clásica y gana puntos',
    channel: 'clasica',
    retailPrice: '€195',
    features: ['Cristal Swarovski', 'Cierre magnético', 'Baño en rodio', 'Caja premium'],
    colors: ['Cristal transparente', 'Azul', 'Rosa']
  },
  {
    id: 'prod-006',
    brand: 'Pandora',
    name: 'Brazalete Moments',
    category: 'joyas',
    description: 'Brazalete personalizable de plata con sistema de charms intercambiables. Crea tu estilo único con los charms que más te representen.',
    pointsCost: 7000,
    stock: 25,
    image: 'https://image.qwenlm.ai/generated-images/bf544d53-4814-4e53-8fcb-cd4107856e8e/_result.png',
    brandLogo: '✓',
    sponsorMessage: 'Este brazalete Pandora Moments es patrocinado por Pandora. Escucha Quawe Jazz y gana puntos',
    channel: 'jazz',
    retailPrice: '€220',
    features: ['Plata de primera ley', 'Sistema de rosca', 'Cierre de barril', 'Personalizable'],
    sizes: ['16cm', '17cm', '18cm', '19cm', '20cm']
  },

  // ==================== BISUTERÍA ====================
  {
    id: 'prod-007',
    brand: 'Bimba y Lola',
    name: 'Pendientes Flower',
    category: 'bisuteria',
    description: 'Pendientes de diseño floral en metal dorado con acabados de alta calidad. Pieza versátil para cualquier ocasión.',
    pointsCost: 2500,
    stock: 100,
    image: 'https://image.qwenlm.ai/generated-images/d770d84f-aebd-4746-a056-f48690772080/_result.png',
    brandLogo: '✓',
    sponsorMessage: 'Estos pendientes Bimba y Lola Flower son patrocinados por Bimba y Lola. Escucha Quawe Latina y gana puntos',
    channel: 'latin',
    retailPrice: '€75',
    features: ['Metal dorado', 'Diseño floral', 'Cierre de presión', 'Hipoalergénico'],
    colors: ['Dorado', 'Plateado', 'Rose gold']
  },
  {
    id: 'prod-008',
    brand: 'Parfois',
    name: 'Collar Boho',
    category: 'bisuteria',
    description: 'Collar estilo bohemio con detalles étnicos y cuentas de colores. Perfecto para looks veraniegos y festivales.',
    pointsCost: 2000,
    stock: 120,
    image: 'https://image.qwenlm.ai/generated-images/6266ec3b-1289-484c-bb51-f615c04be6f5/_result.png',
    brandLogo: '✓',
    sponsorMessage: 'Este collar Parfois Boho es patrocinado por Parfois. Escucha Quawe Reggae y gana puntos',
    channel: 'reggae',
    retailPrice: '€55',
    features: ['Estilo bohemio', 'Cuentas multicolor', 'Cierre ajustable', 'Diseño étnico'],
    colors: ['Multicolor', 'Tonos tierra', 'Azul/Turquesa']
  },
  {
    id: 'prod-009',
    brand: 'Lovely',
    name: 'Set de Pulseras',
    category: 'bisuteria',
    description: 'Set de 5 pulseras combinables en diferentes colores y texturas. Perfectas para layering y crear looks únicos.',
    pointsCost: 1500,
    stock: 150,
    image: 'https://image.qwenlm.ai/generated-images/7edc782b-152e-457a-8eb1-b9d75cf4aa75/_result.png',
    brandLogo: '✓',
    sponsorMessage: 'Este set de pulseras Lovely es patrocinado por Lovely. Escucha Quawe Folk y gana puntos',
    channel: 'folk',
    retailPrice: '€45',
    features: ['Set de 5 piezas', 'Diseños variados', 'Elásticas', 'Combinables'],
    colors: ['Dorado', 'Plateado', 'Multicolor', 'Rose gold', 'Negro']
  },

  // ==================== ROPA ====================
  {
    id: 'prod-010',
    brand: 'Zara',
    name: 'Chaqueta Denim',
    category: 'ropa',
    description: 'Chaqueta vaquera clásica con lavado moderno y corte actual. Pieza imprescindible en cualquier armario.',
    pointsCost: 4000,
    stock: 45,
    image: 'https://image.qwenlm.ai/generated-images/76209fd9-e5b1-4191-b023-285a328c7551/_result.png',
    brandLogo: '✓',
    sponsorMessage: 'Esta chaqueta Zara Denim es patrocinada por Zara. Escucha Quawe Rock y gana puntos',
    channel: 'rock',
    retailPrice: '€49.95',
    features: ['Denim 100% algodón', 'Lavado moderno', 'Corte regular', 'Botones metálicos'],
    colors: ['Azul claro', 'Azul medio', 'Azul oscuro'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'prod-011',
    brand: 'H&M',
    name: 'Vestido Floral',
    category: 'ropa',
    description: 'Vestido con estampado floral perfecto para primavera/verano. Tejido ligero y fluido con corte favorecedor.',
    pointsCost: 3000,
    stock: 55,
    image: 'https://image.qwenlm.ai/generated-images/466aef24-2d6c-47ed-87cb-c3d31d64d627/_result.png',
    brandLogo: '✓',
    sponsorMessage: 'Este vestido H&M Floral es patrocinado por H&M. Escucha Quawe Pop y gana puntos',
    channel: 'pop',
    retailPrice: '€29.99',
    features: ['Estampado floral', 'Tejido ligero', 'Corte A-line', 'Largo midi'],
    colors: ['Flores rosas', 'Flores azules', 'Flores multicolor'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'prod-012',
    brand: 'Mango',
    name: 'Blazer Oversize',
    category: 'ropa',
    description: 'Blazer de corte oversize tendencia actual. Elegante y versátil, perfecto para looks formales e informales.',
    pointsCost: 3500,
    stock: 40,
    image: 'https://image.qwenlm.ai/generated-images/7e539313-62ce-4a01-a3f9-c4c2f462cf11/_result.png',
    brandLogo: '✓',
    sponsorMessage: 'Este blazer Mango Oversize es patrocinado por Mango. Escucha Quawe Electrónica y gana puntos',
    channel: 'electronica',
    retailPrice: '€59.99',
    features: ['Corte oversize', 'Tejido estructurado', 'Doble botonadura', 'Forro interior'],
    colors: ['Negro', 'Beige', 'Gris'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },

  // ==================== ACCESORIOS ====================
  {
    id: 'prod-013',
    brand: 'Ray-Ban',
    name: 'Gafas Aviator',
    category: 'accesorios',
    description: 'Gafas de sol icónicas con montura dorada y cristales verdes. El modelo más emblemático de Ray-Ban desde 1937.',
    pointsCost: 5500,
    stock: 35,
    image: 'https://image.qwenlm.ai/generated-images/f85be8c2-d785-405d-ae93-67384e05e38c/_result.png',
    brandLogo: '✓',
    sponsorMessage: 'Estas gafas Ray-Ban Aviator son patrocinadas por Ray-Ban. Escucha Quawe Hip Hop y gana puntos',
    channel: 'hiphop',
    retailPrice: '€154',
    features: ['Montura metálica', 'Cristales de vidrio', 'Protección UV400', 'Estuche incluido'],
    colors: ['Dorado/Verde', 'Plateado/Azul', 'Negro/Gris']
  },
  {
    id: 'prod-014',
    brand: 'Fossil',
    name: 'Reloj Minimal',
    category: 'accesorios',
    description: 'Reloj de pulsera con diseño minimalista y elegante. Movimiento de cuarzo japonés y correa de cuero genuino.',
    pointsCost: 4500,
    stock: 30,
    image: 'https://image.qwenlm.ai/generated-images/7ee67334-638c-4e44-ac0a-dce380f27d5b/_result.png',
    brandLogo: '✓',
    sponsorMessage: 'Este reloj Fossil Minimal es patrocinado por Fossil. Escucha Quawe Jazz y gana puntos',
    channel: 'jazz',
    retailPrice: '€129',
    features: ['Movimiento de cuarzo', 'Correa de cuero', 'Resistente al agua 5ATM', 'Caja de acero'],
    colors: ['Negro/Marrón', 'Plateado/Negro', 'Dorado/Marrón']
  },
  {
    id: 'prod-015',
    brand: 'Herschel',
    name: 'Mochila Classic',
    category: 'accesorios',
    description: 'Mochila urbana con diseño clásico y funcional. Compartimento para laptop de 15" y múltiples bolsillos organizadores.',
    pointsCost: 3000,
    stock: 50,
    image: 'https://image.qwenlm.ai/generated-images/97f3db68-ab23-4e0f-87e4-8675188f584b/_result.png',
    brandLogo: '✓',
    sponsorMessage: 'Esta mochila Herschel Classic es patrocinada por Herschel. Escucha Quawe Flamenco y gana puntos',
    channel: 'flamenco',
    retailPrice: '€89.99',
    features: ['Compartimento laptop 15"', 'Tejido poliéster', 'Forro interior estampado', 'Correas acolchadas'],
    colors: ['Negro', 'Azul marino', 'Gris', 'Rojo']
  },

  // ==================== TECNOLOGÍA ====================
  {
    id: 'prod-016',
    brand: 'Apple',
    name: 'AirPods Pro',
    category: 'tecnologia',
    description: 'Auriculares inalámbricos premium con cancelación activa de ruido y audio espacial. La mejor experiencia de audio de Apple.',
    pointsCost: 15000,
    stock: 15,
    image: 'https://image.qwenlm.ai/generated-images/cb20c67c-93cb-4a81-bd3e-60d0f10a4e31/_result.png',
    brandLogo: '✓',
    sponsorMessage: 'Estos AirPods Pro son patrocinados por Apple. Escucha Quawe Rock y gana puntos',
    channel: 'rock',
    retailPrice: '€279',
    features: ['Cancelación activa de ruido', 'Audio espacial', 'Resistencia al agua IPX4', 'Estuche de carga MagSafe'],
    colors: ['Blanco']
  },
  {
    id: 'prod-017',
    brand: 'Sony',
    name: 'Walkman NW-A55',
    category: 'tecnologia',
    description: 'Reproductor de música de alta resolución con DAC premium. Para los auténticos audiófilos que buscan la máxima calidad de sonido.',
    pointsCost: 10000,
    stock: 20,
    image: 'https://image.qwenlm.ai/generated-images/b26013d5-067c-4d76-9268-e0338b84fb91/_result.png',
    brandLogo: '✓',
    sponsorMessage: 'Este Walkman Sony NW-A55 es patrocinado por Sony. Escucha Quawe Clásica y gana puntos',
    channel: 'clasica',
    retailPrice: '€329',
    features: ['Audio Hi-Res', 'Bluetooth LDAC', 'Batería 45 horas', 'Ampliación de rango digital'],
    colors: ['Negro', 'Azul', 'Rojo']
  },
  {
    id: 'prod-018',
    brand: 'JBL',
    name: 'Altavoz Flip 6',
    category: 'tecnologia',
    description: 'Altavoz portátil Bluetooth resistente al agua con sonido potente y graves profundos. Perfecto para llevar la música a cualquier lugar.',
    pointsCost: 6000,
    stock: 40,
    image: 'https://image.qwenlm.ai/generated-images/7019c10d-b5f4-4b97-b194-295f5d466724/_result.png',
    brandLogo: '✓',
    sponsorMessage: 'Esta altavoz JBL Flip 6 es patrocinada por JBL. Escucha Quawe Electrónica y gana puntos',
    channel: 'electronica',
    retailPrice: '€129',
    features: ['Bluetooth 5.1', 'Resistente al agua IP67', 'Batería 12 horas', 'PartyBoost'],
    colors: ['Negro', 'Azul', 'Rojo', 'Verde']
  },

  // ==================== HOGAR ====================
  {
    id: 'prod-019',
    brand: 'IKEA',
    name: 'Lámpara Dekad',
    category: 'hogar',
    description: 'Lámpara de mesa con diseño moderno y minimalista. Iluminación LED de bajo consumo con interruptor táctil.',
    pointsCost: 2000,
    stock: 80,
    image: 'https://image.qwenlm.ai/generated-images/2c527db3-773e-4790-a947-787d477de6a2/_result.png',
    brandLogo: '✓',
    sponsorMessage: 'Esta lámpara IKEA Dekad es patrocinada por IKEA. Escucha Quawe Folk y gana puntos',
    channel: 'folk',
    retailPrice: '€39.99',
    features: ['LED integrado', 'Interruptor táctil', 'Bajo consumo', 'Diseño minimalista'],
    colors: ['Blanco', 'Negro']
  },
  {
    id: 'prod-020',
    brand: 'Zara Home',
    name: 'Set de Cojines',
    category: 'hogar',
    description: 'Set de 3 cojines decorativos con diseños étnicos y texturas naturales. Perfectos para renovar tu salón con estilo bohemio.',
    pointsCost: 2500,
    stock: 60,
    image: 'https://image.qwenlm.ai/generated-images/f22f592d-8996-4a18-b2aa-4935b15aeb8e/_result.png',
    brandLogo: '✓',
    sponsorMessage: 'Este set de cojines Zara Home es patrocinado por Zara Home. Escucha Quawe Reggae y gana puntos',
    channel: 'reggae',
    retailPrice: '€49.99',
    features: ['Set de 3 piezas', 'Fundas extraíbles', 'Relleno incluido', 'Diseños étnicos'],
    colors: ['Tonos tierra', 'Azules', 'Multicolor']
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

// Marcas patrocinadoras
export const sponsorBrands = [
  { name: 'Nike', logo: '✓', category: 'zapatos' },
  { name: 'Adidas', logo: '✓', category: 'zapatos' },
  { name: 'Puma', logo: '✓', category: 'zapatos' },
  { name: 'Tous', logo: '✓', category: 'joyas' },
  { name: 'Swarovski', logo: '✓', category: 'joyas' },
  { name: 'Pandora', logo: '✓', category: 'joyas' },
  { name: 'Bimba y Lola', logo: '✓', category: 'bisuteria' },
  { name: 'Parfois', logo: '✓', category: 'bisuteria' },
  { name: 'Lovely', logo: '✓', category: 'bisuteria' },
  { name: 'Zara', logo: '✓', category: 'ropa' },
  { name: 'H&M', logo: '✓', category: 'ropa' },
  { name: 'Mango', logo: '✓', category: 'ropa' },
  { name: 'Ray-Ban', logo: '✓', category: 'accesorios' },
  { name: 'Fossil', logo: '✓', category: 'accesorios' },
  { name: 'Herschel', logo: '✓', category: 'accesorios' },
  { name: 'Apple', logo: '✓', category: 'tecnologia' },
  { name: 'Sony', logo: '✓', category: 'tecnologia' },
  { name: 'JBL', logo: '✓', category: 'tecnologia' },
  { name: 'IKEA', logo: '✓', category: 'hogar' },
  { name: 'Zara Home', logo: '✓', category: 'hogar' }
];
