// Catálogo de Libros del Autor - Prof. Manuel Gago Fernández
// Integrado con Amazon KDP y sistema de recompensas Radio Quawe

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  description: string;
  coverImage: string;
  amazonUrl: string;
  asin: string;
  pages: number;
  publishDate: string;
  category: string;
  tags: string[];
  price: number; // Precio en euros
  pointsCost: number; // Puntos para canjear
  format: 'ebook' | 'paperback' | 'hardcover' | 'audiobook';
  language: string;
  isbn?: string;
  rating?: number;
  reviews?: number;
  bestseller?: boolean;
  estimatedTime?: string; // Tiempo estimado para ganar puntos
}

// Catálogo de libros del autor
export const authorBooks: Book[] = [
  {
    id: 'book-001',
    title: 'Desarrollo Web Moderno con React y TypeScript',
    subtitle: 'Guía completa para desarrolladores',
    author: 'Prof. Manuel Gago Fernández',
    description: 'Aprende a construir aplicaciones web modernas usando React, TypeScript y las mejores prácticas de desarrollo. Incluye proyectos prácticos y ejemplos de código.',
    coverImage: 'https://image.qwenlm.ai/generated-images/20526c3f-380c-4504-a43f-46306224fc75/_result.png',
    amazonUrl: 'https://www.amazon.com/dp/XXXXXXXXX',
    asin: 'XXXXXXXXX',
    pages: 450,
    publishDate: '2024-01-15',
    category: 'Tecnología',
    tags: ['react', 'typescript', 'web development', 'programming'],
    price: 29.99,
    pointsCost: 1125, // 29.99 * 37.5
    format: 'ebook',
    language: 'Español',
    isbn: '978-XXXXXXXXX',
    rating: 4.5,
    reviews: 127,
    bestseller: true,
    estimatedTime: '2 semanas (2h/día)'
  },
  {
    id: 'book-002',
    title: 'Inteligencia Artificial para Todos',
    subtitle: 'De conceptos básicos a aplicaciones prácticas',
    author: 'Prof. Manuel Gago Fernández',
    description: 'Una introducción accesible al mundo de la IA. Aprende los fundamentos, algoritmos de machine learning y cómo implementar soluciones de IA en proyectos reales.',
    coverImage: 'https://image.qwenlm.ai/generated-images/6a7b93e2-a5f3-4920-9709-feac66b92855/_result.png',
    amazonUrl: 'https://www.amazon.com/dp/XXXXXXXXX',
    asin: 'XXXXXXXXX',
    pages: 380,
    publishDate: '2024-03-20',
    category: 'Tecnología',
    tags: ['artificial intelligence', 'machine learning', 'AI', 'data science'],
    price: 24.99,
    pointsCost: 937, // 24.99 * 37.5
    format: 'ebook',
    language: 'Español',
    isbn: '978-XXXXXXXXX',
    rating: 4.7,
    reviews: 89,
    bestseller: true,
    estimatedTime: '1.5 semanas (2h/día)'
  },
  {
    id: 'book-003',
    title: 'Node.js Avanzado',
    subtitle: 'Backend escalable y APIs REST',
    author: 'Prof. Manuel Gago Fernández',
    description: 'Domina Node.js para crear backends robustos y escalables. Aprende sobre APIs REST, bases de datos, autenticación, testing y despliegue en la nube.',
    coverImage: 'https://image.qwenlm.ai/generated-images/faa0a7ae-b2d6-4ed0-b1f1-bfd4b926c852/_result.png',
    amazonUrl: 'https://www.amazon.com/dp/XXXXXXXXX',
    asin: 'XXXXXXXXX',
    pages: 520,
    publishDate: '2023-11-10',
    category: 'Tecnología',
    tags: ['nodejs', 'backend', 'api', 'javascript', 'server'],
    price: 34.99,
    pointsCost: 1312, // 34.99 * 37.5
    format: 'ebook',
    language: 'Español',
    isbn: '978-XXXXXXXXX',
    rating: 4.6,
    reviews: 156,
    estimatedTime: '2.5 semanas (2h/día)'
  },
  {
    id: 'book-004',
    title: 'Python para Ciencia de Datos',
    subtitle: 'Análisis, visualización y machine learning',
    author: 'Prof. Manuel Gago Fernández',
    description: 'Aprende Python aplicado a la ciencia de datos. Desde pandas y numpy hasta scikit-learn y tensorflow. Incluye proyectos prácticos con datasets reales.',
    coverImage: 'https://image.qwenlm.ai/generated-images/c4e6b1b8-1383-43b0-b45e-e953d1d67eae/_result.png',
    amazonUrl: 'https://www.amazon.com/dp/XXXXXXXXX',
    asin: 'XXXXXXXXX',
    pages: 480,
    publishDate: '2024-02-05',
    category: 'Tecnología',
    tags: ['python', 'data science', 'pandas', 'machine learning', 'analytics'],
    price: 32.99,
    pointsCost: 1237, // 32.99 * 37.5
    format: 'ebook',
    language: 'Español',
    isbn: '978-XXXXXXXXX',
    rating: 4.8,
    reviews: 203,
    bestseller: true,
    estimatedTime: '2.2 semanas (2h/día)'
  },
  {
    id: 'book-005',
    title: 'Diseño UX/UI Profesional',
    subtitle: 'Principios, herramientas y casos de estudio',
    author: 'Prof. Manuel Gago Fernández',
    description: 'Domina el diseño de experiencias de usuario. Aprende principios de UX, herramientas como Figma, diseño responsivo y crea portfolios profesionales.',
    coverImage: 'https://image.qwenlm.ai/generated-images/c882ebe0-7dfa-4462-8a75-83a3423a1d5a/_result.png',
    amazonUrl: 'https://www.amazon.com/dp/XXXXXXXXX',
    asin: 'XXXXXXXXX',
    pages: 340,
    publishDate: '2024-04-12',
    category: 'Diseño',
    tags: ['UX', 'UI', 'design', 'figma', 'user experience'],
    price: 27.99,
    pointsCost: 1050, // 27.99 * 37.5
    format: 'ebook',
    language: 'Español',
    isbn: '978-XXXXXXXXX',
    rating: 4.4,
    reviews: 78,
    estimatedTime: '1.8 semanas (2h/día)'
  },
  {
    id: 'book-006',
    title: 'DevOps y CI/CD',
    subtitle: 'Automatización y despliegue continuo',
    author: 'Prof. Manuel Gago Fernández',
    description: 'Aprende DevOps desde cero. Docker, Kubernetes, Jenkins, GitHub Actions y las mejores prácticas para automatización y despliegue continuo.',
    coverImage: 'https://image.qwenlm.ai/generated-images/1d9db9bb-135d-47ce-bcef-973d81659b1b/_result.png',
    amazonUrl: 'https://www.amazon.com/dp/XXXXXXXXX',
    asin: 'XXXXXXXXX',
    pages: 410,
    publishDate: '2023-09-28',
    category: 'Tecnología',
    tags: ['devops', 'docker', 'kubernetes', 'ci/cd', 'automation'],
    price: 31.99,
    pointsCost: 1200, // 31.99 * 37.5
    format: 'ebook',
    language: 'Español',
    isbn: '978-XXXXXXXXX',
    rating: 4.5,
    reviews: 112,
    estimatedTime: '2.2 semanas (2h/día)'
  },
  {
    id: 'book-007',
    title: 'Blockchain y Web3',
    subtitle: 'Criptomonedas, smart contracts y DApps',
    author: 'Prof. Manuel Gago Fernández',
    description: 'Explora el mundo de blockchain y Web3. Aprende sobre criptomonedas, smart contracts con Solidity, y cómo construir aplicaciones descentralizadas.',
    coverImage: 'https://image.qwenlm.ai/generated-images/52b268c6-f350-4c0c-928d-65f761449787/_result.png',
    amazonUrl: 'https://www.amazon.com/dp/XXXXXXXXX',
    asin: 'XXXXXXXXX',
    pages: 360,
    publishDate: '2024-05-18',
    category: 'Tecnología',
    tags: ['blockchain', 'web3', 'cryptocurrency', 'ethereum', 'solidity'],
    price: 29.99,
    pointsCost: 1125, // 29.99 * 37.5
    format: 'ebook',
    language: 'Español',
    isbn: '978-XXXXXXXXX',
    rating: 4.3,
    reviews: 67,
    estimatedTime: '2 semanas (2h/día)'
  },
  {
    id: 'book-008',
    title: 'Ciberseguridad Práctica',
    subtitle: 'Protege tus aplicaciones y sistemas',
    author: 'Prof. Manuel Gago Fernández',
    description: 'Aprende ciberseguridad desde una perspectiva práctica. Ethical hacking, análisis de vulnerabilidades, criptografía y mejores prácticas de seguridad.',
    coverImage: 'https://image.qwenlm.ai/generated-images/91cb0cb0-5711-4df4-bca6-0db1e487c23b/_result.png',
    amazonUrl: 'https://www.amazon.com/dp/XXXXXXXXX',
    asin: 'XXXXXXXXX',
    pages: 440,
    publishDate: '2024-06-22',
    category: 'Tecnología',
    tags: ['cybersecurity', 'hacking', 'security', 'encryption', 'ethical hacking'],
    price: 33.99,
    pointsCost: 1275, // 33.99 * 37.5
    format: 'ebook',
    language: 'Español',
    isbn: '978-XXXXXXXXX',
    rating: 4.6,
    reviews: 94,
    estimatedTime: '2.3 semanas (2h/día)'
  },
  {
    id: 'book-009',
    title: 'Arquitectura de Software Moderna',
    subtitle: 'Microservicios, patrones y escalabilidad',
    author: 'Prof. Manuel Gago Fernández',
    description: 'Domina la arquitectura de software moderna. Microservicios, patrones de diseño, escalabilidad, y cómo construir sistemas distribuidos robustos.',
    coverImage: 'https://image.qwenlm.ai/generated-images/1026fcf8-b8d6-4605-acdc-fff732af3008/_result.png',
    amazonUrl: 'https://www.amazon.com/dp/XXXXXXXXX',
    asin: 'XXXXXXXXX',
    pages: 490,
    publishDate: '2023-12-05',
    category: 'Tecnología',
    tags: ['architecture', 'microservices', 'patterns', 'scalability', 'distributed systems'],
    price: 36.99,
    pointsCost: 1387, // 36.99 * 37.5
    format: 'ebook',
    language: 'Español',
    isbn: '978-XXXXXXXXX',
    rating: 4.7,
    reviews: 145,
    bestseller: true,
    estimatedTime: '2.5 semanas (2h/día)'
  },
  {
    id: 'book-010',
    title: 'Mobile Development con Flutter',
    subtitle: 'Apps multiplataforma profesionales',
    author: 'Prof. Manuel Gago Fernández',
    description: 'Crea aplicaciones móviles profesionales para iOS y Android con Flutter. Aprende Dart, widgets, estado, APIs y publicación en tiendas.',
    coverImage: 'https://image.qwenlm.ai/generated-images/b2d28887-8a62-49d4-86f3-ce5a7cc69690/_result.png',
    amazonUrl: 'https://www.amazon.com/dp/XXXXXXXXX',
    asin: 'XXXXXXXXX',
    pages: 420,
    publishDate: '2024-07-10',
    category: 'Tecnología',
    tags: ['flutter', 'mobile', 'dart', 'ios', 'android', 'cross-platform'],
    price: 30.99,
    pointsCost: 1162, // 30.99 * 37.5
    format: 'ebook',
    language: 'Español',
    isbn: '978-XXXXXXXXX',
    rating: 4.5,
    reviews: 88,
    estimatedTime: '2.1 semanas (2h/día)'
  }
];

