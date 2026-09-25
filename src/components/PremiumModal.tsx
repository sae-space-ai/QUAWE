import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, Check, X, CreditCard, Gift, Zap, Shield } from 'lucide-react';
import { getCurrentUser } from '../services/authSystem';
import { subscribeToPremium, cancelPremium, isUserPremium, getPremiumBenefits, getMembershipDaysRemaining } from '../services/premiumSystem';
import { POINTS_CONFIG } from '../services/pointsSystem';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PremiumModal({ isOpen, onClose, onSuccess }: PremiumModalProps) {
  const [isPremium, setIsPremium] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const user = getCurrentUser();
      if (user) {
        setIsPremium(isUserPremium(user.id));
        setDaysRemaining(getMembershipDaysRemaining(user.id));
      }
    }
  }, [isOpen]);

  const handleSubscribe = async () => {
    const user = getCurrentUser();
    if (!user) return;

    setLoading(true);
    setMessage(null);

    // Simular procesamiento de pago
    setTimeout(() => {
      const result = subscribeToPremium(user.id, 'card');
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setIsPremium(true);
        setDaysRemaining(30);
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 2000);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
      
      setLoading(false);
    }, 1500);
  };

  const handleCancel = async () => {
    const user = getCurrentUser();
    if (!user) return;

    setLoading(true);
    setMessage(null);

    const result = cancelPremium(user.id);
    
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setIsPremium(false);
      setDaysRemaining(0);
    } else {
      setMessage({ type: 'error', text: result.message });
    }
    
    setLoading(false);
  };

  if (!isOpen) return null;

  const benefits = getPremiumBenefits();
  const price = POINTS_CONFIG.premiumMonthly.cost;
  const pointsBonus = POINTS_CONFIG.premiumMonthly.pointsBonus;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-white/10 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Radio Quawe Premium</h2>
              <p className="text-sm text-gray-400">La mejor experiencia de radio</p>
            </div>
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
            <p className={`text-sm ${message.type === 'success' ? 'text-green-300' : 'text-red-300'}`}>
              {message.text}
            </p>
          </motion.div>
        )}

        {isPremium ? (
          // Vista Premium Activo
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="w-8 h-8 text-yellow-400" />
                <div>
                  <h3 className="text-xl font-bold text-white">¡Eres Premium!</h3>
                  <p className="text-sm text-gray-400">Disfruta de todos los beneficios exclusivos</p>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Días restantes:</span>
                  <span className="text-lg font-bold text-yellow-400">{daysRemaining} días</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                    initial={{ width: '100%' }}
                    animate={{ width: `${(daysRemaining / 30) * 100}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>

              <button
                onClick={handleCancel}
                disabled={loading}
                className="w-full py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 font-semibold transition-all disabled:opacity-50"
              >
                {loading ? 'Cancelando...' : 'Cancelar Membresía'}
              </button>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-3">Tus Beneficios Activos</h4>
              <div className="space-y-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Vista de Suscripción
          <div className="space-y-6">
            {/* Precio */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-white mb-2">
                €{price}<span className="text-lg text-gray-400">/mes</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Recibe <span className="text-yellow-400 font-bold">{pointsBonus.toLocaleString()} puntos</span> de bienvenida
              </p>
              <div className="text-xs text-gray-500">
                Cancela cuando quieras • Sin compromisos
              </div>
            </div>

            {/* Beneficios */}
            <div>
              <h4 className="text-lg font-bold text-white mb-3">Beneficios Premium</h4>
              <div className="space-y-2">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                      {index === 0 && <Zap className="w-4 h-4 text-yellow-400" />}
                      {index === 1 && <Shield className="w-4 h-4 text-yellow-400" />}
                      {index === 2 && <Gift className="w-4 h-4 text-yellow-400" />}
                      {index === 3 && <Crown className="w-4 h-4 text-yellow-400" />}
                      {index === 4 && <Zap className="w-4 h-4 text-yellow-400" />}
                    </div>
                    <span className="text-sm text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Comparación */}
            <div className="bg-white/5 rounded-xl p-4">
              <h4 className="text-sm font-bold text-white mb-3">Comparación de Planes</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Puntos por minuto:</span>
                  <div className="flex gap-4">
                    <span className="text-gray-500">Gratis: 1 pt</span>
                    <span className="text-yellow-400 font-bold">Premium: 1.5 pts</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Anuncios:</span>
                  <div className="flex gap-4">
                    <span className="text-gray-500">Gratis: Sí</span>
                    <span className="text-yellow-400 font-bold">Premium: No</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Calidad de audio:</span>
                  <div className="flex gap-4">
                    <span className="text-gray-500">Gratis: Estándar</span>
                    <span className="text-yellow-400 font-bold">Premium: HD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de suscripción */}
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-yellow-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  Procesando pago...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Suscribirse por €{price}/mes
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              Al suscribirte, aceptas nuestros términos y condiciones. 
              La membresía se renovará automáticamente cada mes. Puedes cancelar en cualquier momento.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
