// Simple sound utility for typing feedback
// In a real application, you would use actual audio files

export class SoundManager {
  private enabled: boolean = true;
  private audioContext: AudioContext | null = null;

  constructor() {
    // Initialize Web Audio API if available
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      try {
        this.audioContext = new AudioContext();
      } catch {
        console.warn('Web Audio API not supported');
      }
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  private createTone(frequency: number, duration: number, volume: number = 0.1) {
    if (!this.enabled || !this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      oscillator.type = 'square'; // Minecraft-like 8-bit sound

      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch {
      // Silently fail if audio context is not available
    }
  }

  // Typing sounds
  playKeyPress() {
    this.createTone(800, 0.1, 0.05);
  }

  playCorrectKey() {
    this.createTone(1000, 0.1, 0.05);
  }

  playIncorrectKey() {
    this.createTone(300, 0.2, 0.1);
  }

  // UI sounds
  playButtonClick() {
    this.createTone(600, 0.1, 0.08);
  }

  playButtonHover() {
    this.createTone(700, 0.05, 0.03);
  }

  // Achievement and completion sounds
  playLessonComplete() {
    // Play a sequence of tones for completion
    setTimeout(() => this.createTone(523, 0.2, 0.1), 0);    // C
    setTimeout(() => this.createTone(659, 0.2, 0.1), 200);  // E
    setTimeout(() => this.createTone(784, 0.2, 0.1), 400);  // G
    setTimeout(() => this.createTone(1047, 0.4, 0.1), 600); // C (octave)
  }

  playAchievementUnlock() {
    // Play a triumphant sequence
    setTimeout(() => this.createTone(659, 0.15, 0.1), 0);   // E
    setTimeout(() => this.createTone(784, 0.15, 0.1), 150); // G
    setTimeout(() => this.createTone(988, 0.15, 0.1), 300); // B
    setTimeout(() => this.createTone(1319, 0.3, 0.1), 450); // E (octave)
  }

  playLevelUp() {
    // Play an ascending scale
    const notes = [523, 587, 659, 698, 784, 880, 988, 1047]; // C major scale
    notes.forEach((note, index) => {
      setTimeout(() => this.createTone(note, 0.2, 0.08), index * 100);
    });
  }

  playError() {
    // Play a descending error sound
    setTimeout(() => this.createTone(400, 0.1, 0.1), 0);
    setTimeout(() => this.createTone(350, 0.1, 0.1), 100);
    setTimeout(() => this.createTone(300, 0.2, 0.1), 200);
  }

  // Minecraft-specific sounds (simplified versions)
  playBlockPlace() {
    this.createTone(500, 0.1, 0.08);
  }

  playBlockBreak() {
    // Quick burst of noise-like sound
    this.createTone(200, 0.05, 0.1);
    setTimeout(() => this.createTone(180, 0.05, 0.08), 50);
  }

  playPickupItem() {
    this.createTone(800, 0.05, 0.06);
    setTimeout(() => this.createTone(1000, 0.05, 0.06), 50);
  }

  playMenuSelect() {
    this.createTone(600, 0.08, 0.05);
  }

  // Resume audio context if it's suspended (required by some browsers)
  async resumeAudioContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume();
      } catch {
        console.warn('Could not resume audio context');
      }
    }
  }
}

// Create a singleton instance
export const soundManager = new SoundManager();

// Helper function to play sounds with settings check
export const playSound = (soundName: keyof SoundManager, userSettings?: { soundEnabled: boolean }) => {
  if (userSettings && !userSettings.soundEnabled) return;
  
  // Resume audio context on first user interaction
  soundManager.resumeAudioContext();
  
  if (typeof soundManager[soundName] === 'function') {
    (soundManager[soundName] as () => void)();
  }
};

// Preload and test audio on user interaction
export const initializeAudio = () => {
  soundManager.resumeAudioContext();
};
