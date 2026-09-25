// Sistema de Autenticación y Gestión de Usuarios
// Registro con verificación de identidad y contador de tiempo de audiencia

export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  phone: string;
  country: string;
  city: string;
  registrationDate: number;
  lastLogin: number;
  isVerified: boolean;
  verificationCode?: string;
  points: number;
  totalListeningTime: number; // en segundos
  currentSessionStart: number | null;
  level: number;
  achievements: string[];
  redeemedProducts: RedeemedProduct[];
  isPremium?: boolean;
  premiumStartDate?: number;
  premiumEndDate?: number;
}

export interface RedeemedProduct {
  productId: string;
  productName: string;
  brand: string;
  pointsSpent: number;
  redeemedAt: number;
  deliveryStatus: 'pending' | 'shipped' | 'delivered';
  trackingNumber?: string;
}

export interface RegistrationData {
  email: string;
  username: string;
  password: string;
  fullName: string;
  phone: string;
  country: string;
  city: string;
}

const USERS_STORAGE_KEY = 'quawe_users';
const CURRENT_USER_KEY = 'quawe_current_user';

// Generar código de verificación
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generar ID único
function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Obtener todos los usuarios
export function getAllUsers(): User[] {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Guardar todos los usuarios
function saveAllUsers(users: User[]): void {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

// Registrar nuevo usuario
export function registerUser(data: RegistrationData): { success: boolean; message: string; userId?: string } {
  const users = getAllUsers();
  
  // Verificar si el email ya existe
  if (users.some(u => u.email === data.email)) {
    return { success: false, message: 'Este email ya está registrado' };
  }
  
  // Verificar si el username ya existe
  if (users.some(u => u.username === data.username)) {
    return { success: false, message: 'Este nombre de usuario ya está en uso' };
  }
  
  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { success: false, message: 'Email inválido' };
  }
  
  // Validar teléfono
  const phoneRegex = /^[+]?[\d\s-]{10,}$/;
  if (!phoneRegex.test(data.phone)) {
    return { success: false, message: 'Número de teléfono inválido' };
  }
  
  // Crear nuevo usuario
  const newUser: User = {
    id: generateUserId(),
    email: data.email,
    username: data.username,
    fullName: data.fullName,
    phone: data.phone,
    country: data.country,
    city: data.city,
    registrationDate: Date.now(),
    lastLogin: Date.now(),
    isVerified: false,
    verificationCode: generateVerificationCode(),
    points: 0,
    totalListeningTime: 0,
    currentSessionStart: null,
    level: 1,
    achievements: [],
    redeemedProducts: []
  };
  
  users.push(newUser);
  saveAllUsers(users);
  
  // En producción, aquí se enviaría el código por email
  console.log(`[Auth] Código de verificación para ${data.email}: ${newUser.verificationCode}`);
  
  return { 
    success: true, 
    message: 'Usuario registrado correctamente. Revisa tu email para el código de verificación.',
    userId: newUser.id
  };
}

// Verificar usuario con código
export function verifyUser(email: string, code: string): { success: boolean; message: string } {
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.email === email);
  
  if (userIndex === -1) {
    return { success: false, message: 'Usuario no encontrado' };
  }
  
  const user = users[userIndex];
  
  if (user.isVerified) {
    return { success: false, message: 'Este usuario ya está verificado' };
  }
  
  if (user.verificationCode !== code) {
    return { success: false, message: 'Código de verificación incorrecto' };
  }
  
  // Marcar como verificado
  users[userIndex].isVerified = true;
  delete users[userIndex].verificationCode;
  saveAllUsers(users);
  
  return { success: true, message: 'Usuario verificado correctamente' };
}

// Login de usuario
export function loginUser(email: string, password: string): { success: boolean; message: string; user?: User } {
  const users = getAllUsers();
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return { success: false, message: 'Usuario no encontrado' };
  }
  
  // En producción, aquí se verificaría el password hasheado
  // Por ahora, aceptamos cualquier password para demo
  
  if (!user.isVerified) {
    return { success: false, message: 'Debes verificar tu email antes de iniciar sesión' };
  }
  
  // Actualizar último login
  const userIndex = users.findIndex(u => u.id === user.id);
  users[userIndex].lastLogin = Date.now();
  saveAllUsers(users);
  
  // Guardar sesión actual
  localStorage.setItem(CURRENT_USER_KEY, user.id);
  
  return { success: true, message: 'Inicio de sesión exitoso', user: users[userIndex] };
}

// Logout
export function logoutUser(): void {
  const currentUser = getCurrentUser();
  if (currentUser) {
    stopListeningSession(currentUser.id);
  }
  localStorage.removeItem(CURRENT_USER_KEY);
}

// Obtener usuario actual
export function getCurrentUser(): User | null {
  const userId = localStorage.getItem(CURRENT_USER_KEY);
  if (!userId) return null;
  
  const users = getAllUsers();
  return users.find(u => u.id === userId) || null;
}

// Actualizar usuario
export function updateUser(userId: string, updates: Partial<User>): void {
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) return;
  
  users[userIndex] = { ...users[userIndex], ...updates };
  saveAllUsers(users);
}

// Iniciar sesión de escucha
export function startListeningSession(userId: string): void {
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) return;
  
  users[userIndex].currentSessionStart = Date.now();
  saveAllUsers(users);
}

// Detener sesión de escucha y calcular puntos
export function stopListeningSession(userId: string): { pointsEarned: number; timeListened: number } {
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) return { pointsEarned: 0, timeListened: 0 };
  
  const user = users[userIndex];
  
  if (!user.currentSessionStart) {
    return { pointsEarned: 0, timeListened: 0 };
  }
  
  const sessionDuration = Math.floor((Date.now() - user.currentSessionStart) / 1000); // en segundos
  const minutesListened = Math.floor(sessionDuration / 60);
  
  // Calcular puntos: 10 puntos por minuto
  const pointsEarned = minutesListened * 10;
  
  // Actualizar usuario
  users[userIndex].totalListeningTime += sessionDuration;
  users[userIndex].points += pointsEarned;
  users[userIndex].currentSessionStart = null;
  
  // Actualizar nivel basado en puntos totales
  users[userIndex].level = calculateLevel(users[userIndex].points);
  
  saveAllUsers(users);
  
  return { pointsEarned, timeListened: sessionDuration };
}

// Calcular nivel basado en puntos
function calculateLevel(points: number): number {
  if (points >= 50000) return 5; // Leyenda
  if (points >= 25000) return 4; // Experto
  if (points >= 10000) return 3; // Avanzado
  if (points >= 5000) return 2;  // Intermedio
  return 1; // Principiante
}

// Obtener nombre del nivel
export function getLevelName(level: number): string {
  const names = ['Principiante', 'Intermedio', 'Avanzado', 'Experto', 'Leyenda'];
  return names[level - 1] || 'Principiante';
}

// Formatear tiempo de escucha
export function formatListeningTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

// Obtener estadísticas del usuario
export function getUserStats(userId: string) {
  const users = getAllUsers();
  const user = users.find(u => u.id === userId);
  
  if (!user) return null;
  
  return {
    totalPoints: user.points,
    totalListeningTime: user.totalListeningTime,
    level: user.level,
    levelName: getLevelName(user.level),
    productsRedeemed: user.redeemedProducts.length,
    daysSinceRegistration: Math.floor((Date.now() - user.registrationDate) / (1000 * 60 * 60 * 24)),
    isListening: user.currentSessionStart !== null
  };
}
