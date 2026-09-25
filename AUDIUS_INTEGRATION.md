# 🎵 PULSAR Original - Integración con Audius

## 🎤 Canal Oficial del Artista

**PULSAR Original** es la sección dedicada a la música del artista oficial de PULSAR FM, integrada directamente desde **Audius**, la plataforma de streaming de música descentralizada.

### 🎧 Artista: Prof. Manuel Gago
- **Perfil Audius**: [@profmanuelgago](https://audius.co/profmanuelgago)
- **Handle**: `profmanuelgago`
- **Plataforma**: Audius (blockchain-based music streaming)

---

## 🚀 ¿Qué es Audius?

**Audius** es una plataforma de streaming de música descentralizada y de código abierto que permite a los artistas:

- ✅ Publicar música sin intermediarios
- ✅ Monetizar directamente su contenido
- ✅ Mantener el control total de su obra
- ✅ Conectar con fans sin restricciones
- ✅ Streaming de alta calidad (320kbps)
- ✅ Sin anuncios ni paywalls

### Características Técnicas
- **Protocolo**: Blockchain (Solana/Ethereum)
- **API**: REST pública y gratuita
- **Streaming**: URLs directas de audio
- **Metadata**: IPFS para artwork y datos
- **Descubrimiento**: API de búsqueda y trending

---

## 🔌 Integración API

### Endpoints Utilizados

#### 1. Perfil del Artista
```typescript
GET https://discoveryprovider.audius.co/v1/users/handle/{handle}
```

**Respuesta**:
```json
{
  "data": {
    "id": "user_id",
    "handle": "profmanuelgago",
    "name": "Prof. Manuel Gago",
    "bio": "Productor musical y artista",
    "follower_count": 1234,
    "track_count": 50,
    "artwork": [...]
  }
}
```

#### 2. Tracks del Artista
```typescript
GET https://discoveryprovider.audius.co/v1/users/handle/{handle}/tracks?limit=50
```

**Respuesta**:
```json
{
  "data": [
    {
      "id": "track_id",
      "title": "Nombre del Track",
      "duration": 245,
      "artwork": [...],
      "play_count": 5678,
      "favorite_count": 123,
      "permalink": "/profmanuelgago/nombre-track"
    }
  ]
}
```

#### 3. URL de Streaming
```typescript
GET https://discoveryprovider.audius.co/v1/tracks/{trackId}/stream
```

**Respuesta**: Redirección a URL de streaming directa (302)

---

## 🎨 Componente PulsarOriginal

### Estructura del Componente

```typescript
src/components/PulsarOriginal.tsx
├── Hero del Artista
│   ├── Avatar con badge de verificación
│   ├── Nombre y handle
│   ├── Bio del artista
│   └── Estadísticas (tracks, seguidores)
├── Reproductor de Track Actual
│   ├── Artwork del track
│   ├── Controles (play/pause, next, prev)
│   └── Información del track
└── Lista de Tracks
    ├── Artwork thumbnail
    ├── Título y duración
    ├── Estadísticas (plays, likes)
    └── Link externo a Audius
```

### Funcionalidades

#### ✅ Carga de Datos
- Perfil completo del artista
- Todos los tracks disponibles
- Artwork de alta resolución
- Estadísticas en tiempo real

#### ✅ Reproductor Integrado
- Play/Pause de tracks
- Navegación entre tracks (next/prev)
- Auto-play del siguiente track
- Indicador visual de track activo

#### ✅ Interfaz de Usuario
- Diseño responsive
- Animaciones con Framer Motion
- Badges de "PULSAR Original" y "Artista Oficial"
- Gradientes de marca (naranja → rosa → púrpura)

#### ✅ Integración con Audius
- Links directos a perfiles
- Apertura de tracks en Audius
- Streaming directo desde Audius
- Sincronización de metadata

---

## 🎯 Cómo Usar PULSAR Original

### Para Oyentes

1. **Activar PULSAR Original**
   - Haz clic en el botón "🎵 Original" en el header
   - Se cargará automáticamente el perfil del artista

2. **Explorar Música**
   - Navega por todos los tracks disponibles
   - Ve estadísticas de plays y likes
   - Lee la bio del artista

3. **Reproducir Tracks**
   - Haz clic en cualquier track para reproducirlo
   - Usa los controles de play/pause
   - Navega con next/prev

4. **Conectar con Audius**
   - Haz clic en "Ver en Audius" para ir al perfil
   - Abre tracks individuales en Audius
   - Sigue al artista en la plataforma

### Para el Artista

1. **Publicar Música en Audius**
   - Crea una cuenta en [audius.co](https://audius.co)
   - Sube tus tracks con artwork de alta calidad
   - Añade descripciones y tags

2. **Sincronización Automática**
   - Los nuevos tracks aparecen automáticamente
   - Las estadísticas se actualizan en tiempo real
   - No se requiere configuración adicional

3. **Promoción Cruzada**
   - Comparte el link de PULSAR FM
   - Los oyentes pueden descubrir tu música
   - Integración nativa con la plataforma

---

## 🛠️ Configuración Técnica

### Variables de Entorno

```bash
# Handle del artista en Audius
VITE_AUDIUS_HANDLE=profmanuelgago

# API Key de Audius (opcional, para mayor rate limit)
VITE_AUDIUS_APP_NAME=pulsar-fm-app
```

### Discovery Providers

La aplicación usa múltiples discovery providers para redundancia:

```typescript
const DISCOVERY_HOSTS = [
  'https://discoveryprovider.audius.co',
  'https://discovery-au.audius.co',
  'https://discovery-us.audius.co',
];
```

Si un provider falla, automáticamente rota al siguiente.

### Rate Limiting

- **Sin API Key**: ~100 requests/hora
- **Con API Key**: ~1000 requests/hora
- **Rotación automática** entre providers

---

## 🎨 Diseño Visual

### Colores de Marca
```css
/* Gradiente PULSAR Original */
--gradient-original: linear-gradient(135deg, 
  rgba(255, 107, 53, 0.2) 0%,
  rgba(233, 30, 140, 0.2) 50%,
  rgba(107, 47, 160, 0.2) 100%
);

/* Badge PULSAR Original */
--badge-original: bg-orange-500/20 border-orange-500/30 text-orange-400;

/* Badge Artista Oficial */
--badge-artist: bg-purple-500/20 border-purple-500/30 text-purple-400;
```

### Animaciones
- **Fade in** al cargar tracks (staggered)
- **Scale** en hover de botones
- **Pulse** en indicador de track activo
- **Slide** al cambiar entre vistas

---

## 📊 Estadísticas Mostradas

### Perfil del Artista
- ✅ Número de tracks
- ✅ Seguidores
- ✅ Total de publicaciones

### Por Track
- ✅ Duración (MM:SS)
- ✅ Número de plays
- ✅ Número de favoritos
- ✅ Número de reposts

---

## 🔗 Links Útiles

### Audius
- **Sitio Web**: https://audius.co
- **Perfil del Artista**: https://audius.co/profmanuelgago
- **Documentación API**: https://api.audius.co
- **GitHub**: https://github.com/AudiusProject

### PULSAR FM
- **Sitio Web**: https://pulsarfm.app
- **GitHub**: https://github.com/pulsarfm
- **Documentación**: Ver README.md principal

---

## 🚀 Próximas Mejoras

### Fase 1 (Implementado)
- [x] Integración básica con API de Audius
- [x] Perfil del artista
- [x] Lista de tracks
- [x] Reproductor integrado
- [x] Links externos a Audius

### Fase 2 (Planeado)
- [ ] Playlist personalizadas
- [ ] Comentarios y likes en la app
- [ ] Compartir tracks en redes sociales
- [ ] Notificaciones de nuevos tracks
- [ ] Modo offline (descarga)

### Fase 3 (Futuro)
- [ ] Integración con wallet crypto (tips)
- [ ] NFTs de tracks exclusivos
- [ ] Live streaming desde Audius
- [ ] Colaboraciones con otros artistas
- [ ] Analytics dashboard para el artista

---

## 📝 Notas Importantes

### Streaming
- Los tracks se reproducen directamente desde Audius
- No se almacena música en servidores de PULSAR FM
- Calidad de audio: hasta 320kbps
- Formato: MP3/Opus según disponibilidad

### Privacidad
- No se recopilan datos de reproducción
- Las estadísticas de play son de Audius
- No se requiere login para escuchar
- Compatible con modo incógnito

### Licencias
- Todo el contenido pertenece al artista
- Audius maneja los derechos de autor
- PULSAR FM solo muestra y reproduce
- Respeto total a la propiedad intelectual

---

## 🤝 Soporte

### Para el Artista
Si eres el artista y necesitas:
- Actualizar tu perfil
- Cambiar el handle
- Reportar problemas
- Solicitar nuevas features

**Contacto**: hola@pulsarfm.app

### Para Desarrolladores
Si quieres contribuir:
- Revisa el código en `src/services/audiusApi.ts`
- Mejora el componente en `src/components/PulsarOriginal.tsx`
- Abre un PR en GitHub

---

**Última actualización**: 2026
**Versión**: 1.0.0
**Artista**: Prof. Manuel Gago (@profmanuelgago)
**Plataforma**: Audius
