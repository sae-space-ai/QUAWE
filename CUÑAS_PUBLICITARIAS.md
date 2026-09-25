# Sistema de Cuñas Publicitarias Automáticas

## 📢 Descripción General

El sistema de cuñas publicitarias automáticas reproduce anuncios de 12 segundos **cada minuto** de música en todas las emisoras de Radio Quawe. Este sistema crea una experiencia de radio tradicional con interrupciones publicitarias programadas.

## 🎯 Características Principales

### Frecuencia de Anuncios
- **Intervalo**: Cada 1 minuto de música
- **Duración**: 12 segundos por anuncio
- **Tipo**: Anuncios locales o temáticos según la emisora
- **Automático**: No requiere intervención del usuario

### Flujo de Reproducción

```
1. Usuario escucha música
   ↓
2. Después de 1 minuto de música
   ↓
3. Se pausa automáticamente la música
   ↓
4. Se reproduce anuncio de 12 segundos
   ↓
5. Se muestra overlay visual con countdown
   ↓
6. Al finalizar el anuncio
   ↓
7. Se reanuda la música automáticamente
   ↓
8. Se repite el ciclo cada minuto
```

## 🎨 Interfaz Visual

### Overlay de Anuncio

Cuando se reproduce un anuncio, aparece un overlay visual con:

1. **Icono de Megáfono Animado**
   - Animación de escala y rotación
   - Color blanco sobre fondo degradado naranja-rojo

2. **Información del Anuncio**
   - Etiqueta "Anuncio Patrocinado"
   - Nombre del negocio en negrita
   - Mensaje completo del anuncio

3. **Barra de Progreso**
   - Countdown de 12 segundos
   - Barra animada que se vacía
   - Tiempo restante visible

4. **Botón de Saltar**
   - Permite saltar el anuncio manualmente
   - Reanuda la música inmediatamente

## 🔄 Integración con el Sistema

### Componentes Involucrados

1. **AdScheduler** (`src/services/adScheduler.ts`)
   - Programa los anuncios cada minuto
   - Maneja el ciclo de reproducción
   - Coordina con el reproductor de audio

2. **AdPlayer** (`src/services/adPlayer.ts`)
   - Reproduce el audio del anuncio
   - Usa Web Speech API para voz sintetizada
   - Controla la duración exacta de 12 segundos

3. **App.tsx**
   - Inicia el scheduler al reproducir música
   - Detiene el scheduler al pausar
   - Muestra el overlay visual durante el anuncio

### Flujo Técnico

```typescript
// 1. Usuario reproduce música
useEffect(() => {
  if (isPlaying && currentStation) {
    startAdScheduler(
      stationId,
      channelId,
      onAdStart,  // Pausa música, muestra overlay
      onAdEnd     // Reanuda música, oculta overlay
    );
  }
}, [isPlaying, currentStation]);

// 2. Cada minuto, el scheduler dispara un anuncio
adScheduler.playAd() → 
  onAdStart() → 
  playLocalAd() → 
  onAdEnd() → 
  scheduleNextAd()

// 3. El ciclo se repite infinitamente
```

## 📊 Tipos de Anuncios

### Anuncios Locales
Se reproducen en emisoras geolocalizadas:
- **Ciudades**: Madrid, Barcelona, CDMX, Buenos Aires, etc.
- **Negocios**: Restaurantes, gimnasios, talleres, etc.
- **Ejemplo**: "La música que escuchas está patrocinada por Restaurante La Barraca..."

### Anuncios Temáticos
Se reproducen en canales temáticos:
- **Canales**: Flamenco, Rock, Electrónica, Pop, Jazz, etc.
- **Negocios**: Relacionados con el género musical
- **Ejemplo**: "El flamenco que escuchas está patrocinado por Taberna Flamenca El Arenal..."

### Prioridad de Selección
1. **Anuncios temáticos** (si es un canal temático)
2. **Anuncios locales** (si es una emisora geolocalizada)
3. **Sin anuncio** (si no hay anuncios disponibles)

## ⚙️ Configuración

### Parámetros del Scheduler

```typescript
interface AdSchedulerConfig {
  intervalMinutes: number;  // Cada cuántos minutos (default: 1)
  adDuration: number;       // Duración del anuncio (default: 12)
  enabled: boolean;         // Habilitar/deshabilitar (default: true)
}
```

### Personalización

Para cambiar la frecuencia de anuncios:

```typescript
// En src/services/adScheduler.ts
const DEFAULT_CONFIG: AdSchedulerConfig = {
  intervalMinutes: 2,  // Cambiar a 2 minutos
  adDuration: 12,
  enabled: true,
};
```

Para deshabilitar anuncios:

```typescript
adScheduler.setEnabled(false);
```

## 📈 Estadísticas

### Métricas del Sistema

```typescript
const stats = adScheduler.getStats();
// {
//   adsPlayed: 15,           // Total de anuncios reproducidos
//   isPlayingAd: false,      // Si está reproduciendo un anuncio
//   config: { ... }          // Configuración actual
// }
```

### Logs del Sistema

```
[AdScheduler] Iniciado para estación quawe-madrid, anuncios cada 1 minuto(s)
[AdScheduler] Reproduciendo anuncio: Restaurante La Barraca
[AdScheduler] Anuncio finalizado. Total reproducidos: 1
[AdScheduler] Reproduciendo anuncio: Gimnasio FitCenter
[AdScheduler] Anuncio finalizado. Total reproducidos: 2
```

