'use client';

/**
 * Procedural Sci-Fi Sound Effects Engine
 * Built with native Web Audio API (zero audio files to download, zero latency).
 */
class SoundFxEngine {
  private ctx: AudioContext | null = null;
  private _isMuted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sound_fx_muted');
      // Default to unmuted, or respect user's saved preference
      this._isMuted = saved !== null ? saved === 'true' : false;
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  public get isMuted(): boolean {
    return this._isMuted;
  }

  public toggleMute(): boolean {
    this._isMuted = !this._isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sound_fx_muted', String(this._isMuted));
    }
    if (!this._isMuted) {
      this.playChirpBeep();
    }
    return this._isMuted;
  }

  /**
   * 1. Flight Woosh: Ion thruster frequency glide
   */
  public playFlightWoosh() {
    if (this._isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.35);

      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.36);
    } catch {}
  }

  /**
   * 2. Futuristic HUD Activation Chirp: Dual-tone harmonic blip
   */
  public playChirpBeep() {
    if (this._isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(580, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);

      osc2.frequency.setValueAtTime(1160, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.13);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.14);
      osc2.stop(ctx.currentTime + 0.14);
    } catch {}
  }

  /**
   * 3. Magnetic Hand Grab: Crisp latch haptic
   */
  public playGrabSound() {
    if (this._isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(240, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.065);
    } catch {}
  }

  /**
   * 4. Magnetic Hand Drop: Cushioned landing thud
   */
  public playDropSound() {
    if (this._isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.14);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.16);
    } catch {}
  }

  /**
   * 5. Quantum Teleport Warp Blip: Ascending arpeggio
   */
  public playTeleportBlip() {
    if (this._isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const notes = [440, 660, 880, 1320];
      notes.forEach((freq, idx) => {
        const startTime = ctx.currentTime + idx * 0.035;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.08, startTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.07);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.08);
      });
    } catch {}
  }

  /**
   * 6. Friendly Robotic Poke Boop: Playful double chirp
   */
  public playBoopChirp() {
    if (this._isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const beeps = [620, 940];
      beeps.forEach((freq, idx) => {
        const startTime = ctx.currentTime + idx * 0.07;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.09, startTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.065);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.075);
      });
    } catch {}
  }
}

export const soundFx = new SoundFxEngine();
