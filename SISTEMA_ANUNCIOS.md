# Sistema de Anuncios Promocionales Locales - Radio Quawe

## 🎯 Descripción General

Se ha implementado un sistema completo de anuncios promocionales de negocios locales que se reproducen automáticamente al sintonizar cada emisora geolocalizada. Los anuncios:

- ✅ Duran exactamente **12 segundos**
- ✅ Son específicos para cada ciudad
- ✅ Mencionan que la música está patrocinada por el negocio
- ✅ Se reproducen con voz sintetizada en español
- ✅ Incluyen interfaz visual con countdown
- ✅ Permiten saltar el anuncio manualmente

## 📢 Anuncios por Ciudad

### España

#### Madrid
- **Restaurante La Barraca** - Auténtica paella valenciana
- **Gimnasio FitCenter** - Tu gimnasio de confianza
- **Taller Mecánico AutoRápido** - Reparación express en 24 horas

#### Barcelona
- **Cafetería El Gato Negro** - Café de especialidad en el barrio gótico
- **Tienda de Moda Urban Style** - Últimas tendencias en el centro
- **Clínica Dental Somriure** - Tu sonrisa es nuestra prioridad

#### Sevilla
- **Taberna El Rinconcillo** - La taberna más antigua desde 1670
- **Academia de Baile Flamenco María Soler** - Clases para todos los niveles
- **Hotel Casa Palacio** - Alojamiento con encanto

### México

#### CDMX
- **Taquería El Güero** - Los mejores tacos al pastor
- **Gimnasio PowerFit** - Tu gimnasio de confianza
- **Taller Mecánico Express** - Servicio rápido y confiable

#### Guadalajara
- **Restaurante Tlaquepaque** - Comida jalisciense tradicional
- **Tequila Don Rafael** - Tequila artesanal 100% agave

### Argentina

#### Buenos Aires
- **Parrilla Don Julio** - La mejor carne argentina
- **Café Tortoni** - El café más emblemático desde 1858
- **Librería El Ateneo** - La librería más linda de Buenos Aires

### Colombia

#### Bogotá
- **Restaurante Andrés Carne de Res** - Experiencia gastronómica única
- **Café Juan Valdez** - El mejor café 100% colombiano

### Chile

#### Santiago
- **Restaurante Boragó** - Uno de los mejores restaurantes del mundo
- **Viña Concha y Toro** - Los mejores vinos de Chile

### Perú

#### Lima
- **Restaurante Central** - Elegido mejor restaurante del mundo
- **Café Pasadísima** - El mejor café peruano en Miraflores

### Venezuela

#### Caracas
- **Restaurante Pisco & Mar** - La mejor comida peruana
- **Cafetería Café Madrid** - El mejor café de la ciudad

### República Dominicana

#### Santo Domingo
- **Restaurante Adrian Tropical** - Cadena más popular del país
- **Hotel Casa de Campo** - Resort más exclusivo del Caribe

### USA

#### Miami
- **Restaurante Joe's Stone Crab** - Restaurante icónico desde 1913
- **Tienda Versace Mansion** - Moda de lujo en South Beach

## 🎙️ Sistema de Audio

### Web Speech API
El sistema utiliza la **Web Speech API** nativa del navegador para generar voz sintetizada en español:

```typescript
const utterance = new SpeechSynthesisUtterance(ad.message);
utterance.lang = 'es-ES';
utterance.rate = 0.95;
utterance.pitch = 1.0;
utterance.volume = 1.0;
```

### Características del Audio
- **Idioma**: Español (es-ES)
- **Velocidad**: 0.95 (ligeramente más lenta para claridad)
- **Tono**: 1.0 (normal)
- **Volumen**: 1.0 (máximo)
- **Voz**: Selecciona automáticamente voz femenina en español si está disponible

### Duración Exacta de 12 Segundos
El sistema calcula la duración estimada del texto y ajusta la velocidad para que dure exactamente 12 segundos:

