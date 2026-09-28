// Custom Audio Engine for Underdogs Innercircle
// Plays the 3 official Underdogs Innercircle tracks (Vault, After Dark, Innercircle)
// plus subtle tactile ticks and gold coin mint chimes.

export interface AudioTrack {
  id: 'vault' | 'after-dark' | 'innercircle';
  title: string;
  src: string;
}

export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'vault',
    title: 'Vault',
    src: '/audio/vault.mp3',
  },
  {
    id: 'after-dark',
    title: 'After Dark',
    src: '/audio/after-dark.mp3',
  },
  {
    id: 'innercircle',
    title: 'Innercircle',
    src: '/audio/innercircle.mp3',
  },
];

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private audioEl: HTMLAudioElement | null = null;
  private currentTrackIndex: number = 0;
  private listeners: Set<(trackIndex: number, isPlaying: boolean) => void> = new Set();

  private initContext() {
    if (this.ctx) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      // AudioContext not supported
    }
  }

  private ensureAudioElement(): HTMLAudioElement | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioEl) {
      const audio = new Audio(AUDIO_TRACKS[this.currentTrackIndex].src);
      audio.preload = 'auto';
      audio.volume = 0.65;
      audio.loop = false;

      // Automatically advance to next track when current track ends
      audio.addEventListener('ended', () => {
        this.nextTrack();
      });

      this.audioEl = audio;
    }
    return this.audioEl;
  }

  public subscribe(fn: (trackIndex: number, isPlaying: boolean) => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    const playing = !this.isMuted;
    this.listeners.forEach((fn) => fn(this.currentTrackIndex, playing));
  }

  public getTrackIndex(): number {
    return this.currentTrackIndex;
  }

  public getCurrentTrack(): AudioTrack {
    return AUDIO_TRACKS[this.currentTrackIndex] || AUDIO_TRACKS[0];
  }

  public enable() {
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    this.isMuted = false;

    const audio = this.ensureAudioElement();
    if (audio) {
      audio.volume = 0.65;
      audio.play().catch(() => {});
    }
    this.notify();
  }

  public disable() {
    this.isMuted = true;
    if (this.audioEl) {
      this.audioEl.pause();
    }
    this.notify();
  }

  public toggle(enabled: boolean) {
    if (enabled) {
      this.enable();
    } else {
      this.disable();
    }
  }

  public setTrack(index: number) {
    const nextIdx = ((index % AUDIO_TRACKS.length) + AUDIO_TRACKS.length) % AUDIO_TRACKS.length;
    this.currentTrackIndex = nextIdx;
    const audio = this.ensureAudioElement();
    if (audio) {
      audio.src = AUDIO_TRACKS[nextIdx].src;
      audio.currentTime = 0;
      if (!this.isMuted) {
        audio.play().catch(() => {});
      }
    }
    this.notify();
  }

  public nextTrack() {
    this.setTrack(this.currentTrackIndex + 1);
  }

  public setAct(_act: string) {
    // Maintained for Director compatibility
  }

  // Subtle tactile impulse on UI interactions
  public playTick(velocityFactor = 1.0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800 + Math.random() * 400, now);
      filter.Q.setValueAtTime(4.0, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320 + Math.random() * 80, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.04);

      const amp = Math.min(0.08, 0.03 * velocityFactor);
      gain.gain.setValueAtTime(amp, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Suppress audio glitch
    }
  }

  // Gold Coin mint chime
  public playCoinMint() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const freqs = [880, 1320, 1760, 2640];
      freqs.forEach((f, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);

        const decay = 0.8 + idx * 0.3;
        gain.gain.setValueAtTime(0.04 / (idx + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + decay + 0.1);
      });
    } catch {
      // Suppress error
    }
  }
}

export const sound =
  typeof window !== 'undefined' ? new SoundEngine() : (null as unknown as SoundEngine);
