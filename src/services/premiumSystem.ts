// Sistema de Membresía Premium
// Opción de pago para usuarios que quieren acelerar su progreso

import { User, updateUser, getCurrentUser } from './authSystem';
import { POINTS_CONFIG } from './pointsSystem';

export interface PremiumMembership {
  userId: string;
  startDate: number;
  endDate: number;
  isActive: boolean;
  autoRenew: boolean;
  paymentMethod?: string;
}

const MEMBERSHIP_STORAGE_KEY = 'quawe_premium_memberships';

// Obtener todas las membresías
export function getAllMemberships(): PremiumMembership[] {
  const stored = localStorage.getItem(MEMBERSHIP_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Guardar todas las membresías
function saveAllMemberships(memberships: PremiumMembership[]): void {
  localStorage.setItem(MEMBERSHIP_STORAGE_KEY, JSON.stringify(memberships));
}

// Obtener membresía de un usuario
export function getUserMembership(userId: string): PremiumMembership | null {
  const memberships = getAllMemberships();
  const membership = memberships.find(m => m.userId === userId);
  
  if (!membership) return null;
  
  // Verificar si está activa
  if (membership.endDate < Date.now()) {
    membership.isActive = false;
    saveAllMemberships(memberships);
    return membership;
  }
  
  return membership;
}

// Suscribirse a membresía premium
export function subscribeToPremium(userId: string, paymentMethod: string = 'card'): { success: boolean; message: string } {
  try {
    const memberships = getAllMemberships();
    
    // Verificar si ya tiene una membresía activa
    const existingMembership = memberships.find(m => m.userId === userId && m.isActive);
    if (existingMembership && existingMembership.endDate > Date.now()) {
      return { success: false, message: 'Ya tienes una membresía premium activa' };
    }
    
    // Crear nueva membresía
    const startDate = Date.now();
    const endDate = startDate + (30 * 24 * 60 * 60 * 1000); // 30 días
    
    const newMembership: PremiumMembership = {
      userId,
      startDate,
      endDate,
      isActive: true,
      autoRenew: true,
      paymentMethod
    };
    
    // Remover membresías anteriores del usuario
    const filteredMemberships = memberships.filter(m => m.userId !== userId);
    filteredMemberships.push(newMembership);
    saveAllMemberships(filteredMemberships);
    
    // Añadir puntos bonus al usuario y marcar como premium
    const users = JSON.parse(localStorage.getItem('quawe_users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex].points += POINTS_CONFIG.premiumMonthly.pointsBonus;
      users[userIndex].isPremium = true;
      users[userIndex].premiumStartDate = startDate;
      users[userIndex].premiumEndDate = endDate;
      localStorage.setItem('quawe_users', JSON.stringify(users));
      
      console.log('[Premium] Usuario suscrito exitosamente:', userId);
      console.log('[Premium] Puntos bonus añadidos:', POINTS_CONFIG.premiumMonthly.pointsBonus);
      console.log('[Premium] Membresía válida hasta:', new Date(endDate).toLocaleString());
    } else {
      console.error('[Premium] Usuario no encontrado:', userId);
      return { success: false, message: 'Error: Usuario no encontrado' };
    }
    
    return { 
      success: true, 
      message: `¡Bienvenido a Premium! Has recibido ${POINTS_CONFIG.premiumMonthly.pointsBonus.toLocaleString()} puntos de bienvenida. Tu membresía es válida por 30 días.` 
    };
  } catch (error) {
    console.error('[Premium] Error al suscribirse:', error);
    return { success: false, message: 'Error al procesar la suscripción. Inténtalo de nuevo.' };
  }
}

// Cancelar membresía premium
export function cancelPremium(userId: string): { success: boolean; message: string } {
  try {
    const memberships = getAllMemberships();
    const membershipIndex = memberships.findIndex(m => m.userId === userId);
    
    if (membershipIndex === -1) {
      return { success: false, message: 'No tienes una membresía premium' };
    }
    
    memberships[membershipIndex].isActive = false;
    memberships[membershipIndex].autoRenew = false;
    saveAllMemberships(memberships);
    
    // Actualizar usuario
    const users = JSON.parse(localStorage.getItem('quawe_users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex].isPremium = false;
      users[userIndex].premiumStartDate = undefined;
      users[userIndex].premiumEndDate = undefined;
      localStorage.setItem('quawe_users', JSON.stringify(users));
      
      console.log('[Premium] Membresía cancelada para usuario:', userId);
    } else {
      console.error('[Premium] Usuario no encontrado al cancelar:', userId);
      return { success: false, message: 'Error: Usuario no encontrado' };
    }
    
    return { success: true, message: 'Tu membresía premium ha sido cancelada. Seguirás teniendo acceso hasta el final del período.' };
  } catch (error) {
    console.error('[Premium] Error al cancelar membresía:', error);
    return { success: false, message: 'Error al cancelar la membresía. Inténtalo de nuevo.' };
  }
}

// Verificar si el usuario es premium
export function isUserPremium(userId: string): boolean {
  try {
    // Primero verificar en el objeto de usuario
    const users = JSON.parse(localStorage.getItem('quawe_users') || '[]');
    const user = users.find((u: User) => u.id === userId);
    
    if (user && user.isPremium === true) {
      // Verificar si la membresía aún está activa
      const membership = getUserMembership(userId);
      if (membership && membership.isActive && membership.endDate > Date.now()) {
        return true;
      }
      // Si la membresía expiró, actualizar el usuario
      if (user.isPremium) {
        user.isPremium = false;
        localStorage.setItem('quawe_users', JSON.stringify(users));
      }
    }
    
    return false;
  } catch (error) {
    console.error('[Premium] Error al verificar estado premium:', error);
    return false;
  }
}

// Obtener beneficios premium
export function getPremiumBenefits(): string[] {
  return POINTS_CONFIG.premiumMonthly.benefits;
}

// Renovar membresía automáticamente
export function autoRenewMembership(userId: string): boolean {
  const membership = getUserMembership(userId);
  
  if (!membership || !membership.autoRenew) return false;
  
  // Verificar si necesita renovación
  if (membership.endDate > Date.now()) return false;
  
  // Renovar por 30 días más
  const memberships = getAllMemberships();
  const membershipIndex = memberships.findIndex(m => m.userId === userId);
  
  if (membershipIndex !== -1) {
    memberships[membershipIndex].startDate = Date.now();
    memberships[membershipIndex].endDate = Date.now() + (30 * 24 * 60 * 60 * 1000);
    memberships[membershipIndex].isActive = true;
    saveAllMemberships(memberships);
    
    // Añadir puntos bonus
    const users = JSON.parse(localStorage.getItem('quawe_users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex].points += POINTS_CONFIG.premiumMonthly.pointsBonus;
      localStorage.setItem('quawe_users', JSON.stringify(users));
    }
    
    return true;
  }
  
  return false;
}

// Calcular días restantes de membresía
export function getMembershipDaysRemaining(userId: string): number {
  try {
    const membership = getUserMembership(userId);
    
    if (!membership || !membership.isActive) return 0;
    
    const remaining = membership.endDate - Date.now();
    const days = Math.max(0, Math.ceil(remaining / (24 * 60 * 60 * 1000)));
    
    console.log('[Premium] Días restantes para usuario', userId, ':', days);
    
    return days;
  } catch (error) {
    console.error('[Premium] Error al calcular días restantes:', error);
    return 0;
  }
}
