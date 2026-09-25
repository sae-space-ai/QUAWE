export interface Station {
  id: string;
  name: string;
  genre: string;
  frequency: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  color: string;
  listeners: number;
  currentTrack: string;
  currentArtist: string;
  streamUrl: string;
  description: string;
  coverEmoji: string;
}

export interface LocalAd {
  id: string;
  business: string;
  category: string;
  text: string;
  city: string;
  radius: number; // km
  emoji: string;
  offer: string;
}

export interface ScheduleItem {
  time: string;
  show: string;
  host: string;
  genre: string;
  isLive: boolean;
}

export interface ChatMessage {
  id: string;
  user: string;
  message: string;
  city: string;
  time: string;
  avatar: string;
}

export const stations: Station[] = [
  {
    id: "onda-tropical",
    name: "Onda Tropical FM",
    genre: "Latina / Reggaetón",
    frequency: "98.5 FM",
    city: "Miami",
    country: "USA",
    lat: 25.7617,
    lng: -80.1918,
    color: "#f97316",
    listeners: 12847,
    currentTrack: "Despacito Remix",
    currentArtist: "Luis Fonsi ft. Daddy Yankee",
    streamUrl: "https://stream.zeno.fm/0r0xa792kwzuv",
    description: "Los mejores ritmos latinos las 24 horas",
    coverEmoji: "🌴",
  },
  {
    id: "rock-nacional",
    name: "Rock Nacional",
    genre: "Rock en Español",
    frequency: "101.3 FM",
    city: "Ciudad de México",
    country: "México",
    lat: 19.4326,
    lng: -99.1332,
    color: "#ef4444",
    listeners: 9234,
    currentTrack: "La Flaca",
    currentArtist: "Jarabe de Palo",
    streamUrl: "https://stream.zeno.fm/f3wqqcu2cg8uv",
    description: "Rock en español de los 80's a hoy",
    coverEmoji: "🎸",
  },
  {
    id: "electro-beats",
    name: "Electro Beats",
    genre: "Electrónica / EDM",
    frequency: "105.7 FM",
    city: "Madrid",
    country: "España",
    lat: 40.4168,
    lng: -3.7038,
    color: "#8b5cf6",
    listeners: 15420,
    currentTrack: "Titanium",
    currentArtist: "David Guetta ft. Sia",
    streamUrl: "https://stream.zeno.fm/4d0cgn8d1e8uv",
    description: "La mejor música electrónica del mundo",
    coverEmoji: "🎧",
  },
  {
    id: "jazz-lounge",
    name: "Jazz Lounge",
    genre: "Jazz / Smooth",
    frequency: "92.1 FM",
    city: "Buenos Aires",
    country: "Argentina",
    lat: -34.6037,
    lng: -58.3816,
    color: "#06b6d4",
    listeners: 5672,
    currentTrack: "Take Five",
    currentArtist: "Dave Brubeck",
    streamUrl: "https://stream.zeno.fm/f4ebbrnq6y8uv",
    description: "Jazz suave para cualquier momento",
    coverEmoji: "🎷",
  },
  {
    id: "urbana-flow",
    name: "Urbana Flow",
    genre: "Hip Hop / Trap",
    frequency: "103.9 FM",
    city: "Bogotá",
    country: "Colombia",
    lat: 4.711,
    lng: -74.0721,
    color: "#eab308",
    listeners: 11203,
    currentTrack: "Tusa",
    currentArtist: "Karol G & Nicki Minaj",
    streamUrl: "https://stream.zeno.fm/1r1f6fz2cg8uv",
    description: "El sonido urbano más pegado",
    coverEmoji: "🔥",
  },
  {
    id: "classica-fm",
    name: "Clásica FM",
    genre: "Música Clásica",
    frequency: "88.7 FM",
    city: "Lima",
    country: "Perú",
    lat: -12.0464,
    lng: -77.0428,
    color: "#ec4899",
    listeners: 3421,
    currentTrack: "Clair de Lune",
    currentArtist: "Claude Debussy",
    streamUrl: "https://stream.zeno.fm/0b0bf6g12c8uv",
    description: "Las mejores obras clásicas de todos los tiempos",
    coverEmoji: "🎻",
  },
  {
    id: "tropical-caribe",
    name: "Tropical Caribe",
    genre: "Salsa / Merengue",
    frequency: "96.3 FM",
    city: "Santo Domingo",
    country: "Rep. Dominicana",
    lat: 18.4861,
    lng: -69.9312,
    color: "#10b981",
    listeners: 8756,
    currentTrack: "Vivir Mi Vida",
    currentArtist: "Marc Anthony",
    streamUrl: "https://stream.zeno.fm/yn65fsaurfhvv",
    description: "Salsa, merengue y bachata sin parar",
    coverEmoji: "💃",
  },
  {
    id: "pop-hits",
    name: "Pop Hits Radio",
    genre: "Pop Internacional",
    frequency: "99.9 FM",
    city: "Santiago",
    country: "Chile",
    lat: -33.4489,
    lng: -70.6693,
    color: "#f43f5e",
    listeners: 14102,
    currentTrack: "Flowers",
    currentArtist: "Miley Cyrus",
    streamUrl: "https://stream.zeno.fm/fws485nd1e8uv",
    description: "Los éxitos pop del momento",
    coverEmoji: "🌟",
  },
];

