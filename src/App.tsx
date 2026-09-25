import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radio, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX,
  MapPin, Users, Clock, MessageCircle, Send, Music, Search,
  Globe, Signal, Heart, Share2, ChevronDown, Zap, Menu, X,
  Headphones, Mic2, TrendingUp, Shield
} from "lucide-react";
import { stations, localAds, schedules, chatMessages, cities, Station, LocalAd } from "./data/stations";
import { useGeolocation } from "./hooks/useGeolocation";

// ============================================
// Audio Visualizer Component
// ============================================
function AudioVisualizer({ isPlaying, color }: { isPlaying: boolean; color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const barsRef = useRef<number[]>(Array(48).fill(0));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const barCount = barsRef.current.length;
      const barWidth = width / barCount - 2;

      for (let i = 0; i < barCount; i++) {
        if (isPlaying) {
          barsRef.current[i] += (Math.random() * 8 - 4);
          barsRef.current[i] = Math.max(4, Math.min(height * 0.9, barsRef.current[i]));
        } else {
          barsRef.current[i] *= 0.92;
          barsRef.current[i] = Math.max(2, barsRef.current[i]);
        }

        const x = i * (barWidth + 2);
        const barHeight = barsRef.current[i];
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
  }, [isPlaying, color]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={80}
      className="w-full h-20 rounded-xl opacity-80"
    />
  );
}

