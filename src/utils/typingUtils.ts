// Inline types to avoid import issues
export interface TypingStats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  timeElapsed: number; // in seconds
}

export interface TypingError {
  position: number;
  expected: string;
  actual: string;
  timestamp: Date;
}

export interface CharacterState {
  char: string;
  status: CharacterStatus;
  index: number;
}

export type CharacterStatus = 'pending' | 'current' | 'correct' | 'incorrect' | 'completed';

/**
 * Calculate Words Per Minute (WPM)
 * Standard: 5 characters = 1 word
 */
export const calculateWPM = (correctChars: number, timeElapsed: number): number => {
  if (timeElapsed === 0) return 0;
  const minutes = timeElapsed / 60;
  const words = correctChars / 5;
  return Math.round(words / minutes);
};

/**
 * Calculate typing accuracy as a percentage
 */
export const calculateAccuracy = (correctChars: number, totalChars: number): number => {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
};

/**
 * Calculate comprehensive typing statistics
 */
export const calculateStats = (
  correctChars: number,
  incorrectChars: number,
  timeElapsed: number
): TypingStats => {
  const totalChars = correctChars + incorrectChars;
  const wpm = calculateWPM(correctChars, timeElapsed);
  const accuracy = calculateAccuracy(correctChars, totalChars);

  return {
    wpm,
    accuracy,
    correctChars,
    incorrectChars,
    totalChars,
    timeElapsed,
  };
};

/**
 * Generate character states for real-time feedback
 */
export const generateCharacterStates = (
  text: string,
  userInput: string,
  currentIndex: number
): CharacterState[] => {
  return text.split('').map((char, index) => {
    let status: CharacterStatus;

    if (index < userInput.length) {
      // Character has been typed
      if (userInput[index] === char) {
        status = 'correct';
      } else {
        status = 'incorrect';
      }
    } else if (index === currentIndex) {
      // Current character to type
      status = 'current';
    } else if (index < currentIndex) {
      // Should have been typed but wasn't (shouldn't happen in normal flow)
      status = 'incorrect';
    } else {
      // Not yet typed
      status = 'pending';
    }

    return {
      char,
      status,
      index,
    };
  });
};

/**
 * Validate user input against expected text
 */
export const validateInput = (
  expectedText: string,
  userInput: string,
  _currentIndex: number
): { isValid: boolean; errors: TypingError[] } => {
  const errors: TypingError[] = [];
  let isValid = true;

  for (let i = 0; i < userInput.length; i++) {
    if (i >= expectedText.length || userInput[i] !== expectedText[i]) {
      isValid = false;
      errors.push({
        position: i,
        expected: expectedText[i] || '',
        actual: userInput[i],
        timestamp: new Date(),
      });
    }
  }

  return { isValid, errors };
};

/**
 * Format time in MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Get typing speed category based on WPM
 */
export const getSpeedCategory = (wpm: number): string => {
  if (wpm < 20) return 'Beginner';
  if (wpm < 40) return 'Intermediate';
  if (wpm < 60) return 'Advanced';
  if (wpm < 80) return 'Expert';
  return 'Master';
};

/**
 * Get accuracy category based on percentage
 */
export const getAccuracyCategory = (accuracy: number): string => {
  if (accuracy < 70) return 'Needs Practice';
  if (accuracy < 85) return 'Good';
  if (accuracy < 95) return 'Excellent';
  return 'Perfect';
};

/**
 * Calculate experience points based on performance
 */
export const calculateExperience = (stats: TypingStats, difficulty: 'beginner' | 'intermediate' | 'advanced'): number => {
  const basePoints = 10;
  const difficultyMultiplier = {
    beginner: 1,
    intermediate: 1.5,
    advanced: 2,
  };
  
  const wpmBonus = Math.floor(stats.wpm / 10) * 5;
  const accuracyBonus = Math.floor(stats.accuracy / 10) * 2;
  const timeBonus = Math.max(0, 60 - stats.timeElapsed) * 0.5; // Bonus for completing quickly
  
  const totalPoints = (basePoints + wpmBonus + accuracyBonus + timeBonus) * difficultyMultiplier[difficulty];
  
  return Math.round(totalPoints);
};

/**
 * Determine if lesson requirements are met
 */
export const checkLessonCompletion = (
  stats: TypingStats,
  minWpm: number,
  minAccuracy: number
): boolean => {
  return stats.wpm >= minWpm && stats.accuracy >= minAccuracy;
};

/**
 * Generate random text from word array
 */
export const generateRandomText = (words: string[], count: number): string => {
  const selectedWords: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWords.push(words[randomIndex]);
  }
  
  return selectedWords.join(' ');
};

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Get color for character based on status
 */
export const getCharacterColor = (status: CharacterStatus, theme: { colors: { typing: { correct: string; incorrect: string; current: string; completed: string; pending: string } } }): string => {
  switch (status) {
    case 'correct':
      return theme.colors.typing.correct;
    case 'incorrect':
      return theme.colors.typing.incorrect;
    case 'current':
      return theme.colors.typing.current;
    case 'completed':
      return theme.colors.typing.completed;
    case 'pending':
    default:
      return theme.colors.typing.pending;
  }
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for performance optimization
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
