import type { UserProgress, UserSettings, TypingSession, StorageData, HangmanSession, HangmanStats } from '../types/index';

const STORAGE_KEYS = {
  USER_PROGRESS: 'minecraft-typing-tutor-progress',
  USER_SETTINGS: 'minecraft-typing-tutor-settings',
  SESSIONS: 'minecraft-typing-tutor-sessions',
  LESSONS: 'minecraft-typing-tutor-lessons',
  HANGMAN_SESSIONS: 'minecraft-typing-tutor-hangman-sessions',
  HANGMAN_STATS: 'minecraft-typing-tutor-hangman-stats',
} as const;

// Default user progress
const defaultUserProgress: UserProgress = {
  userId: 'default-user',
  lessonsCompleted: [],
  totalSessions: 0,
  totalTimeSpent: 0,
  averageWpm: 0,
  averageAccuracy: 0,
  bestWpm: 0,
  bestAccuracy: 0,
  currentStreak: 0,
  longestStreak: 0,
  achievements: [],
  lastSessionDate: new Date(),
  level: 1,
  experience: 0,
};

// Default user settings
const defaultUserSettings: UserSettings = {
  fontSize: 'medium',
  theme: 'default',
  soundEnabled: true,
  showKeyboard: false,
  highlightErrors: true,
  autoAdvance: false,
  targetWpm: 40,
  targetAccuracy: 90,
};

/**
 * Generic localStorage utility functions
 */
const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

/**
 * User Progress Storage
 */
export const userProgressStorage = {
  get: (): UserProgress => {
    const progress = storage.get(STORAGE_KEYS.USER_PROGRESS, defaultUserProgress);
    // Convert date strings back to Date objects
    return {
      ...progress,
      lastSessionDate: new Date(progress.lastSessionDate),
      achievements: progress.achievements.map(achievement => ({
        ...achievement,
        unlockedAt: new Date(achievement.unlockedAt),
      })),
    };
  },

  set: (progress: UserProgress): void => {
    storage.set(STORAGE_KEYS.USER_PROGRESS, progress);
  },

  update: (updates: Partial<UserProgress>): UserProgress => {
    const current = userProgressStorage.get();
    const updated = { ...current, ...updates };
    userProgressStorage.set(updated);
    return updated;
  },

  reset: (): void => {
    userProgressStorage.set(defaultUserProgress);
  },
};

/**
 * User Settings Storage
 */
export const userSettingsStorage = {
  get: (): UserSettings => {
    return storage.get(STORAGE_KEYS.USER_SETTINGS, defaultUserSettings);
  },

  set: (settings: UserSettings): void => {
    storage.set(STORAGE_KEYS.USER_SETTINGS, settings);
  },

  update: (updates: Partial<UserSettings>): UserSettings => {
    const current = userSettingsStorage.get();
    const updated = { ...current, ...updates };
    userSettingsStorage.set(updated);
    return updated;
  },

  reset: (): void => {
    userSettingsStorage.set(defaultUserSettings);
  },
};

/**
 * Typing Sessions Storage
 */
export const sessionsStorage = {
  get: (): TypingSession[] => {
    const sessions = storage.get(STORAGE_KEYS.SESSIONS, []);
    // Convert date strings back to Date objects
    return sessions.map((session: TypingSession) => ({
      ...session,
      startTime: new Date(session.startTime),
      endTime: session.endTime ? new Date(session.endTime) : undefined,
    }));
  },

  add: (session: TypingSession): void => {
    const sessions = sessionsStorage.get();
    sessions.push(session);
    // Keep only the last 100 sessions to prevent storage bloat
    if (sessions.length > 100) {
      sessions.splice(0, sessions.length - 100);
    }
    storage.set(STORAGE_KEYS.SESSIONS, sessions);
  },

  getRecent: (count: number = 10): TypingSession[] => {
    const sessions = sessionsStorage.get();
    return sessions.slice(-count).reverse(); // Most recent first
  },

  getByLessonId: (lessonId: string): TypingSession[] => {
    const sessions = sessionsStorage.get();
    return sessions.filter(session => session.lessonId === lessonId);
  },

  clear: (): void => {
    storage.set(STORAGE_KEYS.SESSIONS, []);
  },
};

/**
 * Complete data export/import
 */
export const dataStorage = {
  export: (): StorageData => {
    return {
      userProgress: userProgressStorage.get(),
      userSettings: userSettingsStorage.get(),
      sessions: sessionsStorage.get(),
      lessons: [], // Lessons are static, no need to store
      lastUpdated: new Date(),
    };
  },

  import: (data: StorageData): void => {
    if (data.userProgress) {
      userProgressStorage.set(data.userProgress);
    }
    if (data.userSettings) {
      userSettingsStorage.set(data.userSettings);
    }
    if (data.sessions) {
      storage.set(STORAGE_KEYS.SESSIONS, data.sessions);
    }
  },

  reset: (): void => {
    userProgressStorage.reset();
    userSettingsStorage.reset();
    sessionsStorage.clear();
    hangmanSessionsStorage.clear();
    hangmanStatsStorage.reset();
  },
};