export const localAds: LocalAd[] = [
  {
    id: "ad-1",
    business: "Pizzería Don Mario",
    category: "Gastronomía",
    text: "¡Pizza artesanal con ingredientes locales! 2x1 los martes.",
    city: "Miami",
    radius: 15,
    emoji: "🍕",
    offer: "2x1 Martes",
  },
  {
    id: "ad-2",
    business: "AutoLavado Express",
    category: "Servicios",
    text: "Lavado completo + encerado por solo $15. ¡Tu carro como nuevo!",
    city: "Miami",
    radius: 10,
    emoji: "🚗",
    offer: "$15 Completo",
  },
  {
    id: "ad-3",
    business: "Gym PowerFit",
    category: "Salud",
    text: "Inscríbete hoy y obtén 3 meses gratis. ¡Transforma tu vida!",
    city: "Miami",
    radius: 8,
    emoji: "💪",
    offer: "3 Meses Gratis",
  },
  {
    id: "ad-4",
    business: "Taquería El Patrón",
    category: "Gastronomía",
    text: "Tacos auténticos mexicanos. Combo familiar $19.99 los domingos.",
    city: "Ciudad de México",
    radius: 12,
    emoji: "🌮",
    offer: "Combo $19.99",
  },
  {
    id: "ad-5",
    business: "Clínica Dental Sonríe",
    category: "Salud",
    text: "Primera consulta gratis. Ortodoncia invisible con 20% de descuento.",
    city: "Ciudad de México",
    radius: 5,
    emoji: "🦷",
    offer: "Consulta Gratis",
  },
  {
    id: "ad-6",
    business: "Bar La Terraza",
    category: "Ocio",
    text: "Happy hour de 5 a 8pm. Cocktails artesanales desde €4.",
    city: "Madrid",
    radius: 3,
    emoji: "🍹",
    offer: "Happy Hour",
  },
  {
    id: "ad-7",
    business: "Tienda de Vinilos Retro",
    category: "Cultura",
    text: "Colección de vinilos clásicos. Envío gratis en Madrid capital.",
    city: "Madrid",
    radius: 20,
    emoji: "🎵",
    offer: "Envío Gratis",
  },
  {
    id: "ad-8",
    business: "Café de la Esquina",
    category: "Gastronomía",
    text: "Café de especialidad + medialuna por $800. ¡Te esperamos!",
    city: "Buenos Aires",
    radius: 2,
    emoji: "☕",
    offer: "$800 Combo",
  },
];

export const schedules: Record<string, ScheduleItem[]> = {
  default: [
    { time: "06:00", show: "Despertar Musical", host: "Carlos Mendoza", genre: "Variado", isLive: false },
    { time: "09:00", show: "Mañana Activa", host: "Laura Pérez", genre: "Pop", isLive: false },
    { time: "12:00", show: "Mediodía Hits", host: "DJ Marco", genre: "Hits", isLive: true },
    { time: "15:00", show: "Tarde Relax", host: "Ana Torres", genre: "Chill", isLive: false },
    { time: "18:00", show: "Drive Time", host: "Roberto Sánchez", genre: "Variado", isLive: false },
    { time: "21:00", show: "Noche de Éxitos", host: "DJ Luna", genre: "Electrónica", isLive: false },
    { time: "00:00", show: "Madrugada Suave", host: "Automático", genre: "Ambient", isLive: false },
  ],
};

export const chatMessages: ChatMessage[] = [
  { id: "1", user: "María G.", message: "¡Me encanta esta canción! 🔥", city: "Miami", time: "12:34", avatar: "👩" },
  { id: "2", user: "Pedro R.", message: "Saludos desde Bogotá 🇨🇴", city: "Bogotá", time: "12:35", avatar: "👨" },
  { id: "3", user: "Lucía M.", message: "¿Pueden poner algo de rock?", city: "Madrid", time: "12:36", avatar: "👩‍🦰" },
  { id: "4", user: "Juan C.", message: "La mejor radio del momento 📻", city: "CDMX", time: "12:37", avatar: "🧑" },
  { id: "5", user: "Sofía L.", message: "¡Saludos al DJ! Excelente programa", city: "Buenos Aires", time: "12:38", avatar: "👱‍♀️" },
  { id: "6", user: "Andrés P.", message: "¿Cuál es la siguiente canción?", city: "Lima", time: "12:39", avatar: "👨‍🦱" },
  { id: "7", user: "Valentina S.", message: "Escuchando desde Santiago 🇨🇱", city: "Santiago", time: "12:40", avatar: "👩‍🦳" },
  { id: "8", user: "Diego H.", message: "¡Esta emisora es lo máximo! 🎶", city: "Medellín", time: "12:41", avatar: "🧔" },
];

export const cities = [
  { name: "Miami", lat: 25.7617, lng: -80.1918, country: "USA", emoji: "🌴" },
  { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, country: "México", emoji: "🇲🇽" },
  { name: "Madrid", lat: 40.4168, lng: -3.7038, country: "España", emoji: "🇪🇸" },
  { name: "Buenos Aires", lat: -34.6037, lng: -58.3816, country: "Argentina", emoji: "🇦🇷" },
  { name: "Bogotá", lat: 4.711, lng: -74.0721, country: "Colombia", emoji: "🇨🇴" },
  { name: "Lima", lat: -12.0464, lng: -77.0428, country: "Perú", emoji: "🇵🇪" },
  { name: "Santo Domingo", lat: 18.4861, lng: -69.9312, country: "Rep. Dominicana", emoji: "🇩🇴" },
  { name: "Santiago", lat: -33.4489, lng: -70.6693, country: "Chile", emoji: "🇨🇱" },
];
