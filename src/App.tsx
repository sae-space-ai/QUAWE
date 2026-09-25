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
  getGenreEmoji,
  getGenreColor,
  formatListeners,
} from './services/radioApi';
import { genres, localAds, chatMessages, scheduleItems, sleepTimerOptions, popularCountries } from './data/constants';
import { Station } from './types';
import QuaweLogo from './components/QuaweLogo';
import QuaweOriginal from './components/QuaweOriginal';
import LocalStationsGrid from './components/LocalStationsGrid';
import ThematicChannels from './components/ThematicChannels';
import { localQuaweStations, getLocalStation, LocalQuaweStation } from './data/quaweStations';
import { thematicChannels, ThematicChannel, filterTracksByChannel, searchInAlbumsAndPlaylists } from './data/thematicChannels';
import { getAllThematicStations, ThematicStation } from './data/thematicStations';
import { getUserTracks, getTrackStreamUrl, getUserAlbums, getUserPlaylists, getAlbumTracks, getPlaylistTracks } from './services/audiusApi';
import { getNextTrack, addToHistory, getQueueStats } from './services/queueManager';
import { getRandomAdForCity, hasAdsForCity, LocalAd } from './data/localAds';
import { getRandomAdForChannel, hasAdsForChannel, ThematicAd } from './data/thematicAds';
import { getChannelContent, ChannelContent } from './data/channelContent';
import ChannelContentDisplay from './components/ChannelContentDisplay';
import { playLocalAd, stopLocalAd, isAdPlaying } from './services/adPlayer';
import { Megaphone } from 'lucide-react';
import PointsDashboard from './components/PointsDashboard';
import ProductCatalog from './components/ProductCatalog';
import UserProfile from './components/UserProfile';
import AuthModal from './components/AuthModal';
import PremiumModal from './components/PremiumModal';
import { earnPointsForListening } from './services/pointsSystem';
import { startAdScheduler, stopAdScheduler, pauseAdScheduler, resumeAdScheduler } from './services/adScheduler';
import { getCurrentUser, startListeningSession, stopListeningSession } from './services/authSystem';
import { isUserPremium } from './services/premiumSystem';

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
  const [showLocalStations, setShowLocalStations] = useState(false);
  const [showThematicChannels, setShowThematicChannels] = useState(false);
  const [selectedThematicChannel, setSelectedThematicChannel] = useState<ThematicChannel | null>(null);
  const [selectedChannelContent, setSelectedChannelContent] = useState<ChannelContent | null>(null);
  const [currentAd, setCurrentAd] = useState<LocalAd | ThematicAd | null>(null);
  const [isAdPlayingState, setIsAdPlayingState] = useState(false);
  const [adCountdown, setAdCountdown] = useState(0);
  const [showPointsDashboard, setShowPointsDashboard] = useState(false);
  const [showProductCatalog, setShowProductCatalog] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!getCurrentUser());
  const [isPremium, setIsPremium] = useState(false);

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

  // Crear estación especial Quawe Original
  const quaweOriginalStation: Station = {
    stationuuid: 'quawe-original',
    name: 'Quawe Original',
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

  // Sistema de puntos: ganar puntos por escuchar música
  useEffect(() => {
    if (!isPlaying || !currentStation) {
      // Si el usuario está logueado, detener sesión de escucha
      const user = getCurrentUser();
      if (user) {
        stopListeningSession(user.id);
      }
      return;
    }

    // Si el usuario está logueado, iniciar sesión de escucha
    const user = getCurrentUser();
    if (user) {
      startListeningSession(user.id);
      setIsPremium(isUserPremium(user.id));
    }

    // Ganar puntos cada minuto de escucha
    const pointsInterval = setInterval(() => {
      if (currentStation) {
        earnPointsForListening(currentStation.stationuuid, 1);
      }
    }, 60000); // Cada minuto

    return () => {
      clearInterval(pointsInterval);
      // Detener sesión de escucha al desmontar
      const user = getCurrentUser();
      if (user) {
        stopListeningSession(user.id);
      }
    };
  }, [isPlaying, currentStation]);

  // Sistema de cuñas publicitarias automáticas cada minuto
  useEffect(() => {
    if (!isPlaying || !currentStation) {
      stopAdScheduler();
      return;
    }

    // Determinar si es un canal temático
    const isThematic = currentStation.stationuuid.startsWith('quawe-') && 
                       currentStation.stationuuid !== 'quawe-original' &&
                       !localQuaweStations.some(ls => ls.station.stationuuid === currentStation.stationuuid);
    
    const channelId = isThematic ? currentStation.tags.split(',')[1] : null;

    // Iniciar el programador de anuncios
    startAdScheduler(
      currentStation.stationuuid,
      channelId,
      // Callback cuando inicia un anuncio
      () => {
        setIsPlaying(false); // Pausar música
        setIsAdPlayingState(true); // Mostrar overlay de anuncio
        setAdCountdown(12);
      },
      // Callback cuando termina un anuncio
      () => {
        setIsAdPlayingState(false); // Ocultar overlay
        setAdCountdown(0);
        setIsPlaying(true); // Reanudar música
      }
    );

    return () => {
      stopAdScheduler();
    };
  }, [isPlaying, currentStation]);

  // Función para reproducir anuncio local de 12 segundos
  const playStationAd = async (city: string) => {
    if (!hasAdsForCity(city)) {
      console.log(`[Ad] No hay anuncios para ${city}`);
      return false;
    }

    const ad = getRandomAdForCity(city);
    if (!ad) return false;

    setCurrentAd(ad);
    setIsAdPlayingState(true);
    setAdCountdown(12);

    // Pausar música temporalmente
    const wasPlaying = isPlaying;
    if (wasPlaying) {
      setIsPlaying(false);
    }

    // Iniciar countdown
    const countdownInterval = setInterval(() => {
      setAdCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Reproducir anuncio
    await playLocalAd(ad, () => {
      // Al finalizar el anuncio
      clearInterval(countdownInterval);
      setCurrentAd(null);
      setIsAdPlayingState(false);
      setAdCountdown(0);
      
      // Reanudar música si estaba sonando
      if (wasPlaying) {
        setIsPlaying(true);
      }
    });

    return true;
  };

  // Función para reproducir anuncio temático de 12 segundos
  const playThematicAd = async (channelId: string) => {
    if (!hasAdsForChannel(channelId)) {
      console.log(`[Ad] No hay anuncios para el canal ${channelId}`);
      return false;
    }

    const ad = getRandomAdForChannel(channelId);
    if (!ad) return false;

    setCurrentAd(ad);
    setIsAdPlayingState(true);
    setAdCountdown(12);

    // Pausar música temporalmente
    const wasPlaying = isPlaying;
    if (wasPlaying) {
      setIsPlaying(false);
    }

    // Iniciar countdown
    const countdownInterval = setInterval(() => {
      setAdCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Reproducir anuncio
    await playLocalAd(ad, () => {
      // Al finalizar el anuncio
      clearInterval(countdownInterval);
      setCurrentAd(null);
      setIsAdPlayingState(false);
      setAdCountdown(0);
      
      // Reanudar música si estaba sonando
      if (wasPlaying) {
        setIsPlaying(true);
      }
    });

    return true;
  };

  // Función para saltar anuncio
  const skipAd = () => {
    stopLocalAd();
    setCurrentAd(null);
    setIsAdPlayingState(false);
    setAdCountdown(0);
    setIsPlaying(true);
  };

  // Función para obtener URL de streaming de Audius
  const getAudiusStreamUrl = async (stationId?: string): Promise<string | null> => {
    try {
      const tracks = await getUserTracks('profmanuelgago', 100);
      if (tracks.length === 0) return null;
      
      // Si no hay stationId, usar uno por defecto
      const id = stationId || 'default-station';
      
      // Obtener siguiente track de la cola (evita repeticiones)
      const nextTrack = await getNextTrack(id, tracks);
      
      if (!nextTrack) {
        console.error('[Stream] No hay tracks disponibles en la cola');
        return null;
      }
      
      const streamUrl = await getTrackStreamUrl(nextTrack.id);
      
      // Log de estadísticas de la cola
      const stats = getQueueStats(id);
      console.log(`[Stream] Cola ${id}: ${stats.queueSize} en cola, ${stats.historySize} en historial`);
      
      return streamUrl;
    } catch (error) {
      console.error('Error getting Audius stream:', error);
      return null;
    }
  };

  // Función para obtener URL de streaming de Audius filtrada por canal temático
  const getAudiusStreamUrlByChannel = async (channel: ThematicChannel, stationId?: string): Promise<string | null> => {
    try {
      // 1. Buscar en tracks directos
      const allTracks = await getUserTracks('profmanuelgago', 100);
      const tracksFromDirect = filterTracksByChannel(allTracks, channel);
      
      // 2. Buscar en álbumes y playlists
      const tracksFromAlbumsPlaylists = await searchInAlbumsAndPlaylists(
        'profmanuelgago',
        channel,
        getUserAlbums,
        getUserPlaylists,
        getAlbumTracks,
        getPlaylistTracks
      );
      
      // 3. Combinar resultados (eliminar duplicados)
      const allMatches = [...tracksFromDirect, ...tracksFromAlbumsPlaylists];
      const uniqueTracks = Array.from(
        new Map(allMatches.map(track => [track.id, track])).values()
      );
      
      // 4. Si no hay matches, usar todos los tracks
      const tracksToUse = uniqueTracks.length > 0 ? uniqueTracks : allTracks;
      
      if (tracksToUse.length === 0) {
        console.error('No tracks available');
        return null;
      }
      
      // 5. Usar sistema de colas para evitar repeticiones
      const id = stationId || `channel-${channel.id}`;
      const nextTrack = await getNextTrack(id, tracksToUse);
      
      if (!nextTrack) {
        console.error('[Stream] No hay tracks disponibles en la cola del canal');
        return null;
      }
      
      const streamUrl = await getTrackStreamUrl(nextTrack.id);
      
      // Log de estadísticas de la cola
      const stats = getQueueStats(id);
      console.log(`[Stream] Canal ${channel.name} (${id}): ${stats.queueSize} en cola, ${stats.historySize} en historial`);
      
      return streamUrl;
    } catch (error) {
      console.error('Error getting Audius stream by channel:', error);
      return null;
    }
  };

  // Cargar solo las emisoras Quawe propias
  const loadQuaweStations = () => {
    setLoading(true);
    // Solo Quawe Original + 100 estaciones locales
    const localStations = localQuaweStations.map((ls) => ls.station);
    setStations([quaweOriginalStation, ...localStations]);
    setLoading(false);
  };

  // Cargar emisoras al inicio
  useEffect(() => {
    loadQuaweStations();
  }, []);

  // Búsqueda simple en las emisoras Quawe
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      loadQuaweStations();
      return;
    }
    
    setLoading(true);
    const localStations = localQuaweStations.map((ls) => ls.station);
    const allStations = [quaweOriginalStation, ...localStations];
    
    const filtered = allStations.filter((station) =>
      station.name.toLowerCase().includes(query.toLowerCase()) ||
      station.tags.toLowerCase().includes(query.toLowerCase()) ||
      station.country.toLowerCase().includes(query.toLowerCase())
    );
    
    setStations(filtered);
    setLoading(false);
  };

  // Filtro por género (solo en tags de Quawe)
  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
    setSelectedCountry(null);
    setLoading(true);
    
    const localStations = localQuaweStations.map((ls) => ls.station);
    const allStations = [quaweOriginalStation, ...localStations];
    
    const filtered = allStations.filter((station) =>
      station.tags.toLowerCase().includes(genre.toLowerCase())
    );
    
    setStations(filtered);
    setLoading(false);
  };

  // Filtro por país (solo en Quawe)
  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setSelectedGenre(null);
    setLoading(true);
    
    const localStations = localQuaweStations.map((ls) => ls.station);
    const allStations = [quaweOriginalStation, ...localStations];
    
    const filtered = allStations.filter((station) =>
      station.countrycode === countryCode
    );
    
    setStations(filtered);
    setLoading(false);
  };

  const handleStationClick = async (station: Station) => {
    // Si es Quawe Original o cualquier emisora local Quawe
    if (station.stationuuid === 'quawe-original' || 
        (station.stationuuid.startsWith('quawe-') && station.stationuuid !== 'quawe-original')) {
      
      // Ocultar vista de red local
      setShowLocalStations(false);
      
      // Reproducir anuncio local si existe para esta ciudad
      const city = station.state || station.name.split(' ').pop() || '';
      if (city && hasAdsForCity(city)) {
        await playStationAd(city);
      }
      
      // Obtener URL de streaming de Audius con stationId para evitar repeticiones
      const streamUrl = await getAudiusStreamUrl(station.stationuuid);
      
      if (streamUrl) {
        // Crear una copia de la estación con la URL de streaming
        const stationWithStream: Station = {
          ...station,
          url: streamUrl,
          url_resolved: streamUrl,
        };
        
        // Establecer como estación actual y reproducir
        setCurrentStation(stationWithStream);
        setIsPlaying(true);
      } else {
        console.error('No se pudo obtener la URL de streaming de Audius');
      }
      
      return;
    }
    
    // Si es una emisora normal
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

  const handleLocalStationClick = async (localStation: LocalQuaweStation) => {
    // Al hacer clic en una estación local, reproducir música de Audius
    setShowLocalStations(false);
    
    // Obtener URL de streaming de Audius con stationId para evitar repeticiones
    const streamUrl = await getAudiusStreamUrl(localStation.station.stationuuid);
    
    if (streamUrl) {
      // Crear una copia de la estación con la URL de streaming
      const stationWithStream: Station = {
        ...localStation.station,
        url: streamUrl,
        url_resolved: streamUrl,
      };
      
      // Establecer como estación actual y reproducir
      setCurrentStation(stationWithStream);
      setIsPlaying(true);
    } else {
      console.error('No se pudo obtener la URL de streaming de Audius');
    }
  };

  const handleThematicChannelSelect = (channel: ThematicChannel) => {
    setSelectedThematicChannel(channel);
    const content = getChannelContent(channel.id);
    setSelectedChannelContent(content);
  };

  const handleThematicStationClick = async (thematicStation: ThematicStation) => {
    // Al hacer clic en una emisora temática, reproducir música filtrada por canal
    setShowThematicChannels(false);
    
    // Obtener el canal temático
    const channel = thematicChannels.find(c => c.id === thematicStation.channelId);
    if (!channel) {
      console.error('Canal temático no encontrado');
      return;
    }
    
    // Reproducir anuncio temático si existe para este canal
    if (hasAdsForChannel(channel.id)) {
      await playThematicAd(channel.id);
    }
    
    // Obtener URL de streaming de Audius filtrada por canal con stationId para evitar repeticiones
    const streamUrl = await getAudiusStreamUrlByChannel(channel, thematicStation.station.stationuuid);
    
    if (streamUrl) {
      // Crear una copia de la estación con la URL de streaming
      const stationWithStream: Station = {
        ...thematicStation.station,
        url: streamUrl,
        url_resolved: streamUrl,
      };
      
      // Establecer como estación actual y reproducir
      setCurrentStation(stationWithStream);
      setIsPlaying(true);
    } else {
      console.error('No se pudo obtener la URL de streaming de Audius para el canal temático');
    }
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
              <QuaweLogo size={56} animated={true} showText={true} />

              {/* Toggle Red Local */}
              <button
                onClick={() => {
                  setShowLocalStations(!showLocalStations);
                  setShowThematicChannels(false);
                  setShowPointsDashboard(false);
                  setShowProductCatalog(false);
                  setShowUserProfile(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  showLocalStations
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
              >
                🌍 Red Local
              </button>

              {/* Toggle Canales Temáticos */}
              <button
                onClick={() => {
                  setShowThematicChannels(!showThematicChannels);
                  setShowLocalStations(false);
                  setShowPointsDashboard(false);
                  setShowProductCatalog(false);
                  setShowUserProfile(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  showThematicChannels
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
              >
                🎵 Temáticos
              </button>

              {/* Toggle Mis Puntos */}
              <button
                onClick={() => {
                  setShowPointsDashboard(!showPointsDashboard);
                  setShowLocalStations(false);
                  setShowThematicChannels(false);
                  setShowProductCatalog(false);
                  setShowUserProfile(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  showPointsDashboard
                    ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg shadow-green-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
              >
                💰 Mis Puntos
              </button>

              {/* Toggle Catálogo */}
              <button
                onClick={() => {
                  setShowProductCatalog(!showProductCatalog);
                  setShowLocalStations(false);
                  setShowThematicChannels(false);
                  setShowPointsDashboard(false);
                  setShowUserProfile(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  showProductCatalog
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg shadow-yellow-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
              >
                🎁 Catálogo
              </button>

              {/* Toggle Perfil / Login */}
              {isUserLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      setShowUserProfile(!showUserProfile);
                      setShowLocalStations(false);
                      setShowThematicChannels(false);
                      setShowPointsDashboard(false);
                      setShowProductCatalog(false);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      showUserProfile
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    👤 Mi Perfil
                  </button>
                  <button
                    onClick={() => setShowPremiumModal(true)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      isPremium
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg shadow-yellow-500/30'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {isPremium ? '👑 Premium' : '⭐ Premium'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
                >
                  🔐 Registrarse
                </button>
              )}
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
        {showUserProfile ? (
          // Perfil de Usuario
          <UserProfile onLogout={() => {
            setShowUserProfile(false);
            setIsUserLoggedIn(false);
          }} />
        ) : showPointsDashboard ? (
          // Dashboard de Puntos
          <PointsDashboard />
        ) : showProductCatalog ? (
          // Catálogo de Productos
          <ProductCatalog />
        ) : showThematicChannels ? (
          // Canales Temáticos
          <div className="space-y-6">
            <ThematicChannels
              onChannelSelect={handleThematicChannelSelect}
              onStationSelect={handleThematicStationClick}
              selectedChannel={selectedThematicChannel}
            />
            {selectedChannelContent && (
              <ChannelContentDisplay content={selectedChannelContent} />
            )}
          </div>
        ) : showLocalStations ? (
          // Red Quawe Local - 100 ciudades geolocalizadas
          <LocalStationsGrid
            stations={localQuaweStations}
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
                {/* Overlay de Anuncio */}
                <AnimatePresence>
                  {isAdPlayingState && currentAd && (
                    <motion.div
                      className="absolute inset-0 z-50 bg-gradient-to-br from-amber-500/95 via-orange-500/95 to-red-500/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="flex flex-col items-center gap-4 max-w-md"
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <Megaphone className="w-16 h-16 text-white" />
                        </motion.div>
                        
                        <div className="text-center">
                          <p className="text-xs text-white/80 uppercase tracking-wider mb-2">
                            Anuncio Patrocinado
                          </p>
                          <h3 className="text-xl font-bold text-white mb-2">
                            {currentAd.business}
                          </h3>
                          <p className="text-sm text-white/90 leading-relaxed">
                            {currentAd.message}
                          </p>
                        </div>

                        {/* Barra de progreso del anuncio */}
                        <div className="w-full max-w-xs">
                          <div className="flex items-center justify-between text-xs text-white/80 mb-2">
                            <span>Anuncio</span>
                            <span className="font-mono">{adCountdown}s</span>
                          </div>
                          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-white"
                              initial={{ width: '100%' }}
                              animate={{ width: '0%' }}
                              transition={{ duration: 12, ease: 'linear' }}
                              key={currentAd.id}
                            />
                          </div>
                        </div>

                        <button
                          onClick={skipAd}
                          className="mt-4 px-6 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white text-sm font-medium transition-all"
                        >
                          Saltar Anuncio
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

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
                    ? `QUAWE ${genres.find((g) => g.id === selectedGenre)?.name}`
                    : selectedCountry
                    ? `QUAWE ${popularCountries.find((c) => c.code === selectedCountry)?.name}`
                    : 'Red QUAWE'}
                </h2>
                <button
                  onClick={loadQuaweStations}
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
                    const isPulsarOriginal = station.stationuuid === 'quawe-original';
                    const isLocalPulsar = station.stationuuid.startsWith('quawe-') && station.stationuuid !== 'quawe-original';
                    
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
                            // Logo especial para Quawe Original
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-orange-500 to-pink-600 shadow-lg">
                              <QuaweLogo size={40} animated={false} />
                            </div>
                          ) : isLocalPulsar ? (
                            // Logo especial para estaciones locales Quawe
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                              <QuaweLogo size={40} animated={false} />
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

      {/* Modal de Autenticación */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setIsUserLoggedIn(true);
          setShowAuthModal(false);
        }}
      />

      {/* Modal de Membresía Premium */}
      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onSuccess={() => {
          setIsPremium(true);
          setShowPremiumModal(false);
        }}
      />
    </div>
  );
}
