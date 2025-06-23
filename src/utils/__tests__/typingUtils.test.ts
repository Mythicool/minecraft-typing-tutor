import {
  calculateWPM,
  calculateAccuracy,
  calculateStats,
  generateCharacterStates,
  validateInput,
  formatTime,
  getSpeedCategory,
  getAccuracyCategory,
  calculateExperience,
  checkLessonCompletion,
} from '../typingUtils';

describe('typingUtils', () => {
  describe('calculateWPM', () => {
    it('should calculate WPM correctly', () => {
      expect(calculateWPM(100, 60)).toBe(20); // 100 chars in 60 seconds = 20 WPM
      expect(calculateWPM(250, 60)).toBe(50); // 250 chars in 60 seconds = 50 WPM
      expect(calculateWPM(0, 60)).toBe(0);    // No chars typed = 0 WPM
      expect(calculateWPM(100, 0)).toBe(0);   // No time elapsed = 0 WPM
    });
  });

  describe('calculateAccuracy', () => {
    it('should calculate accuracy correctly', () => {
      expect(calculateAccuracy(90, 100)).toBe(90);  // 90 correct out of 100 = 90%
      expect(calculateAccuracy(100, 100)).toBe(100); // Perfect accuracy
      expect(calculateAccuracy(0, 100)).toBe(0);     // No correct chars = 0%
      expect(calculateAccuracy(0, 0)).toBe(100);     // No chars typed = 100%
    });
  });

  describe('calculateStats', () => {
    it('should calculate comprehensive stats', () => {
      const stats = calculateStats(90, 10, 60);
      
      expect(stats.correctChars).toBe(90);
      expect(stats.incorrectChars).toBe(10);
      expect(stats.totalChars).toBe(100);
      expect(stats.timeElapsed).toBe(60);
      expect(stats.wpm).toBe(18); // 90 chars / 5 chars per word / 1 minute
      expect(stats.accuracy).toBe(90); // 90/100 = 90%
    });
  });

  describe('generateCharacterStates', () => {
    it('should generate correct character states', () => {
      const text = 'hello';
      const userInput = 'hel';
      const currentIndex = 3;
      
      const states = generateCharacterStates(text, userInput, currentIndex);
      
      expect(states).toHaveLength(5);
      expect(states[0].status).toBe('correct'); // 'h' typed correctly
      expect(states[1].status).toBe('correct'); // 'e' typed correctly
      expect(states[2].status).toBe('correct'); // 'l' typed correctly
      expect(states[3].status).toBe('current'); // 'l' is current
      expect(states[4].status).toBe('pending'); // 'o' not yet typed
    });

    it('should handle incorrect characters', () => {
      const text = 'hello';
      const userInput = 'hxllo';
      const currentIndex = 5;
      
      const states = generateCharacterStates(text, userInput, currentIndex);
      
      expect(states[0].status).toBe('correct');   // 'h'
      expect(states[1].status).toBe('incorrect'); // 'x' instead of 'e'
      expect(states[2].status).toBe('correct');   // 'l'
      expect(states[3].status).toBe('correct');   // 'l'
      expect(states[4].status).toBe('correct');   // 'o'
    });
  });

  describe('validateInput', () => {
    it('should validate correct input', () => {
      const result = validateInput('hello', 'hello', 5);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect errors in input', () => {
      const result = validateInput('hello', 'hxllo', 5);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].position).toBe(1);
      expect(result.errors[0].expected).toBe('e');
      expect(result.errors[0].actual).toBe('x');
    });
  });

  describe('formatTime', () => {
    it('should format time correctly', () => {
      expect(formatTime(0)).toBe('00:00');
      expect(formatTime(30)).toBe('00:30');
      expect(formatTime(60)).toBe('01:00');
      expect(formatTime(125)).toBe('02:05');
    });
  });

  describe('getSpeedCategory', () => {
    it('should categorize speed correctly', () => {
      expect(getSpeedCategory(10)).toBe('Beginner');
      expect(getSpeedCategory(30)).toBe('Intermediate');
      expect(getSpeedCategory(50)).toBe('Advanced');
      expect(getSpeedCategory(70)).toBe('Expert');
      expect(getSpeedCategory(90)).toBe('Master');
    });
  });

  describe('getAccuracyCategory', () => {
    it('should categorize accuracy correctly', () => {
      expect(getAccuracyCategory(60)).toBe('Needs Practice');
      expect(getAccuracyCategory(80)).toBe('Good');
      expect(getAccuracyCategory(90)).toBe('Excellent');
      expect(getAccuracyCategory(100)).toBe('Perfect');
    });
  });

  describe('calculateExperience', () => {
    it('should calculate experience points', () => {
      const stats = {
        wpm: 40,
        accuracy: 90,
        correctChars: 100,
        incorrectChars: 10,
        totalChars: 110,
        timeElapsed: 30,
      };

      const beginnerExp = calculateExperience(stats, 'beginner');
      const advancedExp = calculateExperience(stats, 'advanced');

      expect(beginnerExp).toBeGreaterThan(0);
      expect(advancedExp).toBeGreaterThan(beginnerExp); // Advanced should give more XP
    });
  });

  describe('checkLessonCompletion', () => {
    it('should check lesson completion correctly', () => {
      const passingStats = {
        wpm: 30,
        accuracy: 90,
        correctChars: 100,
        incorrectChars: 10,
        totalChars: 110,
        timeElapsed: 60,
      };

      const failingStats = {
        wpm: 15,
        accuracy: 70,
        correctChars: 70,
        incorrectChars: 30,
        totalChars: 100,
        timeElapsed: 60,
      };

      expect(checkLessonCompletion(passingStats, 25, 85)).toBe(true);
      expect(checkLessonCompletion(failingStats, 25, 85)).toBe(false);
    });
  });
});
