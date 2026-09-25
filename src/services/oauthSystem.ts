// Sistema de Autenticación OAuth Simulado
// Permite registro con cuentas sociales de forma demostrativa

import { User } from './authSystem';

export interface OAuthProvider {
  id: string;
  name: string;
  icon: string;
  color: string;
}

// Proveedores OAuth disponibles
export const oauthProviders: OAuthProvider[] = [
  {
    id: 'google',
    name: 'Google',
    icon: '🔵',
    color: '#4285F4'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '🔷',
    color: '#1877F2'
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: '🐦',
    color: '#000000'
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: '🐙',
    color: '#24292E'
  },
  {
    id: 'apple',
    name: 'Apple',
    icon: '🍎',
    color: '#000000'
  }
];

// Simular autenticación OAuth
export function simulateOAuthLogin(providerId: string): { success: boolean; user?: User; message: string } {
  const provider = oauthProviders.find(p => p.id === providerId);
  if (!provider) {
    return { success: false, message: 'Proveedor no válido' };
  }

  // Simular datos del usuario del proveedor OAuth
  const mockUsers: Record<string, Partial<User>> = {
    google: {
      email: `usuario.${Date.now()}@gmail.com`,
      fullName: 'Usuario Google',
      oauthAvatar: 'https://ui-avatars.com/api/?name=Google+User&background=4285F4&color=fff'
    },
    facebook: {
      email: `usuario.${Date.now()}@facebook.com`,
      fullName: 'Usuario Facebook',
      oauthAvatar: 'https://ui-avatars.com/api/?name=Facebook+User&background=1877F2&color=fff'
    },
    twitter: {
      email: `usuario.${Date.now()}@twitter.com`,
      fullName: 'Usuario X',
      oauthAvatar: 'https://ui-avatars.com/api/?name=X+User&background=000000&color=fff'
    },
    github: {
      email: `usuario.${Date.now()}@github.com`,
      fullName: 'Usuario GitHub',
      oauthAvatar: 'https://ui-avatars.com/api/?name=GitHub+User&background=24292E&color=fff'
    },
    apple: {
      email: `usuario.${Date.now()}@icloud.com`,
      fullName: 'Usuario Apple',
      oauthAvatar: 'https://ui-avatars.com/api/?name=Apple+User&background=000000&color=fff'
    }
  };

  const mockData = mockUsers[providerId];
  
  // Crear usuario simulado
  const newUser: User = {
    id: `user_oauth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    email: mockData.email || `user@${providerId}.com`,
    username: `${providerId}_user_${Date.now()}`,
    fullName: mockData.fullName || `Usuario ${provider.name}`,
    registrationDate: Date.now(),
    lastLogin: Date.now(),
    isVerified: true, // OAuth users are auto-verified
    points: 500, // Bonus de bienvenida
    totalListeningTime: 0,
    currentSessionStart: null,
    level: 1,
    achievements: ['oauth_signup', 'welcome'],
    redeemedProducts: [],
    oauthProvider: providerId,
    oauthAvatar: mockData.oauthAvatar,
    oauthId: `oauth_${providerId}_${Date.now()}`
  };

  // Guardar usuario
  const users = JSON.parse(localStorage.getItem('quawe_users') || '[]');
  users.push(newUser);
  localStorage.setItem('quawe_users', JSON.stringify(users));
  localStorage.setItem('quawe_current_user', newUser.id);

  return {
    success: true,
    user: newUser,
    message: `¡Bienvenido! Has iniciado sesión con ${provider.name} y recibido 500 puntos de bienvenida.`
  };
}

// Obtener proveedor OAuth del usuario actual
export function getUserOAuthProvider(): OAuthProvider | null {
  const currentUserId = localStorage.getItem('quawe_current_user');
  if (!currentUserId) return null;

  const users = JSON.parse(localStorage.getItem('quawe_users') || '[]');
  const user = users.find((u: User) => u.id === currentUserId);
  
  if (!user || !user.oauthProvider) return null;

  return oauthProviders.find(p => p.id === user.oauthProvider) || null;
}

// Verificar si el usuario está logueado con OAuth
export function isOAuthUser(): boolean {
  const currentUserId = localStorage.getItem('quawe_current_user');
  if (!currentUserId) return false;

  const users = JSON.parse(localStorage.getItem('quawe_users') || '[]');
  const user = users.find((u: User) => u.id === currentUserId);
  
  return !!user?.oauthProvider;
}
