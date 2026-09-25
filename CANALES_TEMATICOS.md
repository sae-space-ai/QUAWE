# Sistema de Canales Temáticos - Radio Quawe

## 🎵 ¿Qué son los Canales Temáticos?

Los canales temáticos son emisoras especializadas que reproducen **únicamente música de un género específico** de tu catálogo de Audius. Por ejemplo, "Quawe Flamenco" solo reproducirá tus temas de flamenco, "Quawe Rock" solo rock, etc.

## 🎯 Canales Disponibles

Actualmente hay **10 canales temáticos** configurados:

### 1. 💃 Quawe Flamenco
- **Género**: Flamenco
- **Keywords**: flamenco, flamenca, bulerías, soleá, alegrías, tangos, rumba
- **Emisoras**: 10 ciudades con tradición flamenca
  - Sevilla, Jerez de la Frontera, Cádiz, Granada, Córdoba, Málaga, Madrid, Barcelona, Algeciras, Huelva

### 2. 🎸 Quawe Rock
- **Género**: Rock
- **Keywords**: rock, rock and roll, alternative, indie rock
- **Emisoras**: 10 ciudades con escena rock
  - Madrid, Barcelona, Bilbao, Valencia, Zaragoza, CDMX, Guadalajara, Monterrey, Buenos Aires, Bogotá

### 3. 🎧 Quawe Electrónica
- **Género**: Electrónica
- **Keywords**: electronic, edm, house, techno, trance, dance
- **Emisoras**: 10 ciudades con escena electrónica
  - Ibiza, Barcelona, Madrid, Valencia, Berlín, Ámsterdam, Miami, CDMX, Buenos Aires, Santiago

### 4. 🎤 Quawe Pop
- **Género**: Pop
- **Keywords**: pop, pop rock, synth pop, indie pop
- **Emisoras**: 10 ciudades principales
  - Madrid, Barcelona, CDMX, Buenos Aires, Bogotá, Lima, Santiago, Miami, Caracas, Santo Domingo

### 5. 🎷 Quawe Jazz
- **Género**: Jazz
- **Keywords**: jazz, blues, swing, bebop
- **Emisoras**: 10 ciudades con tradición jazzística
  - Madrid, Barcelona, San Sebastián, Vitoria, Nueva Orleans, Nueva York, Buenos Aires, CDMX, Bogotá, Montevideo

### 6. 🎻 Quawe Clásica
- **Género**: Clásica
- **Keywords**: classical, orchestra, symphony, piano, violin
- **Emisoras**: 10 ciudades con tradición clásica
  - Madrid, Barcelona, Sevilla, Valencia, Viena, Salzburgo, Buenos Aires, CDMX, Lima, Bogotá

### 7. 🎤 Quawe Hip Hop
- **Género**: Hip Hop
- **Keywords**: hip hop, rap, trap, urban
- **Emisoras**: 10 ciudades con escena hip hop
  - Madrid, Barcelona, CDMX, Medellín, Buenos Aires, Santiago, Lima, Caracas, Santo Domingo, Miami

### 8. 🌿 Quawe Reggae
- **Género**: Reggae
- **Keywords**: reggae, ska, dub, roots
- **Emisoras**: 10 ciudades con tradición reggae
  - Kingston, Madrid, Barcelona, CDMX, Buenos Aires, Bogotá, Lima, Santiago, Caracas, Santo Domingo

### 9. 💃 Quawe Latina
- **Género**: Latina
- **Keywords**: latin, salsa, bachata, merengue, cumbia, reggaeton
- **Emisoras**: 10 ciudades latinas
  - CDMX, Guadalajara, Buenos Aires, Bogotá, Cali, Lima, Caracas, Santo Domingo, San Juan, Miami

### 10. 🪕 Quawe Folk
- **Género**: Folk
- **Keywords**: folk, acoustic, singer-songwriter, traditional
- **Emisoras**: 10 ciudades con tradición folk
  - Madrid, Barcelona, Santiago de Compostela, Oviedo, CDMX, Buenos Aires, Bogotá, Lima, La Paz, Quito

## 📊 Estadísticas del Sistema

- **Total de canales temáticos**: 10
- **Total de emisoras temáticas**: 100 (10 por canal)
- **Total de ciudades**: ~80 ciudades únicas
- **Total de países**: ~15 países
- **Cobertura**: España, Latinoamérica, USA, Europa

## 🔧 Cómo Funciona

### 1. Filtrado de Tracks
Cuando seleccionas un canal temático, el sistema:

1. Obtiene todos tus tracks de Audius (hasta 50)
2. Filtra los tracks buscando coincidencias en:
   - Campo `genre`
   - Campo `tags`
   - Campo `mood`
   - Campo `title`
3. Selecciona aleatoriamente un track del filtro
4. Reproduce ese track

### 2. Ejemplo de Filtrado

