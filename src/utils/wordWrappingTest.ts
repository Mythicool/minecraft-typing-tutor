/**
 * Word-Wrapping Test Utilities
 * 
 * This file contains specific tests for the word-wrapping fix in typing content areas.
 * It verifies that long words wrap as complete units without breaking mid-word.
 */

import { generateCharacterStates, generateWordGroups } from './typingUtils';

// Test data with problematic words that were breaking mid-word
export const problematicWordList = "diamond emerald redstone lapis obsidian quartz netherite copper amethyst deepslate";

export const longMinecraftTerms = [
  "minecraft:waxed_oxidized_cut_copper_stairs",
  "minecraft:suspicious_gravel",
  "minecraft:deepslate_diamond_ore",
  "minecraft:enchanted_golden_apple",
  "minecraft:netherite_sword",
  "minecraft:crimson_hanging_sign",
  "minecraft:warped_hanging_sign",
  "minecraft:mangrove_hanging_sign"
];

export const generationAlphaContent = [
  "This build is absolutely bussin no cap the redstone contraptions are straight up cracked",
  "Finding diamonds at Y level negative fifty four hits different than the old caves",
  "Speedrunners beat the game in under twenty minutes using absolutely broken strategies",
  "Building mega bases demands serious planning and resource management skills that separate noobs from pros"
];

export const mixedContent = [
  "Building with minecraft:stone_bricks and minecraft:oak_planks creates amazing structures that look absolutely fire",
  "The minecraft:waxed_oxidized_cut_copper_stairs block has the longest name in the game",
  "Using minecraft:netherite_sword with sharpness five enchantment deals massive damage to hostile mobs"
];

/**
 * Test that words are properly grouped and won't break mid-word
 */
export const testWordGrouping = (text: string): {
  passed: boolean;
  details: string;
  wordGroups: Array<{ word: string; length: number; hasSpaces: boolean }>;
} => {
  const characterStates = generateCharacterStates(text, '', 0);
  const wordGroups = generateWordGroups(characterStates);
  
  const results = wordGroups.map(group => ({
    word: group.word,
    length: group.word.length,
    hasSpaces: group.word.includes(' '),
    isWhitespace: group.word === ' ' || group.word === '\n' || group.word === '\t'
  }));
  
  // Check that no word group contains spaces (except whitespace groups)
  const invalidGroups = results.filter(group => 
    group.hasSpaces && !group.isWhitespace
  );
  
  const passed = invalidGroups.length === 0;
  
  return {
    passed,
    details: passed 
      ? `All ${wordGroups.length} word groups are properly formed`
      : `Found ${invalidGroups.length} invalid word groups that contain spaces`,
    wordGroups: results.map(r => ({
      word: r.word,
      length: r.length,
      hasSpaces: r.hasSpaces
    }))
  };
};

/**
 * Test specific problematic words that were breaking
 */
export const testProblematicWords = (): {
  passed: boolean;
  details: string;
  results: Array<{ word: string; passed: boolean; reason: string }>;
} => {
  const words = problematicWordList.split(' ');
  const results = words.map(word => {
    const test = testWordGrouping(word);
    const wordGroup = test.wordGroups.find(g => g.word === word);
    
    if (!wordGroup) {
      return {
        word,
        passed: false,
        reason: 'Word not found in groups'
      };
    }
    
    if (wordGroup.hasSpaces) {
      return {
        word,
        passed: false,
        reason: 'Word group contains spaces'
      };
    }
    
    return {
      word,
      passed: true,
      reason: 'Word properly grouped'
    };
  });
  
  const failedWords = results.filter(r => !r.passed);
  
  return {
    passed: failedWords.length === 0,
    details: failedWords.length === 0 
      ? `All ${words.length} problematic words are properly handled`
      : `${failedWords.length} words failed: ${failedWords.map(w => w.word).join(', ')}`,
    results
  };
};

/**
 * Test long Minecraft terms
 */
export const testLongMinecraftTerms = (): {
  passed: boolean;
  details: string;
  results: Array<{ term: string; length: number; passed: boolean }>;
} => {
  const results = longMinecraftTerms.map(term => {
    const test = testWordGrouping(term);
    const termGroup = test.wordGroups.find(g => g.word === term);
    
    return {
      term,
      length: term.length,
      passed: !!termGroup && !termGroup.hasSpaces
    };
  });
  
  const failedTerms = results.filter(r => !r.passed);
  
  return {
    passed: failedTerms.length === 0,
    details: failedTerms.length === 0
      ? `All ${longMinecraftTerms.length} long terms are properly handled`
      : `${failedTerms.length} terms failed`,
    results
  };
};

/**
 * Test Generation Alpha content with mixed terminology
 */
export const testGenerationAlphaContent = (): {
  passed: boolean;
  details: string;
  results: Array<{ content: string; wordCount: number; passed: boolean }>;
} => {
  const results = generationAlphaContent.map(content => {
    const test = testWordGrouping(content);

    return {
      content: content.substring(0, 50) + '...',
      wordCount: test.wordGroups.length,
      passed: test.passed
    };
  });
  
  const failedContent = results.filter(r => !r.passed);
  
  return {
    passed: failedContent.length === 0,
    details: failedContent.length === 0
      ? `All ${generationAlphaContent.length} content pieces are properly handled`
      : `${failedContent.length} content pieces failed`,
    results
  };
};

/**
 * Comprehensive test runner for word-wrapping fixes
 */
export const runWordWrappingTests = (): {
  overallPassed: boolean;
  summary: string;
  tests: Array<{
    name: string;
    passed: boolean;
    details: string;
  }>;
} => {
  const tests = [
    {
      name: 'Problematic Word List',
      ...testProblematicWords()
    },
    {
      name: 'Long Minecraft Terms',
      ...testLongMinecraftTerms()
    },
    {
      name: 'Generation Alpha Content',
      ...testGenerationAlphaContent()
    }
  ];
  
  const passedTests = tests.filter(t => t.passed).length;
  const totalTests = tests.length;
  const overallPassed = passedTests === totalTests;
  
  return {
    overallPassed,
    summary: `${passedTests}/${totalTests} tests passed`,
    tests: tests.map(t => ({
      name: t.name,
      passed: t.passed,
      details: t.details
    }))
  };
};

/**
 * Visual test helper for browser testing
 */
export const createWordWrappingTestElement = (text: string): HTMLElement => {
  const container = document.createElement('div');
  container.style.cssText = `
    font-family: 'Press Start 2P', monospace;
    font-size: 16px;
    line-height: 1.6;
    width: 300px;
    padding: 16px;
    border: 2px solid #ccc;
    background: #f5f5f5;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: normal;
    hyphens: none;
  `;
  
  const characterStates = generateCharacterStates(text, '', 0);
  const wordGroups = generateWordGroups(characterStates);
  
  wordGroups.forEach(group => {
    if (group.word === ' ' || group.word === '\n' || group.word === '\t') {
      const span = document.createElement('span');
      span.textContent = group.word === ' ' ? '\u00A0' : group.word;
      container.appendChild(span);
    } else {
      const wordSpan = document.createElement('span');
      wordSpan.style.cssText = `
        display: inline-block;
        white-space: nowrap;
        background: rgba(0, 191, 255, 0.1);
        border: 1px solid rgba(0, 191, 255, 0.3);
        margin: 1px;
      `;
      wordSpan.textContent = group.word;
      container.appendChild(wordSpan);
    }
  });
  
  return container;
};

/**
 * Export test data for use in components
 */
export const testData = {
  problematicWordList,
  longMinecraftTerms,
  generationAlphaContent,
  mixedContent
};
