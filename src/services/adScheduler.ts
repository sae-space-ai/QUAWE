// Sistema de Cuñas Publicitarias Automáticas
// Reproduce anuncios cada minuto de música

import { LocalAd, getRandomAdForCity, hasAdsForCity } from '../data/localAds';
import { ThematicAd, getRandomAdForChannel, hasAdsForChannel } from '../data/thematicAds';
import { playLocalAd, stopLocalAd } from './adPlayer';

export interface AdSchedulerConfig {
  intervalMinutes: number; // Cada cuántos minutos reproducir anuncio
  adDuration: number; // Duración del anuncio en segundos
  enabled: boolean;
}

const DEFAULT_CONFIG: AdSchedulerConfig = {
  intervalMinutes: 1,
  adDuration: 12,
  enabled: true,
};

class AdScheduler {
  private config: AdSchedulerConfig;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private isPlayingAd: boolean = false;
  private onAdStart: (() => void) | null = null;
  private onAdEnd: (() => void) | null = null;
  private currentStationId: string | null = null;
  private currentChannelId: string | null = null;
  private adsPlayed: number = 0;

  constructor(config: Partial<AdSchedulerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  // Iniciar el programador de anuncios
  start(
    stationId: string,
    channelId: string | null,
    onAdStart: () => void,
    onAdEnd: () => void
  ): void {
    // Limpiar timer anterior si existe
    this.stop();

    this.currentStationId = stationId;
    this.currentChannelId = channelId;
    this.onAdStart = onAdStart;
    this.onAdEnd = onAdEnd;
    this.adsPlayed = 0;

    // Programar el primer anuncio después del intervalo
    this.scheduleNextAd();

    console.log(`[AdScheduler] Iniciado para estación ${stationId}, anuncios cada ${this.config.intervalMinutes} minuto(s)`);
  }

  // Detener el programador
  stop(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.isPlayingAd = false;
    this.currentStationId = null;
    this.currentChannelId = null;
    this.onAdStart = null;
    this.onAdEnd = null;

    console.log('[AdScheduler] Detenido');
  }

  // Programar el siguiente anuncio
  private scheduleNextAd(): void {
    if (!this.config.enabled) return;

    const intervalMs = this.config.intervalMinutes * 60 * 1000;

    this.timer = setTimeout(() => {
      this.playAd();
    }, intervalMs);
  }

  // Reproducir anuncio
  private async playAd(): Promise<void> {
    if (this.isPlayingAd || !this.currentStationId) return;

    this.isPlayingAd = true;
    this.onAdStart?.();

    let ad: LocalAd | ThematicAd | null = null;

    // Prioridad: anuncios temáticos si hay canal, sino anuncios locales
    if (this.currentChannelId && hasAdsForChannel(this.currentChannelId)) {
      ad = getRandomAdForChannel(this.currentChannelId);
    } else if (hasAdsForCity(this.currentStationId)) {
      ad = getRandomAdForCity(this.currentStationId);
    }

    if (ad) {
      console.log(`[AdScheduler] Reproduciendo anuncio: ${ad.business}`);
      
      await playLocalAd(ad, () => {
        // Al finalizar el anuncio
        this.isPlayingAd = false;
        this.adsPlayed++;
        this.onAdEnd?.();
        
        // Programar el siguiente anuncio
        this.scheduleNextAd();
        
        console.log(`[AdScheduler] Anuncio finalizado. Total reproducidos: ${this.adsPlayed}`);
      });
    } else {
      // No hay anuncios disponibles, continuar con la música
      console.log('[AdScheduler] No hay anuncios disponibles, continuando con música');
      this.isPlayingAd = false;
      this.onAdEnd?.();
      this.scheduleNextAd();
    }
  }

  // Pausar el programador (temporalmente)
  pause(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  // Reanudar el programador
  resume(): void {
    if (this.config.enabled && !this.timer && this.currentStationId) {
      this.scheduleNextAd();
    }
  }

  // Obtener estadísticas
  getStats(): { adsPlayed: number; isPlayingAd: boolean; config: AdSchedulerConfig } {
    return {
      adsPlayed: this.adsPlayed,
      isPlayingAd: this.isPlayingAd,
      config: this.config,
    };
  }

  // Actualizar configuración
  updateConfig(newConfig: Partial<AdSchedulerConfig>): void {
    this.config = { ...this.config, ...newConfig };
    console.log('[AdScheduler] Configuración actualizada:', this.config);
  }

  // Habilitar/deshabilitar anuncios
  setEnabled(enabled: boolean): void {
    this.config.enabled = enabled;
    if (!enabled) {
      this.stop();
    }
  }
}

// Instancia global del programador de anuncios
export const adScheduler = new AdScheduler();

// Funciones helper
export function startAdScheduler(
  stationId: string,
  channelId: string | null,
  onAdStart: () => void,
  onAdEnd: () => void
): void {
  adScheduler.start(stationId, channelId, onAdStart, onAdEnd);
}

export function stopAdScheduler(): void {
  adScheduler.stop();
}

export function pauseAdScheduler(): void {
  adScheduler.pause();
}

export function resumeAdScheduler(): void {
  adScheduler.resume();
}

export function getAdSchedulerStats() {
  return adScheduler.getStats();
}

export function isAdCurrentlyPlaying(): boolean {
  const stats = adScheduler.getStats();
  return stats.isPlayingAd;
}
