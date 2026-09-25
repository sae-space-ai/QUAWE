import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, User, Lock, CheckCircle, AlertCircle, LogIn, UserPlus } from 'lucide-react';
import { registerUser, loginUser } from '../services/authSystem';
import { simulateOAuthLogin, oauthProviders } from '../services/oauthSystem';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form
  const [registerData, setRegisterData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Validaciones básicas
    if (!loginEmail || !loginPassword) {
      setMessage({ type: 'error', text: 'Por favor completa todos los campos' });
      setLoading(false);
      return;
    }

    const result = loginUser(loginEmail, loginPassword);
    
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1000);
    } else {
      setMessage({ type: 'error', text: result.message });
    }
    
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Validaciones
    if (!registerData.email || !registerData.username || !registerData.password || !registerData.fullName) {
      setMessage({ type: 'error', text: 'Por favor completa todos los campos' });
      setLoading(false);
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setMessage({ type: 'error', text: 'Las contraseñas no coinciden' });
      setLoading(false);
      return;
    }

    if (registerData.password.length < 6) {
      setMessage({ type: 'error', text: 'La contraseña debe tener al menos 6 caracteres' });
      setLoading(false);
      return;
    }

    const result = registerUser({
      email: registerData.email,
      username: registerData.username,
      password: registerData.password,
      fullName: registerData.fullName,
      phone: '',
      country: '',
      city: ''
    });

    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } else {
      setMessage({ type: 'error', text: result.message });
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-white/10 p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {mode === 'login' ? (
                <LogIn className="w-6 h-6 text-orange-400" />
              ) : (
                <UserPlus className="w-6 h-6 text-orange-400" />
              )}
              <h2 className="text-2xl font-bold text-white">
                {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Mensaje */}
          {message && (
            <motion.div
              className={`rounded-xl p-4 mb-4 ${
                message.type === 'success' ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start gap-3">
                {message.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <p className={`text-sm ${message.type === 'success' ? 'text-green-300' : 'text-red-300'}`}>
                  {message.text}
                </p>
              </div>
            </motion.div>
          )}

          {/* Botones OAuth */}
          <div className="mb-6">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-900 px-2 text-gray-400">Acceso rápido con</span>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {oauthProviders.map((provider) => (
                <motion.button
                  key={provider.id}
                  onClick={() => {
                    setLoading(true);
                    setMessage(null);
                    
                    // Simular delay de autenticación
                    setTimeout(() => {
                      const result = simulateOAuthLogin(provider.id);
                      
                      if (result.success) {
                        setMessage({ type: 'success', text: result.message });
                        setTimeout(() => {
                          onSuccess();
                          onClose();
                        }, 1500);
                      } else {
                        setMessage({ type: 'error', text: result.message });
                        setLoading(false);
                      }
                    }, 800);
                  }}
                  className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={`Continuar con ${provider.name}`}
                >
                  <span className="text-2xl">{provider.icon}</span>
                  <span className="text-[10px] text-gray-400">{provider.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Separador */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-gray-400">O usa tu email</span>
            </div>
          </div>

          {/* Login Form */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-all"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Iniciar Sesión
                  </>
                )}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900 px-2 text-gray-400">¿Nuevo aquí?</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setMessage(null);
                }}
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all flex items-center justify-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Crear Cuenta Nueva
              </button>
            </form>
          )}

          {/* Register Form */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Nombre completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={registerData.fullName}
                    onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-all"
                    placeholder="Juan Pérez"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-all"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Nombre de usuario</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={registerData.username}
                    onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-all"
                    placeholder="juanperez"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-all"
                    placeholder="Mínimo 6 caracteres"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Confirmar contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-all"
                    placeholder="Repite tu contraseña"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Creando cuenta...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Crear Cuenta
                  </>
                )}
              </button>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
                <p className="text-xs text-blue-300 text-center">
                  🎁 ¡Obtén 500 puntos de bienvenida al registrarte!
                </p>
              </div>

              {/* Botones OAuth para registro */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900 px-2 text-gray-400">O regístrate con</span>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {oauthProviders.map((provider) => (
                  <motion.button
                    key={provider.id}
                    onClick={() => {
                      setLoading(true);
                      setMessage(null);
                      
                      // Simular delay de autenticación
                      setTimeout(() => {
                        const result = simulateOAuthLogin(provider.id);
                        
                        if (result.success) {
                          setMessage({ type: 'success', text: result.message });
                          setTimeout(() => {
                            onSuccess();
                            onClose();
                          }, 1500);
                        } else {
                          setMessage({ type: 'error', text: result.message });
                          setLoading(false);
                        }
                      }, 800);
                    }}
                    className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={`Registrarse con ${provider.name}`}
                  >
                    <span className="text-2xl">{provider.icon}</span>
                    <span className="text-[10px] text-gray-400">{provider.name}</span>
                  </motion.button>
                ))}
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900 px-2 text-gray-400">¿Ya tienes cuenta?</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setMessage(null);
                }}
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                Iniciar Sesión
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
