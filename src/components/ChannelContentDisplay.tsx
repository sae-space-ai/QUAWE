import { motion } from 'framer-motion';
import { Music, Clock, Users, Disc3 } from 'lucide-react';
import { ChannelContent } from '../data/channelContent';

interface ChannelContentDisplayProps {
  content: ChannelContent;
}

export default function ChannelContentDisplay({ content }: ChannelContentDisplayProps) {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header del Canal */}
      <div className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center">
            <Disc3 className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">{content.name}</h2>
            <p className="text-sm text-gray-400 mb-3">{content.tagline}</p>
            <p className="text-sm text-gray-300">{content.description}</p>
          </div>
        </div>
        
        {/* Mensaje de Bienvenida */}
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-sm text-gray-300 italic">{content.welcomeMessage}</p>
        </div>
      </div>

      {/* Programación */}
      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-400" />
          Programación
        </h3>
        <div className="space-y-3">
          {content.schedule.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="text-sm font-mono text-blue-400 w-16 flex-shrink-0">
                {item.time}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white">{item.show}</h4>
                <p className="text-xs text-gray-400">con {item.host}</p>
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Playlists Destacadas */}
      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Music className="w-5 h-5 text-purple-400" />
          Playlists Destacadas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {content.featuredPlaylists.map((playlist, index) => (
            <motion.div
              key={index}
              className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-sm font-semibold text-white mb-1">{playlist.name}</h4>
              <p className="text-xs text-gray-400 mb-2">{playlist.description}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Disc3 className="w-3 h-3" />
                <span>{playlist.trackCount} tracks</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Artistas Destacados */}
      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-green-400" />
          Artistas Destacados
        </h3>
        <div className="flex flex-wrap gap-2">
          {content.topArtists.map((artist, index) => (
            <motion.span
              key={index}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-sm text-gray-300 transition-all"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {artist}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
