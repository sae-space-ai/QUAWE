# Sistema de Puntos Equilibrado y Trazabilidad de Productos

## 🎯 Sistema de Puntos Rediseñado

### Problema Anterior
El sistema anterior permitía a los usuarios ganar puntos demasiado rápido:
- 10 puntos por minuto
- 2 horas/día = 1,200 puntos/día
- 1 mes = 36,000 puntos
- Podían canjear productos caros en pocas semanas

### Solución Implementada
Sistema de puntos **progresivo y equilibrado** que refleja el valor real de los productos.

---

## 📊 Nuevo Sistema de Puntos

### Estructura Progresiva
Los puntos disminuyen según el tiempo de escucha diario para evitar abuso:

| Tiempo de Escucha Diario | Puntos por Minuto | Ejemplo (2 horas) |
|-------------------------|-------------------|-------------------|
| **Primeros 30 minutos** | 1.0 punto/min | 30 puntos |
| **30-60 minutos** | 0.5 puntos/min | 15 puntos |
| **Después de 60 minutos** | 0.25 puntos/min | 15 puntos |
| **Total diario (2h)** | - | **60 puntos/día** |

### Cálculo Detallado
Para un usuario que escucha **2 horas diarias**:

```
Primeros 30 min:  30 × 1.0  = 30 puntos
30-60 min:        30 × 0.5  = 15 puntos
60-120 min:       60 × 0.25 = 15 puntos
────────────────────────────────────────
Total diario:                  60 puntos

En 1 mes (30 días):            1,800 puntos
En 3 meses:                    5,400 puntos
En 6 meses:                    10,800 puntos
En 1 año:                      21,600 puntos
```

### Bonuses Reducidos
Para evitar inflación de puntos:

| Bonus | Valor Anterior | Nuevo Valor |
|-------|---------------|-------------|
| Primera emisora | 100 pts | **50 pts** |
| Diario (30+ min) | 500 pts | **100 pts** |
| Racha 7 días | 1,000 pts | **250 pts** |

### Límites Diarios
Para prevenir abuso del sistema:

- **Máximo puntos por día**: 150 puntos (sin contar bonuses)
- **Máximo tiempo con puntos**: 8 horas/día
- Después de 8 horas, la escucha no genera puntos

---

## 🛍️ Trazabilidad de Productos

### Fórmula de Cálculo
```
Puntos del Producto = Precio Real (€) × Factor de Conversión

Donde:
- Factor de conversión = 37.5 puntos/€
- Basado en: 1,800 puntos/mes ≈ €48 de valor
```

### Ejemplo: Zapatillas Adidas Ultraboost 22
```
Precio real: €180
Puntos necesarios: 180 × 37.5 = 6,750 puntos
Tiempo estimado: 6,750 ÷ 60 puntos/día = 112.5 días ≈ 3.75 meses
```

**Ajuste final**: 4,500 puntos (2.5 meses) para hacerlo más accesible

### Tabla de Productos Ajustados

#### 👟 Zapatos
| Producto | Precio Real | Puntos | Tiempo Estimado (2h/día) |
|----------|-------------|--------|--------------------------|
| Nike Air Max 270 | €150 | 5,600 | 3 meses |
| Adidas Ultraboost 22 | €180 | 4,500 | 2.5 meses |
| Puma RS-X³ | €110 | 2,800 | 1.5 meses |

#### 💎 Joyas
| Producto | Precio Real | Puntos | Tiempo Estimado (2h/día) |
|----------|-------------|--------|--------------------------|
| Tous Collar Osito | €250 | 9,400 | 5 meses |
| Swarovski Pulsera | €195 | 7,300 | 4 meses |
| Pandora Brazalete | €220 | 8,200 | 4.5 meses |

#### ✨ Bisutería
| Producto | Precio Real | Puntos | Tiempo Estimado (2h/día) |
|----------|-------------|--------|--------------------------|
| Bimba y Lola Pendientes | €75 | 1,800 | 1 mes |
| Parfois Collar Boho | €55 | 1,400 | 3 semanas |
| Lovely Set Pulseras | €45 | 1,100 | 2 semanas |

