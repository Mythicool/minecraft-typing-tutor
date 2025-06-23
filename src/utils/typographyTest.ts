/**
 * Typography and Word-Wrapping Test Utilities
 * 
 * This file contains test cases and utilities to verify that our typography
 * improvements work correctly across different scenarios.
 */

export interface TypographyTestCase {
  id: string;
  name: string;
  content: string;
  expectedBehavior: string;
  testType: 'word-wrap' | 'responsive' | 'line-height' | 'font-scaling';
}

export const wordWrappingTestCases: TypographyTestCase[] = [
  {
    id: 'long-minecraft-items',
    name: 'Long Minecraft Item Names',
    content: 'minecraft:waxed_oxidized_cut_copper_stairs minecraft:suspicious_gravel minecraft:deepslate_diamond_ore',
    expectedBehavior: 'Should wrap as complete units, no mid-word breaks',
    testType: 'word-wrap'
  },
  {
    id: 'mixed-content',
    name: 'Mixed Content Types',
    content: 'Building with minecraft:stone_bricks and minecraft:oak_planks creates amazing structures that look absolutely fire!',
    expectedBehavior: 'Technical terms wrap as units, regular words flow naturally',
    testType: 'word-wrap'
  },
  {
    id: 'gen-alpha-slang',
    name: 'Generation Alpha Gaming Language',
    content: 'This build is absolutely bussin no cap! The redstone contraptions are straight up cracked and the design hits different.',
    expectedBehavior: 'Slang terms and phrases wrap naturally without breaking',
    testType: 'word-wrap'
  },
  {
    id: 'technical-commands',
    name: 'Minecraft Commands',
    content: '/give @p minecraft:netherite_sword{Enchantments:[{id:"sharpness",lvl:5}]} 1',
    expectedBehavior: 'Command syntax preserves structure, wraps at appropriate points',
    testType: 'word-wrap'
  },
  {
    id: 'typing-lesson-content',
    name: 'Typing Lesson Content',
    content: `Finding diamonds at Y level negative fifty four hits different.
Creepers always spawn when you least expect them.
Building a nether portal feels like a major achievement.`,
    expectedBehavior: 'Preserves line breaks, wraps words naturally',
    testType: 'word-wrap'
  }
];

export const responsiveTestCases: TypographyTestCase[] = [
  {
    id: 'mobile-readability',
    name: 'Mobile Device Readability',
    content: 'This text should remain readable and properly sized on mobile devices with appropriate font scaling.',
    expectedBehavior: 'Font scales down appropriately, maintains readability',
    testType: 'responsive'
  },
  {
    id: 'tablet-layout',
    name: 'Tablet Layout Adaptation',
    content: 'Medium-sized screens should show balanced typography with optimal line lengths and spacing.',
    expectedBehavior: 'Balanced typography, good line length',
    testType: 'responsive'
  },
  {
    id: 'desktop-experience',
    name: 'Desktop Full Experience',
    content: 'Large screens should display full typography with maximum readability and visual hierarchy.',
    expectedBehavior: 'Full typography scale, optimal spacing',
    testType: 'responsive'
  }
];

export const lineHeightTestCases: TypographyTestCase[] = [
  {
    id: 'tight-headings',
    name: 'Tight Line Height for Headings',
    content: 'Epic Minecraft Builds\nLegendary Constructions',
    expectedBehavior: 'Compact spacing for visual impact',
    testType: 'line-height'
  },
  {
    id: 'normal-body',
    name: 'Normal Line Height for Body Text',
    content: 'This is regular body text that should have comfortable reading spacing for extended reading sessions.',
    expectedBehavior: 'Comfortable reading spacing',
    testType: 'line-height'
  },
  {
    id: 'relaxed-instructions',
    name: 'Relaxed Line Height for Instructions',
    content: 'These are detailed instructions that need extra breathing room for clarity and ease of following step-by-step processes.',
    expectedBehavior: 'Extra spacing for clarity',
    testType: 'line-height'
  }
];

export const fontScalingTestCases: TypographyTestCase[] = [
  {
    id: 'fluid-scaling',
    name: 'Fluid Font Scaling',
    content: 'This text uses clamp() functions to scale smoothly between minimum and maximum sizes.',
    expectedBehavior: 'Smooth scaling between viewport sizes',
    testType: 'font-scaling'
  },
  {
    id: 'breakpoint-jumps',
    name: 'Breakpoint-Based Scaling',
    content: 'Some elements use discrete breakpoint-based scaling for specific design requirements.',
    expectedBehavior: 'Clear size changes at breakpoints',
    testType: 'font-scaling'
  }
];

