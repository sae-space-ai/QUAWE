import { motion } from 'framer-motion';

interface QuaweLogoProps {
  size?: number;
  animated?: boolean;
  showText?: boolean;
}

export default function QuaweLogo({ size = 48, animated = true, showText = false }: QuaweLogoProps) {
  return (
    <div className="flex items-center gap-3">
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        animate={animated ? {
          rotate: [0, 360],
        } : {}}
        transition={animated ? {
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        } : {}}
      >
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Círculo exterior */}
          <circle cx="50" cy="50" r="45" stroke="url(#quaweGradient)" strokeWidth="3" fill="none" />
          
          {/* Ondas de radio */}
          <path d="M 30 50 Q 40 30, 50 50 T 70 50" stroke="url(#quaweGradient)" strokeWidth="2" fill="none" opacity="0.8" />
          <path d="M 25 50 Q 37.5 20, 50 50 T 75 50" stroke="url(#quaweGradient)" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M 20 50 Q 35 10, 50 50 T 80 50" stroke="url(#quaweGradient)" strokeWidth="2" fill="none" opacity="0.4" />
          
          {/* Punto central */}
          <circle cx="50" cy="50" r="8" fill="url(#quaweGradient)" />
          
          {/* Gradiente */}
          <defs>
            <linearGradient id="quaweGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B35" />
              <stop offset="50%" stopColor="#E91E8C" />
              <stop offset="100%" stopColor="#6B2FA0" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      
      {showText && (
        <div className="flex flex-col">
          <h1 className="text-2xl font-black bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            RADIO QUAWE
          </h1>
          <p className="text-xs text-gray-400">Tu Frecuencia Universal</p>
        </div>
      )}
    </div>
  );
}
