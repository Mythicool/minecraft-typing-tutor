import { useState, useEffect, useCallback } from 'react';
import type { Lesson, TypingStats, UserProgress } from '../types/index';
import { lessons as initialLessons } from '../data/lessons';
import { userProgressStorage } from '../utils/storage';
import { calculateExperience } from '../utils/typingUtils';

interface UseLessonsReturn {
  lessons: Lesson[];
  currentLesson: Lesson | null;
  userProgress: UserProgress;
  setCurrentLesson: (lesson: Lesson | null) => void;
  completeLesson: (lessonId: string, stats: TypingStats) => boolean;
  unlockNextLesson: (completedLessonId: string) => void;
  resetProgress: () => void;
  getLessonsByDifficulty: (difficulty: 'beginner' | 'intermediate' | 'advanced') => Lesson[];
  getUnlockedLessons: () => Lesson[];
  getCompletedLessons: () => Lesson[];
  getNextLessonToUnlock: () => Lesson | null;
}

export const useLessons = (): UseLessonsReturn => {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>(() => userProgressStorage.get());

  // Initialize lessons with user progress
  useEffect(() => {
    const progress = userProgressStorage.get();
    const updatedLessons = initialLessons.map((lesson, index) => {
      const isCompleted = progress.lessonsCompleted.includes(lesson.id);
      const isUnlocked = lesson.unlocked || index === 0 || 
        progress.lessonsCompleted.some(completedId => {
          const completedIndex = initialLessons.findIndex(l => l.id === completedId);
          return completedIndex >= 0 && index <= completedIndex + 1;
        });

      return {
        ...lesson,
        completed: isCompleted,
        unlocked: isUnlocked,
      };
    });

    setLessons(updatedLessons);
    setUserProgress(progress);
  }, []);

  // Complete a lesson and update progress
  const completeLesson = useCallback((lessonId: string, stats: TypingStats): boolean => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return false;

    // Check if lesson requirements are met
    const passed = stats.wpm >= lesson.minWpmToPass && stats.accuracy >= lesson.minAccuracyToPass;
    
    if (!passed) return false;

    // Calculate experience points
    const experienceGained = calculateExperience(stats, lesson.difficulty);

    // Update user progress
    const currentProgress = userProgressStorage.get();
    const isFirstCompletion = !currentProgress.lessonsCompleted.includes(lessonId);
    
    const updatedProgress: UserProgress = {
      ...currentProgress,
      lessonsCompleted: isFirstCompletion 
        ? [...currentProgress.lessonsCompleted, lessonId]
        : currentProgress.lessonsCompleted,
      totalSessions: currentProgress.totalSessions + 1,
      totalTimeSpent: currentProgress.totalTimeSpent + stats.timeElapsed,
      lastSessionDate: new Date(),
      experience: currentProgress.experience + experienceGained,
      level: Math.floor((currentProgress.experience + experienceGained) / 100) + 1,
      bestWpm: Math.max(currentProgress.bestWpm, stats.wpm),
      bestAccuracy: Math.max(currentProgress.bestAccuracy, stats.accuracy),
    };

    // Calculate averages
    if (updatedProgress.totalSessions > 0) {
      // This is a simplified average calculation
      // In a real app, you'd want to store individual session stats
      updatedProgress.averageWpm = Math.round(
        (currentProgress.averageWpm * (currentProgress.totalSessions - 1) + stats.wpm) / updatedProgress.totalSessions
      );
      updatedProgress.averageAccuracy = Math.round(
        (currentProgress.averageAccuracy * (currentProgress.totalSessions - 1) + stats.accuracy) / updatedProgress.totalSessions
      );
    }

    // Update streak
    const today = new Date().toDateString();
    const lastSessionDate = new Date(currentProgress.lastSessionDate).toDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
    
    if (lastSessionDate === today) {
      // Same day, keep streak
      updatedProgress.currentStreak = currentProgress.currentStreak;
    } else if (lastSessionDate === yesterday) {
      // Consecutive day, increment streak
      updatedProgress.currentStreak = currentProgress.currentStreak + 1;
    } else {
      // Streak broken, reset to 1
      updatedProgress.currentStreak = 1;
    }
    
    updatedProgress.longestStreak = Math.max(updatedProgress.longestStreak, updatedProgress.currentStreak);

    // Save progress
    userProgressStorage.set(updatedProgress);
    setUserProgress(updatedProgress);

    // Update lessons state
    setLessons(prevLessons => 
      prevLessons.map(l => {
        if (l.id === lessonId) {
          return {
            ...l,
            completed: true,
            bestStats: l.bestStats 
              ? (stats.wpm > l.bestStats.wpm ? stats : l.bestStats)
              : stats,
          };
        }
        return l;
      })
    );

    // Unlock next lesson if this was first completion
    if (isFirstCompletion) {
      unlockNextLesson(lessonId);
    }

    return true;
  }, [lessons]);

  // Unlock the next lesson in sequence
  const unlockNextLesson = useCallback((completedLessonId: string) => {
    const completedIndex = initialLessons.findIndex(l => l.id === completedLessonId);
    if (completedIndex >= 0 && completedIndex < initialLessons.length - 1) {
      const nextLesson = initialLessons[completedIndex + 1];
      
      setLessons(prevLessons =>
        prevLessons.map(l =>
          l.id === nextLesson.id ? { ...l, unlocked: true } : l
        )
      );
    }
  }, []);

  // Reset all progress
  const resetProgress = useCallback(() => {
    userProgressStorage.reset();
    const resetLessons = initialLessons.map((lesson, index) => ({
      ...lesson,
      completed: false,
      unlocked: index === 0, // Only first lesson unlocked
      bestStats: undefined,
    }));
    
    setLessons(resetLessons);
    setUserProgress(userProgressStorage.get());
    setCurrentLesson(null);
  }, []);

  // Get lessons by difficulty
  const getLessonsByDifficulty = useCallback((difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    return lessons.filter(lesson => lesson.difficulty === difficulty);
  }, [lessons]);

  // Get unlocked lessons
  const getUnlockedLessons = useCallback(() => {
    return lessons.filter(lesson => lesson.unlocked);
  }, [lessons]);

  // Get completed lessons
  const getCompletedLessons = useCallback(() => {
    return lessons.filter(lesson => lesson.completed);
  }, [lessons]);

  // Get next lesson to unlock
  const getNextLessonToUnlock = useCallback(() => {
    return lessons.find(lesson => !lesson.unlocked) || null;
  }, [lessons]);

  return {
    lessons,
    currentLesson,
    userProgress,
    setCurrentLesson,
    completeLesson,
    unlockNextLesson,
    resetProgress,
    getLessonsByDifficulty,
    getUnlockedLessons,
    getCompletedLessons,
    getNextLessonToUnlock,
  };
};
