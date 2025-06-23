import type { HangmanWord } from '../types/index';

export const hangmanWords: HangmanWord[] = [
  // Beginner Level - Simple Minecraft terms
  {
    id: 'beginner-blocks-dirt',
    word: 'DIRT',
    hint: 'The most common block you dig when starting',
    category: 'blocks',
    difficulty: 'beginner',
  },
  {
    id: 'beginner-blocks-wood',
    word: 'WOOD',
    hint: 'Essential material from trees',
    category: 'blocks',
    difficulty: 'beginner',
  },
  {
    id: 'beginner-blocks-stone',
    word: 'STONE',
    hint: 'Hard gray block found underground',
    category: 'blocks',
    difficulty: 'beginner',
  },
  {
    id: 'beginner-blocks-grass',
    word: 'GRASS',
    hint: 'Green block that spreads on dirt',
    category: 'blocks',
    difficulty: 'beginner',
  },
  {
    id: 'beginner-blocks-sand',
    word: 'SAND',
    hint: 'Falls down when not supported',
    category: 'blocks',
    difficulty: 'beginner',
  },
  {
    id: 'beginner-items-sword',
    word: 'SWORD',
    hint: 'Weapon for fighting mobs',
    category: 'items',
    difficulty: 'beginner',
  },
  {
    id: 'beginner-items-pickaxe',
    word: 'PICKAXE',
    hint: 'Tool for mining stone and ores',
    category: 'items',
    difficulty: 'beginner',
  },
  {
    id: 'beginner-items-torch',
    word: 'TORCH',
    hint: 'Provides light in dark places',
    category: 'items',
    difficulty: 'beginner',
  },
  {
    id: 'beginner-items-chest',
    word: 'CHEST',
    hint: 'Storage container for items',
    category: 'items',
    difficulty: 'beginner',
  },
  {
    id: 'beginner-mobs-pig',
    word: 'PIG',
    hint: 'Pink farm animal that drops pork',
    category: 'mobs',
    difficulty: 'beginner',
  },
  {
    id: 'beginner-mobs-cow',
    word: 'COW',
    hint: 'Black and white animal that gives milk',
    category: 'mobs',
    difficulty: 'beginner',
  },
  {
    id: 'beginner-mobs-sheep',
    word: 'SHEEP',
    hint: 'Fluffy animal that provides wool',
    category: 'mobs',
    difficulty: 'beginner',
  },
  {
    id: 'beginner-mobs-zombie',
    word: 'ZOMBIE',
    hint: 'Green hostile mob that spawns at night',
    category: 'mobs',
    difficulty: 'beginner',
  },
  {
    id: 'beginner-biomes-forest',
    word: 'FOREST',
    hint: 'Biome full of trees',
    category: 'biomes',
    difficulty: 'beginner',
  },
  {
    id: 'beginner-biomes-desert',
    word: 'DESERT',
    hint: 'Hot sandy biome with cacti',
    category: 'biomes',
    difficulty: 'beginner',
  },

  // Intermediate Level - Compound terms and phrases
  {
    id: 'intermediate-blocks-cobblestone',
    word: 'COBBLESTONE',
    hint: 'What you get when mining stone',
    category: 'blocks',
    difficulty: 'intermediate',
  },
  {
    id: 'intermediate-blocks-obsidian',
    word: 'OBSIDIAN',
    hint: 'Black block created by water and lava',
    category: 'blocks',
    difficulty: 'intermediate',
  },
  {
    id: 'intermediate-blocks-redstone',
    word: 'REDSTONE',
    hint: 'Red dust used for circuits and contraptions',
    category: 'blocks',
    difficulty: 'intermediate',
  },
  {
    id: 'intermediate-items-diamond',
    word: 'DIAMOND',
    hint: 'Rare blue gem found deep underground',
    category: 'items',
    difficulty: 'intermediate',
  },
  {
    id: 'intermediate-items-enchanting',
    word: 'ENCHANTING',
    hint: 'Process of adding magical properties to items',
    category: 'items',
    difficulty: 'intermediate',
  },
  {
    id: 'intermediate-mobs-creeper',
    word: 'CREEPER',
    hint: 'Green mob that explodes when close',
    category: 'mobs',
    difficulty: 'intermediate',
  },
  {
    id: 'intermediate-mobs-skeleton',
    word: 'SKELETON',
    hint: 'Bony archer that shoots arrows',
    category: 'mobs',
    difficulty: 'intermediate',
  },
  {
    id: 'intermediate-mobs-enderman',
    word: 'ENDERMAN',
    hint: 'Tall black mob that teleports',
    category: 'mobs',
    difficulty: 'intermediate',
  },
  {
    id: 'intermediate-crafting-furnace',
    word: 'FURNACE',
    hint: 'Block used for smelting and cooking',
    category: 'crafting',
    difficulty: 'intermediate',
  },
  {
    id: 'intermediate-crafting-brewing',
    word: 'BREWING',
    hint: 'Making potions with a special stand',
    category: 'crafting',
    difficulty: 'intermediate',
  },
  {
    id: 'intermediate-biomes-nether',
    word: 'NETHER',
    hint: 'Hell-like dimension accessed through portals',
    category: 'biomes',
    difficulty: 'intermediate',
  },
  {
    id: 'intermediate-phrases-mine-craft',
    word: 'MINE CRAFT',
    hint: 'The art of digging and building',
    category: 'phrases',
    difficulty: 'intermediate',
  },

  // Advanced Level - Complex terms and technical concepts
  {
    id: 'advanced-technical-chunk-loading',
    word: 'CHUNK LOADING',
    hint: 'System that loads world sections into memory',
    category: 'technical',
    difficulty: 'advanced',
  },
  {
    id: 'advanced-commands-gamemode',
    word: 'GAMEMODE',
    hint: 'Command to change between survival, creative, etc.',
    category: 'commands',
    difficulty: 'advanced',
  },
  {
    id: 'advanced-items-netherite',
    word: 'NETHERITE',
    hint: 'Strongest material, upgraded from diamond',
    category: 'items',
    difficulty: 'advanced',
  },
  {
    id: 'advanced-mobs-ender-dragon',
    word: 'ENDER DRAGON',
    hint: 'Final boss found in The End dimension',
    category: 'mobs',
    difficulty: 'advanced',
  },
  {
    id: 'advanced-technical-redstone-circuit',
    word: 'REDSTONE CIRCUIT',
    hint: 'Complex electrical system using red dust',
    category: 'technical',
    difficulty: 'advanced',
  },
  {
    id: 'advanced-phrases-respawn-anchor',
    word: 'RESPAWN ANCHOR',
    hint: 'Block that sets spawn point in the Nether',
    category: 'phrases',
    difficulty: 'advanced',
  },
  {
    id: 'advanced-technical-mob-spawner',
    word: 'MOB SPAWNER',
    hint: 'Block that continuously creates monsters',
    category: 'technical',
    difficulty: 'advanced',
  },
  {
    id: 'advanced-phrases-enchantment-table',
    word: 'ENCHANTMENT TABLE',
    hint: 'Magical workstation for improving gear',
    category: 'phrases',
    difficulty: 'advanced',
  },
  {
    id: 'advanced-technical-world-generation',
    word: 'WORLD GENERATION',
    hint: 'Process of creating infinite terrain',
    category: 'technical',
    difficulty: 'advanced',
  },
  {
    id: 'advanced-phrases-stronghold-portal',
    word: 'STRONGHOLD PORTAL',
    hint: 'Gateway to The End found in underground fortress',
    category: 'phrases',
    difficulty: 'advanced',
  },

  // Additional Beginner Words
  {
    id: 'beginner-items-bed',
    word: 'BED',
    hint: 'Used to sleep and set spawn point',
    category: 'items',
    difficulty: 'beginner',
  },
  {
    id: 'beginner-items-boat',
    word: 'BOAT',
    hint: 'Vehicle for traveling on water',
    category: 'items',
    difficulty: 'beginner',
  },
  {
    id: 'beginner-blocks-coal',
    word: 'COAL',
    hint: 'Black fuel found underground',
    category: 'blocks',
    difficulty: 'beginner',
  },
  {
    id: 'beginner-blocks-iron',
    word: 'IRON',
    hint: 'Gray metal ore for making tools',
    category: 'blocks',
    difficulty: 'beginner',
  },
  {
    id: 'beginner-mobs-spider',
    word: 'SPIDER',
    hint: 'Eight-legged mob that climbs walls',
    category: 'mobs',
    difficulty: 'beginner',
  },
  {
    id: 'beginner-biomes-ocean',
    word: 'OCEAN',
    hint: 'Large body of water with fish',
    category: 'biomes',
    difficulty: 'beginner',
  },

  // Additional Intermediate Words
  {
    id: 'intermediate-items-emerald',
    word: 'EMERALD',
    hint: 'Green gem used for trading with villagers',
    category: 'items',
    difficulty: 'intermediate',
  },
  {
    id: 'intermediate-mobs-villager',
    word: 'VILLAGER',
    hint: 'Peaceful NPC that trades items',
    category: 'mobs',
    difficulty: 'intermediate',
  },
  {
    id: 'intermediate-blocks-glowstone',
    word: 'GLOWSTONE',
    hint: 'Bright yellow block from the Nether',
    category: 'blocks',
    difficulty: 'intermediate',
  },
  {
    id: 'intermediate-crafting-anvil',
    word: 'ANVIL',
    hint: 'Heavy block for repairing and naming items',
    category: 'crafting',
    difficulty: 'intermediate',
  },
  {
    id: 'intermediate-biomes-jungle',
    word: 'JUNGLE',
    hint: 'Dense green biome with tall trees',
    category: 'biomes',
    difficulty: 'intermediate',
  },
  {
    id: 'intermediate-phrases-nether-portal',
    word: 'NETHER PORTAL',
    hint: 'Purple gateway to the underworld',
    category: 'phrases',
    difficulty: 'intermediate',
  },

  // Additional Advanced Words
  {
    id: 'advanced-commands-scoreboard',
    word: 'SCOREBOARD',
    hint: 'System for tracking player statistics',
    category: 'commands',
    difficulty: 'advanced',
  },
  {
    id: 'advanced-technical-command-block',
    word: 'COMMAND BLOCK',
    hint: 'Special block that executes commands',
    category: 'technical',
    difficulty: 'advanced',
  },
  {
    id: 'advanced-phrases-beacon-pyramid',
    word: 'BEACON PYRAMID',
    hint: 'Structure that provides status effects',
    category: 'phrases',
    difficulty: 'advanced',
  },
  {
    id: 'advanced-technical-structure-block',
    word: 'STRUCTURE BLOCK',
    hint: 'Tool for saving and loading builds',
    category: 'technical',
    difficulty: 'advanced',
  },
];

// Helper functions for filtering words
export const getWordsByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
  return hangmanWords.filter(word => word.difficulty === difficulty);
};

export const getWordsByCategory = (category: string) => {
  return hangmanWords.filter(word => word.category === category);
};

export const getRandomWord = (difficulty?: 'beginner' | 'intermediate' | 'advanced', category?: string) => {
  let filteredWords = hangmanWords;
  
  if (difficulty) {
    filteredWords = filteredWords.filter(word => word.difficulty === difficulty);
  }
  
  if (category) {
    filteredWords = filteredWords.filter(word => word.category === category);
  }
  
  if (filteredWords.length === 0) {
    return hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
  }
  
  return filteredWords[Math.floor(Math.random() * filteredWords.length)];
};

export const getWordById = (id: string) => {
  return hangmanWords.find(word => word.id === id);
};
