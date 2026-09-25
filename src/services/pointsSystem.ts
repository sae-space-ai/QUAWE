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

// Configuración de puntos
export const POINTS_CONFIG = {
  pointsPerMinute: 10, // 10 puntos por minuto de escucha
  bonusFirstTime: 100, // Bonus por escuchar una emisora por primera vez
  bonusDaily: 500, // Bonus diario por escuchar al menos 30 minutos
  bonusStreak: 1000, // Bonus por racha de 7 días consecutivos
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

// Función para ganar puntos por escuchar
export function earnPointsForListening(stationId: string, minutesListened: number): void {
  const userPoints = getUserPoints();
  
  // Actualizar tiempo de escucha
  userPoints.listeningTime += minutesListened;
  
  // Verificar si es la primera vez que escucha esta emisora
  if (!userPoints.stationsListened.includes(stationId)) {
    userPoints.stationsListened.push(stationId);
    addPoints(POINTS_CONFIG.bonusFirstTime, `Bonus: Primera vez escuchando emisora`, stationId);
  }
  
  // Calcular puntos por tiempo de escucha
  const pointsEarned = minutesListened * POINTS_CONFIG.pointsPerMinute;
  addPoints(pointsEarned, `Escuchaste ${minutesListened} minutos`, stationId);
  
  // Verificar bonus diario (30 minutos)
  const today = new Date().toDateString();
  const todayTransactions = userPoints.pointsHistory.filter(t => {
    const transDate = new Date(t.timestamp).toDateString();
    return transDate === today && t.type === 'earn';
  });
  
  const todayPoints = todayTransactions.reduce((sum, t) => sum + t.points, 0);
  
  if (todayPoints >= 300 && !todayTransactions.some(t => t.description.includes('Bonus diario'))) {
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