```typescript
// Canal: Flamenco
// Keywords: ['flamenco', 'bulerías', 'soleá', ...]

// Track 1: "Bulerías por Soleá"
// genre: "Flamenco" ✅ COINCIDE

// Track 2: "Rock Anthem"
// genre: "Rock" ❌ NO COINCIDE

// Track 3: "Flamenco Fusion"
// tags: "flamenco, fusion" ✅ COINCIDE
```

### 3. Fallback
Si no hay tracks que coincidan con el canal temático, el sistema reproduce tracks aleatorios de todo tu catálogo.

## 🎨 Interfaz de Usuario

### Botón "🎵 Temáticos"
- Ubicado en el header junto a "🌍 Red Local"
- Al hacer clic, muestra la vista de canales temáticos

### Vista de Canales Temáticos
- **Grid de 10 canales** con colores y emojis únicos
- Cada canal muestra:
  - Emoji del género
  - Nombre del canal
  - Descripción
  - Número de emisoras disponibles

### Vista de Emisoras del Canal
Al seleccionar un canal, se muestra:
- **Grid de emisoras** del canal seleccionado
- Cada emisora muestra:
  - Nombre (ej: "Quawe Flamenco Sevilla")
  - Ciudad y país
  - Frecuencia FM
  - Número de oyentes
  - Población de la ciudad

## 🎯 Casos de Uso

### Para el Artista
- **Promoción específica**: Puedes promocionar un género específico en una región
- **Eventos temáticos**: Crear eventos alrededor de un género
- **Colaboraciones**: Colaborar con artistas de un género específico

### Para los Oyentes
- **Experiencia personalizada**: Escuchar solo el género que les gusta
- **Descubrimiento**: Descubrir nuevos tracks de un género específico
- **Ambientación**: Crear ambientes específicos (flamenco para una cena, rock para entrenar, etc.)

## 🔮 Futuras Mejoras

### Canales Adicionales
- Quawe Metal
- Quawe Reggaeton
- Quawe Salsa
- Quawe Boleros
- Quawe Cumbia
- Quawe Rancheras
- Quawe Electrónica Chill
- Quawe Indie
- Quawe Punk
- Quawe Blues

### Funcionalidades Avanzadas
- **Playlists personalizadas**: Crear playlists dentro de un canal
- **Modo fiesta**: Mezclar tracks de diferentes canales
- **DJ automático**: Transiciones automáticas entre tracks
- **Request de canciones**: Los oyentes pueden pedir canciones específicas
- **Estadísticas por canal**: Ver qué canales son más populares

## 📝 Configuración

### Agregar un Nuevo Canal

1. Editar `src/data/thematicChannels.ts`:

```typescript
{
  id: 'metal',
  name: 'Quawe Metal',
  genre: 'Metal',
  keywords: ['metal', 'heavy metal', 'thrash', 'death metal'],
  color: '#1F2937',
  emoji: '🤘',
  description: 'Metal en todas sus formas'
}
```

2. Editar `src/data/thematicStations.ts` y agregar ciudades:

```typescript
'metal': [
  { city: 'Madrid', country: 'España', countryCode: 'ES', population: 3223000, frequency: '108.1 FM', lat: 40.4168, lng: -3.7038 },
  // ... más ciudades
]
```

### Modificar Keywords de un Canal

Edita el array `keywords` en `src/data/thematicChannels.ts`:

```typescript
{
  id: 'flamenco',
  name: 'Quawe Flamenco',
  genre: 'Flamenco',
  keywords: ['flamenco', 'flamenca', 'bulerías', 'soleá', 'alegrías', 'tangos', 'rumba', 'nuevo'],
  // ... resto del canal
}
```

## 🎵 Importancia de los Tags en Audius

Para que el filtrado funcione correctamente, es importante que tus tracks en Audius tengan:

1. **Campo `genre`** correcto (ej: "Flamenco", "Rock", "Electrónica")
2. **Campo `tags`** con palabras clave relevantes (ej: "flamenco, bulerías, guitarra")
3. **Campo `mood`** si aplica (ej: "energético", "relajante", "fiesta")
4. **Títulos descriptivos** que incluyan el género

### Ejemplo de Track Bien Etiquetado

```json
{
  "title": "Bulerías por Soleá",
  "genre": "Flamenco",
  "tags": "flamenco, bulerías, soleá, guitarra española, palmas",
  "mood": "apasionado",
  "description": "Bulerías tradicionales con guitarra flamenca"
}
```

## 📈 Métricas

El sistema registra:
- **Tracks filtrados por canal**: Cuántos tracks coinciden con cada canal
- **Reproducciones por canal**: Cuántas veces se reproduce cada canal
- **Emisoras más populares**: Qué emisoras temáticas tienen más oyentes
- **Canales más populares**: Qué géneros son más escuchados

## 🚀 Build y Deploy

```bash
# Build
npm run build

# Deploy
npm run deploy
```

**Bundle size**: ~109 KB gzipped
**Build time**: ~3.3 segundos

---

**Última actualización**: 2026
**Versión**: 1.0.0
**Estado**: ✅ Producción