// Default hangman stats
const defaultHangmanStats: HangmanStats = {
  totalGames: 0,
  gamesWon: 0,
  gamesLost: 0,
  winRate: 0,
  averageIncorrectGuesses: 0,
  bestScore: 0,
  totalScore: 0,
  averageTime: 0,
  bestTime: 0,
  hintsUsed: 0,
  currentStreak: 0,
  longestStreak: 0,
};

/**
 * Hangman Sessions Storage
 */
export const hangmanSessionsStorage = {
  get: (): HangmanSession[] => {
    return storage.get(STORAGE_KEYS.HANGMAN_SESSIONS, []);
  },

  add: (session: HangmanSession): void => {
    const sessions = hangmanSessionsStorage.get();
    sessions.push(session);
    storage.set(STORAGE_KEYS.HANGMAN_SESSIONS, sessions);
  },

  clear: (): void => {
    storage.set(STORAGE_KEYS.HANGMAN_SESSIONS, []);
  },

  getRecent: (limit: number = 10): HangmanSession[] => {
    const sessions = hangmanSessionsStorage.get();
    return sessions
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
      .slice(0, limit);
  },
};

/**
 * Hangman Stats Storage
 */
export const hangmanStatsStorage = {
  get: (): HangmanStats => {
    return storage.get(STORAGE_KEYS.HANGMAN_STATS, defaultHangmanStats);
  },

  set: (stats: HangmanStats): void => {
    storage.set(STORAGE_KEYS.HANGMAN_STATS, stats);
  },

  update: (session: HangmanSession): HangmanStats => {
    const currentStats = hangmanStatsStorage.get();
    const sessions = hangmanSessionsStorage.get();

    const newStats: HangmanStats = {
      totalGames: currentStats.totalGames + 1,
      gamesWon: currentStats.gamesWon + (session.won ? 1 : 0),
      gamesLost: currentStats.gamesLost + (session.won ? 0 : 1),
      winRate: 0, // Will be calculated below
      averageIncorrectGuesses: 0, // Will be calculated below
      bestScore: Math.max(currentStats.bestScore, session.score),
      totalScore: currentStats.totalScore + session.score,
      averageTime: 0, // Will be calculated below
      bestTime: currentStats.bestTime === 0 ? session.timeElapsed : Math.min(currentStats.bestTime, session.timeElapsed),
      hintsUsed: currentStats.hintsUsed + session.hintsUsed,
      currentStreak: session.won ? currentStats.currentStreak + 1 : 0,
      longestStreak: 0, // Will be calculated below
    };

    // Calculate derived stats
    newStats.winRate = newStats.totalGames > 0 ? (newStats.gamesWon / newStats.totalGames) * 100 : 0;
    newStats.longestStreak = Math.max(currentStats.longestStreak, newStats.currentStreak);

    // Calculate averages from all sessions
    if (sessions.length > 0) {
      const totalIncorrectGuesses = sessions.reduce((sum, s) => sum + s.incorrectGuesses, 0);
      const totalTime = sessions.reduce((sum, s) => sum + s.timeElapsed, 0);

      newStats.averageIncorrectGuesses = totalIncorrectGuesses / sessions.length;
      newStats.averageTime = totalTime / sessions.length;
    }

    hangmanStatsStorage.set(newStats);
    return newStats;
  },

  reset: (): void => {
    hangmanStatsStorage.set(defaultHangmanStats);
  },
};

/**
 * Statistics calculation from stored data
 */
export const calculateStoredStats = () => {
  const sessions = sessionsStorage.get();

  if (sessions.length === 0) {
    return {
      totalSessions: 0,
      averageWpm: 0,
      averageAccuracy: 0,
      bestWpm: 0,
      bestAccuracy: 0,
      totalTimeSpent: 0,
      recentSessions: [],
    };
  }

  const totalWpm = sessions.reduce((sum, session) => sum + session.stats.wpm, 0);
  const totalAccuracy = sessions.reduce((sum, session) => sum + session.stats.accuracy, 0);
  const totalTime = sessions.reduce((sum, session) => sum + session.stats.timeElapsed, 0);
  
  const bestWpm = Math.max(...sessions.map(session => session.stats.wpm));
  const bestAccuracy = Math.max(...sessions.map(session => session.stats.accuracy));

  return {
    totalSessions: sessions.length,
    averageWpm: Math.round(totalWpm / sessions.length),
    averageAccuracy: Math.round(totalAccuracy / sessions.length),
    bestWpm,
    bestAccuracy,
    totalTimeSpent: totalTime,
    recentSessions: sessionsStorage.getRecent(10),
  };
};

/**
 * Check if localStorage is available
 */
export const isStorageAvailable = (): boolean => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get storage usage information
 */
export const getStorageInfo = () => {
  if (!isStorageAvailable()) {
    return { available: false, used: 0, total: 0 };
  }

  try {
    let used = 0;
    for (const key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        used += localStorage[key].length + key.length;
      }
    }

    // Estimate total available (usually 5-10MB, but varies by browser)
    const total = 5 * 1024 * 1024; // 5MB estimate

    return {
      available: true,
      used,
      total,
      percentage: (used / total) * 100,
    };
  } catch {
    return { available: false, used: 0, total: 0 };
  }
};
