import type { HangmanSession, HangmanStats, Achievement } from '../types/index';
import { achievements } from '../data/achievements';
import { hangmanSessionsStorage, hangmanStatsStorage } from './storage';

export const checkHangmanAchievements = (
  session: HangmanSession,
  stats: HangmanStats,
  currentAchievements: Achievement[]
): Achievement[] => {
  const newAchievements: Achievement[] = [];
  const unlockedIds = new Set(currentAchievements.map(a => a.id));
  
  // Helper function to add achievement if not already unlocked
  const addAchievement = (id: string) => {
    if (!unlockedIds.has(id)) {
      const achievement = achievements.find(a => a.id === id);
      if (achievement) {
        newAchievements.push({
          ...achievement,
          unlockedAt: new Date(),
        });
      }
    }
  };

  // First win
  if (session.won && stats.gamesWon === 1) {
    addAchievement('hangman-first-win');
  }

  // Perfect game (no wrong guesses)
  if (session.won && session.incorrectGuesses === 0) {
    addAchievement('hangman-perfect-game');
  }

  // No hints used
  if (session.won && session.hintsUsed === 0) {
    addAchievement('hangman-no-hints');
  }

  // Speed demon (under 30 seconds)
  if (session.won && session.timeElapsed < 30) {
    addAchievement('hangman-speed-demon');
  }

  // Win streaks
  if (stats.currentStreak >= 5) {
    addAchievement('hangman-win-streak-5');
  }
  if (stats.currentStreak >= 10) {
    addAchievement('hangman-win-streak-10');
  }

  // Advanced difficulty master
  const sessions = hangmanSessionsStorage.get();
  const advancedWins = sessions.filter(s => s.won && s.difficulty === 'advanced').length;
  if (advancedWins >= 10) {
    addAchievement('hangman-advanced-master');
  }

  // Category explorer - check if won in all categories
  const categories = ['blocks', 'items', 'mobs', 'biomes', 'crafting', 'commands', 'phrases', 'technical'];
  const wonCategories = new Set(
    sessions.filter(s => s.won).map(s => {
      // We need to get the word to determine category
      // For now, we'll assume this is tracked elsewhere or implement later
      return 'blocks'; // Placeholder
    })
  );
  if (wonCategories.size >= categories.length) {
    addAchievement('hangman-category-explorer');
  }

  // High scorer
  if (session.score >= 500) {
    addAchievement('hangman-high-scorer');
  }

  return newAchievements;
};

export const getHangmanAchievementProgress = (
  stats: HangmanStats,
  currentAchievements: Achievement[]
): Record<string, { current: number; target: number; percentage: number }> => {
  const unlockedIds = new Set(currentAchievements.map(a => a.id));
  const progress: Record<string, { current: number; target: number; percentage: number }> = {};

  // Win streak progress
  if (!unlockedIds.has('hangman-win-streak-5')) {
    progress['hangman-win-streak-5'] = {
      current: stats.currentStreak,
      target: 5,
      percentage: Math.min(100, (stats.currentStreak / 5) * 100),
    };
  }

  if (!unlockedIds.has('hangman-win-streak-10')) {
    progress['hangman-win-streak-10'] = {
      current: stats.currentStreak,
      target: 10,
      percentage: Math.min(100, (stats.currentStreak / 10) * 100),
    };
  }

  // Advanced wins progress
  if (!unlockedIds.has('hangman-advanced-master')) {
    const sessions = hangmanSessionsStorage.get();
    const advancedWins = sessions.filter(s => s.won && s.difficulty === 'advanced').length;
    progress['hangman-advanced-master'] = {
      current: advancedWins,
      target: 10,
      percentage: Math.min(100, (advancedWins / 10) * 100),
    };
  }

  return progress;
};
