import { motion } from 'framer-motion';

interface PulsarLogoProps {
  size?: number;
  animated?: boolean;
  showText?: boolean;
  className?: string;
}

export default function PulsarLogo({ 
  size = 48, 
  animated = true, 
  showText = false,
  className = '' 
}: PulsarLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          {/* Gradientes */}
          <defs>
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#FF6B35" />
              <stop offset="70%" stopColor="#E91E8C" />
              <stop offset="100%" stopColor="#6B2FA0" />
            </radialGradient>
            
            <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B35" />
              <stop offset="100%" stopColor="#E91E8C" />
            </linearGradient>
            
            <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E91E8C" />
              <stop offset="100%" stopColor="#6B2FA0" />
            </linearGradient>
            
            <linearGradient id="wave3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6B2FA0" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Fondo negro circular */}
          <circle cx="256" cy="256" r="256" fill="#000000" />

          {/* Ondas de radio concéntricas */}
          <g filter="url(#glow)">
            {/* Onda exterior */}
            <motion.circle
              cx="256"
              cy="256"
              r="200"
              stroke="url(#wave3)"
              strokeWidth="3"
              fill="none"
              opacity="0.3"
              initial={animated ? { scale: 0.95, opacity: 0.2 } : false}
              animate={animated ? { scale: [0.95, 1.05, 0.95], opacity: [0.2, 0.4, 0.2] } : false}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Onda media */}
            <motion.circle
              cx="256"
              cy="256"
              r="150"
              stroke="url(#wave2)"
              strokeWidth="4"
              fill="none"
              opacity="0.5"
              initial={animated ? { scale: 0.95, opacity: 0.3 } : false}
              animate={animated ? { scale: [0.95, 1.05, 0.95], opacity: [0.3, 0.6, 0.3] } : false}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />
            
            {/* Onda interior */}
            <motion.circle
              cx="256"
              cy="256"
              r="100"
              stroke="url(#wave1)"
              strokeWidth="5"
              fill="none"
              opacity="0.7"
              initial={animated ? { scale: 0.95, opacity: 0.5 } : false}
              animate={animated ? { scale: [0.95, 1.05, 0.95], opacity: [0.5, 0.8, 0.5] } : false}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            />
          </g>

          {/* Núcleo brillante (estrella pulsar) */}
          <motion.circle
            cx="256"
            cy="256"
            r="45"
            fill="url(#coreGlow)"
            filter="url(#glow)"
            initial={animated ? { scale: 1 } : false}
            animate={animated ? { scale: [1, 1.1, 1] } : false}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Rayos de energía */}
          <g opacity="0.6">
            <motion.line
              x1="256"
              y1="256"
              x2="256"
              y2="80"
              stroke="url(#wave1)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={animated ? { opacity: 0.3 } : false}
              animate={animated ? { opacity: [0.3, 0.8, 0.3] } : false}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.line
              x1="256"
              y1="256"
              x2="256"
              y2="432"
              stroke="url(#wave1)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={animated ? { opacity: 0.3 } : false}
              animate={animated ? { opacity: [0.3, 0.8, 0.3] } : false}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.line
              x1="256"
              y1="256"
              x2="80"
              y2="256"
              stroke="url(#wave2)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={animated ? { opacity: 0.3 } : false}
              animate={animated ? { opacity: [0.3, 0.8, 0.3] } : false}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.line
              x1="256"
              y1="256"
              x2="432"
              y2="256"
              stroke="url(#wave2)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={animated ? { opacity: 0.3 } : false}
              animate={animated ? { opacity: [0.3, 0.8, 0.3] } : false}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />
          </g>

          {/* Punto central brillante */}
          <circle cx="256" cy="256" r="12" fill="#FFFFFF" opacity="0.9" />
        </svg>
      </div>

      {/* Texto de la marca */}
      {showText && (
        <div className="flex flex-col">
          <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            PULSAR FM
          </h1>
          <p className="text-xs text-gray-400 -mt-1 tracking-widest uppercase">
            Tu Frecuencia Universal
          </p>
        </div>
      )}
    </div>
  );
}