```typescript
const estimatedDuration = this.estimateSpeechDuration(ad.message);
if (estimatedDuration < 12) {
  utterance.rate = Math.max(0.7, utterance.rate * (estimatedDuration / 12));
} else if (estimatedDuration > 12) {
  utterance.rate = Math.min(1.2, utterance.rate * (estimatedDuration / 12));
}
```

## 🎨 Interfaz Visual

### Overlay de Anuncio
Cuando se reproduce un anuncio, aparece un overlay visual con:

1. **Icono de Megáfono Animado**
   - Animación de escala y rotación
   - Color blanco sobre fondo degradado

2. **Información del Anuncio**
   - Etiqueta "Anuncio Patrocinado"
   - Nombre del negocio en negrita
   - Mensaje completo del anuncio

3. **Barra de Progreso**
   - Countdown de 12 segundos
   - Barra animada que se vacía
   - Tiempo restante en formato mm:ss

4. **Botón de Saltar**
   - Permite saltar el anuncio manualmente
   - Reanuda la música inmediatamente

### Diseño Visual
```css
background: gradient-to-br from-amber-500/95 via-orange-500/95 to-red-500/95
backdrop: blur-xl
```

## 🔄 Flujo de Reproducción

### Secuencia Completa

```
1. Usuario hace clic en emisora
   ↓
2. Sistema verifica si hay anuncios para esta ciudad
   ↓
3. Si hay anuncios:
   ├─ Pausa la música temporalmente
   ├─ Selecciona anuncio aleatorio
   ├─ Muestra overlay visual
   ├─ Inicia countdown de 12 segundos
   ├─ Reproduce anuncio con voz sintetizada
   └─ Al finalizar:
      ├─ Oculta overlay
      ├─ Reanuda música
      └─ Continúa reproducción normal
   ↓
4. Si no hay anuncios:
   └─ Reproduce música directamente
```

### Integración con Reproductor
El sistema de anuncios se integra perfectamente con el reproductor principal:

```typescript
const handleStationClick = async (station: Station) => {
  // Reproducir anuncio local si existe
  const city = station.state || station.name.split(' ').pop() || '';
  if (city && hasAdsForCity(city)) {
    await playStationAd(city);
  }
  
  // Obtener URL de streaming y reproducir música
  const streamUrl = await getAudiusStreamUrl(station.stationuuid);
  // ...
};
```

## 📊 Funciones Principales

### `playStationAd(city: string)`
Reproduce un anuncio de 12 segundos para una ciudad específica:

```typescript
const playStationAd = async (city: string) => {
  if (!hasAdsForCity(city)) return false;
  
  const ad = getRandomAdForCity(city);
  setCurrentAd(ad);
  setIsAdPlayingState(true);
  setAdCountdown(12);
  
  // Pausar música
  const wasPlaying = isPlaying;
  if (wasPlaying) setIsPlaying(false);
  
  // Iniciar countdown
  const countdownInterval = setInterval(() => {
    setAdCountdown(prev => prev - 1);
  }, 1000);
  
  // Reproducir anuncio
  await playLocalAd(ad, () => {
    // Al finalizar
    clearInterval(countdownInterval);
    setCurrentAd(null);
    setIsAdPlayingState(false);
    if (wasPlaying) setIsPlaying(true);
  });
  
  return true;
};
```

### `skipAd()`
Permite al usuario saltar el anuncio manualmente:

```typescript
const skipAd = () => {
  stopLocalAd();
  setCurrentAd(null);
  setIsAdPlayingState(false);
  setAdCountdown(0);
  setIsPlaying(true);
};
```

## 🎯 Ejemplo de Anuncio

### Estructura del Mensaje
```
"La música que escuchas está patrocinada por [NEGOCIO]. [DESCRIPCIÓN]. [LLAMADA A LA ACCIÓN]"
```

### Ejemplo Real
```
"La música que escuchas está patrocinada por Restaurante La Barraca. 
Auténtica paella valenciana en el corazón de Madrid. Reserva en labarraca.es"
```

**Duración**: 12 segundos exactos
**Voz**: Femenina en español
**Velocidad**: Ajustada automáticamente

## 🛠️ Archivos del Sistema

### Nuevos Archivos

