import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Clock, CheckCircle, X, ExternalLink, Share2, Eye, MousePointer } from 'lucide-react';
import { 
  getAvailableCampaignsForUser, 
  registerAdInteraction, 
  calculateAdPoints,
  hasUserInteracted,
  getUserAdStats,
  AdCampaign
} from '../services/adShowcaseSystem';
import { getCurrentUser } from '../services/authSystem';
import { addPoints } from '../services/pointsSystem';

interface AdShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdShowcase({ isOpen, onClose }: AdShowcaseProps) {
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([]);
  const [selectedAd, setSelectedAd] = useState<AdCampaign | null>(null);
  const [viewProgress, setViewProgress] = useState(0);
  const [isViewing, setIsViewing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [userStats, setUserStats] = useState<any>(null);

  const user = getCurrentUser();

  useEffect(() => {
    if (isOpen && user) {
      loadCampaigns();
      loadUserStats();
    }
  }, [isOpen, user]);

  const loadCampaigns = () => {
    if (!user) return;
    const available = getAvailableCampaignsForUser(user.id);
    setCampaigns(available);
  };

  const loadUserStats = () => {
    if (!user) return;
    const stats = getUserAdStats(user.id);
    setUserStats(stats);
  };

  const handleViewAd = (ad: AdCampaign) => {
    setSelectedAd(ad);
    setIsViewing(true);
    setViewProgress(0);

    // Simular progreso de visualización
    const interval = setInterval(() => {
      setViewProgress(prev => {
        const newProgress = prev + (100 / ad.duration);
        if (newProgress >= 100) {
          clearInterval(interval);
          handleAdComplete(ad, 'view');
          return 100;
        }
        return newProgress;
      });
    }, 1000);
  };

  const handleAdComplete = (ad: AdCampaign, interactionType: string) => {
    if (!user) return;

    const points = calculateAdPoints(interactionType, ad);
    setEarnedPoints(points);

    // Registrar interacción
    registerAdInteraction(user.id, ad.id, interactionType, points);

    // Añadir puntos al usuario
    addPoints(points, `Bonus por interactuar con anuncio de ${ad.brand}`);

    // Mostrar éxito
    setShowSuccess(true);
    setIsViewing(false);

    // Recargar campañas y estadísticas
    setTimeout(() => {
      loadCampaigns();
      loadUserStats();
    }, 500);
  };

  const handleClickAd = (ad: AdCampaign) => {
    if (!user) return;

    // Verificar si ya vio el anuncio
    if (!hasUserInteracted(user.id, ad.id, 'view')) {
      alert('Debes ver el anuncio completo primero para poder hacer clic');
      return;
    }

    handleAdComplete(ad, 'click');

    // Abrir URL en nueva pestaña
    if (ad.url) {
      window.open(ad.url, '_blank');
    }
  };

  const handleCompleteAd = (ad: AdCampaign) => {
    if (!user) return;

    // Verificar si ya vio el anuncio
    if (!hasUserInteracted(user.id, ad.id, 'view')) {
      alert('Debes ver el anuncio completo primero');
      return;
    }

    handleAdComplete(ad, 'complete');

    // Abrir URL en nueva pestaña
    if (ad.url) {
      window.open(ad.url, '_blank');
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setSelectedAd(null);
    setEarnedPoints(0);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-white/10 p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Escaparate Publicitario</h2>
              <p className="text-sm text-gray-400">Gana puntos interactuando con anuncios</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Estadísticas del usuario */}
        {userStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">Total Interacciones</p>
              <p className="text-2xl font-bold text-white">{userStats.totalInteractions}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">Puntos Ganados</p>
              <p className="text-2xl font-bold text-green-400">{userStats.totalPointsEarned}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">Anuncios Vistos</p>
              <p className="text-2xl font-bold text-blue-400">{userStats.uniqueAdsInteracted}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">Disponibles</p>
              <p className="text-2xl font-bold text-purple-400">{campaigns.length}</p>
            </div>
          </div>
        )}

        {/* Grid de campañas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <motion.div
              key={campaign.id}
              className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Imagen del anuncio */}
              <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-lg">
                  <span className="text-xs font-bold text-green-400">
                    +{calculateAdPoints(campaign.interactionType, campaign)} pts
                  </span>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded-lg">
                  <span className="text-xs text-white">{campaign.brand}</span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2">{campaign.title}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{campaign.description}</p>

                {/* Tipo de interacción */}
                <div className="flex items-center gap-2 mb-4">
                  {campaign.interactionType === 'view' && (
                    <>
                      <Eye className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-gray-400">Ver anuncio ({campaign.duration}s)</span>
                    </>
                  )}
                  {campaign.interactionType === 'click' && (
                    <>
                      <MousePointer className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-gray-400">Ver y hacer clic</span>
                    </>
                  )}
                  {campaign.interactionType === 'complete' && (
                    <>
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                      <span className="text-xs text-gray-400">Completar acción</span>
                    </>
                  )}
                </div>

                {/* Botones de acción */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewAd(campaign)}
                    className="flex-1 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                  >
                    Ver Anuncio
                  </button>
                  {hasUserInteracted(user?.id || '', campaign.id, 'view') && (
                    <button
                      onClick={() => {
                        if (campaign.interactionType === 'click') {
                          handleClickAd(campaign);
                        } else if (campaign.interactionType === 'complete') {
                          handleCompleteAd(campaign);
                        }
                      }}
                      className="py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all"
                    >
                      {campaign.interactionType === 'click' ? 'Clic' : 'Completar'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {campaigns.length === 0 && (
          <div className="text-center py-12">
            <Gift className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No hay anuncios disponibles en este momento</p>
            <p className="text-sm text-gray-500 mt-2">Vuelve más tarde para ver nuevas campañas</p>
          </div>
        )}

        {/* Modal de visualización de anuncio */}
        <AnimatePresence>
          {isViewing && selectedAd && (
            <motion.div
              className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-white/10 p-6 max-w-2xl w-full"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <div className="mb-4">
                  <img
                    src={selectedAd.image}
                    alt={selectedAd.title}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{selectedAd.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{selectedAd.description}</p>

                {/* Barra de progreso */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Progreso de visualización</span>
                    <span className="text-sm font-bold text-purple-400">
                      {Math.floor(viewProgress)}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${viewProgress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {Math.ceil((100 - viewProgress) / 10)}s restantes
                    </span>
                    <span className="text-xs text-green-400 font-bold">
                      +{calculateAdPoints('view', selectedAd)} puntos
                    </span>
                  </div>
                </div>

                {viewProgress >= 100 && (
                  <motion.div
                    className="bg-green-500/10 border border-green-500/20 rounded-xl p-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <p className="text-sm text-green-300">
                        ¡Anuncio completado! Has ganado {calculateAdPoints('view', selectedAd)} puntos
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal de éxito */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="fixed inset-0 z-70 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-white/10 p-8 max-w-md w-full text-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-2">¡Felicidades!</h3>
                <p className="text-gray-400 mb-4">Has completado la interacción con éxito</p>

                <div className="bg-white/5 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-400 mb-1">Puntos ganados</p>
                  <p className="text-4xl font-bold text-green-400">+{earnedPoints}</p>
                </div>

                <button
                  onClick={handleCloseSuccess}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  Continuar
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
