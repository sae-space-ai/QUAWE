// Catálogo de Empresas B2B con logos
// Grandes empresas con modelos B2B o venta digital

export interface B2BCompany {
  id: string;
  name: string;
  category: string;
  logo: string;
  description: string;
  website: string;
  founded: number;
  employees: string;
  revenue: string;
  headquarters: string;
}

export const b2bCompanies: B2BCompany[] = [
  {
    id: 'el-corte-ingles',
    name: 'El Corte Inglés',
    category: 'Retail B2B/B2C',
    logo: 'https://image.qwenlm.ai/generated-images/0d8a5138-d3b1-4cde-9ef7-7111fe103db5/_result.png',
    description: 'La mayor empresa de retail de España con soluciones B2B para empresas. Grandes almacenes, tecnología y servicios empresariales.',
    website: 'elcorteingles.es/empresas',
    founded: 1940,
    employees: '90,000+',
    revenue: '€15.5B',
    headquarters: 'Madrid, España'
  },
  {
    id: 'amazon-business',
    name: 'Amazon Business',
    category: 'E-commerce B2B',
    logo: 'https://image.qwenlm.ai/generated-images/898868f9-5679-46a8-99f9-b78a709777d2/_result.png',
    description: 'La plataforma B2B líder mundial para compras empresariales. Millones de productos, precios empresariales y gestión de compras.',
    website: 'amazon.es/business',
    founded: 2015,
    employees: '1,500,000+ (Amazon total)',
    revenue: '$35B (Business)',
    headquarters: 'Seattle, USA'
  },
  {
    id: 'sap',
    name: 'SAP',
    category: 'Software Empresarial B2B',
    logo: 'https://image.qwenlm.ai/generated-images/f2fd98a1-33ac-4bf4-8131-6a1695524b50/_result.png',
    description: 'El software de gestión empresarial líder mundial. ERP, CRM, gestión de cadena de suministro y soluciones en la nube.',
    website: 'sap.com/es',
    founded: 1972,
    employees: '107,000+',
    revenue: '€30.9B',
    headquarters: 'Walldorf, Alemania'
  },
  {
    id: 'microsoft-365',
    name: 'Microsoft 365',
    category: 'Productividad B2B',
    logo: 'https://image.qwenlm.ai/generated-images/a061d368-3e67-45aa-9887-0f82e0c6e582/_result.png',
    description: 'Productividad y colaboración para empresas. Office, Teams, Azure, SharePoint y soluciones de inteligencia artificial.',
    website: 'microsoft.com/es-es/microsoft-365',
    founded: 1975,
    employees: '221,000+',
    revenue: '$211B',
    headquarters: 'Redmond, USA'
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'CRM B2B',
    logo: 'https://image.qwenlm.ai/generated-images/1b386523-9292-4929-a9e0-f8c010de5531/_result.png',
    description: 'El CRM líder mundial para gestionar relaciones con clientes. Ventas, servicio, marketing y comercio en una plataforma.',
    website: 'salesforce.com/es',
    founded: 1999,
    employees: '79,000+',
    revenue: '$34.9B',
    headquarters: 'San Francisco, USA'
  },
  {
    id: 'aws',
    name: 'Amazon Web Services',
    category: 'Cloud Computing B2B',
    logo: 'https://image.qwenlm.ai/generated-images/746cf743-58df-48fc-85c4-e850559b2bd0/_result.png',
    description: 'La plataforma de cloud computing más completa del mundo. Más de 200 servicios, infraestructura global y seguridad empresarial.',
    website: 'aws.amazon.com/es',
    founded: 2006,
    employees: '100,000+ (AWS)',
    revenue: '$90B',
    headquarters: 'Seattle, USA'
  },
  {
    id: 'google-cloud',
    name: 'Google Cloud',
    category: 'Cloud & IA B2B',
    logo: 'https://image.qwenlm.ai/generated-images/b3230788-71b4-4ca1-ac68-7ad000a14958/_result.png',
    description: 'Infraestructura e inteligencia artificial para empresas. Google Cloud Platform, Workspace, BigQuery y soluciones de IA.',
    website: 'cloud.google.com/es',
    founded: 2008,
    employees: '50,000+ (Cloud)',
    revenue: '$33B',
    headquarters: 'Mountain View, USA'
  },
  {
    id: 'oracle',
    name: 'Oracle',
    category: 'Base de Datos B2B',
    logo: 'https://image.qwenlm.ai/generated-images/412ebdcc-bf44-4bca-9d34-c8b01f1bb57d/_result.png',
    description: 'Líder mundial en bases de datos y soluciones empresariales. Oracle Database, Cloud Infrastructure, ERP y aplicaciones.',
    website: 'oracle.com/es',
    founded: 1977,
    employees: '159,000+',
    revenue: '$50B',
    headquarters: 'Austin, USA'
  },
  {
    id: 'alibaba',
    name: 'Alibaba.com',
    category: 'Marketplace B2B',
    logo: 'https://image.qwenlm.ai/generated-images/82776124-6919-4893-9205-271d28307a5b/_result.png',
    description: 'La plataforma B2B más grande del mundo para comercio internacional. Conecta compradores y proveedores de todo el mundo.',
    website: 'alibaba.com',
    founded: 1999,
    employees: '250,000+ (Grupo)',
    revenue: '$130B (Grupo)',
    headquarters: 'Hangzhou, China'
  },
  {
    id: 'shopify',
    name: 'Shopify Plus',
    category: 'E-commerce B2B',
    logo: 'https://image.qwenlm.ai/generated-images/f779c588-d2c7-47b4-9ab6-1cdd9dec5e1c/_result.png',
    description: 'La plataforma de e-commerce para empresas en crecimiento. Shopify Plus para marcas enterprise con alto volumen.',
    website: 'shopify.com/plus',
    founded: 2006,
    employees: '11,000+',
    revenue: '$7B',
    headquarters: 'Ottawa, Canadá'
  },
  {
    id: 'ibm',
    name: 'IBM',
    category: 'Tecnología B2B',
    logo: 'https://image.qwenlm.ai/generated-images/129d6c69-e654-4bfb-82d4-11a4e59ab27a/_result.png',
    description: 'Soluciones de inteligencia artificial y cloud para empresas. IBM Watson, Red Hat, consultoría y servicios tecnológicos.',
    website: 'ibm.com/es-es',
    founded: 1911,
    employees: '288,000+',
    revenue: '$60B',
    headquarters: 'Armonk, USA'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'Pagos Digitales B2B',
    logo: 'https://image.qwenlm.ai/generated-images/797e9a27-f17f-47ec-96b9-688a01d468e8/_result.png',
    description: 'La plataforma de pagos online para negocios de todos los tamaños. Pagos, suscripciones, facturación y gestión financiera.',
    website: 'stripe.com/es',
    founded: 2010,
    employees: '8,000+',
    revenue: '$14B (volumen)',
    headquarters: 'San Francisco, USA'
  },
  {
    id: 'paypal',
    name: 'PayPal Business',
    category: 'Pagos B2B',
    logo: 'https://image.qwenlm.ai/generated-images/268a9cea-24ee-477a-9eec-2bc2e0465b93/_result.png',
    description: 'Pagos seguros para empresas en todo el mundo. PayPal Business, Braintree, Venmo y soluciones de comercio.',
    website: 'paypal.com/es/business',
    founded: 1998,
    employees: '29,000+',
    revenue: '$25B',
    headquarters: 'San Jose, USA'
  },
  {
    id: 'fedex',
    name: 'FedEx Business',
    category: 'Logística B2B',
    logo: 'https://image.qwenlm.ai/generated-images/96a1c360-0e0f-4c49-bd59-e4e5642e6470/_result.png',
    description: 'Soluciones de logística y envío para empresas. FedEx Express, Ground, Freight y servicios de cadena de suministro.',
    website: 'fedex.com/es-co',
    founded: 1971,
    employees: '530,000+',
    revenue: '$90B',
    headquarters: 'Memphis, USA'
  },
  {
    id: 'dhl',
    name: 'DHL Business',
    category: 'Logística Internacional B2B',
    logo: 'https://image.qwenlm.ai/generated-images/49b8f685-eb48-461c-81e0-561e84bbdbe8/_result.png',
    description: 'Líder mundial en logística internacional para empresas. DHL Express, Global Forwarding, Supply Chain y eCommerce.',
    website: 'dhl.com/es-es',
    founded: 1969,
    employees: '590,000+',
    revenue: '€94B',
    headquarters: 'Bonn, Alemania'
  },
  {
    id: 'siemens',
    name: 'Siemens',
    category: 'Tecnología Industrial B2B',
    logo: 'https://image.qwenlm.ai/generated-images/59ec74e8-3ccc-4e53-a645-35d2f6d53d5b/_result.png',
    description: 'Tecnología industrial y soluciones digitales para empresas. Automatización, digitalización, electrificación y movilidad.',
    website: 'siemens.com/global/es.html',
    founded: 1847,
    employees: '311,000+',
    revenue: '€88B',
    headquarters: 'Múnich, Alemania'
  },
  {
    id: 'bosch',
    name: 'Bosch Professional',
    category: 'Herramientas Industriales B2B',
    logo: 'https://image.qwenlm.ai/generated-images/d35f9955-7f02-4ed9-8e94-f46bb64516fc/_result.png',
    description: 'Herramientas y tecnología para profesionales e industrias. Bosch Professional, Power Tools, Automotive y Industrial.',
    website: 'bosch-professional.com',
    founded: 1886,
    employees: '421,000+',
    revenue: '€88B',
    headquarters: 'Stuttgart, Alemania'
  },
  {
    id: 'adobe',
    name: 'Adobe Creative Cloud',
    category: 'Software Creativo B2B',
    logo: 'https://image.qwenlm.ai/generated-images/26efb433-c68d-4181-afbf-f795976dfc14/_result.png',
    description: 'Las herramientas creativas líderes para profesionales y empresas. Photoshop, Illustrator, Premiere, Acrobat y más.',
    website: 'adobe.com/es/creativecloud/business.html',
    founded: 1982,
    employees: '28,000+',
    revenue: '$19B',
    headquarters: 'San Jose, USA'
  },
  {
    id: 'zoom',
    name: 'Zoom Business',
    category: 'Comunicaciones B2B',
    logo: 'https://image.qwenlm.ai/generated-images/1338a465-4a53-4e3e-98e6-fa1c04a766d5/_result.png',
    description: 'Videoconferencias y colaboración para empresas de todos los tamaños. Zoom Meetings, Phone, Rooms y Webinars.',
    website: 'zoom.es/business',
    founded: 2011,
    employees: '18,000+',
    revenue: '$4.5B',
    headquarters: 'San Jose, USA'
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Colaboración B2B',
    logo: 'https://image.qwenlm.ai/generated-images/9e36dd3f-9ecf-4e81-a6aa-3504622eb943/_result.png',
    description: 'La plataforma de comunicación y colaboración para equipos. Canales, mensajes directos, integración con apps y búsqueda.',
    website: 'slack.com/intl/es-es',
    founded: 2013,
    employees: '2,500+ (parte de Salesforce)',
    revenue: '$1.7B',
    headquarters: 'San Francisco, USA'
  }
];

// Función para obtener todas las empresas B2B
export function getAllB2BCompanies(): B2BCompany[] {
  return b2bCompanies;
}

// Función para obtener empresas por categoría
export function getB2BCompaniesByCategory(category: string): B2BCompany[] {
  return b2bCompanies.filter(company => company.category === category);
}

// Función para obtener una empresa por ID
export function getB2BCompanyById(id: string): B2BCompany | undefined {
  return b2bCompanies.find(company => company.id === id);
}

// Categorías de empresas B2B
export const b2bCategories = [
  { id: 'retail', name: 'Retail', emoji: '🛍️' },
  { id: 'ecommerce', name: 'E-commerce', emoji: '🛒' },
  { id: 'software', name: 'Software Empresarial', emoji: '💻' },
  { id: 'cloud', name: 'Cloud Computing', emoji: '☁️' },
  { id: 'payments', name: 'Pagos Digitales', emoji: '💳' },
  { id: 'logistics', name: 'Logística', emoji: '🚚' },
  { id: 'industrial', name: 'Tecnología Industrial', emoji: '🏭' },
  { id: 'creative', name: 'Software Creativo', emoji: '🎨' },
  { id: 'communications', name: 'Comunicaciones', emoji: '💬' }
];
