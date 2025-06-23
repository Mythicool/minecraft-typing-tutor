import type { Achievement } from '../types/index';

export const achievements: Omit<Achievement, 'unlockedAt'>[] = [
  // Speed Achievements
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your first typing lesson',
    icon: '👶',
    category: 'progress',
    rarity: 'common',
  },
  {
    id: 'speed-demon-20',
    title: 'Speed Demon',
    description: 'Reach 20 WPM in any lesson',
    icon: '⚡',
    category: 'speed',
    rarity: 'common',
  },
  {
    id: 'speed-demon-40',
    title: 'Lightning Fast',
    description: 'Reach 40 WPM in any lesson',
    icon: '🏃',
    category: 'speed',
    rarity: 'uncommon',
  },
  {
    id: 'speed-demon-60',
    title: 'Sonic Typer',
    description: 'Reach 60 WPM in any lesson',
    icon: '💨',
    category: 'speed',
    rarity: 'rare',
  },
  {
    id: 'speed-demon-80',
    title: 'Typing Master',
    description: 'Reach 80 WPM in any lesson',
    icon: '🚀',
    category: 'speed',
    rarity: 'epic',
  },
  {
    id: 'speed-demon-100',
    title: 'Legendary Typer',
    description: 'Reach 100 WPM in any lesson',
    icon: '👑',
    category: 'speed',
    rarity: 'legendary',
  },

  // Accuracy Achievements
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Complete a lesson with 100% accuracy',
    icon: '🎯',
    category: 'accuracy',
    rarity: 'uncommon',
  },
  {
    id: 'accuracy-master',
    title: 'Accuracy Master',
    description: 'Maintain 95%+ accuracy for 5 lessons',
    icon: '🏹',
    category: 'accuracy',
    rarity: 'rare',
  },
  {
    id: 'flawless-streak',
    title: 'Flawless Streak',
    description: 'Complete 10 lessons with 100% accuracy',
    icon: '💎',
    category: 'accuracy',
    rarity: 'legendary',
  },

  // Progress Achievements
  {
    id: 'beginner-graduate',
    title: 'Beginner Graduate',
    description: 'Complete all beginner lessons',
    icon: '🎓',
    category: 'progress',
    rarity: 'common',
  },
  {
    id: 'intermediate-scholar',
    title: 'Intermediate Scholar',
    description: 'Complete all intermediate lessons',
    icon: '📚',
    category: 'progress',
    rarity: 'uncommon',
  },
  {
    id: 'advanced-expert',
    title: 'Advanced Expert',
    description: 'Complete all advanced lessons',
    icon: '🧠',
    category: 'progress',
    rarity: 'rare',
  },
  {
    id: 'course-completion',
    title: 'Course Master',
    description: 'Complete all lessons in the course',
    icon: '🏆',
    category: 'progress',
    rarity: 'epic',
  },

  // Consistency Achievements
  {
    id: 'daily-practice',
    title: 'Daily Practice',
    description: 'Practice typing for 3 days in a row',
    icon: '📅',
    category: 'consistency',
    rarity: 'common',
  },
  {
    id: 'week-warrior',
    title: 'Week Warrior',
    description: 'Practice typing for 7 days in a row',
    icon: '🗓️',
    category: 'consistency',
    rarity: 'uncommon',
  },
  {
    id: 'dedication',
    title: 'Dedication',
    description: 'Practice typing for 30 days in a row',
    icon: '🔥',
    category: 'consistency',
    rarity: 'epic',
  },
  {
    id: 'marathon-typer',
    title: 'Marathon Typer',
    description: 'Practice for over 100 days total',
    icon: '🏃‍♂️',
    category: 'consistency',
    rarity: 'legendary',
  },

  // Special Minecraft-themed Achievements
  {
    id: 'block-breaker',
    title: 'Block Breaker',
    description: 'Master all block-related lessons',
    icon: '🧱',
    category: 'special',
    rarity: 'uncommon',
  },
  {
    id: 'mob-hunter',
    title: 'Mob Hunter',
    description: 'Master all mob-related lessons',
    icon: '🗡️',
    category: 'special',
    rarity: 'uncommon',
  },
  {
    id: 'biome-explorer',
    title: 'Biome Explorer',
    description: 'Master all biome-related lessons',
    icon: '🌍',
    category: 'special',
    rarity: 'uncommon',
  },
  {
    id: 'crafting-expert',
    title: 'Crafting Expert',
    description: 'Master all crafting-related lessons',
    icon: '⚒️',
    category: 'special',
    rarity: 'rare',
  },
  {
    id: 'command-master',
    title: 'Command Master',
    description: 'Master all command-related lessons',
    icon: '💻',
    category: 'special',
    rarity: 'epic',
  },
  {
    id: 'minecraft-scholar',
    title: 'Minecraft Scholar',
    description: 'Complete lessons from all categories',
    icon: '⛏️',
    category: 'special',
    rarity: 'legendary',
  },

  // Time-based Achievements
  {
    id: 'speed-runner',
    title: 'Speed Runner',
    description: 'Complete a lesson in under 30 seconds',
    icon: '⏱️',
    category: 'special',
    rarity: 'rare',
  },
  {
    id: 'endurance-typer',
    title: 'Endurance Typer',
    description: 'Type for 60 minutes total',
    icon: '⏰',
    category: 'consistency',
    rarity: 'uncommon',
  },
  {
    id: 'typing-marathon',
    title: 'Typing Marathon',
    description: 'Type for 10 hours total',
    icon: '🏃‍♀️',
    category: 'consistency',
    rarity: 'epic',
  },

  // Session-based Achievements
  {
    id: 'session-starter',
    title: 'Session Starter',
    description: 'Complete 10 typing sessions',
    icon: '🎮',
    category: 'progress',
    rarity: 'common',
  },
  {
    id: 'session-veteran',
    title: 'Session Veteran',
    description: 'Complete 50 typing sessions',
    icon: '🎖️',
    category: 'progress',
    rarity: 'uncommon',
  },
  {
    id: 'session-legend',
    title: 'Session Legend',
    description: 'Complete 100 typing sessions',
    icon: '🏅',
    category: 'progress',
    rarity: 'rare',
  },

  // Level-based Achievements
  {
    id: 'level-5',
    title: 'Rising Star',
    description: 'Reach level 5',
    icon: '⭐',
    category: 'progress',
    rarity: 'common',
  },
  {
    id: 'level-10',
    title: 'Skilled Typer',
    description: 'Reach level 10',
    icon: '🌟',
    category: 'progress',
    rarity: 'uncommon',
  },
  {
    id: 'level-20',
    title: 'Expert Typer',
    description: 'Reach level 20',
    icon: '✨',
    category: 'progress',
    rarity: 'rare',
  },
  {
    id: 'level-50',
    title: 'Typing Grandmaster',
    description: 'Reach level 50',
    icon: '🎆',
    category: 'progress',
    rarity: 'legendary',
  },

  // Hangman Game Achievements
  {
    id: 'hangman-first-win',
    title: 'Word Detective',
    description: 'Win your first hangman game',
    icon: '🕵️',
    category: 'progress',
    rarity: 'common',
  },
  {
    id: 'hangman-perfect-game',
    title: 'Perfect Guesser',
    description: 'Win a hangman game without any wrong guesses',
    icon: '🎯',
    category: 'special',
    rarity: 'rare',
  },
  {
    id: 'hangman-no-hints',
    title: 'Independent Thinker',
    description: 'Win a hangman game without using any hints',
    icon: '🧠',
    category: 'special',
    rarity: 'uncommon',
  },
  {
    id: 'hangman-speed-demon',
    title: 'Lightning Guesser',
    description: 'Win a hangman game in under 30 seconds',
    icon: '⚡',
    category: 'speed',
    rarity: 'rare',
  },
  {
    id: 'hangman-win-streak-5',
    title: 'Word Master',
    description: 'Win 5 hangman games in a row',
    icon: '🔥',
    category: 'consistency',
    rarity: 'uncommon',
  },
  {
    id: 'hangman-win-streak-10',
    title: 'Vocabulary Virtuoso',
    description: 'Win 10 hangman games in a row',
    icon: '🌟',
    category: 'consistency',
    rarity: 'rare',
  },
  {
    id: 'hangman-advanced-master',
    title: 'Technical Expert',
    description: 'Win 10 advanced difficulty hangman games',
    icon: '🎓',
    category: 'progress',
    rarity: 'epic',
  },
  {
    id: 'hangman-category-explorer',
    title: 'Minecraft Scholar',
    description: 'Win at least one game in every hangman category',
    icon: '📚',
    category: 'progress',
    rarity: 'rare',
  },
  {
    id: 'hangman-high-scorer',
    title: 'Score Champion',
    description: 'Achieve a score of 500 or higher in a single hangman game',
    icon: '🏆',
    category: 'special',
    rarity: 'epic',
  },
];