// Función para obtener todos los libros
export function getAllBooks(): Book[] {
  return authorBooks;
}

// Función para obtener libros por categoría
export function getBooksByCategory(category: string): Book[] {
  return authorBooks.filter(book => book.category === category);
}

// Función para obtener libros bestseller
export function getBestsellerBooks(): Book[] {
  return authorBooks.filter(book => book.bestseller);
}

// Función para buscar libros por tags
export function searchBooksByTags(tags: string[]): Book[] {
  return authorBooks.filter(book => 
    tags.some(tag => book.tags.includes(tag.toLowerCase()))
  );
}

// Función para obtener un libro por ID
export function getBookById(bookId: string): Book | undefined {
  return authorBooks.find(book => book.id === bookId);
}

// Función para obtener estadísticas del catálogo
export function getCatalogStats() {
  return {
    totalBooks: authorBooks.length,
    totalBestsellers: authorBooks.filter(b => b.bestseller).length,
    averageRating: authorBooks.reduce((sum, b) => sum + (b.rating || 0), 0) / authorBooks.length,
    totalReviews: authorBooks.reduce((sum, b) => sum + (b.reviews || 0), 0),
    categories: [...new Set(authorBooks.map(b => b.category))],
    priceRange: {
      min: Math.min(...authorBooks.map(b => b.price)),
      max: Math.max(...authorBooks.map(b => b.price)),
      avg: authorBooks.reduce((sum, b) => sum + b.price, 0) / authorBooks.length
    }
  };
}

