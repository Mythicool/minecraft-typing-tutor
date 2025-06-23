import type { Lesson } from '../types/index';
import { typingContent } from './minecraftContent';

export const lessons: Lesson[] = [
  // Beginner Lessons
  {
    id: 'beginner-blocks-1',
    title: 'Basic Blocks',
    description: 'Learn to type common Minecraft block names',
    difficulty: 'beginner',
    category: 'blocks',
    content: {
      type: 'words',
      data: typingContent.beginner.words.slice(0, 15),
      instructions: 'Type each block name as it appears. Focus on accuracy over speed.',
    },
    unlocked: true,
    completed: false,
    minWpmToPass: 15,
    minAccuracyToPass: 85,
  },
  {
    id: 'beginner-mobs-1',
    title: 'Friendly Animals',
    description: 'Type the names of peaceful Minecraft mobs',
    difficulty: 'beginner',
    category: 'mobs',
    content: {
      type: 'words',
      data: ['pig', 'cow', 'sheep', 'chicken', 'horse', 'cat', 'wolf', 'villager'],
      instructions: 'Practice typing animal names. These mobs are friendly!',
    },
    unlocked: true,
    completed: false,
    minWpmToPass: 15,
    minAccuracyToPass: 85,
  },
  {
    id: 'beginner-sentences-1',
    title: 'Simple Sentences',
    description: 'Type basic sentences about Minecraft',
    difficulty: 'beginner',
    category: 'general',
    content: {
      type: 'sentences',
      data: typingContent.beginner.sentences.slice(0, 10),
      instructions: 'Type complete sentences. Remember to include punctuation!',
    },
    unlocked: false,
    completed: false,
    minWpmToPass: 20,
    minAccuracyToPass: 80,
  },
  {
    id: 'beginner-crafting-1',
    title: 'Basic Crafting',
    description: 'Learn about simple crafting recipes',
    difficulty: 'beginner',
    category: 'crafting',
    content: {
      type: 'sentences',
      data: [
        'Wooden planks come from logs.',
        'Sticks are made from planks.',
        'Torches need coal and sticks.',
        'Chests store your items.',
        'Beds let you sleep safely.',
      ],
      instructions: 'Type sentences about basic crafting. Learn while you type!',
    },
    unlocked: false,
    completed: false,
    minWpmToPass: 20,
    minAccuracyToPass: 80,
  },

  // Intermediate Lessons
  {
    id: 'intermediate-ores-1',
    title: 'Precious Ores',
    description: 'Type names of valuable ores and gems',
    difficulty: 'intermediate',
    category: 'blocks',
    content: {
      type: 'words',
      data: ['diamond', 'emerald', 'redstone', 'lapis', 'obsidian', 'quartz', 'netherite'],
      instructions: 'These ores are valuable! Type carefully.',
    },
    unlocked: false,
    completed: false,
    minWpmToPass: 25,
    minAccuracyToPass: 85,
  },
  {
    id: 'intermediate-mobs-1',
    title: 'Dangerous Mobs',
    description: 'Learn to type hostile mob names',
    difficulty: 'intermediate',
    category: 'mobs',
    content: {
      type: 'words',
      data: ['zombie', 'skeleton', 'creeper', 'spider', 'enderman', 'witch', 'ghast', 'blaze'],
      instructions: 'These mobs are dangerous! Type their names quickly.',
    },
    unlocked: false,
    completed: false,
    minWpmToPass: 25,
    minAccuracyToPass: 85,
  },
  {
    id: 'intermediate-biomes-1',
    title: 'World Biomes',
    description: 'Type different biome names',
    difficulty: 'intermediate',
    category: 'biomes',
    content: {
      type: 'words',
      data: ['plains', 'forest', 'desert', 'mountains', 'ocean', 'jungle', 'swamp', 'taiga'],
      instructions: 'Explore different biomes through typing!',
    },
    unlocked: false,
    completed: false,
    minWpmToPass: 25,
    minAccuracyToPass: 85,
  },
  {
    id: 'intermediate-sentences-1',
    title: 'Adventure Stories',
    description: 'Type sentences about Minecraft adventures',
    difficulty: 'intermediate',
    category: 'general',
    content: {
      type: 'sentences',
      data: typingContent.intermediate.sentences.slice(0, 10),
      instructions: 'Type these adventure sentences with good speed and accuracy.',
    },
    unlocked: false,
    completed: false,
    minWpmToPass: 30,
    minAccuracyToPass: 85,
  },

  // Advanced Lessons
  {
    id: 'advanced-enchantments-1',
    title: 'Enchantment Names',
    description: 'Master complex enchantment names',
    difficulty: 'advanced',
    category: 'items',
    content: {
      type: 'words',
      data: ['efficiency', 'unbreaking', 'fortune', 'sharpness', 'protection', 'thorns', 'mending'],
      instructions: 'These enchantment names are tricky. Take your time!',
    },
    unlocked: false,
    completed: false,
    minWpmToPass: 35,
    minAccuracyToPass: 90,
  },
  {
    id: 'advanced-commands-1',
    title: 'Game Commands',
    description: 'Type Minecraft commands accurately',
    difficulty: 'advanced',
    category: 'commands',
    content: {
      type: 'sentences',
      data: [
        '/gamemode creative',
        '/give @p diamond_sword 1',
        '/tp @a 0 64 0',
        '/weather clear 1000',
        '/time set day',
        '/difficulty peaceful',
        '/enchant @p sharpness 5',
      ],
      instructions: 'Commands must be typed exactly! One mistake and they won\'t work.',
    },
    unlocked: false,
    completed: false,
    minWpmToPass: 40,
    minAccuracyToPass: 95,
  },
  {
    id: 'advanced-paragraphs-1',
    title: 'Minecraft Lore',
    description: 'Type detailed paragraphs about Minecraft',
    difficulty: 'advanced',
    category: 'general',
    content: {
      type: 'paragraphs',
      data: typingContent.advanced.paragraphs.slice(0, 2),
      instructions: 'Long paragraphs test your endurance. Maintain accuracy throughout!',
    },
    unlocked: false,
    completed: false,
    minWpmToPass: 45,
    minAccuracyToPass: 90,
  },
  {
    id: 'advanced-redstone-1',
    title: 'Redstone Engineering',
    description: 'Complex sentences about redstone mechanics',
    difficulty: 'advanced',
    category: 'general',
    content: {
      type: 'sentences',
      data: [
        'Redstone repeaters delay signals by one to four ticks.',
        'Comparators can subtract signal strength or detect container fullness.',
        'Pistons can push up to twelve blocks in a single activation.',
        'Observers detect block updates and emit redstone pulses.',
        'Hoppers transfer items between containers automatically.',
        'Dispensers shoot items while droppers simply drop them.',
      ],
      instructions: 'Redstone is complex! Type these technical sentences carefully.',
    },
    unlocked: false,
    completed: false,
    minWpmToPass: 40,
    minAccuracyToPass: 92,
  },
];

// Helper function to get lessons by difficulty
export const getLessonsByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
  return lessons.filter(lesson => lesson.difficulty === difficulty);
};

// Helper function to get lessons by category
export const getLessonsByCategory = (category: string) => {
  return lessons.filter(lesson => lesson.category === category);
};

// Helper function to get unlocked lessons
export const getUnlockedLessons = () => {
  return lessons.filter(lesson => lesson.unlocked);
};

// Helper function to get next lesson to unlock
export const getNextLessonToUnlock = () => {
  return lessons.find(lesson => !lesson.unlocked);
};
