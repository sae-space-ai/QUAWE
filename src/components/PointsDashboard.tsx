import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Music, ShoppingBag, TrendingUp, Gift } from 'lucide-react';
import { getUserPoints, getUserStats, getPointsHistory, getRedeemedProducts, formatPoints, getUserLevel, earnPointsForListening } from '../services/pointsSystem';
import { UserPoints } from '../services/pointsSystem';

export default function PointsDashboard() {
  const [userPoints, setUserPoints] = useState<UserPoints | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [redeemed, setRedeemed] = useState<any[]>([]);

  useEffect(() => {
    loadData();
    
    // Actualizar datos cada 5 segundos
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadData = () => {
    const points = getUserPoints();
    setUserPoints(points);
    setStats(getUserStats());
    setHistory(getPointsHistory().slice(0, 10)); // Últimas 10 transacciones
    setRedeemed(getRedeemedProducts().slice(0, 5)); // Últimos 5 productos canjeados
  };

  if (!userPoints || !stats) {
    return <div className="text-white">Cargando...</div>;
  }

  const userLevel = getUserLevel(stats.totalEarned);
  const progressToNextLevel = ((stats.totalEarned - (userLevel.level - 1) * 5000) / 5000) * 100;

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header con puntos totales */}
      <div className="rounded-2xl bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Tus Puntos</h2>
            <p className="text-sm text-gray-400">Gana puntos escuchando música y canjéalos por productos</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              {formatPoints(userPoints.totalPoints)}
            </div>
            <p className="text-xs text-gray-400">puntos disponibles</p>
          </div>
        </div>

        {/* Nivel del usuario */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-semibold text-white">Nivel {userLevel.level}: {userLevel.name}</span>
            </div>
            <span className="text-xs text-gray-400">
              Siguiente nivel: {formatPoints(userLevel.nextLevel)} puntos
            </span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progressToNextLevel, 100)}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <span className="text-xs text-gray-400">Tiempo Escuchado</span>
          </div>
          <p className="text-xl font-bold text-white">{stats.listeningTime} min</p>
        </motion.div>

        <motion.div
          className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Music className="w-5 h-5 text-purple-400" />
            <span className="text-xs text-gray-400">Emisoras Escuchadas</span>
          </div>
          <p className="text-xl font-bold text-white">{stats.stationsListened}</p>
        </motion.div>

        <motion.div
          className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-xs text-gray-400">Total Ganado</span>
          </div>
          <p className="text-xl font-bold text-white">{formatPoints(stats.totalEarned)}</p>
        </motion.div>

        <motion.div
          className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <ShoppingBag className="w-5 h-5 text-orange-400" />
            <span className="text-xs text-gray-400">Productos Canjeados</span>
          </div>
          <p className="text-xl font-bold text-white">{stats.productsRedeemed}</p>
        </motion.div>
      </div>

      {/* Historial de transacciones */}
      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-400" />
          Historial de Puntos
        </h3>
        {history.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">
            Aún no tienes transacciones. ¡Empieza a escuchar música para ganar puntos!
          </p>
        ) : (
          <div className="space-y-3">
            {history.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'earn' ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    {transaction.type === 'earn' ? (
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    ) : (
                      <ShoppingBag className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{transaction.description}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(transaction.timestamp).toLocaleString('es-ES')}
                    </p>
                  </div>
                </div>
                <div className={`text-lg font-bold ${
                  transaction.type === 'earn' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {transaction.type === 'earn' ? '+' : ''}{formatPoints(transaction.points)}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Productos canjeados */}
      {redeemed.length > 0 && (
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Gift className="w-5 h-5 text-orange-400" />
            Productos Canjeados
          </h3>
          <div className="space-y-3">
            {redeemed.map((product, index) => (
              <motion.div
                key={product.productId}
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
                  <p className="text-sm font-bold text-orange-400">-{formatPoints(product.pointsSpent)}</p>
                  <p className="text-xs text-gray-400">puntos</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Cómo ganar puntos */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 p-6">
        <h3 className="text-lg font-bold text-white mb-4">¿Cómo ganar puntos?</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <Music className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Escucha música</p>
              <p className="text-xs text-gray-400">Gana 10 puntos por cada minuto de escucha</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Award className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Descubre emisoras</p>
              <p className="text-xs text-gray-400">100 puntos bonus por escuchar una emisora nueva</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Bonus diario</p>
              <p className="text-xs text-gray-400">500 puntos bonus por escuchar 30+ minutos al día</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
