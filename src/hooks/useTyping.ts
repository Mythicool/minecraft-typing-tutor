import { useState, useEffect, useCallback, useRef } from 'react';
import {
  calculateStats,
  generateCharacterStates,
  validateInput,
  checkLessonCompletion
} from '../utils/typingUtils';
import type { TypingState } from '../types/index';
import type {
  TypingStats,
  CharacterState,
} from '../utils/typingUtils';

interface UseTypingOptions {
  text: string;
  onComplete?: (stats: TypingStats) => void;
  onProgress?: (stats: TypingStats) => void;
  minWpm?: number;
  minAccuracy?: number;
  autoStart?: boolean;
}

interface UseTypingReturn {
  // State
  typingState: TypingState;
  characterStates: CharacterState[];
  isCompleted: boolean;
  isPassed: boolean;
  
  // Actions
  handleInput: (input: string) => void;
  start: () => void;
  reset: () => void;
  pause: () => void;
  resume: () => void;
  
  // Computed values
  progress: number;
  currentChar: string;
  remainingText: string;
}

export const useTyping = ({
  text,
  onComplete,
  onProgress,
  minWpm = 0,
  minAccuracy = 0,
  autoStart = false,
}: UseTypingOptions): UseTypingReturn => {
  const [typingState, setTypingState] = useState<TypingState>({
    currentText: text,
    userInput: '',
    currentIndex: 0,
    isActive: false,
    errors: [],
    stats: {
      wpm: 0,
      accuracy: 100,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
      timeElapsed: 0,
    },
  });

  const [isCompleted, setIsCompleted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<Date | null>(null);
  const pausedTimeRef = useRef<number>(0);

  // Generate character states for visual feedback
  const characterStates = generateCharacterStates(
    text,
    typingState.userInput,
    typingState.currentIndex
  );

  // Calculate progress percentage
  const progress = text.length > 0 ? (typingState.userInput.length / text.length) * 100 : 0;

  // Get current character to type
  const currentChar = text[typingState.currentIndex] || '';

  // Get remaining text
  const remainingText = text.slice(typingState.currentIndex);

  // Check if lesson requirements are met
  const isPassed = checkLessonCompletion(typingState.stats, minWpm, minAccuracy);

  // Start timer
  const startTimer = useCallback(() => {
    if (intervalRef.current) return;

    startTimeRef.current = new Date();
    intervalRef.current = setInterval(() => {
      if (!isPaused && startTimeRef.current) {
        const now = new Date();
        const elapsed = Math.floor((now.getTime() - startTimeRef.current.getTime()) / 1000) - pausedTimeRef.current;
        
        setTypingState(prev => {
          const newStats = calculateStats(prev.stats.correctChars, prev.stats.incorrectChars, elapsed);
          const updatedState = {
            ...prev,
            stats: newStats,
          };
          
          // Call progress callback
          if (onProgress) {
            onProgress(newStats);
          }
          
          return updatedState;
        });
      }
    }, 1000);
  }, [isPaused, onProgress]);

  // Stop timer
  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Start typing session
  const start = useCallback(() => {
    setTypingState(prev => ({
      ...prev,
      isActive: true,
      startTime: new Date(),
    }));
    setIsPaused(false);
    startTimer();
  }, [startTimer]);

  // Reset typing session
  const reset = useCallback(() => {
    stopTimer();
    setTypingState({
      currentText: text,
      userInput: '',
      currentIndex: 0,
      isActive: false,
      errors: [],
      stats: {
        wpm: 0,
        accuracy: 100,
        correctChars: 0,
        incorrectChars: 0,
        totalChars: 0,
        timeElapsed: 0,
      },
    });
    setIsCompleted(false);
    setIsPaused(false);
    startTimeRef.current = null;
    pausedTimeRef.current = 0;
  }, [text, stopTimer]);

  // Pause typing session
  const pause = useCallback(() => {
    setIsPaused(true);
    setTypingState(prev => ({
      ...prev,
      isActive: false,
    }));
  }, []);

  // Resume typing session
  const resume = useCallback(() => {
    setIsPaused(false);
    setTypingState(prev => ({
      ...prev,
      isActive: true,
    }));
  }, []);

  // Handle user input
  const handleInput = useCallback((input: string) => {
    if (!typingState.isActive || isCompleted || isPaused) return;

    // Start timer on first input
    if (typingState.userInput.length === 0 && input.length === 1) {
      startTimer();
    }

    // Validate input
    const { errors } = validateInput(text, input, input.length - 1);
    
    // Calculate correct and incorrect characters
    let correctChars = 0;
    let incorrectChars = 0;
    
    for (let i = 0; i < input.length; i++) {
      if (i < text.length && input[i] === text[i]) {
        correctChars++;
      } else {
        incorrectChars++;
      }
    }

    // Update state
    setTypingState(prev => {
      const timeElapsed = startTimeRef.current 
        ? Math.floor((new Date().getTime() - startTimeRef.current.getTime()) / 1000) - pausedTimeRef.current
        : 0;
      
      const newStats = calculateStats(correctChars, incorrectChars, timeElapsed);
      
      return {
        ...prev,
        userInput: input,
        currentIndex: input.length,
        errors: [...prev.errors, ...errors],
        stats: newStats,
      };
    });

    // Check for completion
    if (input.length === text.length) {
      const finalTimeElapsed = startTimeRef.current 
        ? Math.floor((new Date().getTime() - startTimeRef.current.getTime()) / 1000) - pausedTimeRef.current
        : 0;
      
      const finalStats = calculateStats(correctChars, incorrectChars, finalTimeElapsed);
      
      setIsCompleted(true);
      stopTimer();
      
      setTypingState(prev => ({
        ...prev,
        isActive: false,
        endTime: new Date(),
        stats: finalStats,
      }));

      if (onComplete) {
        onComplete(finalStats);
      }
    }
  }, [typingState.isActive, typingState.userInput.length, isCompleted, isPaused, text, startTimer, stopTimer, onComplete]);

  // Auto-start if enabled
  useEffect(() => {
    if (autoStart && !typingState.isActive && !isCompleted) {
      start();
    }
  }, [autoStart, typingState.isActive, isCompleted, start]);

  // Reset when text changes
  useEffect(() => {
    reset();
  }, [text, reset]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, [stopTimer]);

  return {
    typingState,
    characterStates,
    isCompleted,
    isPassed,
    handleInput,
    start,
    reset,
    pause,
    resume,
    progress,
    currentChar,
    remainingText,
  };
};
