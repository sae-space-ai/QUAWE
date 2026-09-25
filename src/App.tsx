import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Radio, Play, Pause, Volume2, VolumeX, Heart, Search,
  MapPin, Clock, Music, Share2, Moon, Sun, Menu, X,
  TrendingUp, Globe, Headphones, SkipForward, SkipBack,
  Timer, Trash2, ExternalLink, Star, Zap, MessageCircle,
  Send, ChevronDown, Filter, RefreshCw
} from 'lucide-react';
import { useRadioStore } from './store/radioStore';
import { useGeolocation } from './hooks/useGeolocation';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import {
  searchStationsByName,
  getTopStations,
  getStationsByTag,
  getStationsByCountry,
  getGenreEmoji,
  getGenreColor,
  formatListeners,
} from './services/radioApi';
import { genres, localAds, chatMessages, scheduleItems, sleepTimerOptions, popularCountries } from './data/constants';
import { Station } from './types';
import PulsarLogo from './components/PulsarLogo';
import PulsarOriginal from './components/PulsarOriginal';
import LocalStationsGrid from './components/LocalStationsGrid';
import { localPulsarStations, getLocalStation, LocalPulsarStation } from './data/localStations';

// ============================================
// Visualizador de Audio
// ============================================
function AudioVisualizer({ getAnalyserData, isPlaying, color }: {
  getAnalyserData: () => Uint8Array | null;
  isPlaying: boolean;
  color: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const data = getAnalyserData();
      const barCount = 64;
      const barWidth = width / barCount - 2;

      for (let i = 0; i < barCount; i++) {
        let barHeight: number;
        
        if (data && isPlaying) {
          const dataIndex = Math.floor((i / barCount) * data.length);
          barHeight = (data[dataIndex] / 255) * height * 0.9;
        } else {
          barHeight = isPlaying ? Math.random() * 20 + 5 : 2;
        }

        const x = i * (barWidth + 2);
        const y = height - barHeight;

        const gradient = ctx.createLinearGradient(x, y, x, height);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, `${color}33`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, color, getAnalyserData]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={100}
      className="w-full h-24 rounded-xl"
    />
  );
}

