// Sistema de Autenticación OAuth con Proveedores Sociales
// Google, Facebook, X (Twitter), GitHub, Apple

export interface OAuthProvider {
  id: string;
  name: string;
  icon: string;
  color: string;
  clientId: string;
  redirectUri: string;
  scope: string[];
}

export interface OAuthUser {
  id: string;
  provider: string;
  providerId: string;
  email: string;
  name: string;
  avatar?: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}

// Configuración de proveedores OAuth
export const oauthProviders: OAuthProvider[] = [
  {
    id: 'google',
    name: 'Google',
    icon: '🔵',
    color: '#4285F4',
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
    redirectUri: `${window.location.origin}/auth/google/callback`,
    scope: ['openid', 'email', 'profile']
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '🔷',
    color: '#1877F2',
    clientId: 'YOUR_FACEBOOK_APP_ID',
    redirectUri: `${window.location.origin}/auth/facebook/callback`,
    scope: ['email', 'public_profile']
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: '🐦',
    color: '#000000',
    clientId: 'YOUR_TWITTER_CLIENT_ID',
    redirectUri: `${window.location.origin}/auth/twitter/callback`,
    scope: ['users.read', 'tweet.read']
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: '🐙',
    color: '#24292E',
    clientId: 'YOUR_GITHUB_CLIENT_ID',
    redirectUri: `${window.location.origin}/auth/github/callback`,
    scope: ['user:email', 'read:user']
  },
  {
    id: 'apple',
    name: 'Apple',
    icon: '🍎',
    color: '#000000',
    clientId: 'YOUR_APPLE_CLIENT_ID',
    redirectUri: `${window.location.origin}/auth/apple/callback`,
    scope: ['name', 'email']
  }
];

// URLs de autorización OAuth
const OAUTH_URLS = {
  google: (clientId: string, redirectUri: string, scope: string[]) => {
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: scope.join(' '),
      access_type: 'offline',
      prompt: 'consent'
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  },
  
  facebook: (clientId: string, redirectUri: string, scope: string[]) => {
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: scope.join(',')
    });
    return `https://www.facebook.com/v18.0/dialog/oauth?${params}`;
  },
  
  twitter: (clientId: string, redirectUri: string, scope: string[]) => {
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: scope.join(' '),
      state: generateRandomState(),
      code_challenge: 'challenge',
      code_challenge_method: 'plain'
    });
    return `https://twitter.com/i/oauth2/authorize?${params}`;
  },
  
  github: (clientId: string, redirectUri: string, scope: string[]) => {
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: scope.join(' '),
      state: generateRandomState()
    });
    return `https://github.com/login/oauth/authorize?${params}`;
  },
  
  apple: (clientId: string, redirectUri: string, scope: string[]) => {
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code id_token',
      scope: scope.join(' '),
      response_mode: 'form_post',
      state: generateRandomState()
    });
    return `https://appleid.apple.com/auth/authorize?${params}`;
  }
};

