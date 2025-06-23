import type { MinecraftBlock, MinecraftItem, MinecraftMob, MinecraftBiome } from '../types/index';

// Minecraft Blocks
export const minecraftBlocks: MinecraftBlock[] = [
  // Common blocks (beginner)
  { id: 'dirt', name: 'dirt', category: 'natural', rarity: 'common' },
  { id: 'grass', name: 'grass', category: 'natural', rarity: 'common' },
  { id: 'stone', name: 'stone', category: 'natural', rarity: 'common' },
  { id: 'wood', name: 'wood', category: 'natural', rarity: 'common' },
  { id: 'sand', name: 'sand', category: 'natural', rarity: 'common' },
  { id: 'water', name: 'water', category: 'liquid', rarity: 'common' },
  { id: 'lava', name: 'lava', category: 'liquid', rarity: 'common' },
  { id: 'coal', name: 'coal', category: 'ore', rarity: 'common' },
  { id: 'iron', name: 'iron', category: 'ore', rarity: 'common' },
  { id: 'gold', name: 'gold', category: 'ore', rarity: 'uncommon' },
  
  // Uncommon blocks (intermediate)
  { id: 'diamond', name: 'diamond', category: 'ore', rarity: 'rare' },
  { id: 'emerald', name: 'emerald', category: 'ore', rarity: 'rare' },
  { id: 'obsidian', name: 'obsidian', category: 'natural', rarity: 'uncommon' },
  { id: 'bedrock', name: 'bedrock', category: 'natural', rarity: 'epic' },
  { id: 'netherrack', name: 'netherrack', category: 'nether', rarity: 'uncommon' },
  { id: 'endstone', name: 'end stone', category: 'end', rarity: 'uncommon' },
  { id: 'glowstone', name: 'glowstone', category: 'nether', rarity: 'uncommon' },
  { id: 'redstone', name: 'redstone', category: 'ore', rarity: 'uncommon' },
  { id: 'lapislazuli', name: 'lapis lazuli', category: 'ore', rarity: 'uncommon' },
  { id: 'quartz', name: 'quartz', category: 'nether', rarity: 'uncommon' },
];

// Minecraft Items
export const minecraftItems: MinecraftItem[] = [
  // Basic items (beginner)
  { id: 'stick', name: 'stick', category: 'material', craftable: true },
  { id: 'torch', name: 'torch', category: 'light', craftable: true },
  { id: 'chest', name: 'chest', category: 'storage', craftable: true },
  { id: 'bed', name: 'bed', category: 'utility', craftable: true },
  { id: 'door', name: 'door', category: 'utility', craftable: true },
  { id: 'ladder', name: 'ladder', category: 'utility', craftable: true },
  { id: 'boat', name: 'boat', category: 'transport', craftable: true },
  { id: 'bucket', name: 'bucket', category: 'utility', craftable: true },
  { id: 'bread', name: 'bread', category: 'food', craftable: true },
  { id: 'apple', name: 'apple', category: 'food', craftable: false },
  
  // Advanced items (intermediate/advanced)
  { id: 'pickaxe', name: 'pickaxe', category: 'tool', craftable: true },
  { id: 'sword', name: 'sword', category: 'weapon', craftable: true },
  { id: 'bow', name: 'bow', category: 'weapon', craftable: true },
  { id: 'arrow', name: 'arrow', category: 'weapon', craftable: true },
  { id: 'compass', name: 'compass', category: 'utility', craftable: true },
  { id: 'clock', name: 'clock', category: 'utility', craftable: true },
  { id: 'enchantingtable', name: 'enchanting table', category: 'utility', craftable: true },
  { id: 'anvil', name: 'anvil', category: 'utility', craftable: true },
  { id: 'brewingstand', name: 'brewing stand', category: 'utility', craftable: true },
  { id: 'enderchest', name: 'ender chest', category: 'storage', craftable: true },
];

