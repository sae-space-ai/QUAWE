# 🎵 Onda Global - Cadena Radiofónica Geolocal

Plataforma de radio en streaming con geolocalización, publicidad local segmentada y funcionalidades avanzadas.

## 🚀 Características Principales

### 📻 Reproductor Avanzado
- **Streaming en tiempo real** con Web Audio API
- **Visualizador de audio** con análisis de frecuencias
- **Control de volumen** independiente por emisora
- **Play/Pause/Skip** con transiciones suaves
- **Mini player** persistente en la parte inferior

### 🌍 Geolocalización Inteligente
- **Detección automática** de ubicación del usuario
- **Publicidad local** segmentada por ciudad y radio de cobertura
- **Emisoras cercanas** basadas en coordenadas GPS
- **Reverse geocoding** con OpenStreetMap/Nominatim
- **Fallback por IP** con ipapi.co

### 🎨 Interfaz Moderna
- **Diseño responsive** optimizado para móvil y desktop
- **Tema oscuro** con gradientes y glassmorphism
- **Animaciones fluidas** con Framer Motion
- **Emojis dinámicos** por género musical
- **Colores adaptativos** según el género de la emisora

### 🔍 Búsqueda y Filtros
- **Búsqueda por nombre** de emisora
- **Filtro por género** (Pop, Rock, Jazz, Electrónica, etc.)
- **Filtro por país** (16+ países populares)
- **Top emisoras** más escuchadas
- **Emisoras trending** con mayor tendencia

### 💬 Chat en Vivo
- **Mensajes en tiempo real** entre oyentes
- **Ubicación del usuario** en cada mensaje
- **Avatar personalizado**
- **Timestamp** automático

### ⏰ Sleep Timer
- **Temporizador de apagado** automático
- **Opciones configurables**: 15, 30, 45 min, 1, 2 horas
- **Countdown visible** en la interfaz
- **Pausa automática** al finalizar

### 📋 Programación de Shows
- **Horarios diarios** de programas
- **Indicador LIVE** para shows en emisión
- **Información del host** y descripción
- **Diseño visual** intuitivo

### 💚 Favoritos e Historial
- **Sistema de favoritos** con persistencia en localStorage
- **Historial de reproducción** (últimas 50 emisoras)
- **Acceso rápido** a emisoras preferidas
- **Sincronización** entre sesiones

### 📢 Publicidad Local
- **Anuncios geolocalizados** por ciudad del usuario
- **Radio de cobertura** configurable (km)
- **Categorías**: Gastronomía, Salud, Servicios, Ocio, Cultura
- **Ofertas destacadas** con emojis visuales

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** con TypeScript
- **Vite** para build rápido
- **Tailwind CSS** para estilos
- **Framer Motion** para animaciones
- **Zustand** para estado global
- **Lucide React** para iconos

### APIs Gratuitas
- **Radio Browser API** - Miles de emisoras reales
  - Búsqueda por nombre, país, género
  - Top stations y trending
  - Estadísticas de oyentes
  - Sistema de votos
  
- **OpenStreetMap/Nominatim** - Geolocalización inversa
  - Coordenadas a ciudad/país
  - Sin API key requerida
  
- **ipapi.co** - Geolocalización por IP
  - Fallback cuando GPS no está disponible
  - Información de ubicación completa

### Características Técnicas
- **Web Audio API** - Análisis de frecuencias en tiempo real
- **HTML5 Audio** - Streaming compatible con todos los navegadores
- **LocalStorage** - Persistencia de favoritos y configuración
- **Geolocation API** - Detección de ubicación del navegador
- **CORS habilitado** - Streams compatibles con cross-origin

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🎯 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
├── data/               # Datos estáticos y constantes
│   └── constants.ts    # Géneros, ads, chat, programación
├── hooks/              # Custom hooks
│   ├── useAudioPlayer.ts    # Control del reproductor
│   └── useGeolocation.ts    # Detección de ubicación
├── services/           # Servicios de API
│   └── radioApi.ts     # Radio Browser API integration
├── store/              # Estado global con Zustand
│   └── radioStore.ts   # Store principal
├── types/              # Tipos TypeScript
│   └── index.ts        # Interfaces y tipos
├── App.tsx             # Componente principal
├── main.tsx            # Entry point
└── index.css           # Estilos globales
```

## 🎵 APIs de Radio

### Radio Browser API
La aplicación utiliza la API gratuita de Radio Browser (https://www.radio-browser.info/) que proporciona:

- **50,000+ emisoras** de radio de todo el mundo
- **Búsqueda avanzada** por nombre, país, idioma, tags
- **Estadísticas** de oyentes, votos, clicks
- **Metadata completa**: bitrate, codec, homepage, favicon
- **Sin límites** de uso (fair use policy)
- **Múltiples servidores** para redundancia

### Endpoints Utilizados
```typescript
// Top emisoras más escuchadas
GET /json/stations/topclick/{limit}

// Buscar por nombre
POST /json/stations/search

// Filtrar por tag/género
GET /json/stations/bytag/{tag}

// Filtrar por país
GET /json/stations/bycountrycodeexact/{code}

// Registrar click
GET /json/url/{stationuuid}

// Votar por emisora
GET /json/vote/{stationuuid}
```

## 🌍 Geolocalización

### Flujo de Detección
1. **Intentar GPS del navegador** (navigator.geolocation)
2. **Reverse geocoding** con Nominatim (OpenStreetMap)
3. **Fallback por IP** con ipapi.co si GPS falla
4. **Ubicación por defecto** (Miami) si todo falla

### Publicidad Local
- Filtrado de anuncios por ciudad del usuario
- Radio de cobertura configurable
- Categorías de negocios locales
- Ofertas destacadas con emojis

## 🎨 Diseño y UX

### Paleta de Colores
- **Primario**: Orange (#f97316) a Pink (#ec4899)
- **Fondo**: Slate/Purple gradient
- **Acentos**: Blue, Green, Amber según contexto
- **Géneros**: Colores únicos por categoría musical

### Animaciones
- **Framer Motion** para transiciones suaves
- **Visualizador de audio** con Canvas API
- **Hover effects** en tarjetas y botones
- **Loading states** con spinners

### Responsive Design
- **Mobile-first** approach
- **Breakpoints**: sm, md, lg, xl
- **Grid system** adaptable
- **Touch-friendly** en móvil

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build
npm run build

# Subir carpeta dist/
```

### GitHub Pages
```bash
# Configurar base en vite.config.ts
# Build y subir dist/
```

## 📱 PWA Ready

La aplicación está preparada para ser instalable como PWA:
- Manifest.json configurado
- Service Worker para offline
- Iconos en múltiples resoluciones
- Splash screens

## 🔒 Privacidad

- **Sin tracking** de terceros
- **Geolocalización opcional** (el usuario puede denegar)
- **Datos locales** solo en el navegador
- **Sin cookies** de publicidad
- **APIs públicas** sin autenticación

## 🤝 Contribuir

Contribuciones son bienvenidas:
1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

MIT License - Libre para uso personal y comercial

## 🙏 Créditos

- **Radio Browser API** - https://www.radio-browser.info/
- **OpenStreetMap** - https://www.openstreetmap.org/
- **ipapi.co** - https://ipapi.co/
- **Iconos** - Lucide React
- **Animaciones** - Framer Motion

---

**Desarrollado con ❤️ para amantes de la radio**
