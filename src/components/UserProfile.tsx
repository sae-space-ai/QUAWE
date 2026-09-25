import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Award, LogOut, Link2, Unlink, CheckCircle } from 'lucide-react';
import { getCurrentUser, logoutUser, getUserStats, formatListeningTime, getLevelName } from '../services/authSystem';
import { getLinkedOAuthProviders, unlinkOAuthAccount, oauthProviders } from '../services/oauthSystem';

interface UserProfileProps {
  onClose: () => void;
}

export default function UserProfile({ onClose }: UserProfileProps) {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [linkedProviders, setLinkedProviders] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    loadUserData();
    
    // Actualizar tiempo de sesión cada segundo
    const timer = setInterval(() => {
      if (user?.currentSessionStart) {
        const elapsed = Math.floor((Date.now() - user.currentSessionStart) / 1000);
        setCurrentTime(elapsed);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const loadUserData = () => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setStats(getUserStats(currentUser.id));
      setLinkedProviders(getLinkedOAuthProviders());
    }
  };

  const handleLogout = () => {
    logoutUser();
    onClose();
  };

  const handleUnlinkProvider = (providerId: string) => {
    if (confirm(`¿Estás seguro de que quieres desvincular tu cuenta de ${providerId}?`)) {
      unlinkOAuthAccount(providerId);
      loadUserData();
    }
  };

  if (!user || !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Cargando perfil...</div>
      </div>
    );
  }

  const levelInfo = getLevelName(user.points);
  const nextLevel = user.level < 5 ? getLevelName(user.points + 1000) : null;
  const progressToNextLevel = user.level < 5 ? ((user.points % 5000) / 5000) * 100 : 100;

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
            {user.oauthAvatar ? (
              <img 
                src={user.oauthAvatar} 
                alt={user.fullName}
                className="w-16 h-16 rounded-full border-2 border-white/20"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            )}
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
          {user.oauthProvider && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30">
              <span className="text-xs text-blue-400">
                {oauthProviders.find(p => p.id === user.oauthProvider)?.icon}{' '}
                Conectado con {oauthProviders.find(p => p.id === user.oauthProvider)?.name}
              </span>
            </div>
          )}
        </div>

        {/* Ubicación */}
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {user.city}, {user.country}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Miembro desde {new Date(user.registrationDate).toLocaleDateString('es-ES')}
          </span>
        </div>
      </div>

      {/* Nivel y progreso */}
      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Nivel {user.level}: {levelInfo}</h3>
              <p className="text-xs text-gray-400">
                {nextLevel ? `Siguiente nivel: ${nextLevel} (${(user.level * 5000).toLocaleString()} puntos)` : '¡Nivel máximo alcanzado!'}
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
                animate={{ width: `${progressToNextLevel}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 text-right">
              {progressToNextLevel.toFixed(1)}% completado
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
            <Calendar className="w-5 h-5 text-blue-400" />
            <span className="text-xs text-gray-400">Días activo</span>
          </div>
          <p className="text-xl font-bold text-white">{stats.daysSinceRegistration}</p>
        </motion.div>

        <motion.div
          className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-green-400" />
            <span className="text-xs text-gray-400">Logros</span>
          </div>
          <p className="text-xl font-bold text-white">{user.achievements.length}</p>
        </motion.div>

        <motion.div
          className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <User className="w-5 h-5 text-purple-400" />
            <span className="text-xs text-gray-400">Emisoras escuchadas</span>
          </div>
          <p className="text-xl font-bold text-white">{user.stationsListened.length}</p>
        </motion.div>

        <motion.div
          className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-5 h-5 text-orange-400" />
            <span className="text-xs text-gray-400">Tiempo escuchando</span>
          </div>
          <p className="text-xl font-bold text-white">{formatListeningTime(user.totalListeningTime + currentTime)}</p>
        </motion.div>
      </div>

      {/* Cuentas vinculadas */}
      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Link2 className="w-5 h-5 text-blue-400" />
          Cuentas Vinculadas
        </h3>
        <div className="space-y-3">
          {oauthProviders.map((provider) => {
            const isLinked = linkedProviders.includes(provider.id);
            const isPrimary = user.oauthProvider === provider.id;
            
            return (
              <div
                key={provider.id}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{provider.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{provider.name}</p>
                    <p className="text-xs text-gray-400">
                      {isLinked ? (
                        isPrimary ? (
                          <span className="text-green-400">Cuenta principal</span>
                        ) : (
                          <span className="text-blue-400">Vinculada</span>
                        )
                      ) : (
                        <span className="text-gray-500">No vinculada</span>
                      )}
                    </p>
                  </div>
                </div>
                
                {isLinked && !isPrimary && (
                  <button
                    onClick={() => handleUnlinkProvider(provider.id)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 text-xs font-medium transition-all"
                  >
                    <Unlink className="w-3 h-3" />
                    Desvincular
                  </button>
                )}
                
                {!isLinked && (
                  <button
                    onClick={() => {
                      // Aquí iría la lógica para vincular cuenta
                      alert(`Para vincular ${provider.name}, implementa el flujo OAuth en el backend`);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 text-xs font-medium transition-all"
                  >
                    <Link2 className="w-3 h-3" />
                    Vincular
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Logros */}
      {user.achievements.length > 0 && (
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            Logros Desbloqueados
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {user.achievements.map((achievement: string, index: number) => (
              <motion.div
                key={index}
                className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-xs text-yellow-400 font-semibold">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
