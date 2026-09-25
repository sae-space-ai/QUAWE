# 📚 APIs y Herramientas Utilizadas

## 🎵 APIs de Radio (GRATIS)

### 1. Radio Browser API
**URL**: https://www.radio-browser.info/
**Documentación**: https://www.radio-browser.info/technical.html

**Características**:
- ✅ 50,000+ emisoras de radio reales
- ✅ Sin API key requerida
- ✅ Sin límites de uso (fair use)
- ✅ Múltiples servidores espejo
- ✅ Datos actualizados constantemente

**Endpoints utilizados**:
```typescript
// Base URLs (rotación automática para redundancia)
const API_BASE_URLS = [
  'https://de1.api.radio-browser.info',
  'https://fi1.api.radio-browser.info',
  'https://nl1.api.radio-browser.info',
];

// Top emisoras más escuchadas
GET /json/stations/topclick/{limit}?hidebroken=true

// Buscar emisoras por nombre
POST /json/stations/search
Body: { name: "query", order: "clickcount", reverse: true, limit: 50, hidebroken: true }

// Filtrar por tag/género
GET /json/stations/bytag/{tag}?limit=50&order=clickcount&reverse=true&hidebroken=true

// Filtrar por código de país
GET /json/stations/bycountrycodeexact/{code}?limit=50&order=clickcount&reverse=true&hidebroken=true

// Registrar click (feedback a la API)
GET /json/url/{stationuuid}

// Votar por emisora
GET /json/vote/{stationuuid}

// Obtener todos los tags
GET /json/tags?order=stationcount&reverse=true&limit=100

// Obtener todos los países
GET /json/countries?order=stationcount&reverse=true
```

**Headers requeridos**:
```typescript
{
  'User-Agent': 'OndaGlobal/1.0 (https://ondaglobal.app)',
  'Content-Type': 'application/json' // para POST requests
}
```

**Respuesta típica**:
```json
{
  "stationuuid": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Radio Example",
  "url": "http://stream.example.com/live",
  "url_resolved": "http://stream.example.com/live",
  "homepage": "https://example.com",
  "favicon": "https://example.com/favicon.ico",
  "tags": "pop,rock,hits",
  "country": "United States",
  "countrycode": "US",
  "state": "California",
  "language": "english",
  "votes": 1234,
  "codec": "MP3",
  "bitrate": 128,
  "hls": 0,
  "lastcheckok": 1,
  "clickcount": 5678,
  "clicktrend": 12,
  "geo_lat": 34.0522,
  "geo_long": -118.2437
}
```

---

## 🌍 APIs de Geolocalización (GRATIS)

### 2. OpenStreetMap Nominatim
**URL**: https://nominatim.openstreetmap.org/
**Documentación**: https://nominatim.org/release-docs/develop/api/Overview/

**Características**:
- ✅ Reverse geocoding (coordenadas → dirección)
- ✅ Sin API key requerida
- ✅ Datos de OpenStreetMap
- ✅ Cobertura mundial

**Uso**:
```typescript
// Reverse geocoding
GET https://nominatim.openstreetmap.org/reverse
  ?format=json
  &lat=25.7617
  &lon=-80.1918
  &zoom=10
  &addressdetails=1

Headers: {
  'User-Agent': 'OndaGlobal/1.0 (https://ondaglobal.app)'
}
```

**Respuesta**:
```json
{
  "lat": "25.7617",
  "lon": "-80.1918",
  "address": {
    "city": "Miami",
    "state": "Florida",
    "country": "United States",
    "country_code": "us"
  }
}
```

**Límites**:
- 1 request por segundo
- Uso comercial requiere permiso

---

### 3. ipapi.co
**URL**: https://ipapi.co/
**Documentación**: https://ipapi.co/api/

**Características**:
- ✅ Geolocalización por IP
- ✅ Fallback cuando GPS no está disponible
- ✅ Información completa de ubicación
- ✅ Plan gratuito: 1,000 requests/día

**Uso**:
```typescript
// Obtener ubicación por IP
GET https://ipapi.co/json/
```

**Respuesta**:
```json
{
  "ip": "8.8.8.8",
  "city": "Mountain View",
  "region": "California",
  "country_name": "United States",
  "country_code": "US",
  "latitude": 37.4056,
  "longitude": -122.0775,
  "timezone": "America/Los_Angeles"
}
```

**Límites del plan gratuito**:
- 1,000 requests/día
- Sin API key requerida
- Rate limiting automático

---

## 🎨 Librerías Frontend

### 4. React 18
**URL**: https://react.dev/
**Uso**: Framework principal para la UI

### 5. TypeScript
**URL**: https://www.typescriptlang.org/
**Uso**: Tipado estático para mejor DX

### 6. Vite
**URL**: https://vitejs.dev/
**Uso**: Build tool y dev server

### 7. Tailwind CSS
**URL**: https://tailwindcss.com/
**Uso**: Utility-first CSS framework

### 8. Framer Motion
**URL**: https://www.framer.com/motion/
**Uso**: Animaciones y transiciones
```bash
npm install framer-motion
```

### 9. Zustand
**URL**: https://github.com/pmndrs/zustand
**Uso**: Estado global ligero
```bash
npm install zustand
```