// Función para convertir libros al formato de productos del catálogo
export function convertBooksToProducts() {
  return authorBooks.map(book => ({
    id: book.id,
    brand: 'Prof. Manuel Gago Fernández',
    name: book.title,
    category: 'libros' as const,
    description: book.description,
    pointsCost: book.pointsCost,
    stock: 999, // Libros digitales siempre disponibles
    image: book.coverImage,
    brandLogo: '📚',
    sponsorMessage: `Libro "${book.title}" del autor Prof. Manuel Gago Fernández. Escucha Radio Quawe y gana puntos para obtener tu copia digital.`,
    channel: 'all', // Disponible en todos los canales
    retailPrice: `€${book.price}`,
    estimatedTime: book.estimatedTime,
    features: [
      `${book.pages} páginas`,
      `Formato: ${book.format}`,
      `Idioma: ${book.language}`,
      book.rating ? `Valoración: ${book.rating}/5` : '',
      book.reviews ? `${book.reviews} reseñas` : '',
      book.bestseller ? '⭐ Bestseller' : ''
    ].filter(Boolean),
    // Metadata adicional para libros
    bookMetadata: {
      subtitle: book.subtitle,
      author: book.author,
      amazonUrl: book.amazonUrl,
      asin: book.asin,
      publishDate: book.publishDate,
      tags: book.tags,
      isbn: book.isbn
    }
  }));
}
