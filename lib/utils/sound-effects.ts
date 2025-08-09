export class SoundEffects {
  private static audioContext: AudioContext | null = null;
  private static enabled: boolean = true;

  static init() {
    if (typeof window !== 'undefined' && !this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      // Load preference from localStorage
      const stored = localStorage.getItem('sound_effects_enabled');
      this.enabled = stored !== 'false';
    }
  }

  static setEnabled(enabled: boolean) {
    this.enabled = enabled;
    localStorage.setItem('sound_effects_enabled', enabled.toString());
  }

  static playAchievementSound(isRare: boolean = false, isEpic: boolean = false) {
    if (!this.enabled || !this.audioContext) return;
    
    try {
      const ctx = this.audioContext;
      const now = ctx.currentTime;
      
      if (isEpic) {
        // Epic achievement - triumphant fanfare
        this.playFanfare(ctx, now);
      } else if (isRare) {
        // Rare achievement - ascending arpeggio
        this.playArpeggio(ctx, now);
      } else {
        // Normal achievement - pleasant chime
        this.playChime(ctx, now);
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  private static playChime(ctx: AudioContext, startTime: number) {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Pleasant chime sound
    oscillator.frequency.setValueAtTime(880, startTime); // A5
    oscillator.frequency.exponentialRampToValueAtTime(1760, startTime + 0.1); // A6
    
    gainNode.gain.setValueAtTime(0.3, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.5);
  }

  private static playArpeggio(ctx: AudioContext, startTime: number) {
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    notes.forEach((freq, index) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      const noteTime = startTime + (index * 0.1);
      oscillator.frequency.setValueAtTime(freq, noteTime);
      
      gainNode.gain.setValueAtTime(0, noteTime);
      gainNode.gain.linearRampToValueAtTime(0.2, noteTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, noteTime + 0.4);
      
      oscillator.start(noteTime);
      oscillator.stop(noteTime + 0.4);
    });
  }

  private static playFanfare(ctx: AudioContext, startTime: number) {
    // Play a triumphant fanfare for epic achievements
    const notes = [
      { freq: 523.25, time: 0 },      // C5
      { freq: 523.25, time: 0.1 },    // C5
      { freq: 523.25, time: 0.2 },    // C5
      { freq: 659.25, time: 0.3 },    // E5
      { freq: 783.99, time: 0.5 },    // G5
      { freq: 1046.50, time: 0.7 },   // C6
    ];
    
    notes.forEach(({ freq, time }) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      const noteTime = startTime + time;
      oscillator.frequency.setValueAtTime(freq, noteTime);
      oscillator.type = 'square';
      
      gainNode.gain.setValueAtTime(0, noteTime);
      gainNode.gain.linearRampToValueAtTime(0.15, noteTime + 0.02);
      gainNode.gain.setValueAtTime(0.15, noteTime + 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.01, noteTime + 0.3);
      
      oscillator.start(noteTime);
      oscillator.stop(noteTime + 0.3);
    });
    
    // Add a bass note for depth
    const bass = ctx.createOscillator();
    const bassGain = ctx.createGain();
    
    bass.connect(bassGain);
    bassGain.connect(ctx.destination);
    
    bass.frequency.setValueAtTime(130.81, startTime); // C3
    bass.type = 'sine';
    
    bassGain.gain.setValueAtTime(0, startTime);
    bassGain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
    bassGain.gain.setValueAtTime(0.1, startTime + 0.8);
    bassGain.gain.exponentialRampToValueAtTime(0.01, startTime + 1);
    
    bass.start(startTime);
    bass.stop(startTime + 1);
  }

  static playLevelUpSound() {
    if (!this.enabled || !this.audioContext) return;
    
    try {
      const ctx = this.audioContext;
      const now = ctx.currentTime;
      
      // Ascending glissando for level up
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(261.63, now); // C4
      oscillator.frequency.exponentialRampToValueAtTime(1046.50, now + 0.3); // C6
      
      gainNode.gain.setValueAtTime(0.2, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      
      oscillator.start(now);
      oscillator.stop(now + 0.5);
    } catch (error) {
      console.error('Error playing level up sound:', error);
    }
  }
}

// Initialize on first import
if (typeof window !== 'undefined') {
  SoundEffects.init();
}