#### 👕 Ropa
| Producto | Precio Real | Puntos | Tiempo Estimado (2h/día) |
|----------|-------------|--------|--------------------------|
| Zara Chaqueta Denim | €49.95 | 1,900 | 1 mes |
| H&M Vestido Floral | €29.99 | 1,100 | 2 semanas |
| Mango Blazer Oversize | €59.99 | 2,200 | 1.2 meses |

#### 🕶️ Accesorios
| Producto | Precio Real | Puntos | Tiempo Estimado (2h/día) |
|----------|-------------|--------|--------------------------|
| Ray-Ban Aviator | €154 | 5,800 | 3.2 meses |
| Fossil Reloj Minimal | €129 | 4,800 | 2.7 meses |
| Herschel Mochila | €89.99 | 3,400 | 1.9 meses |

#### 🎧 Tecnología
| Producto | Precio Real | Puntos | Tiempo Estimado (2h/día) |
|----------|-------------|--------|--------------------------|
| Apple AirPods Pro | €279 | 10,500 | 5.8 meses |
| Sony Walkman NW-A55 | €329 | 12,300 | 6.8 meses |
| JBL Altavoz Flip 6 | €129 | 4,800 | 2.7 meses |

#### 💡 Hogar
| Producto | Precio Real | Puntos | Tiempo Estimado (2h/día) |
|----------|-------------|--------|--------------------------|
| IKEA Lámpara Dekad | €39.99 | 1,500 | 3 semanas |
| Zara Home Cojines | €49.99 | 1,900 | 1 mes |

---

## 💎 Sistema de Membresía Premium

### Precio y Beneficios
**€5/mes** con los siguientes beneficios:

1. ✅ **Sin anuncios** - Experiencia sin interrupciones
2. ✅ **Calidad de audio HD** - Streaming en alta calidad
3. ✅ **Acceso anticipado** - Productos nuevos antes que nadie
4. ✅ **Multiplicador x1.5** - 50% más puntos por minuto
5. ✅ **Badge premium** - Identificación especial en perfil

### Puntos Bonus
- **2,000 puntos** de bienvenida al suscribirse
- **2,000 puntos** adicionales cada mes de renovación

### Cálculo con Premium
Con el multiplicador x1.5:

```
Primeros 30 min:  30 × 1.5  = 45 puntos
30-60 min:        30 × 0.75 = 22.5 puntos
60-120 min:       60 × 0.375 = 22.5 puntos
────────────────────────────────────────
Total diario:                  90 puntos/día

En 1 mes (30 días):            2,700 puntos
+ Bonus mensual:               2,000 puntos
────────────────────────────────────────
Total mensual Premium:         4,700 puntos
```

**Comparación**:
- Usuario gratuito: 1,800 puntos/mes
- Usuario premium: 4,700 puntos/mes (2.6x más rápido)

### Tiempo de Canje con Premium
| Producto | Tiempo Gratis | Tiempo Premium | Ahorro |
|----------|---------------|----------------|--------|
| Puma RS-X³ (2,800 pts) | 1.5 meses | **3 semanas** | 50% |
| Adidas Ultraboost (4,500 pts) | 2.5 meses | **1 mes** | 60% |
| Nike Air Max (5,600 pts) | 3 meses | **1.2 meses** | 60% |
| Apple AirPods (10,500 pts) | 5.8 meses | **2.2 meses** | 62% |

---

## 📈 Algoritmo de Trazabilidad

### Fórmula General
```typescript
function calcularTiempoEstimado(puntosProducto: number, esPremium: boolean): string {
  const puntosDiarios = esPremium ? 90 : 60;
  const diasNecesarios = Math.ceil(puntosProducto / puntosDiarios);
  
  if (diasNecesarios < 7) {
    return `${diasNecesarios} días`;
  } else if (diasNecesarios < 30) {
    const semanas = Math.ceil(diasNecesarios / 7);
    return `${semanas} semana${semanas > 1 ? 's' : ''}`;
  } else {
    const meses = (diasNecesarios / 30).toFixed(1);
    return `${meses} meses`;
  }
}
```

