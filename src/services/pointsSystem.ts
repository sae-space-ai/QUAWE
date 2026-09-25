// Sistema de Puntos de Usuario
// Los usuarios ganan puntos por escuchar emisoras y pueden canjearlos por productos

import { Product, reduceStock } from '../data/products';

export interface UserPoints {
  userId: string;
  totalPoints: number;
  pointsHistory: PointsTransaction[];
  redeemedProducts: RedeemedProduct[];
  listeningTime: number; // en minutos
  stationsListened: string[];
}

export interface PointsTransaction {
  id: string;
  type: 'earn' | 'redeem';
  points: number;
  description: string;
  timestamp: number;
  stationId?: string;
  productId?: string;
}

export interface RedeemedProduct {
  productId: string;
  productName: string;
  brand: string;
  pointsSpent: number;
  redeemedAt: number;
}

// Configuración de puntos - SISTEMA EQUILIBRADO
export const POINTS_CONFIG = {
  // Sistema de puntos progresivo (decrece con el tiempo de escucha diario)
  pointsPerMinute: {
    first30Min: 1.0,      // Primeros 30 min: 1 punto/minuto
    next30Min: 0.5,       // 30-60 min: 0.5 puntos/minuto
    after60Min: 0.25,     // Después de 60 min: 0.25 puntos/minuto
  },
  
  // Bonuses reducidos para evitar inflación
  bonusFirstTime: 50,     // Bonus por primera emisora (reducido de 100)
  bonusDaily: 100,        // Bonus diario por 30+ minutos (reducido de 500)
  bonusStreak: 250,       // Bonus por racha de 7 días (reducido de 1000)
  
  // Membresía Premium
  premiumMonthly: {
    cost: 5,              // €5/mes
    pointsBonus: 2000,    // 2,000 puntos extra al mes
    benefits: [
      'Sin anuncios',
      'Calidad de audio HD',
      'Acceso anticipado a productos',
      'Multiplicador de puntos x1.5',
      'Badge premium en perfil'
    ]
  },
  
  // Límites diarios para evitar abuso
  dailyLimits: {
    maxPointsPerDay: 150,  // Máximo 150 puntos por día (sin contar bonuses)
    maxListeningTime: 480, // Máximo 8 horas de escucha con puntos por día
  }
};

const STORAGE_KEY = 'quawe_user_points';

// Función para obtener los puntos del usuario desde localStorage
export function getUserPoints(): UserPoints {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Crear usuario nuevo
  const newUser: UserPoints = {
    userId: `user_${Date.now()}`,
    totalPoints: 0,
    pointsHistory: [],
    redeemedProducts: [],
    listeningTime: 0,
    stationsListened: []
  };
  
  saveUserPoints(newUser);
  return newUser;
}

// Función para guardar los puntos del usuario en localStorage
export function saveUserPoints(userPoints: UserPoints): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userPoints));
}

// Función para añadir puntos al usuario
export function addPoints(points: number, description: string, stationId?: string): void {
  const userPoints = getUserPoints();
  
  const transaction: PointsTransaction = {
    id: `trans_${Date.now()}`,
    type: 'earn',
    points,
    description,
    timestamp: Date.now(),
    stationId
  };
  
  userPoints.totalPoints += points;
  userPoints.pointsHistory.unshift(transaction);
  
  // Mantener solo las últimas 100 transacciones
  if (userPoints.pointsHistory.length > 100) {
    userPoints.pointsHistory = userPoints.pointsHistory.slice(0, 100);
  }
  
  saveUserPoints(userPoints);
}

// Función para calcular puntos por minuto según el tiempo de escucha diario
function calculatePointsPerMinute(dailyMinutesListened: number): number {
  if (dailyMinutesListened <= 30) {
    return POINTS_CONFIG.pointsPerMinute.first30Min;
  } else if (dailyMinutesListened <= 60) {
    return POINTS_CONFIG.pointsPerMinute.next30Min;
  } else {
    return POINTS_CONFIG.pointsPerMinute.after60Min;
  }
}

