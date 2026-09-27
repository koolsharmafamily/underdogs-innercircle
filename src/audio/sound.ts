// Web Audio API procedural sound engine for Underdogs Innercircle
// Part 10 / 14 / 15.8: Ambient room bed, slat flip ticks, and Keystone mint chime.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientGain: GainNode | null = null;
  private oscSub: OscillatorNode | null = null;
  private oscDrone: OscillatorNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;
  private isInitialized: boolean = false;

  private initContext() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      // AudioContext not supported
    }
  }

  public enable() {
    this.initContext();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isMuted = false;
    this.startAmbient();
  }

  public disable() {
    this.isMuted = true;
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
    }
  }

  public toggle(enabled: boolean) {
    if (enabled) {
      this.enable();
    } else {
      this.disable();
    }
  }

  private startAmbient() {
    if (!this.ctx || this.isMuted || this.isInitialized) {
      if (this.ambientGain && this.ctx && !this.isMuted) {
        this.ambientGain.gain.setTargetAtTime(0.08, this.ctx.currentTime, 1.2);
      }
      return;
    }

    try {
      const now = this.ctx.currentTime;
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.08, now + 2.0);
      this.ambientGain.connect(this.ctx.destination);

      // Lowpass filter for room tone
      this.droneFilter = this.ctx.createBiquadFilter();
      this.droneFilter.type = 'lowpass';
      this.droneFilter.frequency.setValueAtTime(140, now);
      this.droneFilter.connect(this.ambientGain);

      // Deep sub drone (55Hz - A1)
      this.oscSub = this.ctx.createOscillator();
      this.oscSub.type = 'sine';
      this.oscSub.frequency.setValueAtTime(55, now);
      this.oscSub.connect(this.droneFilter);
      this.oscSub.start();

      // Atmospheric harmonic drone (110Hz - A2, slightly detuned)
      this.oscDrone = this.ctx.createOscillator();
      this.oscDrone.type = 'triangle';
      this.oscDrone.frequency.setValueAtTime(110.4, now);
      
      const droneGain = this.ctx.createGain();
      droneGain.gain.setValueAtTime(0.4, now);
      this.oscDrone.connect(droneGain);
      droneGain.connect(this.droneFilter);
      this.oscDrone.start();

      this.isInitialized = true;
    } catch {
      // Audio start failure
    }
  }

  // Adjust drone based on Act (e.g. White Room elevates pitch & filter)
  public setAct(act: string) {
    if (!this.ctx || !this.droneFilter || !this.oscSub || this.isMuted) return;
    const now = this.ctx.currentTime;
    if (act === 'whiteRoom') {
      this.droneFilter.frequency.setTargetAtTime(320, now, 1.0);
      this.oscSub.frequency.setTargetAtTime(65.4, now, 1.0); // C2
    } else {
      this.droneFilter.frequency.setTargetAtTime(140, now, 1.0);
      this.oscSub.frequency.setTargetAtTime(55.0, now, 1.0); // A1
    }
  }

  // Slat flip click: physically modeled mechanical impulse
  public playTick(velocityFactor = 1.0) {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // High-pass filtered noise/sine impulse
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'bandpass';
      // Pitch variation based on velocity
      filter.frequency.setValueAtTime(1800 + Math.random() * 400, now);
      filter.Q.setValueAtTime(4.0, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320 + Math.random() * 80, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.04);

      const amp = Math.min(0.12, 0.04 * velocityFactor);
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

  // Keystone / Coin mint chime (pure crystalline ring)
  public playCoinMint() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const freqs = [880, 1320, 1760, 2640]; // Pure harmonics
      freqs.forEach((f, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);

        const decay = 0.8 + idx * 0.3;
        gain.gain.setValueAtTime(0.05 / (idx + 1), now);
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

export const sound = typeof window !== 'undefined' ? new SoundEngine() : (null as unknown as SoundEngine);
