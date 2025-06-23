// Core typing interfaces
export interface TypingStats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  timeElapsed: number; // in seconds
}

export interface TypingSession {
  id: string;
  lessonId: string;
  startTime: Date;
  endTime?: Date;
  stats: TypingStats;
  completed: boolean;
  text: string;
  userInput: string;
}

export interface TypingState {
  currentText: string;
  userInput: string;
  currentIndex: number;
  isActive: boolean;
  startTime?: Date;
  endTime?: Date;
  errors: TypingError[];
  stats: TypingStats;
}

export interface TypingError {
  position: number;
  expected: string;
  actual: string;
  timestamp: Date;
}

// Character state for real-time feedback
export interface CharacterState {
  char: string;
  status: CharacterStatus;
  index: number;
}

export type CharacterStatus = 'pending' | 'current' | 'correct' | 'incorrect' | 'completed';
