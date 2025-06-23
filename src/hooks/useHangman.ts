import { useState, useCallback, useEffect } from 'react';
import type { HangmanGameState, HangmanSession, DifficultyLevel, HangmanCategory } from '../types/index';
import { getRandomWord } from '../data/hangmanWords';

const MAX_INCORRECT_GUESSES = 6;

interface UseHangmanReturn {
  gameState: HangmanGameState;
  startNewGame: (difficulty?: DifficultyLevel, category?: HangmanCategory) => void;
  guessLetter: (letter: string) => boolean;
  useHint: () => void;
  resetGame: () => void;
  getDisplayWord: () => string;
  getAvailableLetters: () => string[];
  isGameOver: () => boolean;
  calculateScore: () => number;
}

const initialGameState: HangmanGameState = {
  currentWord: null,
  guessedLetters: [],
  incorrectGuesses: 0,
  maxIncorrectGuesses: MAX_INCORRECT_GUESSES,
  gameStatus: 'playing',
  hintsUsed: 0,
  score: 0,
};

export const useHangman = (onGameComplete?: (session: HangmanSession) => void): UseHangmanReturn => {
  const [gameState, setGameState] = useState<HangmanGameState>(initialGameState);

  // Start a new game with optional difficulty and category filters
  const startNewGame = useCallback((difficulty?: DifficultyLevel, category?: HangmanCategory) => {
    const newWord = getRandomWord(difficulty, category);
    
    setGameState({
      ...initialGameState,
      currentWord: newWord,
      startTime: new Date(),
      gameStatus: 'playing',
    });
  }, []);

  // Guess a letter
  const guessLetter = useCallback((letter: string): boolean => {
    if (!gameState.currentWord || gameState.gameStatus !== 'playing') {
      return false;
    }

    const upperLetter = letter.toUpperCase();
    
    // Check if letter was already guessed
    if (gameState.guessedLetters.includes(upperLetter)) {
      return false;
    }

    setGameState(prevState => {
      const newGuessedLetters = [...prevState.guessedLetters, upperLetter];
      const isCorrectGuess = prevState.currentWord!.word.includes(upperLetter);
      const newIncorrectGuesses = isCorrectGuess 
        ? prevState.incorrectGuesses 
        : prevState.incorrectGuesses + 1;

      // Check if word is complete
      const wordLetters = prevState.currentWord!.word.replace(/\s/g, '').split('');
      const isWordComplete = wordLetters.every(letter => 
        newGuessedLetters.includes(letter) || letter === ' '
      );

      // Determine game status
      let newGameStatus = prevState.gameStatus;
      let endTime: Date | undefined;

      if (isWordComplete) {
        newGameStatus = 'won';
        endTime = new Date();
      } else if (newIncorrectGuesses >= MAX_INCORRECT_GUESSES) {
        newGameStatus = 'lost';
        endTime = new Date();
      }

      const newState = {
        ...prevState,
        guessedLetters: newGuessedLetters,
        incorrectGuesses: newIncorrectGuesses,
        gameStatus: newGameStatus,
        endTime,
      };

      return newState;
    });

    return true;
  }, [gameState.currentWord, gameState.gameStatus, gameState.guessedLetters]);

  // Use a hint (reveals a random unguessed letter)
  const useHint = useCallback(() => {
    if (!gameState.currentWord || gameState.gameStatus !== 'playing') {
      return;
    }

    const wordLetters = gameState.currentWord.word.replace(/\s/g, '').split('');
    const unguessedLetters = wordLetters.filter(letter => 
      !gameState.guessedLetters.includes(letter)
    );

    if (unguessedLetters.length > 0) {
      const randomLetter = unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)];
      
      setGameState(prevState => ({
        ...prevState,
        guessedLetters: [...prevState.guessedLetters, randomLetter],
        hintsUsed: prevState.hintsUsed + 1,
      }));
    }
  }, [gameState.currentWord, gameState.gameStatus, gameState.guessedLetters]);

  // Reset the current game
  const resetGame = useCallback(() => {
    setGameState(initialGameState);
  }, []);

  // Get the display version of the word (with guessed letters revealed)
  const getDisplayWord = useCallback((): string => {
    if (!gameState.currentWord) {
      return '';
    }

    return gameState.currentWord.word
      .split('')
      .map(char => {
        if (char === ' ') {
          return ' ';
        }
        return gameState.guessedLetters.includes(char) ? char : '_';
      })
      .join(' ');
  }, [gameState.currentWord, gameState.guessedLetters]);

  // Get available letters for guessing
  const getAvailableLetters = useCallback((): string[] => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return alphabet.filter(letter => !gameState.guessedLetters.includes(letter));
  }, [gameState.guessedLetters]);

  // Check if game is over
  const isGameOver = useCallback((): boolean => {
    return gameState.gameStatus === 'won' || gameState.gameStatus === 'lost';
  }, [gameState.gameStatus]);

  // Calculate score based on performance
  const calculateScore = useCallback((): number => {
    if (!gameState.currentWord || !gameState.startTime) {
      return 0;
    }

    const baseScore = gameState.currentWord.difficulty === 'beginner' ? 100 :
                     gameState.currentWord.difficulty === 'intermediate' ? 200 : 300;
    
    const timeBonus = gameState.endTime && gameState.startTime ? 
      Math.max(0, 300 - Math.floor((gameState.endTime.getTime() - gameState.startTime.getTime()) / 1000)) : 0;
    
    const accuracyBonus = Math.max(0, (MAX_INCORRECT_GUESSES - gameState.incorrectGuesses) * 20);
    const hintPenalty = gameState.hintsUsed * 25;

    return Math.max(0, baseScore + timeBonus + accuracyBonus - hintPenalty);
  }, [gameState]);

  // Handle game completion
  useEffect(() => {
    if (isGameOver() && gameState.currentWord && gameState.startTime && gameState.endTime && onGameComplete) {
      const session: HangmanSession = {
        id: `hangman-${Date.now()}`,
        wordId: gameState.currentWord.id,
        startTime: gameState.startTime,
        endTime: gameState.endTime,
        completed: true,
        won: gameState.gameStatus === 'won',
        incorrectGuesses: gameState.incorrectGuesses,
        hintsUsed: gameState.hintsUsed,
        timeElapsed: Math.floor((gameState.endTime.getTime() - gameState.startTime.getTime()) / 1000),
        difficulty: gameState.currentWord.difficulty,
        score: calculateScore(),
      };

      onGameComplete(session);
    }
  }, [gameState.gameStatus, gameState.currentWord, gameState.startTime, gameState.endTime, 
      gameState.incorrectGuesses, gameState.hintsUsed, onGameComplete, calculateScore, isGameOver]);

  return {
    gameState,
    startNewGame,
    guessLetter,
    useHint,
    resetGame,
    getDisplayWord,
    getAvailableLetters,
    isGameOver,
    calculateScore,
  };
};
