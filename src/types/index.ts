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

// Lesson and content interfaces
export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  category: LessonCategory;
  content: LessonContent;
  unlocked: boolean;
  completed: boolean;
  bestStats?: TypingStats;
  minWpmToPass: number;
  minAccuracyToPass: number;
}

export interface LessonContent {
  type: ContentType;
  data: string | string[];
  instructions?: string;
}

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type LessonCategory =
  | 'blocks'
  | 'items'
  | 'mobs'
  | 'biomes'
  | 'crafting'
  | 'commands'
  | 'general'
  | 'structures'
  | 'pvp'
  | 'farming';

export type ContentType = 'words' | 'sentences' | 'paragraphs';

// User progress and settings
export interface UserProgress {
  userId: string;
  lessonsCompleted: string[];
  totalSessions: number;
  totalTimeSpent: number; // in seconds
  averageWpm: number;
  averageAccuracy: number;
  bestWpm: number;
  bestAccuracy: number;
  currentStreak: number;
  longestStreak: number;
  achievements: Achievement[];
  lastSessionDate: Date;
  level: number;
  experience: number;
}

export interface UserSettings {
  fontSize: FontSize;
  theme: ThemeVariant;
  soundEnabled: boolean;
  showKeyboard: boolean;
  highlightErrors: boolean;
  autoAdvance: boolean;
  targetWpm: number;
  targetAccuracy: number;
}

export type FontSize = 'small' | 'medium' | 'large' | 'extra-large';
export type ThemeVariant = 'default' | 'dark' | 'overworld' | 'nether' | 'end';

// Achievement system
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: AchievementCategory;
  rarity: AchievementRarity;
}

export type AchievementCategory = 
  | 'speed'
  | 'accuracy'
  | 'consistency'
  | 'progress'
  | 'special';

export type AchievementRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

// Typing game state
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

// Statistics and analytics
export interface SessionStats {
  date: Date;
  wpm: number;
  accuracy: number;
  duration: number;
  lessonId: string;
  difficulty: DifficultyLevel;
}

export interface ProgressData {
  labels: string[];
  wpmData: number[];
  accuracyData: number[];
}

// API and storage interfaces
export interface StorageData {
  userProgress: UserProgress;
  userSettings: UserSettings;
  sessions: TypingSession[];
  lessons: Lesson[];
  lastUpdated: Date;
}

// Component props interfaces
export interface TypingAreaProps {
  text: string;
  onComplete: (stats: TypingStats) => void;
  onProgress?: (stats: TypingStats) => void;
  disabled?: boolean;
  autoFocus?: boolean;
}

export interface LessonCardProps {
  lesson: Lesson;
  onClick: (lessonId: string) => void;
  disabled?: boolean;
}

export interface StatsDisplayProps {
  stats: TypingStats;
  showDetailed?: boolean;
  variant?: 'compact' | 'detailed';
}

export interface ProgressChartProps {
  data: ProgressData;
  type: 'wpm' | 'accuracy' | 'both';
  timeRange: 'week' | 'month' | 'all';
}

// Minecraft-specific content types
export interface MinecraftBlock {
  id: string;
  name: string;
  category: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic';
}

export interface MinecraftItem {
  id: string;
  name: string;
  category: string;
  craftable: boolean;
}

export interface MinecraftMob {
  id: string;
  name: string;
  type: 'passive' | 'neutral' | 'hostile' | 'boss';
  biome: string[];
}

export interface MinecraftBiome {
  id: string;
  name: string;
  dimension: 'overworld' | 'nether' | 'end';
  temperature: 'cold' | 'temperate' | 'warm' | 'hot';
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Event handlers
export type TypingEventHandler = (event: TypingEvent) => void;

export interface TypingEvent {
  type: 'start' | 'progress' | 'complete' | 'error';
  data: unknown;
  timestamp: Date;
}

// Hangman Game Types
export interface HangmanWord {
  id: string;
  word: string;
  hint: string;
  category: HangmanCategory;
  difficulty: DifficultyLevel;
}

export interface HangmanGameState {
  currentWord: HangmanWord | null;
  guessedLetters: string[];
  incorrectGuesses: number;
  maxIncorrectGuesses: number;
  gameStatus: HangmanGameStatus;
  startTime?: Date;
  endTime?: Date;
  hintsUsed: number;
  score: number;
}

export interface HangmanSession {
  id: string;
  wordId: string;
  startTime: Date;
  endTime?: Date;
  completed: boolean;
  won: boolean;
  incorrectGuesses: number;
  hintsUsed: number;
  timeElapsed: number;
  difficulty: DifficultyLevel;
  score: number;
}

export interface HangmanStats {
  totalGames: number;
  gamesWon: number;
  gamesLost: number;
  winRate: number;
  averageIncorrectGuesses: number;
  bestScore: number;
  totalScore: number;
  averageTime: number;
  bestTime: number;
  hintsUsed: number;
  currentStreak: number;
  longestStreak: number;
}

export type HangmanCategory =
  | 'blocks'
  | 'items'
  | 'mobs'
  | 'biomes'
  | 'crafting'
  | 'commands'
  | 'phrases'
  | 'technical';

export type HangmanGameStatus =
  | 'playing'
  | 'won'
  | 'lost'
  | 'paused';

export interface HangmanGameProps {
  onGameComplete: (session: HangmanSession) => void;
  difficulty?: DifficultyLevel;
  category?: HangmanCategory;
}
