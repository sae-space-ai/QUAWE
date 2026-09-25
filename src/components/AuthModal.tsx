import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, User, Phone, MapPin, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { registerUser, verifyUser, loginUser } from '../services/authSystem';
import { initiateOAuth, oauthProviders } from '../services/oauthSystem';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register' | 'verify'>('login');
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
    fullName: '',
    phone: '',
    country: '',
    city: ''
  });
  
  // Verify form
  const [verifyEmail, setVerifyEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

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
      phone: registerData.phone,
      country: registerData.country,
      city: registerData.city
    });

    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setVerifyEmail(registerData.email);
      setTimeout(() => {
        setMode('verify');
        setMessage(null);
      }, 2000);
    } else {
      setMessage({ type: 'error', text: result.message });
    }

    setLoading(false);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const result = verifyUser(verifyEmail, verifyCode);

    if (result.success) {
      setMessage({ type: 'success', text: result.message + '. Ya puedes iniciar sesión.' });
      setTimeout(() => {
        setMode('login');
        setMessage(null);
      }, 2000);
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
            <h2 className="text-2xl font-bold text-white">
              {mode === 'login' && 'Iniciar Sesión'}
              {mode === 'register' && 'Crear Cuenta'}
              {mode === 'verify' && 'Verificar Email'}
            </h2>
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

          {/* OAuth Social Login Buttons */}
          {(mode === 'login' || mode === 'register') && (
            <div className="mb-6">
              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900 px-2 text-gray-400">O continúa con</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {oauthProviders.slice(0, 4).map((provider) => (
                  <motion.button
                    key={provider.id}
                    onClick={() => initiateOAuth(provider.id)}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-medium text-white"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg">{provider.icon}</span>
                    <span>{provider.name}</span>
                  </motion.button>
                ))}
              </div>

              {oauthProviders.length > 4 && (
                <div className="grid grid-cols-1 gap-3 mt-3">
                  {oauthProviders.slice(4).map((provider) => (
                    <motion.button
                      key={provider.id}
                      onClick={() => initiateOAuth(provider.id)}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-medium text-white"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-lg">{provider.icon}</span>
                      <span>Continuar con {provider.name}</span>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          )}

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
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
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
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900 px-2 text-gray-400">O usa tu email</span>
                </div>
              </div>

              <p className="text-sm text-gray-400 text-center">
                ¿No tienes cuenta?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-orange-400 hover:text-orange-300 font-semibold"
                >
                  Regístrate aquí
                </button>
              </p>
            </form>
          )}

          {/* Register Form */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
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
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                    placeholder="tu_usuario"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Nombre completo</label>
                <input
                  type="text"
                  value={registerData.fullName}
                  onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                  placeholder="Juan Pérez García"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Teléfono</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="tel"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                    placeholder="+34 600 000 000"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">País</label>
                  <input
                    type="text"
                    value={registerData.country}
                    onChange={(e) => setRegisterData({ ...registerData, country: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                    placeholder="España"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Ciudad</label>
                  <input
                    type="text"
                    value={registerData.city}
                    onChange={(e) => setRegisterData({ ...registerData, city: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                    placeholder="Madrid"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Contraseña</label>
                <input
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Confirmar contraseña</label>
                <input
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                  placeholder="Repite tu contraseña"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50"
              >
                {loading ? 'Registrando...' : 'Crear Cuenta'}
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900 px-2 text-gray-400">O usa tu email</span>
                </div>
              </div>

              <p className="text-sm text-gray-400 text-center">
                ¿Ya tienes cuenta?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-orange-400 hover:text-orange-300 font-semibold"
                >
                  Inicia sesión
                </button>
              </p>
            </form>
          )}

          {/* Verify Form */}
          {mode === 'verify' && (
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-4">
                <p className="text-sm text-blue-300">
                  Hemos enviado un código de verificación a <strong>{verifyEmail}</strong>. 
                  Revisa tu bandeja de entrada y spam.
                </p>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Código de verificación</label>
                <input
                  type="text"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-center text-2xl font-mono tracking-widest placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50"
              >
                {loading ? 'Verificando...' : 'Verificar Email'}
              </button>

              <p className="text-sm text-gray-400 text-center">
                ¿Ya estás verificado?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-orange-400 hover:text-orange-300 font-semibold"
                >
                  Inicia sesión
                </button>
              </p>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
