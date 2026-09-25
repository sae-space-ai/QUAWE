import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Clock, Award, ShoppingBag, LogOut, CheckCircle, TrendingUp } from 'lucide-react';
import { getCurrentUser, logoutUser, getUserStats, startListeningSession, stopListeningSession, formatListeningTime, getLevelName } from '../services/authSystem';
import { User as UserType } from '../services/authSystem';

interface UserProfileProps {
  onLogout: () => void;
}

export default function UserProfile({ onLogout }: UserProfileProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [currentSessionTime, setCurrentSessionTime] = useState(0);

  useEffect(() => {
    loadUserData();
    
    // Actualizar datos cada 5 segundos
    const interval = setInterval(loadUserData, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!user || !user.currentSessionStart) return;

    // Actualizar tiempo de sesión actual cada segundo
    const sessionInterval = setInterval(() => {
      if (user.currentSessionStart) {
        const elapsed = Math.floor((Date.now() - user.currentSessionStart) / 1000);
        setCurrentSessionTime(elapsed);
      }
    }, 1000);

    return () => clearInterval(sessionInterval);
  }, [user]);

  const loadUserData = () => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    if (currentUser) {
      setStats(getUserStats(currentUser.id));
    }
  };

  const handleLogout = () => {
    if (user) {
      stopListeningSession(user.id);
    }
    logoutUser();
    onLogout();
  };

  if (!user || !stats) {
    return <div className="text-white">Cargando perfil...</div>;
  }

  const progressToNextLevel = user.level < 5 
    ? ((user.points - (user.level - 1) * 5000) / 5000) * 100
    : 100;

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header del perfil */}
      <div className="rounded-2xl bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{user.fullName}</h2>
              <p className="text-sm text-gray-400">@{user.username}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all"
            title="Cerrar sesión"
          >
            <LogOut className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Información de verificación */}
        <div className="flex items-center gap-2 mb-4">
          {user.isVerified ? (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">Cuenta verificada</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30">
              <span className="text-xs text-yellow-400">Cuenta no verificada</span>
            </div>
          )}
        </div>

        {/* Ubicación */}
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>{user.city}, {user.country}</span>
          <span>•</span>
          <span>Miembro desde {new Date(user.registrationDate).toLocaleDateString('es-ES')}</span>
        </div>
      </div>

      {/* Nivel y progreso */}
      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Nivel {user.level}: {getLevelName(user.level)}</h3>
              <p className="text-xs text-gray-400">
                {user.level < 5 
                  ? `Siguiente nivel: ${getLevelName(user.level + 1)} (${(user.level * 5000).toLocaleString()} puntos)`
                  : '¡Nivel máximo alcanzado!'
                }
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              {user.points.toLocaleString()}
            </div>
            <p className="text-xs text-gray-400">puntos totales</p>
          </div>
        </div>

        {user.level < 5 && (
          <div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progressToNextLevel, 100)}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 text-right">
              {progressToNextLevel.toFixed(1)}% completado
            </p>
          </div>
        )}
      </div>

      {/* Contador de tiempo de audiencia */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-6 h-6 text-blue-400" />
          <h3 className="text-lg font-bold text-white">Tiempo de Audiencia</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1">Tiempo total</p>
            <p className="text-2xl font-bold text-white">{formatListeningTime(stats.totalListeningTime)}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1">Sesión actual</p>
            <p className="text-2xl font-bold text-white">
              {stats.isListening ? formatListeningTime(currentSessionTime) : '0m'}
            </p>
          </div>
        </div>

        {stats.isListening && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <p className="text-sm text-green-400">
                Escuchando ahora - Ganando 10 puntos por minuto
              </p>
            </div>
          </div>
        )}

        {!stats.isListening && (
          <div className="bg-gray-500/10 border border-gray-500/20 rounded-xl p-4">
            <p className="text-sm text-gray-400 text-center">
              Empieza a escuchar música para ganar puntos
            </p>
          </div>
        )}
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-xs text-gray-400">Días activo</span>
          </div>
          <p className="text-xl font-bold text-white">{stats.daysSinceRegistration}</p>
        </motion.div>

        <motion.div
          className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <ShoppingBag className="w-5 h-5 text-orange-400" />
            <span className="text-xs text-gray-400">Productos canjeados</span>
          </div>
          <p className="text-xl font-bold text-white">{stats.productsRedeemed}</p>
        </motion.div>

        <motion.div
          className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="text-xs text-gray-400">Logros</span>
          </div>
          <p className="text-xl font-bold text-white">{user.achievements.length}</p>
        </motion.div>

        <motion.div
          className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <span className="text-xs text-gray-400">Horas escuchadas</span>
          </div>
          <p className="text-xl font-bold text-white">{Math.floor(stats.totalListeningTime / 3600)}</p>
        </motion.div>
      </div>

      {/* Productos canjeados */}
      {user.redeemedProducts.length > 0 && (
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-400" />
            Mis Productos Canjeados
          </h3>
          <div className="space-y-3">
            {user.redeemedProducts.slice(0, 5).map((product, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div>
                  <p className="text-sm font-semibold text-white">{product.productName}</p>
                  <p className="text-xs text-gray-400">{product.brand}</p>
                  <p className="text-xs text-gray-500">
                    Canjeado: {new Date(product.redeemedAt).toLocaleDateString('es-ES')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-orange-400">-{product.pointsSpent.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">puntos</p>
                  <p className={`text-xs mt-1 ${
                    product.deliveryStatus === 'delivered' ? 'text-green-400' :
                    product.deliveryStatus === 'shipped' ? 'text-blue-400' :
                    'text-yellow-400'
                  }`}>
                    {product.deliveryStatus === 'delivered' ? 'Entregado' :
                     product.deliveryStatus === 'shipped' ? 'Enviado' :
                     'Pendiente'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