// Helper functions for achievement checking
export const checkAchievements = (
  userProgress: {
    achievements: Achievement[];
    lessonsCompleted: string[];
    bestWpm: number;
    bestAccuracy: number;
    currentStreak: number;
    totalSessions: number;
    level: number;
    totalTimeSpent: number;
  }
): Achievement[] => {
  const newAchievements: Achievement[] = [];
  const unlockedIds = userProgress.achievements.map((a: Achievement) => a.id);

  achievements.forEach(achievement => {
    if (unlockedIds.includes(achievement.id)) return;

    let shouldUnlock = false;

    switch (achievement.id) {
      case 'first-steps':
        shouldUnlock = userProgress.lessonsCompleted.length >= 1;
        break;
      case 'speed-demon-20':
        shouldUnlock = userProgress.bestWpm >= 20;
        break;
      case 'speed-demon-40':
        shouldUnlock = userProgress.bestWpm >= 40;
        break;
      case 'speed-demon-60':
        shouldUnlock = userProgress.bestWpm >= 60;
        break;
      case 'speed-demon-80':
        shouldUnlock = userProgress.bestWpm >= 80;
        break;
      case 'speed-demon-100':
        shouldUnlock = userProgress.bestWpm >= 100;
        break;
      case 'perfectionist':
        shouldUnlock = userProgress.bestAccuracy >= 100;
        break;
      case 'daily-practice':
        shouldUnlock = userProgress.currentStreak >= 3;
        break;
      case 'week-warrior':
        shouldUnlock = userProgress.currentStreak >= 7;
        break;
      case 'dedication':
        shouldUnlock = userProgress.currentStreak >= 30;
        break;
      case 'session-starter':
        shouldUnlock = userProgress.totalSessions >= 10;
        break;
      case 'session-veteran':
        shouldUnlock = userProgress.totalSessions >= 50;
        break;
      case 'session-legend':
        shouldUnlock = userProgress.totalSessions >= 100;
        break;
      case 'level-5':
        shouldUnlock = userProgress.level >= 5;
        break;
      case 'level-10':
        shouldUnlock = userProgress.level >= 10;
        break;
      case 'level-20':
        shouldUnlock = userProgress.level >= 20;
        break;
      case 'level-50':
        shouldUnlock = userProgress.level >= 50;
        break;
      case 'endurance-typer':
        shouldUnlock = userProgress.totalTimeSpent >= 3600; // 1 hour
        break;
      case 'typing-marathon':
        shouldUnlock = userProgress.totalTimeSpent >= 36000; // 10 hours
        break;
    }

    if (shouldUnlock) {
      newAchievements.push({
        ...achievement,
        unlockedAt: new Date(),
      });
    }
  });

  return newAchievements;
};