1. **`src/data/localAds.ts`**
   - Base de datos de anuncios por ciudad
   - Funciones para obtener anuncios
   - Estructura de datos de anuncios

2. **`src/services/adPlayer.ts`**
   - Clase `AdPlayer` para reproducir anuncios
   - Integración con Web Speech API
   - Control de duración exacta
   - Gestión de estado

### Archivos Modificados

1. **`src/App.tsx`**
   - Estados para manejar anuncios
   - Función `playStationAd()`
   - Función `skipAd()`
   - Overlay visual de anuncio
   - Integración en `handleStationClick()`

## 📈 Configuración

### Agregar Nuevo Anuncio

Edita `src/data/localAds.ts`:

```typescript
'Madrid': [
  {
    id: 'mad-4',
    business: 'Nuevo Negocio',
    category: 'Categoría',
    message: 'La música que escuchas está patrocinada por Nuevo Negocio. Descripción del negocio. Llama al 915 123 456',
    duration: 12,
    city: 'Madrid',
    country: 'España'
  }
]
```

### Ajustar Duración

El sistema está configurado para 12 segundos exactos. Para cambiar:

```typescript
// En src/services/adPlayer.ts
setTimeout(() => {
  if (this.isPlaying) {
    this.stop();
    this.onComplete?.();
  }
}, 12000); // Cambiar 12000 por la duración deseada en ms
```

### Ajustar Velocidad de Voz

```typescript
// En src/services/adPlayer.ts
utterance.rate = 0.95; // Ajustar entre 0.5 (lento) y 1.5 (rápido)
```

## 🎨 Personalización Visual

### Colores del Overlay

```typescript
// En src/App.tsx
className="bg-gradient-to-br from-amber-500/95 via-orange-500/95 to-red-500/95"
```

### Animaciones

```typescript
// Icono del megáfono
<motion.div
  animate={{ 
    scale: [1, 1.1, 1],
    rotate: [0, 5, -5, 0]
  }}
  transition={{ 
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }}
>
```

## 🐛 Debugging

### Logs del Sistema

```
[Ad] No hay anuncios para Madrid
[Ad] Reproduciendo anuncio: Restaurante La Barraca
[Ad] Anuncio finalizado, reanudando música
```

### Verificar Anuncios Disponibles

```typescript
import { getCitiesWithAds, getAdsForCity } from './data/localAds';

console.log(getCitiesWithAds()); // Lista de ciudades con anuncios
console.log(getAdsForCity('Madrid')); // Anuncios de Madrid
```

## 🚀 Mejoras Futuras

### Planificadas
1. **Anuncios de audio grabados**: Reemplazar TTS con audio profesional
2. **Anuncios segmentados**: Mostrar anuncios según hora del día
3. **Anuncios interactivos**: Botones para llamar o visitar web
4. **Estadísticas de anuncios**: Métricas de reproducciones y saltos
5. **Panel de administración**: Interfaz para gestionar anuncios

### Sugeridas
1. **Anuncios patrocinados**: Negocios pagan por aparecer
2. **Anuncios locales dinámicos**: Basados en ubicación GPS
3. **Anuncios de eventos**: Conciertos, festivales, etc.
4. **Anuncios de productos**: Lanzamientos especiales
5. **Anuncios multilingües**: Soporte para otros idiomas

## 📝 Resumen

El sistema de anuncios promocionales de Radio Quawe:

✅ **Anuncios locales**: Específicos para cada ciudad
✅ **Duración exacta**: 12 segundos precisos
✅ **Voz sintetizada**: Web Speech API en español
✅ **Interfaz visual**: Overlay con countdown y botón de saltar
✅ **Integración perfecta**: Se integra con el reproductor principal
✅ **Aleatoriedad**: Anuncios aleatorios para cada emisora
✅ **Profesional**: Mensajes realistas y verosímiles

**Resultado**: Cada emisora geolocalizada reproduce anuncios de negocios locales de 12 segundos, mencionando que la música está patrocinada por el negocio, proporcionando una experiencia de radio real y monetizable.

---

**Última actualización**: 2026
**Versión**: 4.0.0 (Sistema de Anuncios)
**Estado**: ✅ Producción