/**
 * Utility function to test word-wrapping behavior
 */
export const testWordWrapping = (element: HTMLElement): boolean => {
  const computedStyle = window.getComputedStyle(element);
  
  // Check for proper word-wrapping CSS properties
  const hasWordWrap = computedStyle.wordWrap === 'break-word' || 
                     computedStyle.overflowWrap === 'break-word';
  const hasNoHyphens = computedStyle.hyphens === 'none';
  const hasProperWordBreak = computedStyle.wordBreak === 'normal' || 
                            computedStyle.wordBreak === 'keep-all';
  
  return hasWordWrap && hasNoHyphens && hasProperWordBreak;
};

/**
 * Utility function to test responsive font scaling
 */
export const testFontScaling = (element: HTMLElement): boolean => {
  const computedStyle = window.getComputedStyle(element);
  const fontSize = computedStyle.fontSize;
  
  // Check if font-size uses clamp() or viewport units
  return fontSize.includes('clamp') || 
         fontSize.includes('vw') || 
         fontSize.includes('vh') ||
         fontSize.includes('vmin') ||
         fontSize.includes('vmax');
};

/**
 * Utility function to test line height appropriateness
 */
export const testLineHeight = (element: HTMLElement): { value: number; appropriate: boolean } => {
  const computedStyle = window.getComputedStyle(element);
  const lineHeight = parseFloat(computedStyle.lineHeight);
  const fontSize = parseFloat(computedStyle.fontSize);
  const ratio = lineHeight / fontSize;
  
  // Good line height ratios are typically between 1.2 and 1.8
  const appropriate = ratio >= 1.2 && ratio <= 1.8;
  
  return { value: ratio, appropriate };
};

/**
 * Comprehensive typography test runner
 */
export const runTypographyTests = (container: HTMLElement): {
  passed: number;
  failed: number;
  results: Array<{ test: string; passed: boolean; details: string }>;
} => {
  const results: Array<{ test: string; passed: boolean; details: string }> = [];
  let passed = 0;
  let failed = 0;
  
  // Test all text elements in the container
  const textElements = container.querySelectorAll('p, div, span, h1, h2, h3, h4, h5, h6');
  
  textElements.forEach((element, index) => {
    const htmlElement = element as HTMLElement;
    
    // Test word wrapping
    const wordWrapTest = testWordWrapping(htmlElement);
    results.push({
      test: `Element ${index + 1} - Word Wrapping`,
      passed: wordWrapTest,
      details: wordWrapTest ? 'Proper word-wrapping properties applied' : 'Missing word-wrapping properties'
    });
    
    if (wordWrapTest) passed++; else failed++;
    
    // Test line height
    const lineHeightTest = testLineHeight(htmlElement);
    results.push({
      test: `Element ${index + 1} - Line Height`,
      passed: lineHeightTest.appropriate,
      details: `Line height ratio: ${lineHeightTest.value.toFixed(2)} ${lineHeightTest.appropriate ? '(Good)' : '(Needs adjustment)'}`
    });
    
    if (lineHeightTest.appropriate) passed++; else failed++;
    
    // Test font scaling (if applicable)
    const fontScalingTest = testFontScaling(htmlElement);
    if (fontScalingTest) {
      results.push({
        test: `Element ${index + 1} - Responsive Font Scaling`,
        passed: true,
        details: 'Uses responsive font scaling'
      });
      passed++;
    }
  });
  
  return { passed, failed, results };
};

/**
 * Export all test cases for use in components
 */
export const allTestCases = [
  ...wordWrappingTestCases,
  ...responsiveTestCases,
  ...lineHeightTestCases,
  ...fontScalingTestCases
];

/**
 * Test data for demonstrating different content types
 */
export const contentTypeExamples = {
  typingContent: {
    title: 'Typing Lesson Content',
    description: 'Content that users type, requires pre-wrap formatting',
    examples: [
      'Finding diamonds at Y level negative fifty four hits different.',
      'Speedrunners beat the game in under twenty minutes.',
      'Building mega bases demands serious planning and resource management skills.'
    ]
  },
  instructionText: {
    title: 'Instruction Text',
    description: 'Explanatory text that should flow naturally',
    examples: [
      'These blocks are absolutely bussin for beginners! Type them clean, no cap.',
      'These mobs are straight up menaces. Learn their names for survival!',
      'These recipes separate casual players from Minecraft veterans!'
    ]
  },
  uiElements: {
    title: 'UI Text Elements',
    description: 'Navigation, buttons, labels that should not break',
    examples: [
      'Starter Blocks',
      'Epic Structures',
      'OP Enchantments',
      'Command Mastery'
    ]
  }
};