### Ejemplos de Cálculo

#### Ejemplo 1: Usuario Gratuito
```
Producto: Bimba y Lola Pendientes (1,800 puntos)
Escucha: 2 horas/día
Puntos diarios: 60
Días necesarios: 1,800 ÷ 60 = 30 días
Resultado: "1 mes (2h/día)"
```

#### Ejemplo 2: Usuario Premium
```
Producto: Bimba y Lola Pendientes (1,800 puntos)
Escucha: 2 horas/día
Puntos diarios: 90 (con multiplicador x1.5)
Días necesarios: 1,800 ÷ 90 = 20 días
Resultado: "3 semanas (2h/día, Premium)"
```

#### Ejemplo 3: Usuario con Escucha Intensiva
```
Producto: Apple AirPods Pro (10,500 puntos)
Escucha: 4 horas/día
Puntos diarios (gratuito):
  - Primeros 30 min: 30 × 1.0 = 30
  - 30-60 min: 30 × 0.5 = 15
  - 60-120 min: 60 × 0.25 = 15
  - 120-240 min: 120 × 0.25 = 30
  Total: 90 puntos/día
Días necesarios: 10,500 ÷ 90 = 117 días
Resultado: "3.9 meses (4h/día)"
```

---

## 🎯 Estrategia de Precios

### Principios
1. **Accesibilidad**: Productos de bajo costo disponibles en 2-4 semanas
2. **Progresión**: Productos de gama media en 1-3 meses
3. **Exclusividad**: Productos premium en 4-7 meses
4. **Incentivo**: Premium reduce el tiempo a la mitad

### Categorías por Tiempo de Canje

#### 🟢 Rápido (1-4 semanas)
- Bisutería básica (€45-€75)
- Accesorios pequeños
- **Puntos**: 1,100 - 1,800
- **Objetivo**: Primer canje rápido para motivar

#### 🟡 Medio (1-3 meses)
- Zapatillas básicas (€110-€150)
- Ropa (€50-€130)
- Accesorios de marca (€90-€155)
- **Puntos**: 2,800 - 5,800
- **Objetivo**: Recompensa por escucha constante

#### 🔴 Largo (3-7 meses)
- Zapatillas premium (€150-€180)
- Joyas (€195-€250)
- Tecnología (€130-€330)
- **Puntos**: 4,500 - 12,300
- **Objetivo**: Meta a largo plazo, incentiva Premium

---

## 📊 Análisis de Rentabilidad

### Para el Usuario Gratuito
```
Escucha diaria: 2 horas
Puntos mensuales: 1,800
Valor mensual: €48 (aproximado)

Productos canjeables al año:
- 12 × Bimba y Lola Pendientes (€900 valor)
- 4 × Adidas Ultraboost (€720 valor)
- 2 × Apple AirPods Pro (€558 valor)
```

### Para el Usuario Premium
```
Costo mensual: €5
Escucha diaria: 2 horas
Puntos mensuales: 4,700
Valor mensual: €125 (aproximado)

ROI: (€125 - €5) / €5 = 2,400% de retorno

Productos canjeables al año:
- 31 × Bimba y Lola Pendientes (€2,325 valor)
- 12 × Adidas Ultraboost (€2,160 valor)
- 5 × Apple AirPods Pro (€1,395 valor)
```

### Para Radio Quawe
```
Ingresos por membresía:
- 1,000 usuarios premium × €5/mes = €5,000/mes
- 1,000 usuarios × €5 × 12 = €60,000/año

Costo de productos:
- Valor real de productos canjeados
- Patrocinado por marcas (costo 0 para Radio Quawe)

Beneficio neto: €60,000/año (solo membresías)
```

---

## 🔄 Sistema de Renovación Automática

