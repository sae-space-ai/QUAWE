// Sistema de Anuncios de Audio con Web Speech API
// Genera anuncios de voz de 12 segundos para cada emisora

import { LocalAd } from '../data/localAds';

class AdPlayer {
  private audioContext: AudioContext | null = null;
  private speechSynthesis: SpeechSynthesis;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isPlaying: boolean = false;
  private onComplete: (() => void) | null = null;

  constructor() {
    this.speechSynthesis = window.speechSynthesis;
  }

  // Inicializar contexto de audio
  private initAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  // Reproducir anuncio de 12 segundos
  async playAd(ad: LocalAd, onComplete: () => void): Promise<void> {
    if (this.isPlaying) {
      this.stop();
    }

    this.isPlaying = true;
    this.onComplete = onComplete;

    try {
      // Crear utterance con el mensaje del anuncio
      const utterance = new SpeechSynthesisUtterance(ad.message);
      
      // Configurar voz en español
      utterance.lang = 'es-ES';
      utterance.rate = 0.95; // Velocidad ligeramente más lenta para claridad
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Intentar usar una voz en español si está disponible
      const voices = this.speechSynthesis.getVoices();
      const spanishVoice = voices.find(voice => 
        voice.lang.startsWith('es') && voice.name.toLowerCase().includes('female')
      ) || voices.find(voice => voice.lang.startsWith('es'));
      
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }

      // Calcular duración exacta del texto
      const estimatedDuration = this.estimateSpeechDuration(ad.message);
      
      // Ajustar velocidad para que dure exactamente 12 segundos
      if (estimatedDuration < 12) {
        utterance.rate = Math.max(0.7, utterance.rate * (estimatedDuration / 12));
      } else if (estimatedDuration > 12) {
        utterance.rate = Math.min(1.2, utterance.rate * (estimatedDuration / 12));
      }

      this.currentUtterance = utterance;

      // Eventos
      utterance.onend = () => {
        this.isPlaying = false;
        this.onComplete?.();
      };

      utterance.onerror = (event) => {
        console.error('Error reproduciendo anuncio:', event);
        this.isPlaying = false;
        this.onComplete?.();
      };

      // Reproducir
      this.speechSynthesis.speak(utterance);

      // Forzar duración de 12 segundos
      setTimeout(() => {
        if (this.isPlaying) {
          this.stop();
          this.onComplete?.();
        }
      }, 12000);

    } catch (error) {
      console.error('Error en playAd:', error);
      this.isPlaying = false;
      this.onComplete?.();
    }
  }

  // Estimar duración del habla en segundos
  private estimateSpeechDuration(text: string): number {
    // Aproximadamente 150 palabras por minuto en español
    const words = text.split(/\s+/).length;
    return (words / 150) * 60;
  }

  // Detener anuncio actual
  stop(): void {
    if (this.isPlaying) {
      this.speechSynthesis.cancel();
      this.isPlaying = false;
      this.currentUtterance = null;
    }
  }

  // Verificar si está reproduciendo
  getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

// Instancia global del reproductor de anuncios
export const adPlayer = new AdPlayer();

// Función helper para reproducir anuncio
export async function playLocalAd(ad: LocalAd, onComplete: () => void): Promise<void> {
  return adPlayer.playAd(ad, onComplete);
}

// Función para detener anuncio
export function stopLocalAd(): void {
  adPlayer.stop();
}

// Función para verificar si hay un anuncio reproduciéndose
export function isAdPlaying(): boolean {
  return adPlayer.getIsPlaying();
}
