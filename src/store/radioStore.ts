import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Station } from '../types';

interface RadioState {
  // Reproductor
  currentStation: Station | null;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  
  // Favoritos
  favorites: Station[];
  
  // Historial
  history: Station[];
  
  // UI
  activeTab: 'stations' | 'favorites' | 'history' | 'schedule' | 'map';
  showSleepTimer: boolean;
  sleepTimerMinutes: number | null;
  
  // Acciones
  setCurrentStation: (station: Station | null) => void;
  setIsPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  addToFavorites: (station: Station) => void;
  removeFromFavorites: (stationId: string) => void;
  isFavorite: (stationId: string) => boolean;
  addToHistory: (station: Station) => void;
  clearHistory: () => void;
  setActiveTab: (tab: RadioState['activeTab']) => void;
  setShowSleepTimer: (show: boolean) => void;
  setSleepTimer: (minutes: number | null) => void;
}

export const useRadioStore = create<RadioState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      currentStation: null,
      isPlaying: false,
      volume: 75,
      isMuted: false,
      favorites: [],
      history: [],
      activeTab: 'stations',
      showSleepTimer: false,
      sleepTimerMinutes: null,

      // Acciones
      setCurrentStation: (station) => set({ currentStation: station }),
      
      setIsPlaying: (playing) => set({ isPlaying: playing }),
      
      setVolume: (volume) => set({ volume, isMuted: volume === 0 }),
      
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
      
      addToFavorites: (station) => {
        const { favorites } = get();
        if (!favorites.find((s) => s.stationuuid === station.stationuuid)) {
          set({ favorites: [...favorites, station] });
        }
      },
      
      removeFromFavorites: (stationId) => {
        set((state) => ({
          favorites: state.favorites.filter((s) => s.stationuuid !== stationId),
        }));
      },
      
      isFavorite: (stationId) => {
        const { favorites } = get();
        return favorites.some((s) => s.stationuuid === stationId);
      },
      
      addToHistory: (station) => {
        set((state) => {
          const newHistory = [station, ...state.history.filter((s) => s.stationuuid !== station.stationuuid)];
          return { history: newHistory.slice(0, 50) }; // Máximo 50 elementos
        });
      },
      
      clearHistory: () => set({ history: [] }),
      
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      setShowSleepTimer: (show) => set({ showSleepTimer: show }),
      
      setSleepTimer: (minutes) => set({ sleepTimerMinutes: minutes }),
    }),
    {
      name: 'pulsar-fm-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        history: state.history,
        volume: state.volume,
      }),
    }
  )
);
