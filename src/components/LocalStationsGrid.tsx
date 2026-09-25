import { motion } from 'framer-motion';
import { MapPin, Users, Radio, Globe } from 'lucide-react';
import { LocalQuaweStation, networkStats } from '../data/quaweStations';
import QuaweLogo from './QuaweLogo';

interface LocalStationsGridProps {
  stations: LocalQuaweStation[];
  onStationClick: (station: LocalQuaweStation) => void;
  userCity?: string;
}

export default function LocalStationsGrid({ stations, onStationClick, userCity }: LocalStationsGridProps) {
  return (
    <div className="space-y-6">
      {/* Header con estadísticas de la red */}
      <motion.div
        className="rounded-2xl bg-gradient-to-br from-orange-500/10 via-pink-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-6 h-6 text-orange-400" />
          <div>
            <h2 className="text-xl font-bold text-white">Red QUAWE Local</h2>
            <p className="text-sm text-gray-400">100 ciudades • Tu música en todo el mundo hispano</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-xl p-3">
            <p className="text-2xl font-bold text-orange-400">{networkStats.totalCities}</p>
            <p className="text-xs text-gray-400">Ciudades</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <p className="text-2xl font-bold text-pink-400">{networkStats.countries}</p>
            <p className="text-xs text-gray-400">Países</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <p className="text-2xl font-bold text-purple-400">
              {(networkStats.totalPopulation / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-gray-400">Habitantes</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <p className="text-2xl font-bold text-blue-400">
              {(networkStats.totalListeners / 1000).toFixed(0)}K
            </p>
            <p className="text-xs text-gray-400">Oyentes</p>
          </div>
        </div>
      </motion.div>

      {/* Grid de estaciones locales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stations.map((localStation, index) => {
          const isUserCity = userCity && localStation.city.toLowerCase() === userCity.toLowerCase();
          
          return (
            <motion.button
              key={localStation.id}
              onClick={() => onStationClick(localStation)}
              className={`relative overflow-hidden rounded-2xl p-5 text-left transition-all ${
                isUserCity
                  ? 'bg-gradient-to-br from-orange-500/30 via-pink-500/30 to-purple-500/30 border-2 border-orange-400/50 shadow-lg shadow-orange-500/20'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Badge "Tu ciudad" si coincide */}
              {isUserCity && (
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 rounded-full bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider">
                    📍 Tu ciudad
                  </span>
                </div>
              )}

              <div className="flex items-start gap-4">
                {/* Logo de la estación */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center shadow-lg">
                    <QuaweLogo size={48} animated={false} />
                  </div>
                </div>

                {/* Información de la estación */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white truncate">
                      {localStation.station.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">
                      {localStation.city}, {localStation.country}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Radio className="w-3.5 h-3.5" />
                      <span className="font-mono">{localStation.frequency}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Users className="w-3.5 h-3.5" />
                      <span>{(localStation.station.clickcount / 1000).toFixed(0)}K oyentes</span>
                    </div>
                    <div className="text-gray-500">
                      {(localStation.population / 1000000).toFixed(1)}M hab.
                    </div>
                  </div>
                </div>
              </div>

              {/* Indicador de que reproduce música de Audius */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span>Reproduciendo música de Prof. Manuel Gago</span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