// ============================================
// Componente Principal
// ============================================
export default function App() {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [chatMessagesLocal, setChatMessagesLocal] = useState(chatMessages);
  const [newChatMessage, setNewChatMessage] = useState('');
  const [sleepTimerActive, setSleepTimerActive] = useState(false);
  const [sleepTimerCountdown, setSleepTimerCountdown] = useState<number | null>(null);
  const [showOriginal, setShowOriginal] = useState(false);
  const [showLocalStations, setShowLocalStations] = useState(false);

  const {
    currentStation,
    isPlaying,
    volume,
    isMuted,
    favorites,
    history,
    activeTab,
    setCurrentStation,
    setIsPlaying,
    setVolume,
    toggleMute,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    setActiveTab,
  } = useRadioStore();

  const location = useGeolocation();
  const { audioRef, getAnalyserData } = useAudioPlayer();

  // Cargar emisoras top al inicio
  useEffect(() => {
    loadTopStations();
  }, []);

  // Crear estación especial PULSAR Original
  const pulsarOriginalStation: Station = {
    stationuuid: 'pulsar-original',
    name: 'PULSAR Original',
    url: '',
    url_resolved: '',
    homepage: 'https://audius.co/profmanuelgago',
    favicon: '',
    tags: 'original,audius,profmanuelgago',
    country: 'Global',
    countrycode: '',
    state: '',
    language: '',
    languagecodes: '',
    votes: 9999,
    lastchangetime: '',
    codec: '',
    bitrate: 320,
    hls: 0,
    lastcheckok: 1,
    lastchecktime: '',
    clicktimestamp: '',
    clickcount: 99999,
    clicktrend: 100,
    ssl_error: 0,
  };

  // Sleep timer
  useEffect(() => {
    if (!sleepTimerActive || sleepTimerCountdown === null) return;

    const timer = setInterval(() => {
      setSleepTimerCountdown((prev) => {
        if (prev === null || prev <= 0) {
          setIsPlaying(false);
          setSleepTimerActive(false);
          return null;
        }
        return prev - 1;
      });
    }, 60000); // Cada minuto

    return () => clearInterval(timer);
  }, [sleepTimerActive, sleepTimerCountdown]);

  // Helper para construir la lista completa de estaciones
  const buildStationList = (externalStations: Station[]): Station[] => {
    // PULSAR Original + 10 estaciones locales + emisoras externas
    const localStations = localPulsarStations.map((ls) => ls.station);
    return [pulsarOriginalStation, ...localStations, ...externalStations];
  };

  const loadTopStations = async () => {
    setLoading(true);
    const topStations = await getTopStations(50);
    setStations(buildStationList(topStations));
    setLoading(false);
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      loadTopStations();
      return;
    }
    setLoading(true);
    const results = await searchStationsByName(query, 50);
    setStations(buildStationList(results));
    setLoading(false);
  };

  const handleGenreSelect = async (genre: string) => {
    setSelectedGenre(genre);
    setSelectedCountry(null);
    setLoading(true);
    const results = await getStationsByTag(genre, 50);
    setStations(buildStationList(results));
    setLoading(false);
  };

  const handleCountrySelect = async (countryCode: string) => {
    setSelectedCountry(countryCode);
    setSelectedGenre(null);
    setLoading(true);
    const results = await getStationsByCountry(countryCode, 50);
    setStations(buildStationList(results));
    setLoading(false);
  };

  const handleStationClick = (station: Station) => {
    // Si es PULSAR Original, mostrar el componente especial
    if (station.stationuuid === 'pulsar-original') {
      setShowOriginal(true);
      setShowLocalStations(false);
      return;
    }
    
    // Si es una estación local PULSAR, mostrar el componente Original
    if (station.stationuuid.startsWith('pulsar-') && station.stationuuid !== 'pulsar-original') {
      setShowOriginal(true);
      setShowLocalStations(false);
      return;
    }
    
    // Si ya estamos en PULSAR Original y se hace clic en otra estación, salir
    if (showOriginal) {
      setShowOriginal(false);
    }
    if (showLocalStations) {
      setShowLocalStations(false);
    }
    
    if (currentStation?.stationuuid === station.stationuuid) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentStation(station);
      setIsPlaying(true);
    }
  };

  const handleLocalStationClick = (localStation: LocalPulsarStation) => {
    // Al hacer clic en una estación local, mostrar PULSAR Original
    setShowOriginal(true);
    setShowLocalStations(false);
  };

  const handleSendChatMessage = () => {
    if (!newChatMessage.trim()) return;
    const newMsg = {
      id: Date.now().toString(),
      user: 'Tú',
      message: newChatMessage,
      city: location.city,
      time: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }),
      avatar: '🎧',
    };
    setChatMessagesLocal([...chatMessagesLocal, newMsg]);
    setNewChatMessage('');
  };

  const handleSleepTimer = (minutes: number) => {
    setSleepTimerCountdown(minutes);
    setSleepTimerActive(true);
  };

  const getLocalAds = () => {
    return localAds.filter((ad) => ad.city === location.city).slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <audio ref={audioRef} crossOrigin="anonymous" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <PulsarLogo size={56} animated={true} showText={true} />
              
              {/* Toggle PULSAR Original */}
              <button
                onClick={() => {
                  setShowOriginal(!showOriginal);
                  setShowLocalStations(false);
                }}
                className={`ml-4 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  showOriginal
                    ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
              >
                {showOriginal ? '🎵 Original' : '📻 Radio'}
              </button>

              {/* Toggle Red Local */}
              <button
                onClick={() => {
                  setShowLocalStations(!showLocalStations);
                  setShowOriginal(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  showLocalStations
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
              >
                🌍 Red Local
              </button>
            </motion.div>

            <div className="flex items-center gap-3">
              {location.loading ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
                  <span className="text-xs text-gray-400">Detectando...</span>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-xs text-gray-300">{location.city}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {showOriginal ? (
          // PULSAR Original - Canal del Artista
          <PulsarOriginal />
        ) : showLocalStations ? (
          // Red PULSAR Local - 10 ciudades geolocalizadas
          <LocalStationsGrid
            stations={localPulsarStations}
            onStationClick={handleLocalStationClick}
            userCity={location.city}
          />
        ) : (
          // Radio Normal - Emisoras
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna Principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Reproductor Principal */}
              <motion.div
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {currentStation && (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                        style={{ backgroundColor: `${getGenreColor(currentStation.tags)}20` }}
                      >
                        {getGenreEmoji(currentStation.tags)}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">{currentStation.name}</h2>
                        <p className="text-sm text-gray-400">
                          {currentStation.country} • {currentStation.tags.split(',')[0]}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Headphones className="w-3 h-3" />
                            {formatListeners(currentStation.clickcount)} oyentes
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Star className="w-3 h-3" />
                            {currentStation.votes} votos
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (isFavorite(currentStation.stationuuid)) {
                          removeFromFavorites(currentStation.stationuuid);
                        } else {
                          addToFavorites(currentStation);
                        }
                      }}
                      className={`p-2 rounded-full transition-all ${
                        isFavorite(currentStation.stationuuid)
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-white/5 text-gray-400 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isFavorite(currentStation.stationuuid) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <AudioVisualizer
                    getAnalyserData={getAnalyserData}
                    isPlaying={isPlaying}
                    color={getGenreColor(currentStation.tags)}
                  />

                  <div className="flex items-center justify-center gap-4 mt-6">
                    <button
                      onClick={() => {
                        const idx = stations.findIndex((s) => s.stationuuid === currentStation.stationuuid);
                        const prev = stations[(idx - 1 + stations.length) % stations.length];
                        if (prev) handleStationClick(prev);
                      }}
                      className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all"
                    >
                      <SkipBack className="w-5 h-5" />
                    </button>
                    <motion.button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-5 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 shadow-lg shadow-orange-500/30"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                    </motion.button>
                    <button
                      onClick={() => {
                        const idx = stations.findIndex((s) => s.stationuuid === currentStation.stationuuid);
                        const next = stations[(idx + 1) % stations.length];
                        if (next) handleStationClick(next);
                      }}
                      className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all"
                    >
                      <SkipForward className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mt-6">
                    <button onClick={toggleMute} className="text-gray-400 hover:text-white transition-colors">
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="flex-1 h-2 rounded-full appearance-none bg-white/10 cursor-pointer"
                      style={{ accentColor: getGenreColor(currentStation.tags) }}
                    />
                    <span className="text-xs text-gray-400 w-10 text-right">{isMuted ? 0 : volume}%</span>
                  </div>
                </>
              )}
            </motion.div>

            {/* Búsqueda y Filtros */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  placeholder="Buscar emisoras por nombre..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-sm"
              >
                <Filter className="w-4 h-4" />
                Filtros
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    {/* Géneros */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-300 mb-3">Géneros</h3>
                      <div className="flex flex-wrap gap-2">
                        {genres.map((genre) => (
                          <button
                            key={genre.id}
                            onClick={() => handleGenreSelect(genre.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              selectedGenre === genre.id
                                ? 'bg-orange-500 text-white'
                                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            {genre.emoji} {genre.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Países */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-300 mb-3">Países</h3>
                      <div className="flex flex-wrap gap-2">
                        {popularCountries.map((country) => (
                          <button
                            key={country.code}
                            onClick={() => handleCountrySelect(country.code)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              selectedCountry === country.code
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            {country.emoji} {country.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Lista de Emisoras */}
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">
                  {selectedGenre
                    ? `Emisoras de ${genres.find((g) => g.id === selectedGenre)?.name}`
                    : selectedCountry
                    ? `Emisoras de ${popularCountries.find((c) => c.code === selectedCountry)?.name}`
                    : 'Top Emisoras'}
                </h2>
                <button
                  onClick={loadTopStations}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <RefreshCw className="w-8 h-8 animate-spin text-orange-400" />
                </div>
              ) : (
                <div className="space-y-2">
                  {stations.map((station) => {
                    const isPulsarOriginal = station.stationuuid === 'pulsar-original';
                    const isLocalPulsar = station.stationuuid.startsWith('pulsar-') && station.stationuuid !== 'pulsar-original';
                    
                    return (
                      <motion.button
                        key={station.stationuuid}
                        onClick={() => handleStationClick(station)}
                        className={`w-full text-left p-4 rounded-xl transition-all ${
                          isPulsarOriginal
                            ? 'bg-gradient-to-r from-orange-500/30 via-pink-500/30 to-purple-500/30 border-2 border-orange-400/50 shadow-lg shadow-orange-500/20'
                            : isLocalPulsar
                            ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-blue-400/30'
                            : currentStation?.stationuuid === station.stationuuid
                            ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30'
                            : 'bg-white/5 hover:bg-white/10 border border-white/5'
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-center gap-3">
                          {isPulsarOriginal ? (
                            // Logo especial para PULSAR Original
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-orange-500 to-pink-600 shadow-lg">
                              <PulsarLogo size={40} animated={false} />
                            </div>
                          ) : isLocalPulsar ? (
                            // Logo especial para estaciones locales PULSAR
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                              <PulsarLogo size={40} animated={false} />
                            </div>
                          ) : (
                            <div
                              className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                              style={{ backgroundColor: `${getGenreColor(station.tags)}20` }}
                            >
                              {getGenreEmoji(station.tags)}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className={`text-sm font-semibold truncate ${
                                isPulsarOriginal ? 'text-orange-300' : isLocalPulsar ? 'text-blue-300' : 'text-white'
                              }`}>
                                {station.name}
                              </h3>
                              {isPulsarOriginal && (
                                <span className="px-2 py-0.5 rounded-full bg-orange-500/30 border border-orange-400/50 text-[9px] font-bold text-orange-300 uppercase tracking-wider flex-shrink-0">
                                  ★ Oficial
                                </span>
                              )}
                              {isLocalPulsar && (
                                <span className="px-2 py-0.5 rounded-full bg-blue-500/30 border border-blue-400/50 text-[9px] font-bold text-blue-300 uppercase tracking-wider flex-shrink-0">
                                  🌍 Local
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 truncate">
                              {isPulsarOriginal 
                                ? 'Prof. Manuel Gago • Audius' 
                                : isLocalPulsar
                                ? `${station.state} • Tu música`
                                : `${station.country} • ${station.tags.split(',')[0]}`
                              }
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-[10px] text-gray-500">
                                {formatListeners(station.clickcount)} oyentes
                              </span>
                              <span className="text-[10px] text-gray-500">
                                {station.bitrate} kbps
                              </span>
                            </div>
                          </div>
                          {currentStation?.stationuuid === station.stationuuid && isPlaying && (
                            <motion.div
                              className="flex items-center gap-0.5"
                              animate={{ opacity: [1, 0.5, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              <div className="w-1 h-4 bg-orange-400 rounded-full" />
                              <div className="w-1 h-3 bg-orange-400 rounded-full" />
                              <div className="w-1 h-5 bg-orange-400 rounded-full" />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Columna Lateral */}
          <div className="space-y-6">
            {/* Chat en Vivo */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-4">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm font-bold text-white">Chat en Vivo</h3>
                <span className="ml-auto flex items-center gap-1 text-xs text-green-400">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  {chatMessagesLocal.length + 42} online
                </span>
              </div>
              <div className="h-64 overflow-y-auto space-y-3 mb-3">
                {chatMessagesLocal.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-2">
                    <span className="text-lg flex-shrink-0">{msg.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-blue-400">{msg.user}</span>
                        <span className="text-[10px] text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-xs text-gray-300 break-words">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newChatMessage}
                  onChange={(e) => setNewChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                />
                <button
                  onClick={handleSendChatMessage}
                  className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Publicidad Local */}
            <div className="rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-xl border border-amber-500/20 p-4">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Publicidad Local</h3>
                <span className="ml-auto text-[10px] text-gray-400">{location.city}</span>
              </div>
              <div className="space-y-3">
                {getLocalAds().map((ad) => (
                  <div key={ad.id} className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <div className="flex items-start gap-2">
                      <span className="text-2xl">{ad.emoji}</span>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-amber-300">{ad.business}</h4>
                        <p className="text-[11px] text-gray-400 mt-1">{ad.text}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[10px] text-gray-500">{ad.radius}km radio</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                            {ad.offer}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Programación */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-4">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-bold text-white">Programación</h3>
              </div>
              <div className="space-y-2">
                {scheduleItems.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg ${
                      item.isLive ? 'bg-green-500/10 border border-green-500/20' : 'bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-white">{item.show}</p>
                        <p className="text-[10px] text-gray-400">{item.host}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-300">{item.time}</p>
                        {item.isLive && (
                          <span className="text-[10px] text-green-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            LIVE
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sleep Timer */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-4">
              <div className="flex items-center gap-2 mb-4">
                <Timer className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Sleep Timer</h3>
                {sleepTimerActive && sleepTimerCountdown !== null && (
                  <span className="ml-auto text-xs text-cyan-400">{sleepTimerCountdown} min</span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {sleepTimerOptions.map((option) => (
                  <button
                    key={option.minutes}
                    onClick={() => handleSleepTimer(option.minutes)}
                    className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-xs text-gray-300"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