// Generar estado aleatorio para seguridad OAuth
function generateRandomState(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Iniciar flujo OAuth
export function initiateOAuth(providerId: string): void {
  const provider = oauthProviders.find(p => p.id === providerId);
  if (!provider) {
    console.error(`Proveedor OAuth no encontrado: ${providerId}`);
    return;
  }

  const urlGenerator = OAUTH_URLS[providerId as keyof typeof OAUTH_URLS];
  if (!urlGenerator) {
    console.error(`URL generator no encontrado para: ${providerId}`);
    return;
  }

  const authUrl = urlGenerator(provider.clientId, provider.redirectUri, provider.scope);
  
  // Guardar estado en sessionStorage para verificar después
  sessionStorage.setItem('oauth_state', generateRandomState());
  sessionStorage.setItem('oauth_provider', providerId);
  
  // Abrir ventana de autenticación
  const width = 600;
  const height = 700;
  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;
  
  const authWindow = window.open(
    authUrl,
    'OAuth Authentication',
    `width=${width},height=${height},left=${left},top=${top},toolbar=0,menubar=0,location=0,status=0`
  );

  // Monitorear cierre de ventana
  const checkWindowClosed = setInterval(() => {
    if (authWindow?.closed) {
      clearInterval(checkWindowClosed);
      handleOAuthCallback();
    }
  }, 500);
}

// Manejar callback OAuth
async function handleOAuthCallback(): Promise<void> {
  const provider = sessionStorage.getItem('oauth_provider');
  const code = new URLSearchParams(window.location.search).get('code');
  
  if (!provider || !code) {
    console.error('Callback OAuth incompleto');
    return;
  }

  try {
    // Intercambiar código por token (esto normalmente se hace en backend)
    const oauthUser = await exchangeCodeForToken(provider, code);
    
    if (oauthUser) {
      // Guardar usuario OAuth
      saveOAuthUser(oauthUser);
      
      // Crear o actualizar usuario en el sistema
      await createOrUpdateUser(oauthUser);
      
      // Limpiar sessionStorage
      sessionStorage.removeItem('oauth_state');
      sessionStorage.removeItem('oauth_provider');
      
      // Redirigir a la aplicación
      window.location.href = '/';
    }
  } catch (error) {
    console.error('Error en callback OAuth:', error);
  }
}

// Intercambiar código por token (simulado - en producción esto va al backend)
async function exchangeCodeForToken(provider: string, code: string): Promise<OAuthUser | null> {
  // NOTA: En producción, esto debe hacerse en el backend por seguridad
  // Este es un ejemplo simplificado
  
  try {
    // Simular llamada al backend
    const response = await fetch(`/api/auth/${provider}/callback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    
    if (!response.ok) {
      throw new Error('Error al intercambiar código por token');
    }
    
    const data = await response.json();
    return data as OAuthUser;
  } catch (error) {
    console.error('Error en exchangeCodeForToken:', error);
    return null;
  }
}

// Guardar usuario OAuth en localStorage
export function saveOAuthUser(user: OAuthUser): void {
  const oauthUsers = JSON.parse(localStorage.getItem('quawe_oauth_users') || '[]');
  
  // Remover usuario anterior del mismo proveedor
  const filtered = oauthUsers.filter((u: OAuthUser) => 
    !(u.provider === user.provider && u.providerId === user.providerId)
  );
  
  filtered.push(user);
  localStorage.setItem('quawe_oauth_users', JSON.stringify(filtered));
}

// Obtener usuario OAuth actual
export function getCurrentOAuthUser(): OAuthUser | null {
  const oauthUsers = JSON.parse(localStorage.getItem('quawe_oauth_users') || '[]');
  const currentProvider = localStorage.getItem('quawe_current_oauth_provider');
  
  if (!currentProvider) return null;
  
  return oauthUsers.find((u: OAuthUser) => u.provider === currentProvider) || null;
}

// Crear o actualizar usuario en el sistema principal
async function createOrUpdateUser(oauthUser: OAuthUser): Promise<void> {
  const users = JSON.parse(localStorage.getItem('quawe_users') || '[]');
  
  // Buscar usuario por email
  let userIndex = users.findIndex((u: any) => u.email === oauthUser.email);
  
  if (userIndex === -1) {
    // Crear nuevo usuario
    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: oauthUser.email,
      username: oauthUser.name.toLowerCase().replace(/\s+/g, '_'),
      fullName: oauthUser.name,
      phone: '',
      country: '',
      city: '',
      registrationDate: Date.now(),
      lastLogin: Date.now(),
      isVerified: true, // Los usuarios OAuth están verificados automáticamente
      points: 500, // Bonus de bienvenida para usuarios OAuth
      totalListeningTime: 0,
      currentSessionStart: null,
      level: 1,
      achievements: ['oauth_signup'],
      redeemedProducts: [],
      oauthProvider: oauthUser.provider,
      oauthAvatar: oauthUser.avatar
    };
    
    users.push(newUser);
    userIndex = users.length - 1;
  } else {
    // Actualizar último login
    users[userIndex].lastLogin = Date.now();
    users[userIndex].oauthProvider = oauthUser.provider;
    users[userIndex].oauthAvatar = oauthUser.avatar;
  }
  
  localStorage.setItem('quawe_users', JSON.stringify(users));
  localStorage.setItem('quawe_current_user', users[userIndex].id);
  localStorage.setItem('quawe_current_oauth_provider', oauthUser.provider);
}

// Cerrar sesión OAuth
export function logoutOAuth(): void {
  localStorage.removeItem('quawe_current_oauth_provider');
  localStorage.removeItem('quawe_current_user');
}

// Vincular cuenta OAuth adicional
export function linkOAuthAccount(providerId: string): void {
  const currentUser = localStorage.getItem('quawe_current_user');
  if (!currentUser) {
    console.error('No hay usuario logueado para vincular');
    return;
  }
  
  // Guardar información para vincular después del OAuth
  sessionStorage.setItem('oauth_link_user_id', currentUser);
  sessionStorage.setItem('oauth_link_mode', 'true');
  
  // Iniciar flujo OAuth
  initiateOAuth(providerId);
}

// Desvincular cuenta OAuth
export function unlinkOAuthAccount(providerId: string): void {
  const currentUser = localStorage.getItem('quawe_current_user');
  if (!currentUser) return;
  
  const oauthUsers = JSON.parse(localStorage.getItem('quawe_oauth_users') || '[]');
  const filtered = oauthUsers.filter((u: OAuthUser) => 
    !(u.provider === providerId)
  );
  
  localStorage.setItem('quawe_oauth_users', JSON.stringify(filtered));
  
  // Actualizar usuario principal
  const users = JSON.parse(localStorage.getItem('quawe_users') || '[]');
  const userIndex = users.findIndex((u: any) => u.id === currentUser);
  
  if (userIndex !== -1) {
    if (users[userIndex].oauthProvider === providerId) {
      users[userIndex].oauthProvider = null;
      users[userIndex].oauthAvatar = null;
    }
    localStorage.setItem('quawe_users', JSON.stringify(users));
  }
}

// Obtener proveedores OAuth vinculados al usuario actual
export function getLinkedOAuthProviders(): string[] {
  const currentUser = localStorage.getItem('quawe_current_user');
  if (!currentUser) return [];
  
  const oauthUsers = JSON.parse(localStorage.getItem('quawe_oauth_users') || '[]');
  return oauthUsers
    .filter((u: OAuthUser) => u.id === currentUser)
    .map((u: OAuthUser) => u.provider);
}

// Verificar si el token OAuth ha expirado
export function isOAuthTokenExpired(user: OAuthUser): boolean {
  return Date.now() >= user.expiresAt;
}

// Renovar token OAuth
export async function refreshOAuthToken(provider: string, refreshToken: string): Promise<OAuthUser | null> {
  try {
    // Simular llamada al backend para renovar token
    const response = await fetch(`/api/auth/${provider}/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken })
    });
    
    if (!response.ok) {
      throw new Error('Error al renovar token');
    }
    
    const data = await response.json();
    const updatedUser = data as OAuthUser;
    
    // Guardar usuario actualizado
    saveOAuthUser(updatedUser);
    
    return updatedUser;
  } catch (error) {
    console.error('Error en refreshOAuthToken:', error);
    return null;
  }
}