// Minecraft Mobs
export const minecraftMobs: MinecraftMob[] = [
  // Passive mobs (beginner)
  { id: 'pig', name: 'pig', type: 'passive', biome: ['plains', 'forest'] },
  { id: 'cow', name: 'cow', type: 'passive', biome: ['plains', 'forest'] },
  { id: 'sheep', name: 'sheep', type: 'passive', biome: ['plains', 'forest'] },
  { id: 'chicken', name: 'chicken', type: 'passive', biome: ['plains', 'forest'] },
  { id: 'horse', name: 'horse', type: 'passive', biome: ['plains', 'savanna'] },
  { id: 'wolf', name: 'wolf', type: 'neutral', biome: ['forest', 'taiga'] },
  { id: 'cat', name: 'cat', type: 'passive', biome: ['village'] },
  { id: 'villager', name: 'villager', type: 'passive', biome: ['village'] },
  
  // Hostile mobs (intermediate/advanced)
  { id: 'zombie', name: 'zombie', type: 'hostile', biome: ['overworld'] },
  { id: 'skeleton', name: 'skeleton', type: 'hostile', biome: ['overworld'] },
  { id: 'creeper', name: 'creeper', type: 'hostile', biome: ['overworld'] },
  { id: 'spider', name: 'spider', type: 'neutral', biome: ['overworld'] },
  { id: 'enderman', name: 'enderman', type: 'neutral', biome: ['overworld', 'end'] },
  { id: 'witch', name: 'witch', type: 'hostile', biome: ['swamp'] },
  { id: 'ghast', name: 'ghast', type: 'hostile', biome: ['nether'] },
  { id: 'blaze', name: 'blaze', type: 'hostile', biome: ['nether'] },
  { id: 'enderdragon', name: 'ender dragon', type: 'boss', biome: ['end'] },
  { id: 'wither', name: 'wither', type: 'boss', biome: ['overworld'] },
];

// Minecraft Biomes
export const minecraftBiomes: MinecraftBiome[] = [
  // Overworld biomes
  { id: 'plains', name: 'plains', dimension: 'overworld', temperature: 'temperate' },
  { id: 'forest', name: 'forest', dimension: 'overworld', temperature: 'temperate' },
  { id: 'desert', name: 'desert', dimension: 'overworld', temperature: 'hot' },
  { id: 'mountains', name: 'mountains', dimension: 'overworld', temperature: 'cold' },
  { id: 'ocean', name: 'ocean', dimension: 'overworld', temperature: 'temperate' },
  { id: 'swamp', name: 'swamp', dimension: 'overworld', temperature: 'warm' },
  { id: 'jungle', name: 'jungle', dimension: 'overworld', temperature: 'hot' },
  { id: 'taiga', name: 'taiga', dimension: 'overworld', temperature: 'cold' },
  { id: 'tundra', name: 'tundra', dimension: 'overworld', temperature: 'cold' },
  { id: 'savanna', name: 'savanna', dimension: 'overworld', temperature: 'warm' },
  
  // Other dimensions
  { id: 'nether', name: 'nether', dimension: 'nether', temperature: 'hot' },
  { id: 'end', name: 'the end', dimension: 'end', temperature: 'cold' },
];

