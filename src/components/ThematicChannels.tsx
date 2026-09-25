import { motion } from 'framer-motion';
import { Radio, MapPin, Users } from 'lucide-react';
import { thematicChannels, ThematicChannel } from '../data/thematicChannels';
import { getStationsByChannel, ThematicStation } from '../data/thematicStations';

interface ThematicChannelsProps {
  onChannelSelect: (channel: ThematicChannel) => void;
  onStationSelect: (station: ThematicStation) => void;
  selectedChannel?: ThematicChannel | null;
}

export default function ThematicChannels({ onChannelSelect, onStationSelect, selectedChannel }: ThematicChannelsProps) {
  const handleChannelClick = (channel: ThematicChannel) => {
    onChannelSelect(channel);
  };

  const handleStationClick = (station: ThematicStation) => {
    onStationSelect(station);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 backdrop-blur-xl border border-white/10 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Radio className="w-6 h-6 text-purple-400" />
          <div>
            <h2 className="text-xl font-bold text-white">Canales Temáticos</h2>
            <p className="text-sm text-gray-400">
              {thematicChannels.length} canales • {getStationsByChannel('').length} emisoras temáticas
            </p>
          </div>
        </div>

        {/* Grid de canales */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {thematicChannels.map((channel) => (
            <motion.button
              key={channel.id}
              onClick={() => handleChannelClick(channel)}
              className={`p-4 rounded-xl transition-all ${
                selectedChannel?.id === channel.id
                  ? 'ring-2 ring-offset-2 ring-offset-gray-900'
                  : 'hover:scale-105'
              }`}
              style={{
                backgroundColor: `${channel.color}20`,
                borderColor: channel.color,
                borderWidth: selectedChannel?.id === channel.id ? '2px' : '1px',
                boxShadow: selectedChannel?.id === channel.id ? `0 0 20px ${channel.color}40` : 'none',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-3xl mb-2">{channel.emoji}</div>
              <div className="text-sm font-bold text-white">{channel.name}</div>
              <div className="text-xs text-gray-400 mt-1">{channel.description}</div>
              <div className="text-xs text-gray-500 mt-2">
                {getStationsByChannel(channel.id).length} emisoras
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Emisoras del canal seleccionado */}
      {selectedChannel && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">{selectedChannel.emoji}</div>
            <div>
              <h3 className="text-lg font-bold text-white">{selectedChannel.name}</h3>
              <p className="text-sm text-gray-400">
                {getStationsByChannel(selectedChannel.id).length} emisoras disponibles
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {getStationsByChannel(selectedChannel.id).map((station) => (
              <motion.button
                key={station.id}
                onClick={() => handleStationClick(station)}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${selectedChannel.color}30` }}
                  >
                    <span className="text-2xl">{selectedChannel.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">
                      {station.station.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{station.city}, {station.country}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                      <div className="flex items-center gap-1">
                        <Radio className="w-3 h-3" />
                        <span className="font-mono">{station.frequency}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{(station.station.clickcount / 1000).toFixed(0)}K</span>
                      </div>
                      <div>
                        {(station.population / 1000).toFixed(0)}K hab.
                      </div>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
