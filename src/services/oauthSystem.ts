// Sistema de Autenticación OAuth 100% SIMULADO
// NO hace llamadas reales a APIs externas - Todo es simulación local

import { User } from './authSystem';

export interface OAuthProvider {
  id: string;
  name: string;
  icon: string;
  color: string;
}

// Proveedores OAuth disponibles (solo para UI)
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

// Simular autenticación OAuth - 100% LOCAL, sin llamadas externas
export function simulateOAuthLogin(providerId: string): { success: boolean; user?: User; message: string } {
  const provider = oauthProviders.find(p => p.id === providerId);
  if (!provider) {
    return { success: false, message: 'Proveedor no válido' };
  }

  // Generar datos simulados del usuario
  const randomId = Math.random().toString(36).substr(2, 9);
  const timestamp = Date.now();
  
  const mockData: Record<string, { email: string; fullName: string; username: string }> = {
    google: {
      email: `usuario.google.${randomId}@gmail.com`,
      fullName: 'Usuario Google',
      username: `google_user_${randomId}`
    },
    facebook: {
      email: `usuario.facebook.${randomId}@facebook.com`,
      fullName: 'Usuario Facebook',
      username: `facebook_user_${randomId}`
    },
    twitter: {
      email: `usuario.x.${randomId}@twitter.com`,
      fullName: 'Usuario X',
      username: `twitter_user_${randomId}`
    },
    github: {
      email: `usuario.github.${randomId}@github.com`,
      fullName: 'Usuario GitHub',
      username: `github_user_${randomId}`
    },
    apple: {
      email: `usuario.apple.${randomId}@icloud.com`,
      fullName: 'Usuario Apple',
      username: `apple_user_${randomId}`
    }
  };

  const data = mockData[providerId];
  
  // Crear usuario simulado
  const newUser: User = {
    id: `user_oauth_${timestamp}_${randomId}`,
    email: data.email,
    username: data.username,
    fullName: data.fullName,
    registrationDate: timestamp,
    lastLogin: timestamp,
    isVerified: true, // OAuth users are auto-verified
    points: 500, // Bonus de bienvenida
    totalListeningTime: 0,
    currentSessionStart: null,
    level: 1,
    achievements: ['oauth_signup', 'welcome'],
    redeemedProducts: [],
    oauthProvider: providerId,
    oauthAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.fullName)}&background=${provider.color.replace('#', '')}&color=fff&size=128`,
    oauthId: `oauth_${providerId}_${timestamp}`
  };

  // Guardar usuario en localStorage
  const users = JSON.parse(localStorage.getItem('quawe_users') || '[]');
  users.push(newUser);
  localStorage.setItem('quawe_users', JSON.stringify(users));
  localStorage.setItem('quawe_current_user', newUser.id);

  console.log(`[OAuth] Usuario creado con ${provider.name}:`, newUser.email);

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