**Características**:
- ✅ Persistencia con localStorage
- ✅ Sin boilerplate
- ✅ TypeScript support
- ✅ React hooks API

### 10. Lucide React
**URL**: https://lucide.dev/
**Uso**: Iconos SVG
```bash
npm install lucide-react
```

---

## 🔊 Web APIs del Navegador

### 11. Web Audio API
**Documentación**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

**Uso**: Análisis de frecuencias para el visualizador

**Implementación**:
```typescript
// Crear AudioContext
const audioContext = new AudioContext();

// Crear analyser node
const analyser = audioContext.createAnalyser();
analyser.fftSize = 256;
analyser.smoothingTimeConstant = 0.8;

// Conectar source → analyser → destination
const source = audioContext.createMediaElementSource(audioElement);
source.connect(analyser);
analyser.connect(audioContext.destination);

// Obtener datos de frecuencia
const dataArray = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteFrequencyData(dataArray);
```

### 12. Geolocation API
**Documentación**: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

**Uso**: Detectar ubicación del usuario

**Implementación**:
```typescript
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    // Usar coordenadas
  },
  (error) => {
    // Fallback a IP
  },
  { timeout: 10000, enableHighAccuracy: false }
);
```

### 13. HTML5 Audio
**Documentación**: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio

**Uso**: Streaming de audio

**Implementación**:
```typescript
const audio = new Audio();
audio.src = 'https://stream.example.com/live';
audio.crossOrigin = 'anonymous'; // Para Web Audio API
audio.play();
audio.pause();
audio.volume = 0.75; // 0-1
```

### 14. LocalStorage API
**Documentación**: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

**Uso**: Persistir favoritos y configuración

**Implementación con Zustand**:
```typescript
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      favorites: [],
      addToFavorites: (station) => set((state) => ({
        favorites: [...state.favorites, station]
      })),
    }),
    {
      name: 'onda-global-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        volume: state.volume,
      }),
    }
  )
);
```

### 15. Canvas API
**Documentación**: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

**Uso**: Visualizador de audio

**Implementación**:
```typescript
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Dibujar barras de frecuencia
for (let i = 0; i < barCount; i++) {
  const barHeight = dataArray[i] / 255 * canvas.height;
  ctx.fillRect(x, y, barWidth, barHeight);
}
```

---

## 📦 Dependencias del Proyecto

### package.json
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^11.16.1",
    "zustand": "^4.5.0",
    "lucide-react": "^0.294.0",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "@tailwindcss/vite": "^4.1.7"
  }
}
```

---

## 🔧 Herramientas de Desarrollo

### ESLint
**URL**: https://eslint.org/
**Uso**: Linting de código

### Prettier
**URL**: https://prettier.io/
**Uso**: Formateo de código

### TypeScript
**URL**: https://www.typescriptlang.org/
**Uso**: Tipado estático

---

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm i -g vercel
vercel
```

**Características**:
- ✅ Deploy automático desde Git
- ✅ CDN global
- ✅ SSL automático
- ✅ Preview deployments
- ✅ Analytics

### Netlify
```bash
npm run build
# Subir carpeta dist/
```

### GitHub Pages
```bash
# Configurar base en vite.config.ts
export default defineConfig({
  base: '/nombre-repo/',
})
```

---

## 📊 Comparativa de APIs de Radio

| API | Emisoras | Costo | API Key | Límites |
|-----|----------|-------|---------|---------|
| **Radio Browser** | 50,000+ | Gratis | No | Fair use |
| Radio.co | 10,000+ | Pago | Sí | Por plan |
| TuneIn | 100,000+ | Pago | Sí | Por plan |
| iHeartRadio | 1,500+ | Pago | Sí | Por plan |
| Streema | 70,000+ | Pago | Sí | Por plan |

**Conclusión**: Radio Browser es la mejor opción para proyectos gratuitos/grandes.

---

## 🎯 Próximas Integraciones Posibles

### APIs Adicionales (opcionales)
1. **Last.fm API** - Información de canciones
   - https://www.last.fm/api
   - Requires API key (gratis)

2. **Spotify Web API** - Búsqueda de canciones
   - https://developer.spotify.com/documentation/web-api/
   - Requires OAuth

3. **MusicBrainz API** - Metadata de música
   - https://musicbrainz.org/doc/MusicBrainz_API
   - Gratis

4. **Discogs API** - Base de datos de música
   - https://www.discogs.com/developers
   - Gratis

5. **OpenWeatherMap** - Clima para recomendaciones
   - https://openweathermap.org/api
   - Gratis (1,000 calls/día)

---

## 📝 Notas Importantes

### Rate Limiting
- **Radio Browser**: Sin límites estrictos, pero usar caching
- **Nominatim**: 1 request/segundo máximo
- **ipapi.co**: 1,000 requests/día (plan gratuito)

### CORS
- Todas las APIs utilizadas soportan CORS
- `crossOrigin="anonymous"` en el elemento `<audio>`

### Fallbacks
- GPS → IP → Ubicación por defecto
- Múltiples servidores de Radio Browser
- Manejo de errores en todas las APIs

### Performance
- Caching de resultados de búsqueda
- Lazy loading de emisoras
- Optimización de re-renders con React.memo
- Virtual scrolling para listas largas (futuro)

---

**Última actualización**: 2026
**Versión**: 1.0.0