// Typing content organized by difficulty
export const typingContent = {
  beginner: {
    words: [
      // Basic blocks and items (3-6 letters)
      'dirt', 'grass', 'stone', 'wood', 'sand', 'coal', 'iron', 'gold',
      'pig', 'cow', 'sheep', 'cat', 'bed', 'door', 'boat', 'chest',
      'torch', 'stick', 'bread', 'apple', 'water', 'lava', 'cave',
      'mine', 'craft', 'build', 'dig', 'chop', 'farm', 'cook',
      'day', 'night', 'sun', 'moon', 'rain', 'snow', 'hot', 'cold',
    ],
    sentences: [
      'Punching trees gives you wood blocks.',
      'Pigs are chill and drop pork.',
      'Stone tools are better than wood.',
      'Logs craft into wooden planks easily.',
      'Coal burns longer than wood sticks.',
      'Iron gear is absolutely fire.',
      'Gold tools mine super fast.',
      'Sheep drop wool for building.',
      'Cows give leather and beef.',
      'Chickens lay eggs for breeding.',
      'Water buckets save you from lava.',
      'Lava kills you instantly no cap.',
      'Daytime is safe for exploring.',
      'Night spawns dangerous hostile mobs.',
      'Crafting tools helps you survive.',
      'Building houses prevents mob attacks.',
      'Farming provides unlimited food sources.',
      'Cooked food restores more hunger.',
      'Torches prevent monsters from spawning.',
      'Chests organize your loot perfectly.',
    ],
  },
  
  intermediate: {
    words: [
      // More complex items and concepts (6-12 letters)
      'diamond', 'emerald', 'obsidian', 'redstone', 'enchanting', 'brewing',
      'zombie', 'skeleton', 'creeper', 'spider', 'enderman', 'villager',
      'plains', 'forest', 'desert', 'mountains', 'ocean', 'jungle',
      'pickaxe', 'sword', 'compass', 'furnace', 'crafting', 'smelting',
      'nether', 'portal', 'blaze', 'ghast', 'fortress', 'wither',
      'experience', 'enchantment', 'potion', 'brewing', 'trading',
      'adventure', 'exploration', 'survival', 'creative', 'hardcore',
    ],
    sentences: [
      'Diamond ore spawns below Y level zero.',
      'Redstone creates absolutely insane contraptions.',
      'Enchanting tables make your gear OP.',
      'Zombies are annoying and spawn at night.',
      'Skeletons have cracked aim with arrows.',
      'Creepers are absolutely menaces that explode.',
      'Endermen are creepy and teleport everywhere.',
      'Villagers have broken trades for emeralds.',
      'The nether dimension is straight up dangerous.',
      'Blazes drop rods needed for brewing.',
      'Ghasts are annoying and shoot fireballs.',
      'Brewing stands create powerful effect potions.',
      'Experience points unlock better enchantments.',
      'Adventure maps showcase incredible creativity.',
      'Survival mode separates noobs from pros.',
      'Creative mode gives unlimited building resources.',
      'Hardcore mode makes death absolutely permanent.',
      'Exploration reveals the most fire loot.',
      'Mountain caves contain the best ores.',
      'Ocean monuments hide elder guardian bosses.',
    ],
  },
  
  advanced: {
    words: [
      // Complex terms and advanced concepts (8+ letters)
      'enchantment', 'experience', 'achievement', 'advancement', 'stronghold',
      'enderdragon', 'netherfortress', 'oceanmonument', 'woodlandmansion',
      'archaeology', 'cartography', 'librarian', 'blacksmith', 'fletcher',
      'efficiency', 'unbreaking', 'fortune', 'silktouch', 'sharpness',
      'protection', 'thorns', 'respiration', 'aquaaffinity', 'featherfall',
      'multishot', 'piercing', 'quickcharge', 'loyalty', 'channeling',
      'mending', 'infinity', 'flame', 'punch', 'power', 'impaling',
      'riptide', 'conductivity', 'sweeping', 'knockback', 'looting',
    ],
    sentences: [
      'Enchantments significantly improve weapon effectiveness and durability.',
      'The Ender Dragon guards the End dimension jealously.',
      'Nether fortresses contain valuable blaze spawners.',
      'Ocean monuments house dangerous elder guardians.',
      'Woodland mansions hide rare totems of undying.',
      'Efficiency enchantment increases mining speed dramatically.',
      'Unbreaking extends tool durability beyond normal limits.',
      'Fortune multiplies ore drops when mining.',
      'Silk Touch preserves blocks in original form.',
      'Sharpness increases sword damage against all mobs.',
      'Protection reduces incoming damage from attacks.',
      'Thorns reflects damage back to attackers.',
      'Respiration extends underwater breathing time significantly.',
      'Aqua Affinity speeds up underwater mining.',
      'Feather Falling reduces fall damage taken.',
      'Multishot fires three arrows simultaneously.',
      'Piercing allows arrows to pass through mobs.',
      'Quick Charge reduces crossbow reload time.',
      'Loyalty returns tridents after throwing them.',
      'Channeling summons lightning during thunderstorms.',
    ],
    paragraphs: [
      'Minecraft is a sandbox video game that allows players to build and explore virtual worlds made of blocks. Players can gather resources, craft tools and weapons, build structures, and survive against hostile mobs. The game features multiple dimensions including the Overworld, Nether, and End, each with unique biomes, mobs, and resources. Creative mode provides unlimited resources for building, while Survival mode challenges players to gather materials and maintain health and hunger.',
      
      'The enchanting system in Minecraft allows players to enhance their tools, weapons, and armor with magical properties. Using experience points gained from various activities, players can apply enchantments at enchanting tables or anvils. Popular enchantments include Efficiency for faster mining, Unbreaking for increased durability, Fortune for better ore yields, and Sharpness for increased weapon damage. Some enchantments are mutually exclusive, requiring strategic choices about which benefits to prioritize.',
      
      'Redstone engineering represents one of Minecraft\'s most complex and rewarding aspects. This virtual electrical system allows players to create automated farms, complex doors, calculators, and even primitive computers. Redstone components include repeaters, comparators, pistons, and dispensers, which can be combined to create intricate contraptions. Master redstone engineers have built working calculators, music players, and elaborate sorting systems that demonstrate the system\'s incredible versatility and potential.',
    ],
  },
};

// Crafting recipes for advanced lessons
export const craftingRecipes = [
  'wooden pickaxe requires three wooden planks and two sticks',
  'stone sword needs two cobblestone blocks and one stick',
  'iron armor provides better protection than leather gear',
  'diamond tools last longer and work faster than iron',
  'enchanting table requires four obsidian, two diamonds, and one book',
  'brewing stand needs three cobblestone and one blaze rod',
  'ender chest requires eight obsidian blocks and one ender eye',
  'beacon needs three obsidian, five glass, and one nether star',
];

// Export all content for easy access
export const allMinecraftContent = {
  blocks: minecraftBlocks,
  items: minecraftItems,
  mobs: minecraftMobs,
  biomes: minecraftBiomes,
  typing: typingContent,
  crafting: craftingRecipes,
};