## 🎵 Experiencia de Usuario

### Escucha Continua
- El usuario escucha música normalmente
- Cada minuto, se interrumpe con un anuncio
- El anuncio dura exactamente 12 segundos
- La música se reanuda automáticamente

### Control del Usuario
- **Saltar anuncio**: Botón "Saltar Anuncio" en el overlay
- **Pausar música**: Detiene el scheduler de anuncios
- **Cambiar emisora**: Reinicia el scheduler para la nueva emisora

### Puntos y Anuncios
- **No se ganan puntos** durante los anuncios
- **Solo se ganan puntos** durante la música
- Esto incentiva a los usuarios a escuchar más música

## 🔧 Implementación Técnica

### AdScheduler Class

```typescript
class AdScheduler {
  private timer: ReturnType<typeof setTimeout> | null = null;
  private isPlayingAd: boolean = false;
  private adsPlayed: number = 0;

  start(stationId, channelId, onAdStart, onAdEnd) {
    // Iniciar el programador
    this.scheduleNextAd();
  }

  private scheduleNextAd() {
    // Programar el siguiente anuncio después del intervalo
    this.timer = setTimeout(() => {
      this.playAd();
    }, this.config.intervalMinutes * 60 * 1000);
  }

  private async playAd() {
    // Reproducir anuncio
    this.onAdStart?.();
    await playLocalAd(ad, () => {
      this.onAdEnd?.();
      this.scheduleNextAd();
    });
  }

  stop() {
    // Detener el programador
    clearTimeout(this.timer);
  }
}
```

### Integración en App.tsx

```typescript
// Iniciar scheduler al reproducir música
useEffect(() => {
  if (isPlaying && currentStation) {
    startAdScheduler(
      currentStation.stationuuid,
      channelId,
      () => {
        setIsPlaying(false);
        setIsAdPlayingState(true);
        setAdCountdown(12);
      },
      () => {
        setIsAdPlayingState(false);
        setAdCountdown(0);
        setIsPlaying(true);
      }
    );
  } else {
    stopAdScheduler();
  }
}, [isPlaying, currentStation]);
```

## 📊 Ejemplo de Uso

### Escenario: Usuario Escucha Quawe Madrid

```
00:00 - Usuario reproduce Quawe Madrid
        → Se inicia el scheduler
        → Música sonando

00:01 - Primer minuto de música
        → Se pausa la música
        → Se reproduce anuncio: "Restaurante La Barraca"
        → Overlay visible con countdown
        → 12 segundos de anuncio

00:13 - Anuncio finalizado
        → Se reanuda la música
        → Se programa el siguiente anuncio

01:13 - Segundo minuto de música
        → Se pausa la música
        → Se reproduce anuncio: "Gimnasio FitCenter"
        → 12 segundos de anuncio

01:25 - Anuncio finalizado
        → Se reanuda la música
        → Se programa el siguiente anuncio

... (el ciclo continúa)
```

### Estadísticas Después de 1 Hora

```
Tiempo total: 60 minutos
Anuncios reproducidos: 60 anuncios
Tiempo de música: 52 minutos (60 - 8 minutos de anuncios)
Tiempo de anuncios: 8 minutos (60 × 12 segundos)
Puntos ganados: 520 puntos (solo por música)
```

## 🎯 Ventajas del Sistema

### Para los Oyentes
- ✅ **Experiencia de radio tradicional** con anuncios
- ✅ **Descubrimiento de negocios locales**
- ✅ **Control total** (pueden saltar anuncios)
- ✅ **Incentivo para escuchar más** (ganar puntos)

### Para las Marcas
- ✅ **Exposición garantizada** (cada minuto)
- ✅ **Audiencia cautiva** (anuncios cortos)
- ✅ **Segmentación por género** (anuncios temáticos)
- ✅ **Frecuencia alta** (60 anuncios por hora)

### Para Radio Quawe
- ✅ **Modelo de negocio escalable**
- ✅ **Ingresos por publicidad**
- ✅ **Engagement alto** (gamificación)
- ✅ **Diferenciación** (experiencia única)

## 🚀 Futuras Mejoras

### Planificadas
- [ ] Anuncios de video (además de audio)
- [ ] Anuncios interactivos (botones de acción)
- [ ] Anuncios personalizados por usuario
- [ ] Estadísticas avanzadas de anuncios
- [ ] A/B testing de anuncios

### Sugeridas
- [ ] Anuncios patrocinados por usuarios (crowdfunding)
- [ ] Anuncios de eventos locales
- [ ] Anuncios de nuevos productos
- [ ] Anuncios de colaboraciones
- [ ] Anuncios de concursos y sorteos

## 📝 Notas Importantes

### Rendimiento
- **Impacto mínimo** en el rendimiento
- **Timer eficiente** con setTimeout
- **Limpieza automática** al cambiar de emisora
- **Manejo de errores** robusto

### Accesibilidad
- **Overlay visual** claro y legible
- **Botón de saltar** accesible
- **Countdown visible** para el usuario
- **Audio claro** con voz sintetizada

### Privacidad
- **No se recopilan datos** de los anuncios
- **No se comparte información** con terceros
- **Anuncios locales** basados en la emisora
- **Sin tracking** de comportamiento

---

**Última actualización**: 2026  
**Versión**: 7.0.0 (Cuñas Publicitarias Automáticas)  
**Estado**: ✅ Producción y funcionando