// Función para ganar puntos por escuchar - SISTEMA EQUILIBRADO
export function earnPointsForListening(stationId: string, minutesListened: number): void {
  const userPoints = getUserPoints();
  
  // Actualizar tiempo de escucha
  userPoints.listeningTime += minutesListened;
  
  // Verificar si es la primera vez que escucha esta emisora
  if (!userPoints.stationsListened.includes(stationId)) {
    userPoints.stationsListened.push(stationId);
    addPoints(POINTS_CONFIG.bonusFirstTime, `Bonus: Primera vez escuchando emisora`, stationId);
  }
  
  // Calcular minutos escuchados hoy
  const today = new Date().toDateString();
  const todayMinutes = userPoints.pointsHistory
    .filter(t => {
      const transDate = new Date(t.timestamp).toDateString();
      return transDate === today && t.type === 'earn' && t.description.includes('minutos');
    })
    .reduce((sum, t) => sum + parseInt(t.description.match(/\d+/)?.[0] || '0'), 0);
  
  // Verificar límite diario
  if (todayMinutes >= POINTS_CONFIG.dailyLimits.maxListeningTime) {
    console.log('[Points] Límite diario de escucha alcanzado');
    return;
  }
  
  // Calcular puntos con sistema progresivo
  let pointsEarned = 0;
  let remainingMinutes = minutesListened;
  
  // Primeros 30 minutos
  if (todayMinutes < 30) {
    const minutesInFirstTier = Math.min(remainingMinutes, 30 - todayMinutes);
    pointsEarned += minutesInFirstTier * POINTS_CONFIG.pointsPerMinute.first30Min;
    remainingMinutes -= minutesInFirstTier;
  }
  
  // 30-60 minutos
  if (remainingMinutes > 0 && todayMinutes < 60) {
    const minutesInSecondTier = Math.min(remainingMinutes, 60 - Math.max(todayMinutes, 30));
    pointsEarned += minutesInSecondTier * POINTS_CONFIG.pointsPerMinute.next30Min;
    remainingMinutes -= minutesInSecondTier;
  }
  
  // Después de 60 minutos
  if (remainingMinutes > 0) {
    pointsEarned += remainingMinutes * POINTS_CONFIG.pointsPerMinute.after60Min;
  }
  
  // Redondear a entero
  pointsEarned = Math.floor(pointsEarned);
  
  // Verificar límite de puntos diario
  const todayPoints = userPoints.pointsHistory
    .filter(t => {
      const transDate = new Date(t.timestamp).toDateString();
      return transDate === today && t.type === 'earn';
    })
    .reduce((sum, t) => sum + t.points, 0);
  
  if (todayPoints + pointsEarned > POINTS_CONFIG.dailyLimits.maxPointsPerDay) {
    pointsEarned = Math.max(0, POINTS_CONFIG.dailyLimits.maxPointsPerDay - todayPoints);
  }
  
  if (pointsEarned > 0) {
    addPoints(pointsEarned, `Escuchaste ${minutesListened} minutos`, stationId);
  }
  
  // Bonus diario por 30+ minutos
  if (todayMinutes + minutesListened >= 30 && !userPoints.pointsHistory.some(t => {
    const transDate = new Date(t.timestamp).toDateString();
    return transDate === today && t.description.includes('Bonus diario');
  })) {
    addPoints(POINTS_CONFIG.bonusDaily, 'Bonus diario: 30+ minutos escuchados');
  }
  
  saveUserPoints(userPoints);
}

// Función para canjear puntos por un producto
export function redeemProduct(product: Product): { success: boolean; message: string } {
  const userPoints = getUserPoints();
  
  // Verificar si tiene suficientes puntos
  if (userPoints.totalPoints < product.pointsCost) {
    return {
      success: false,
      message: `No tienes suficientes puntos. Necesitas ${product.pointsCost} puntos y tienes ${userPoints.totalPoints}`
    };
  }
  
  // Verificar si hay stock
  if (!reduceStock(product.id)) {
    return {
      success: false,
      message: 'Lo sentimos, este producto no está disponible en este momento'
    };
  }
  
  // Crear transacción de canje
  const transaction: PointsTransaction = {
    id: `trans_${Date.now()}`,
    type: 'redeem',
    points: -product.pointsCost,
    description: `Canje: ${product.name} de ${product.brand}`,
    timestamp: Date.now(),
    productId: product.id
  };
  
  // Añadir producto canjeado
  const redeemedProduct: RedeemedProduct = {
    productId: product.id,
    productName: product.name,
    brand: product.brand,
    pointsSpent: product.pointsCost,
    redeemedAt: Date.now()
  };
  
  // Actualizar puntos del usuario
  userPoints.totalPoints -= product.pointsCost;
  userPoints.pointsHistory.unshift(transaction);
  userPoints.redeemedProducts.unshift(redeemedProduct);
  
  // Mantener solo los últimos 50 productos canjeados
  if (userPoints.redeemedProducts.length > 50) {
    userPoints.redeemedProducts = userPoints.redeemedProducts.slice(0, 50);
  }
  
  saveUserPoints(userPoints);
  
  return {
    success: true,
    message: `¡Felicidades! Has canjeado ${product.name} de ${product.brand}. Te contactaremos para la entrega.`
  };
}

// Función para obtener el historial de puntos
export function getPointsHistory(): PointsTransaction[] {
  const userPoints = getUserPoints();
  return userPoints.pointsHistory;
}

// Función para obtener productos canjeados
export function getRedeemedProducts(): RedeemedProduct[] {
  const userPoints = getUserPoints();
  return userPoints.redeemedProducts;
}

// Función para obtener estadísticas del usuario
export function getUserStats() {
  const userPoints = getUserPoints();
  
  return {
    totalPoints: userPoints.totalPoints,
    totalEarned: userPoints.pointsHistory
      .filter(t => t.type === 'earn')
      .reduce((sum, t) => sum + t.points, 0),
    totalSpent: Math.abs(
      userPoints.pointsHistory
        .filter(t => t.type === 'redeem')
        .reduce((sum, t) => sum + t.points, 0)
    ),
    listeningTime: userPoints.listeningTime,
    stationsListened: userPoints.stationsListened.length,
    productsRedeemed: userPoints.redeemedProducts.length,
    transactionsCount: userPoints.pointsHistory.length
  };
}

// Función para resetear puntos (solo para testing)
export function resetPoints(): void {
  const userPoints = getUserPoints();
  userPoints.totalPoints = 0;
  userPoints.pointsHistory = [];
  userPoints.redeemedProducts = [];
  userPoints.listeningTime = 0;
  userPoints.stationsListened = [];
  saveUserPoints(userPoints);
}

// Función para formatear puntos
export function formatPoints(points: number): string {
  return points.toLocaleString('es-ES');
}

// Función para calcular nivel del usuario basado en puntos
export function getUserLevel(totalPoints: number): { level: number; name: string; nextLevel: number } {
  if (totalPoints >= 50000) return { level: 5, name: 'Leyenda', nextLevel: 100000 };
  if (totalPoints >= 25000) return { level: 4, name: 'Experto', nextLevel: 50000 };
  if (totalPoints >= 10000) return { level: 3, name: 'Avanzado', nextLevel: 25000 };
  if (totalPoints >= 5000) return { level: 2, name: 'Intermedio', nextLevel: 10000 };
  return { level: 1, name: 'Principiante', nextLevel: 5000 };
}
