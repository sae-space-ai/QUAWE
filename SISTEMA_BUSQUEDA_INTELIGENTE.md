# Sistema de Búsqueda Inteligente - Radio Quawe

## 🎯 ¿Qué se ha Implementado?

Se ha creado un **sistema de búsqueda inteligente** que analiza TODOS los elementos de tu catálogo de Audius (tracks, álbumes y playlists) para encontrar contenido relevante por género/estilo.

## 🔍 Cómo Funciona la Búsqueda

### 1. Búsqueda en Múltiples Fuentes
El sistema busca en:
- ✅ **Tracks directos** (hasta 100 tracks)
- ✅ **Álbumes** (hasta 50 álbumes)
- ✅ **Playlists** (hasta 50 playlists)
- ✅ **Tracks dentro de álbumes** relevantes
- ✅ **Tracks dentro de playlists** relevantes

### 2. Sistema de Puntuación Inteligente
Cada elemento recibe una puntuación basada en:

#### Puntuación por Coincidencia
- **Coincidencia en título**: +10 puntos
- **Coincidencia en género**: +15 puntos (mayor peso)
- **Coincidencia en tags**: +8 puntos
- **Bonus por álbum relevante**: +5 puntos adicionales
- **Bonus por playlist relevante**: +5 puntos adicionales

#### Ejemplo de Puntuación
```
Track: "Bulerías por Soleá"
- Título contiene "bulerías": +10
- Género es "Flamenco": +15
- Tags incluyen "flamenco, soleá": +8
Total: 33 puntos ✅ ALTA RELEVANCIA
```

### 3. Eliminación de Duplicados
Si un track aparece en múltiples fuentes (track directo + álbum + playlist), se mantiene solo la versión con mayor puntuación.

### 4. Selección Aleatoria Ponderada
De todos los tracks encontrados, se selecciona uno aleatoriamente, pero con mayor probabilidad para los tracks con mayor puntuación.

## 📊 Ejemplo Práctico

### Canal: Quawe Flamenco
**Keywords**: flamenco, bulerías, soleá, alegrías, tangos, rumba

#### Búsqueda en Tracks Directos
```
Track 1: "Bulerías por Soleá"
  - genre: "Flamenco" ✅ (+15)
  - tags: "flamenco, bulerías, soleá" ✅ (+8)
  - title: "Bulerías por Soleá" ✅ (+10)
  Score: 33 puntos

Track 2: "Rock Anthem"
  - genre: "Rock" ❌
  - tags: "rock, electric guitar" ❌
  Score: 0 puntos ❌ NO COINCIDE
```

#### Búsqueda en Álbumes
```
Álbum: "Flamenco Puro"
  - name: "Flamenco Puro" ✅ (+10)
  - genre: "Flamenco" ✅ (+15)
  - description: "Colección de flamenco tradicional" ✅ (+8)
  Score: 33 puntos
  
  → Se obtienen todos los tracks del álbum
  → Cada track recibe +5 puntos bonus
```

#### Búsqueda en Playlists
```
Playlist: "Mis Flamencos Favoritos"
  - name: "Mis Flamencos Favoritos" ✅ (+10)
  - description: "Lo mejor del flamenco" ✅ (+8)
  Score: 18 puntos
  
  → Se obtienen todos los tracks de la playlist
  → Cada track recibe +5 puntos bonus
```

#### Resultado Final
```
Tracks encontrados: 15
- 5 de tracks directos
- 7 del álbum "Flamenco Puro"
- 3 de la playlist "Mis Flamencos Favoritos"

Se selecciona uno aleatoriamente para reproducir
```

## 🎵 Cómo Mejorar los Resultados

### 1. Etiquetar Correctamente tus Tracks en Audius

#### Campos Importantes
```json
{
  "title": "Bulerías por Soleá",
  "genre": "Flamenco",
  "tags": "flamenco, bulerías, soleá, guitarra española, palmas",
  "mood": "apasionado",
  "description": "Bulerías tradicionales con guitarra flamenca"
}
```

#### Recomendaciones por Género

**Flamenco**:
```json
{
  "genre": "Flamenco",
  "tags": "flamenco, bulerías, soleá, alegrías, tangos, rumba, guitarra española, cante jondo, palmas, cajón"
}
```

**Rock**:
```json
{
  "genre": "Rock",
  "tags": "rock, rock and roll, alternative, indie rock, electric guitar, drums, bass"
}
```

**Electrónica**:
```json
{
  "genre": "Electronic",
  "tags": "electronic, edm, house, techno, trance, dance, synth, beat, dj"
}
```

**Pop**:
```json
{
  "genre": "Pop",
  "tags": "pop, pop rock, synth pop, indie pop, catchy, melodic"
}
```

**Jazz**:
```json
{
  "genre": "Jazz",
  "tags": "jazz, blues, swing, bebop, saxophone, piano, double bass"
}
```

**Clásica**:
```json
{
  "genre": "Classical",
  "tags": "classical, orchestra, symphony, piano, violin, cello, concerto"
}
```

**Hip Hop**:
```json
{
  "genre": "Hip Hop",
  "tags": "hip hop, rap, trap, urban, beats, flow, lyrics"
}
```

**Reggae**:
```json
{
  "genre": "Reggae",
  "tags": "reggae, ska, dub, roots, jamaican, rhythm"
}
```

**Latina**:
```json
{
  "genre": "Latin",
  "tags": "latin, salsa, bachata, merengue, cumbia, reggaeton, tropical"
}
```