// ============================================
// Mini World Map Component
// ============================================
function WorldMap({ userLat, userLng, stations: stationList }: {
  userLat: number;
  userLng: number;
  stations: Station[];
}) {
  // Simple Mercator projection
  const project = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const latRad = (lat * Math.PI) / 180;
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    const y = 50 - (mercN / Math.PI) * 50;
    return { x, y };
  };

  return (
    <div className="relative w-full h-48 bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl overflow-hidden border border-white/5">
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 16.6} x2="100" y2={i * 16.6} stroke="white" strokeWidth="0.2" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`v-${i}`} x1={i * 9.09} y1="0" x2={i * 9.09} y2="100" stroke="white" strokeWidth="0.2" />
        ))}
      </svg>

      {/* Station markers */}
      {stationList.map((station) => {
        const pos = project(station.lat, station.lng);
        return (
          <motion.div
            key={station.id}
            className="absolute w-3 h-3 rounded-full cursor-pointer"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              backgroundColor: station.color,
              boxShadow: `0 0 8px ${station.color}`,
            }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
            title={`${station.name} - ${station.city}`}
          />
        );
      })}

      {/* User location */}
      {(() => {
        const pos = project(userLat, userLng);
        return (
          <motion.div
            className="absolute w-4 h-4 rounded-full bg-white border-2 border-blue-400 z-10"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
            animate={{ scale: [1, 1.5, 1], boxShadow: ["0 0 0px white", "0 0 12px white", "0 0 0px white"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        );
      })()}

      {/* Label */}
      <div className="absolute bottom-2 left-3 text-[10px] text-white/40 font-mono">
        COBERTURA GLOBAL • {stationList.length} EMISORAS ACTIVAS
      </div>
    </div>
  );
}

// ============================================
// Station Card
// ============================================
function StationCard({ station, isActive, onClick }: {
  station: Station;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-xl transition-all duration-300 border ${
        isActive
          ? "bg-white/10 border-white/20 shadow-lg"
          : "bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/10"
      }`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ backgroundColor: `${station.color}20`, border: `1px solid ${station.color}40` }}
        >
          {station.coverEmoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white truncate">{station.name}</h3>
            {isActive && (
              <motion.span
                className="flex-shrink-0 w-2 h-2 rounded-full bg-green-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </div>
          <p className="text-xs text-gray-400 truncate">{station.genre}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-gray-500">{station.frequency}</span>
            <span className="text-[10px] text-gray-600">•</span>
            <span className="text-[10px] text-gray-500 flex items-center gap-0.5">
              <Users className="w-2.5 h-2.5" />
              {station.listeners.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

// ============================================
// Local Ad Card
// ============================================
function LocalAdCard({ ad }: { ad: LocalAd }) {
  return (
    <motion.div
      className="p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start gap-2">
        <span className="text-2xl">{ad.emoji}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-amber-300">{ad.business}</h4>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
              {ad.offer}
            </span>
          </div>
          <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{ad.text}</p>
          <div className="flex items-center gap-1 mt-1.5">
            <MapPin className="w-2.5 h-2.5 text-amber-500/60" />
            <span className="text-[10px] text-gray-500">{ad.city} • {ad.radius}km radio</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// Chat Component
// ============================================
function ChatPanel() {
  const [messages, setMessages] = useState(chatMessages);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg = {
      id: Date.now().toString(),
      user: "Tú",
      message: newMessage,
      city: "Tu ciudad",
      time: new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" }),
      avatar: "🎧",
    };
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-0">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-2"
          >
            <span className="text-lg flex-shrink-0">{msg.avatar}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-blue-400">{msg.user}</span>
                <span className="text-[10px] text-gray-600">{msg.time}</span>
                <span className="text-[10px] text-gray-600 flex items-center gap-0.5">
                  <MapPin className="w-2 h-2" />{msg.city}
                </span>
              </div>
              <p className="text-xs text-gray-300 break-words">{msg.message}</p>
            </div>
          </motion.div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
        />
        <button
          onClick={handleSend}
          className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors"
        >
          <Send className="w-3.5 h-3.5 text-white" />
        </button>
      </div>
    </div>
  );
}

// ============================================
// Main App
// ============================================
export default function App() {
  const [currentStation, setCurrentStation] = useState<Station>(stations[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<"stations" | "schedule" | "map">("stations");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [liked, setLiked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { location } = useGeolocation();

  // Filter stations by search
  const filteredStations = stations.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get local ads for user's city
  const userLocalAds = localAds.filter((ad) => ad.city === location.city);
  const fallbackAds = userLocalAds.length > 0 ? userLocalAds : localAds.slice(0, 3);

  const handleStationChange = useCallback((station: Station) => {
    setCurrentStation(station);
    setIsPlaying(true);
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextStation = () => {
    const idx = stations.findIndex((s) => s.id === currentStation.id);
    const next = stations[(idx + 1) % stations.length];
    handleStationChange(next);
  };

  const prevStation = () => {
    const idx = stations.findIndex((s) => s.id === currentStation.id);
    const prev = stations[(idx - 1 + stations.length) % stations.length];
    handleStationChange(prev);
  };

  // Simulate listener count changes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStation((prev) => ({
        ...prev,
        listeners: prev.listeners + Math.floor(Math.random() * 10 - 5),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={currentStation.streamUrl} />

      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 flex items-center justify-center"
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 4, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
            >
              <Radio className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h1 className="text-lg font-black tracking-tight bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                ONDA GLOBAL
              </h1>
              <p className="text-[10px] text-gray-500 -mt-0.5 tracking-widest uppercase">
                Cadena Radiofónica Geolocal
              </p>
            </div>
          </div>

          {/* Location badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs text-gray-300">
              {location.loading ? "Detectando..." : location.city}
            </span>
            {location.error && (
              <span className="text-[10px] text-amber-400">(simulado)</span>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden p-2 rounded-lg bg-white/5"
          >
            {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* ============================================ */}
      {/* MAIN CONTENT */}
      {/* ============================================ */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-4 flex flex-col lg:flex-row gap-4">
        {/* LEFT SIDEBAR - Stations */}
        <aside className={`lg:w-72 flex-shrink-0 ${showMobileMenu ? "block" : "hidden lg:block"}`}>
          <div className="sticky top-20">
            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-white/5 rounded-xl mb-3">
              {[
                { id: "stations" as const, label: "Emisoras", icon: Radio },
                { id: "schedule" as const, label: "Programación", icon: Clock },
                { id: "map" as const, label: "Cobertura", icon: Globe },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-white/10 text-white"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content based on tab */}
            <AnimatePresence mode="wait">
              {activeTab === "stations" && (
                <motion.div
                  key="stations"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Search */}
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar emisora..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                    />
                  </div>

                  {/* Station list */}
                  <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
                    {filteredStations.map((station) => (
                      <StationCard
                        key={station.id}
                        station={station}
                        isActive={currentStation.id === station.id}
                        onClick={() => handleStationChange(station)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "schedule" && (
                <motion.div
                  key="schedule"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2"
                >
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <h3 className="text-xs font-bold text-gray-300 mb-3 flex items-center gap-2">
                      <Mic2 className="w-3.5 h-3.5 text-orange-400" />
                      Programación de Hoy
                    </h3>
                    {schedules.default.map((item, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-3 py-2 border-b border-white/5 last:border-0 ${
                          item.isLive ? "text-green-400" : "text-gray-400"
                        }`}
                      >
                        <span className="text-[11px] font-mono w-12 flex-shrink-0">{item.time}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{item.show}</p>
                          <p className="text-[10px] text-gray-500">{item.host}</p>
                        </div>
                        {item.isLive && (
                          <span className="flex items-center gap-1 text-[10px] text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            LIVE
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "map" && (
                <motion.div
                  key="map"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <WorldMap
                    userLat={location.lat}
                    userLng={location.lng}
                    stations={stations}
                  />
                  <div className="mt-3 space-y-1.5">
                    {cities.map((city) => (
                      <div key={city.name} className="flex items-center gap-2 text-xs text-gray-400 py-1">
                        <span>{city.emoji}</span>
                        <span className="flex-1">{city.name}</span>
                        <span className="text-[10px] text-gray-600">{city.country}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </aside>

        {/* CENTER - Main Player */}
        <main className="flex-1 min-w-0">
          {/* Now Playing Hero */}
          <motion.div
            key={currentStation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl border border-white/10"
            style={{
              background: `linear-gradient(135deg, ${currentStation.color}15 0%, ${currentStation.color}05 50%, transparent 100%)`,
            }}
          >
            {/* Background glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: currentStation.color }}
            />

            <div className="relative p-6 sm:p-8">
              {/* Station info */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">{currentStation.coverEmoji}</span>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-white">{currentStation.name}</h2>
                      <p className="text-xs text-gray-400">{currentStation.frequency} • {currentStation.city}, {currentStation.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Signal className="w-3 h-3 text-green-400" />
                      En vivo
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Users className="w-3 h-3" />
                      {currentStation.listeners.toLocaleString()} oyentes
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Headphones className="w-3 h-3" />
                      {currentStation.genre}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`p-2 rounded-full transition-all ${liked ? "bg-red-500/20 text-red-400" : "bg-white/5 text-gray-400 hover:text-white"}`}
                  >
                    <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                  </button>
                  <button className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white transition-all">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Current track */}
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Sonando ahora</p>
                <h3 className="text-lg sm:text-xl font-bold text-white">{currentStation.currentTrack}</h3>
                <p className="text-sm text-gray-400">{currentStation.currentArtist}</p>
              </div>

              {/* Visualizer */}
              <div className="mb-6">
                <AudioVisualizer isPlaying={isPlaying} color={currentStation.color} />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={prevStation}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all"
                >
                  <SkipBack className="w-5 h-5 text-gray-300" />
                </button>
                <motion.button
                  onClick={togglePlay}
                  className="p-4 rounded-full text-white shadow-lg"
                  style={{ backgroundColor: currentStation.color }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </motion.button>
                <button
                  onClick={nextStation}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all"
                >
                  <SkipForward className="w-5 h-5 text-gray-300" />
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center justify-center gap-3 mt-5">
                <button onClick={() => setIsMuted(!isMuted)} className="text-gray-400 hover:text-white transition-colors">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(Number(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-32 sm:w-48 h-1 rounded-full appearance-none bg-white/10 accent-white cursor-pointer"
                  style={{ accentColor: currentStation.color }}
                />
                <span className="text-[10px] text-gray-500 w-8 text-right">{isMuted ? 0 : volume}%</span>
              </div>
            </div>
          </motion.div>

          {/* Local Ads Section */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Publicidad Local</h3>
              <span className="text-[10px] text-gray-500 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                <MapPin className="w-2.5 h-2.5 inline mr-1" />
                {location.city}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {fallbackAds.map((ad) => (
                <LocalAdCard key={ad.id} ad={ad} />
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Radio, label: "Emisoras", value: stations.length.toString(), color: "text-blue-400" },
              { icon: Users, label: "Oyentes Total", value: "80.6K", color: "text-green-400" },
              { icon: Globe, label: "Países", value: cities.length.toString(), color: "text-purple-400" },
              { icon: TrendingUp, label: "Crecimiento", value: "+12.4%", color: "text-amber-400" },
            ].map((stat, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <stat.icon className={`w-4 h-4 ${stat.color} mb-1`} />
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-[10px] text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </main>

        {/* RIGHT SIDEBAR - Chat & Info */}
        <aside className="lg:w-72 flex-shrink-0">
          <div className="sticky top-20 space-y-4">
            {/* Chat */}
            <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold text-white">Chat en Vivo</h3>
                <span className="ml-auto flex items-center gap-1 text-[10px] text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  {chatMessages.length + 42} online
                </span>
              </div>
              <div className="h-56">
                <ChatPanel />
              </div>
            </div>

            {/* Nearby Stations */}
            <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-green-400" />
                <h3 className="text-sm font-bold text-white">Emisoras Cercanas</h3>
              </div>
              <div className="space-y-2">
                {stations.slice(0, 3).map((station) => (
                  <button
                    key={station.id}
                    onClick={() => handleStationChange(station)}
                    className="w-full flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-left"
                  >
                    <span className="text-lg">{station.coverEmoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate">{station.name}</p>
                      <p className="text-[10px] text-gray-500">{station.city}</p>
                    </div>
                    <span className="text-[10px] text-gray-500">{station.frequency}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Network Security */}
            <div className="rounded-xl bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-green-400" />
                <h3 className="text-xs font-bold text-green-300">Red Segura</h3>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Todas las transmisiones están encriptadas. Tu ubicación solo se usa para personalizar publicidad local.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] text-green-400">Conexión activa y segura</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ============================================ */}
      {/* BOTTOM PLAYER BAR (Mobile) */}
      {/* ============================================ */}
      <div className="lg:hidden sticky bottom-0 bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
            style={{ backgroundColor: `${currentStation.color}20` }}
          >
            {currentStation.coverEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">{currentStation.currentTrack}</p>
            <p className="text-[10px] text-gray-400 truncate">{currentStation.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={prevStation} className="p-2 text-gray-400">
              <SkipBack className="w-4 h-4" />
            </button>
            <motion.button
              onClick={togglePlay}
              className="p-2.5 rounded-full text-white"
              style={{ backgroundColor: currentStation.color }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </motion.button>
            <button onClick={nextStation} className="p-2 text-gray-400">
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <footer className="border-t border-white/5 mt-8 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <Radio className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">ONDA GLOBAL</p>
              <p className="text-[10px] text-gray-500">Cadena Radiofónica Geolocal © 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-gray-500">
            <span>{stations.length} emisoras</span>
            <span>•</span>
            <span>{cities.length} ciudades</span>
            <span>•</span>
            <span>Publicidad geolocalizada</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Streaming activo
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
