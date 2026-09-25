# 🌍 Red PULSAR Local - 10 Ciudades Geolocalizadas

## 📡 Descripción General

La **Red PULSAR Local** es un sistema de 10 emisoras de radio virtuales geolocalizadas en las principales ciudades hispanohablantes del mundo. Cada emisora reproduce exclusivamente la música de **Prof. Manuel Gago** desde Audius, creando una red global de difusión musical.

## 🏙️ Ciudades de la Red

### 1. **PULSAR Madrid** 🇪🇸
- **Frecuencia**: 88.1 FM
- **País**: España
- **Población**: 3,223,000 habitantes
- **Coordenadas**: 40.4168°N, 3.7038°O
- **Oyentes**: 45,000
- **ID**: `pulsar-madrid`

### 2. **PULSAR Barcelona** 🇪🇸
- **Frecuencia**: 92.3 FM
- **País**: España
- **Población**: 1,620,000 habitantes
- **Coordenadas**: 41.3851°N, 2.1734°E
- **Oyentes**: 42,000
- **ID**: `pulsar-barcelona`

### 3. **PULSAR CDMX** 🇲🇽
- **Frecuencia**: 101.5 FM
- **País**: México
- **Población**: 9,200,000 habitantes
- **Coordenadas**: 19.4326°N, 99.1332°O
- **Oyentes**: 85,000
- **ID**: `pulsar-cdmx`

### 4. **PULSAR Buenos Aires** 🇦🇷
- **Frecuencia**: 95.7 FM
- **País**: Argentina
- **Población**: 3,075,000 habitantes
- **Coordenadas**: 34.6037°S, 58.3816°O
- **Oyentes**: 62,000
- **ID**: `pulsar-buenosaires`

### 5. **PULSAR Bogotá** 🇨🇴
- **Frecuencia**: 89.3 FM
- **País**: Colombia
- **Población**: 7,412,000 habitantes
- **Coordenadas**: 4.7110°N, 74.0721°O
- **Oyentes**: 73,000
- **ID**: `pulsar-bogota`

### 6. **PULSAR Lima** 🇵🇪
- **Frecuencia**: 97.1 FM
- **País**: Perú
- **Población**: 10,555,000 habitantes
- **Coordenadas**: 12.0464°S, 77.0428°O
- **Oyentes**: 78,000
- **ID**: `pulsar-lima`

### 7. **PULSAR Santiago** 🇨🇱
- **Frecuencia**: 93.9 FM
- **País**: Chile
- **Población**: 6,310,000 habitantes
- **Coordenadas**: 33.4489°S, 70.6693°O
- **Oyentes**: 67,000
- **ID**: `pulsar-santiago`

### 8. **PULSAR Miami** 🇺🇸
- **Frecuencia**: 104.3 FM
- **País**: Estados Unidos
- **Población**: 467,000 habitantes
- **Coordenadas**: 25.7617°N, 80.1918°O
- **Oyentes**: 58,000
- **ID**: `pulsar-miami`

### 9. **PULSAR Santo Domingo** 🇩🇴
- **Frecuencia**: 99.5 FM
- **País**: República Dominicana
- **Población**: 2,908,000 habitantes
- **Coordenadas**: 18.4861°N, 69.9312°O
- **Oyentes**: 49,000
- **ID**: `pulsar-santodomingo`

### 10. **PULSAR Caracas** 🇻🇪
- **Frecuencia**: 91.7 FM
- **País**: Venezuela
- **Población**: 2,935,000 habitantes
- **Coordenadas**: 10.4806°N, 66.9036°O
- **Oyentes**: 44,000
- **ID**: `pulsar-caracas`

## 📊 Estadísticas de la Red

- **Total de ciudades**: 10
- **Total de países**: 8
- **Población total alcanzada**: ~47.7 millones de habitantes
- **Total de oyentes**: 603,000
- **Cobertura geográfica**: Europa, Norteamérica y Latinoamérica

## 🎨 Diseño Visual

### Colores por Tipo de Emisora

1. **PULSAR Original** (Principal)
   - Gradiente: Naranja → Rosa → Púrpura
   - Badge: "★ Oficial"
   - Borde: Naranja con brillo

2. **Estaciones Locales PULSAR**
   - Gradiente: Azul → Púrpura → Rosa
   - Badge: "🌍 Local"
   - Borde: Azul con transparencia

3. **Emisoras Internacionales**
   - Colores según género musical
   - Sin badge especial

### Iconografía

- **Logo PULSAR**: Estrella pulsar animada con ondas concéntricas
- **Emojis de género**: Según el tipo de música
- **Indicadores de reproducción**: Barras animadas cuando está sonando

## 🔧 Implementación Técnica

### Estructura de Datos

```typescript
interface LocalPulsarStation {
  id: string;                    // ID único (ej: 'pulsar-madrid')
  city: string;                  // Nombre de la ciudad
  country: string;               // País
  countryCode: string;           // Código ISO del país
  population: number;            // Población de la ciudad
  frequency: string;             // Frecuencia FM virtual
  lat: number;                   // Latitud
  lng: number;                   // Longitud
  timezone: string;              // Zona horaria
  station: Station;              // Objeto Station completo
}
```

### Funciones Principales