**Folk**:
```json
{
  "genre": "Folk",
  "tags": "folk, acoustic, singer-songwriter, traditional, guitar, storytelling"
}
```

### 2. Crear Álbumes Temáticos

Crea álbumes específicos por género:

```
Álbum: "Flamenco Puro"
  - genre: "Flamenco"
  - description: "Colección de flamenco tradicional"
  - tags: "flamenco, bulerías, soleá"
  - tracks: [track1, track2, track3, ...]
```

**Ventaja**: Todos los tracks del álbum heredan las etiquetas del álbum (+5 puntos bonus).

### 3. Crear Playlists Temáticas

Crea playlists específicas por género:

```
Playlist: "Mis Flamencos Favoritos"
  - description: "Lo mejor del flamenco"
  - tags: "flamenco, bulerías"
  - tracks: [track1, track2, track3, ...]
```

**Ventaja**: Todos los tracks de la playlist heredan las etiquetas (+5 puntos bonus).

### 4. Usar Descripciones Detalladas

Las descripciones también se analizan:

```
Descripción: "Bulerías tradicionales con guitarra flamenca, palmas y cajón. Estilo de Jerez de la Frontera."
```

**Ventaja**: Más palabras clave = mayor probabilidad de coincidencia.

## 📈 Estadísticas del Sistema

### Búsqueda Actual
- **Tracks analizados**: hasta 100
- **Álbumes analizados**: hasta 50
- **Playlists analizadas**: hasta 50
- **Fuentes de búsqueda**: 3 (tracks, álbumes, playlists)
- **Sistema de puntuación**: 5 niveles de peso

### Rendimiento
- **Tiempo de búsqueda**: ~2-3 segundos
- **Precisión**: Alta (basada en etiquetas correctas)
- **Cobertura**: Completa (tracks + álbumes + playlists)

## 🔧 Configuración de Canales

### Agregar Keywords a un Canal

Edita `src/data/thematicChannels.ts`:

```typescript
{
  id: 'flamenco',
  name: 'Quawe Flamenco',
  genre: 'Flamenco',
  keywords: [
    'flamenco',
    'flamenca',
    'bulerías',
    'soleá',
    'alegrías',
    'tangos',
    'rumba',
    'cante jondo',      // ← Nueva keyword
    'guitarra española', // ← Nueva keyword
    'palmas'             // ← Nueva keyword
  ],
  color: '#DC2626',
  emoji: '💃',
  description: 'Flamenco puro y fusión'
}
```

### Crear un Nuevo Canal

```typescript
{
  id: 'salsa',
  name: 'Quawe Salsa',
  genre: 'Salsa',
  keywords: ['salsa', 'salsa cubana', 'salsa colombiana', 'timba', 'son'],
  color: '#F97316',
  emoji: '💃',
  description: 'Salsa en todas sus formas'
}
```

## 🎯 Casos de Uso

### Caso 1: Track Bien Etiquetado
```
Track: "Bulerías por Soleá"
genre: "Flamenco" ✅
tags: "flamenco, bulerías, soleá" ✅
description: "Flamenco tradicional" ✅

Resultado: Score alto → Alta probabilidad de ser seleccionado
```

### Caso 2: Track en Álbum Temático
```
Álbum: "Flamenco Puro"
genre: "Flamenco" ✅
tags: "flamenco" ✅

Track dentro del álbum:
- Hereda etiquetas del álbum
- Recibe +5 puntos bonus

Resultado: Score alto → Alta probabilidad de ser seleccionado
```

### Caso 3: Track en Playlist Temática
```
Playlist: "Mis Flamencos Favoritos"
description: "Lo mejor del flamenco" ✅
tags: "flamenco" ✅

Track dentro de la playlist:
- Hereda etiquetas de la playlist
- Recibe +5 puntos bonus

Resultado: Score alto → Alta probabilidad de ser seleccionado
```

### Caso 4: Track Mal Etiquetado
```
Track: "Canción 1"
genre: "" ❌
tags: "" ❌
description: "" ❌

Resultado: Score 0 → No se selecciona (a menos que no haya otros tracks)
```

## 🚀 Mejoras Futuras

### Planificadas
1. **Análisis de audio**: Detectar género automáticamente analizando el audio
2. **Machine Learning**: Aprender de las preferencias del usuario
3. **Búsqueda semántica**: Entender el significado, no solo palabras clave
4. **Recomendaciones**: Sugerir tracks similares a los que ya gustaron
5. **Filtros avanzados**: Por tempo, energía, valencia, etc.

### Sugeridas
1. **Importar etiquetas de Spotify**: Si tienes tu música en Spotify, importar las etiquetas
2. **Colaboración con otros artistas**: Crear playlists conjuntas por género
3. **Etiquetado comunitario**: Permitir que los oyentes etiqueten tracks
4. **Análisis de letras**: Buscar keywords en las letras de las canciones

## 📝 Resumen

El sistema de búsqueda inteligente de Radio Quawe:

✅ Busca en tracks, álbumes y playlists
✅ Usa un sistema de puntuación por relevancia
✅ Elimina duplicados automáticamente
✅ Selecciona tracks aleatoriamente con ponderación
✅ Funciona mejor con tracks bien etiquetados
✅ Es configurable y extensible

**Para mejores resultados**: Etiqueta correctamente tus tracks, crea álbumes temáticos y playlists específicas por género.

---

**Última actualización**: 2026
**Versión**: 2.0.0 (Búsqueda Inteligente)
**Estado**: ✅ Producción