### Flujo de Membresía
```
1. Usuario se suscribe (€5)
   ├─ Recibe 2,000 puntos de bienvenida
   ├─ Activa multiplicador x1.5
   └─ Membresía válida por 30 días

2. Durante los 30 días
   ├─ Gana 90 puntos/día (2h de escucha)
   ├─ Total mensual: 2,700 puntos
   └─ Total con bonus: 4,700 puntos

3. Al finalizar los 30 días
   ├─ Si autoRenew = true:
   │  ├─ Cobra €5 automáticamente
   │  ├─ Renueva por 30 días más
   │  └─ Añade 2,000 puntos bonus
   └─ Si autoRenew = false:
      ├─ Membresía expira
      ├─ Vuelve a plan gratuito
      └─ Mantiene puntos acumulados
```

### Notificaciones
- **7 días antes**: "Tu membresía renovará en 7 días"
- **1 día antes**: "Tu membresía renovará mañana (€5)"
- **Al renovar**: "¡Membresía renovada! +2,000 puntos bonus"
- **Al expirar**: "Tu membresía ha expirado. ¿Renovar?"

---

## 🎨 Implementación en la Interfaz

### Catálogo de Productos
Cada producto ahora muestra:
```
┌─────────────────────────────────┐
│ [Imagen del Producto]           │
│                                 │
│ Nike Air Max 270                │
│ Nike                            │
│                                 │
│ Zapatillas deportivas con       │
│ tecnología Air Max visible...   │
│                                 │
│ Stock: 50 disponibles           │
│ Precio real: €150               │
│ Tiempo estimado: 3 meses (2h/día)│
│                                 │
│ Costo: 5,600 pts                │
│                                 │
│ [Canjear Producto]              │
└─────────────────────────────────┘
```

### Perfil de Usuario
```
┌─────────────────────────────────┐
│ 👤 Juan Pérez                   │
│ Nivel 3: Avanzado               │
│ 15,000 puntos                   │
│ ████████████░░░░ 60%            │
├─────────────────────────────────┤
│ ⏱️ Tiempo de Audiencia          │
│ Total: 125h 30m                 │
│ Sesión actual: 0h 45m           │
│                                 │
│ 🟢 Escuchando ahora             │
│ Ganando 1.0 pts/min             │
│ (Próximos 30 min)               │
├─────────────────────────────────┤
│ 👑 Membresía Premium            │
│ Estado: Activo                  │
│ Días restantes: 18              │
│ ████████████░░░░ 60%            │
│                                 │
│ [Gestionar Membresía]           │
└─────────────────────────────────┘
```

---

## 📝 Resumen del Sistema Equilibrado

### Antes vs Después

| Aspecto | Sistema Anterior | Nuevo Sistema |
|---------|------------------|---------------|
| Puntos/minuto | 10 (fijo) | 1.0 → 0.5 → 0.25 (progresivo) |
| Puntos/día (2h) | 1,200 | 60 |
| Puntos/mes | 36,000 | 1,800 |
| Tiempo para AirPods | 1 semana | 5.8 meses |
| Tiempo para Adidas | 1.5 semanas | 2.5 meses |
| Membresía premium | No existía | €5/mes (2.6x más rápido) |
| Límite diario | No | 150 puntos/día |

### Beneficios del Nuevo Sistema

✅ **Sostenibilidad**: Los productos mantienen su valor
✅ **Equidad**: Todos los usuarios tienen las mismas oportunidades
✅ **Incentivo**: Premium ofrece ventaja significativa
✅ **Progresión**: Productos accesibles en diferentes plazos
✅ **Realismo**: Tiempos de canje coherentes con el valor real
✅ **Prevención de abuso**: Límites diarios y sistema progresivo

---

## 🚀 Build y Despliegue

```bash
# Build actualizado
npm run build

✓ 1,742 módulos transformados
✓ Build time: 3.51 segundos
✓ Bundle size: 134.48 KB gzipped
✓ Sin errores de TypeScript
✓ Producción ready
```

---

**Última actualización**: 2026  
**Versión**: 9.0.0 (Sistema de Puntos Equilibrado)  
**Estado**: ✅ Producción y optimizado para sostenibilidad