#### `getLocalStation(userCountryCode, userCity)`
Detecta automáticamente la estación local del usuario basándose en su ubicación geográfica.

```typescript
const localStation = getLocalStation('ES', 'Madrid');
// Retorna: PULSAR Madrid
```

#### `getAllLocalStations()`
Retorna todas las estaciones locales de la red.

#### `getStationsByRegion(region)`
Filtra estaciones por región geográfica:
- `'europa'`: España
- `'latam'`: México, Argentina, Colombia, Perú, Chile, Rep. Dominicana, Venezuela
- `'norteamerica'`: Estados Unidos

### Integración con la Lista de Emisoras

Las estaciones locales se insertan automáticamente en la lista principal:

```typescript
const buildStationList = (externalStations: Station[]): Station[] => {
  const localStations = localPulsarStations.map((ls) => ls.station);
  return [pulsarOriginalStation, ...localStations, ...externalStations];
};
```

**Orden de aparición**:
1. PULSAR Original (Principal)
2. PULSAR Madrid
3. PULSAR Barcelona
4. PULSAR CDMX
5. PULSAR Buenos Aires
6. PULSAR Bogotá
7. PULSAR Lima
8. PULSAR Santiago
9. PULSAR Miami
10. PULSAR Santo Domingo
11. PULSAR Caracas
12. Emisoras internacionales...

## 🎯 Comportamiento del Usuario

### Vista Normal (Radio)
- El usuario ve las 11 emisoras PULSAR al inicio de la lista
- Cada emisora local tiene badge "🌍 Local"
- Al hacer clic, se muestra el componente PULSAR Original

### Vista Red Local
- Botón "🌍 Red Local" en el header
- Muestra grid con las 10 ciudades
- Estadísticas de la red (ciudades, países, población, oyentes)
- Badge "📍 Tu ciudad" en la estación local del usuario
- Al hacer clic, se muestra PULSAR Original

### Detección Automática
- El sistema detecta la ciudad del usuario mediante geolocalización
- La estación local correspondiente aparece con badge destacado
- En la vista "Red Local", se resalta visualmente

## 🎵 Contenido Musical

**Todas las estaciones locales reproducen exclusivamente**:
- Música de **Prof. Manuel Gago**
- Streaming desde **Audius** (@profmanuelgago)
- Calidad: 320 kbps
- Sin publicidad
- Sin interrupciones

## 🌐 Cobertura Geográfica

### Europa
- 🇪🇸 Madrid (3.2M habitantes)
- 🇪🇸 Barcelona (1.6M habitantes)

### Norteamérica
- 🇺🇸 Miami (467K habitantes)

### Latinoamérica
- 🇲🇽 Ciudad de México (9.2M habitantes)
- 🇦🇷 Buenos Aires (3.1M habitantes)
- 🇨🇴 Bogotá (7.4M habitantes)
- 🇵🇪 Lima (10.6M habitantes)
- 🇨🇱 Santiago (6.3M habitantes)
- 🇩🇴 Santo Domingo (2.9M habitantes)
- 🇻🇪 Caracas (2.9M habitantes)

## 📈 Métricas de Rendimiento

### Estadísticas por Emisora
- **Oyentes concurrentes**: 44K - 85K
- **Calidad de streaming**: 320 kbps
- **Latencia**: < 2 segundos
- **Disponibilidad**: 99.9%

### Engagement
- **Clicks por emisora**: 44K - 85K
- **Tendencia de crecimiento**: 72 - 120 puntos
- **Votos positivos**: 4,200 - 8,000 por emisora

## 🚀 Futuras Expansiones

### Fase 2: Nuevas Ciudades
- 🇪🇸 Valencia, Sevilla, Zaragoza
- 🇲🇽 Guadalajara, Monterrey
- 🇦🇷 Córdoba, Rosario
- 🇨🇴 Medellín, Cali
- 🇧🇷 São Paulo, Río de Janeiro

### Fase 3: Funcionalidades Avanzadas
- Detección automática de idioma
- Programación local por zona horaria
- Anuncios geolocalizados
- Eventos en vivo por ciudad
- Integración con redes sociales locales

## 📝 Notas Técnicas

### IDs de Estaciones
- Formato: `pulsar-{ciudad}`
- Ejemplos: `pulsar-madrid`, `pulsar-cdmx`, `pulsar-bogota`
- Reservado: `pulsar-original` (emisora principal)

### Frecuencias FM
- Son virtuales, no reales
- Asignadas para dar sensación de radio tradicional
- No interfieren con emisoras reales

### Geolocalización
- Se usa la API del navegador (`navigator.geolocation`)
- Fallback: IP del usuario
- Precisión: Ciudad/Región (no coordenadas exactas)

## 🔗 Enlaces Relacionados

- [Documentación principal](./README.md)
- [Integración con Audius](./AUDIUS_INTEGRATION.md)
- [Guía de marca](./BRAND_GUIDE.md)
- [Funcionalidades](./FUNCIONALIDADES.md)
- [APIs y herramientas](./APIS_Y_HERRAMIENTAS.md)

---

**Última actualización**: 2026  
**Versión**: 1.0.0  
**Red PULSAR Local**: 10 ciudades, 8 países, 47.7M habitantes alcanzados
