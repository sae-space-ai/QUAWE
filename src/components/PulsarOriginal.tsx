import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Heart, Share2, ExternalLink, Music, Clock, TrendingUp, Disc3, User, Loader2 } from 'lucide-react';
import { getUserByHandle, getUserTracks, getTrackStreamUrl, formatDuration, formatPlayCount, getArtworkUrl, AudiusTrack, AudiusUser } from '../services/audiusApi';

const ARTIST_HANDLE = 'profmanuelgago';

export default function PulsarOriginal() {
  const [user, setUser] = useState<AudiusUser | null>(null);
  const [tracks, setTracks] = useState<AudiusTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTrack, setCurrentTrack] = useState<AudiusTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    loadArtistData();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && streamUrl) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, streamUrl]);

  const loadArtistData = async () => {
    setLoading(true);
    try {
      const [userData, tracksData] = await Promise.all([
        getUserByHandle(ARTIST_HANDLE),
        getUserTracks(ARTIST_HANDLE, 50),
      ]);
      
      setUser(userData);
      setTracks(tracksData);
      
      // Auto-reproducir el primer track si hay tracks disponibles
      if (tracksData.length > 0) {
        handlePlayTrack(tracksData[0]);
      }
    } catch (error) {
      console.error('Error loading artist data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayTrack = async (track: AudiusTrack) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
      return;
    }

    setCurrentTrack(track);
    setIsPlaying(true);
    
    const url = await getTrackStreamUrl(track.id);
    setStreamUrl(url);
    
    if (audioRef.current && url) {
      audioRef.current.src = url;
      audioRef.current.load();
    }
  };

  const handleNextTrack = () => {
    if (!currentTrack || tracks.length === 0) return;
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    handlePlayTrack(tracks[nextIndex]);
  };

  const handlePrevTrack = () => {
    if (!currentTrack || tracks.length === 0) return;
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    handlePlayTrack(tracks[prevIndex]);
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-orange-500/10 via-pink-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 p-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-orange-400" />
          <span className="ml-3 text-gray-300">Cargando PULSAR Original...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <audio ref={audioRef} onEnded={handleNextTrack} />

      {/* Hero del Artista */}
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Fondo decorativo */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10" />
        
        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar del artista */}
            {user && (
              <motion.div
                className="relative flex-shrink-0"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img
                    src={getArtworkUrl(user.artwork, 320)}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Badge de verificación */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center border-2 border-black">
                  <Disc3 className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            )}

            {/* Info del artista */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-[10px] font-bold text-orange-400 uppercase tracking-wider">
                  PULSAR Original
                </span>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                  Artista Oficial
                </span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-1">
                {user?.name || 'Prof. Manuel Gago'}
              </h2>
              <p className="text-sm text-gray-400 mb-3">
                @{user?.handle || ARTIST_HANDLE}
              </p>
              
              {user?.bio && (
                <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                  {user.bio}
                </p>
              )}

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Music className="w-3.5 h-3.5" />
                  <span className="font-semibold text-white">{tracks.length}</span> tracks
                </div>
                {user && (
                  <>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <User className="w-3.5 h-3.5" />
                      <span className="font-semibold text-white">{user.follower_count}</span> seguidores
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span className="font-semibold text-white">{user.track_count}</span> publicaciones
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Link a Audius */}
            <a
              href={`https://audius.co/${ARTIST_HANDLE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-sm font-medium text-white"
            >
              <ExternalLink className="w-4 h-4" />
              Ver en Audius
            </a>
          </div>
        </div>
      </motion.div>

      {/* Reproductor de Track Actual */}
      <AnimatePresence>
        {currentTrack && (
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-6"
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
          >
            <div className="flex items-center gap-4">
              {/* Artwork */}
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={getArtworkUrl(currentTrack.artwork, 160)}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white truncate">
                  {currentTrack.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {user?.name || ARTIST_HANDLE}
                </p>
              </div>

              {/* Controles */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevTrack}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                  </svg>
                </button>
                
                <motion.button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-4 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 shadow-lg shadow-orange-500/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-0.5" />
                  )}
                </motion.button>

                <button
                  onClick={handleNextTrack}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lista de Tracks */}
      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Disc3 className="w-5 h-5 text-orange-400" />
            Tracks de {user?.name || ARTIST_HANDLE}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            {tracks.length} canciones disponibles
          </p>
        </div>

        <div className="divide-y divide-white/5">
          {tracks.map((track, index) => (
            <motion.button
              key={track.id}
              onClick={() => handlePlayTrack(track)}
              className={`w-full text-left p-4 transition-all ${
                currentTrack?.id === track.id
                  ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20'
                  : 'hover:bg-white/5'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center gap-4">
                {/* Número / Play indicator */}
                <div className="w-8 flex-shrink-0 text-center">
                  {currentTrack?.id === track.id && isPlaying ? (
                    <motion.div
                      className="flex items-center justify-center gap-0.5"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <div className="w-0.5 h-4 bg-orange-400 rounded-full" />
                      <div className="w-0.5 h-3 bg-orange-400 rounded-full" />
                      <div className="w-0.5 h-5 bg-orange-400 rounded-full" />
                    </motion.div>
                  ) : (
                    <span className="text-sm text-gray-500">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  )}
                </div>

                {/* Artwork */}
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={getArtworkUrl(track.artwork, 120)}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-semibold truncate ${
                    currentTrack?.id === track.id ? 'text-orange-400' : 'text-white'
                  }`}>
                    {track.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDuration(track.duration)}
                    </span>
                    {track.play_count !== undefined && (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {formatPlayCount(track.play_count)} plays
                      </span>
                    )}
                    {track.favorite_count !== undefined && (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {formatPlayCount(track.favorite_count)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://audius.co${track.permalink}`, '_blank');
                    }}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
