import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Container, Title, Subtitle, Grid } from '../styles/StyledComponents';
import { wordWrappingTestCases, contentTypeExamples, runTypographyTests } from '../utils/typographyTest';
import { runWordWrappingTests, testData } from '../utils/wordWrappingTest';

const DemoSection = styled.section`
  margin-bottom: ${theme.spacing['2xl']};
  padding: ${theme.spacing.lg};
  background: rgba(0, 0, 0, 0.1);
  border-radius: ${theme.borderRadius.md};
`;

const DemoTitle = styled.h3`
  font-family: 'Press Start 2P', ${theme.fonts.heading};
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.secondary.gold};
  margin-bottom: ${theme.spacing.md};
  ${theme.typography.wordWrap.keepAll}
  line-height: ${theme.typography.lineHeight.tight};
`;

const TypingContentDemo = styled.div`
  ${theme.typography.wordWrap.preserve}
  line-height: ${theme.typography.lineHeight.relaxed};
  font-family: ${theme.fonts.mono};
  background: ${theme.colors.ui.background};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  border: 2px solid ${theme.colors.ui.border};
  margin-bottom: ${theme.spacing.md};
`;

const InstructionDemo = styled.div`
  ${theme.typography.wordWrap.normal}
  line-height: ${theme.typography.lineHeight.relaxed};
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.ui.textSecondary};
  background: rgba(0, 0, 0, 0.2);
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  margin-bottom: ${theme.spacing.md};
`;

const UITextDemo = styled.div`
  ${theme.typography.wordWrap.keepAll}
  line-height: ${theme.typography.lineHeight.normal};
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.secondary.diamond};
  background: rgba(0, 191, 255, 0.1);
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  border: 2px solid ${theme.colors.secondary.diamond}40;
`;

const ResponsiveShowcase = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const BreakpointDemo = styled.div<{ breakpoint: string }>`
  padding: ${theme.spacing.md};
  background: linear-gradient(135deg, ${theme.colors.primary.stone} 0%, ${theme.colors.primary.cobblestone} 100%);
  border-radius: ${theme.borderRadius.sm};
  text-align: center;
  
  @media (max-width: ${({ breakpoint }) => breakpoint}) {
    background: linear-gradient(135deg, ${theme.colors.ui.success} 0%, ${theme.colors.secondary.diamond} 100%);
    
    &::after {
      content: ' (ACTIVE)';
      color: ${theme.colors.ui.text};
      font-weight: bold;
    }
  }
`;

const LongWordTest = styled.div`
  ${theme.typography.wordWrap.normal}
  line-height: ${theme.typography.lineHeight.normal};
  font-family: ${theme.fonts.mono};
  background: ${theme.colors.ui.surface};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  border: 2px solid ${theme.colors.ui.border};
  margin-bottom: ${theme.spacing.md};
  max-width: 300px;
`;

const TestButton = styled.button`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: linear-gradient(135deg, ${theme.colors.ui.success} 0%, ${theme.colors.secondary.diamond} 100%);
  border: 3px solid ${theme.colors.secondary.diamond};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.ui.text};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  margin-bottom: ${theme.spacing.md};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

const TestResults = styled.div`
  background: rgba(0, 0, 0, 0.2);
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  margin-bottom: ${theme.spacing.md};
  font-family: ${theme.fonts.mono};
  font-size: ${theme.fontSizes.xs};
`;

const TestCase = styled.div`
  background: ${theme.colors.ui.surface};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  border: 2px solid ${theme.colors.ui.border};
  margin-bottom: ${theme.spacing.sm};
`;

const TestCaseTitle = styled.h4`
  font-family: 'Press Start 2P', ${theme.fonts.heading};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.secondary.gold};
  margin-bottom: ${theme.spacing.xs};
  ${theme.typography.wordWrap.keepAll}
`;

const TestCaseContent = styled.div`
  ${theme.typography.wordWrap.normal}
  line-height: ${theme.typography.lineHeight.normal};
  margin-bottom: ${theme.spacing.xs};
`;

const TestCaseExpected = styled.div`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.ui.textMuted};
  font-style: italic;
`;

export const TypographyDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [testResults, setTestResults] = useState<any>(null);
  const [wordWrappingResults, setWordWrappingResults] = useState<any>(null);

  const longMinecraftWords = [
    'minecraft:netherite_sword',
    'minecraft:enchanted_golden_apple',
    'minecraft:suspicious_gravel',
    'minecraft:waxed_oxidized_cut_copper_stairs',
    'minecraft:deepslate_diamond_ore'
  ];

  const runTests = () => {
    if (containerRef.current) {
      const results = runTypographyTests(containerRef.current);
      setTestResults(results);
    }
  };

  const runWordWrappingTest = () => {
    const results = runWordWrappingTests();
    setWordWrappingResults(results);
  };

  const typingContent = `
This is a demonstration of typing content with proper word wrapping.
Even when words are really long like "minecraft:waxed_oxidized_cut_copper_stairs" they should wrap properly.
The white-space: pre-wrap setting preserves formatting while allowing wrapping.
No words should ever break in the middle with hyphens!
  `;

  const instructionText = `
These are instruction texts that use normal word wrapping. They should flow naturally across lines without breaking words inappropriately. Even technical terms like "minecraft:netherite_sword" or "enchanted_golden_apple" should wrap as complete units.
  `;

  const uiText = `
UI Text Elements • Navigation Items • Button Labels • Status Messages
  `;

  return (
    <Container ref={containerRef}>
      <Title size="xl">🎨 Typography & Word-Wrapping Demo</Title>
      <Subtitle>Comprehensive showcase of responsive typography improvements</Subtitle>

      <DemoSection>
        <DemoTitle>🧪 Interactive Typography Testing</DemoTitle>
        <TestButton onClick={runTests}>
          Run Typography Tests
        </TestButton>

        {testResults && (
          <TestResults>
            <div style={{ marginBottom: theme.spacing.sm }}>
              <strong>Test Results:</strong> {testResults.passed} passed, {testResults.failed} failed
            </div>
            {testResults.results.slice(0, 5).map((result: any, index: number) => (
              <div key={index} style={{
                color: result.passed ? theme.colors.ui.success : theme.colors.ui.error,
                marginBottom: theme.spacing.xs
              }}>
                {result.passed ? '✅' : '❌'} {result.test}: {result.details}
              </div>
            ))}
            {testResults.results.length > 5 && (
              <div style={{ color: theme.colors.ui.textMuted }}>
                ... and {testResults.results.length - 5} more tests
              </div>
            )}
          </TestResults>
        )}
      </DemoSection>

      <DemoSection>
        <DemoTitle>🔧 Word-Wrapping Fix Testing</DemoTitle>
        <TestButton onClick={runWordWrappingTest}>
          Test Word-Wrapping Fix
        </TestButton>

        {wordWrappingResults && (
          <TestResults>
            <div style={{ marginBottom: theme.spacing.sm }}>
              <strong>Word-Wrapping Test Results:</strong> {wordWrappingResults.summary}
              {wordWrappingResults.overallPassed ? ' ✅' : ' ❌'}
            </div>
            {wordWrappingResults.tests.map((test: any, index: number) => (
              <div key={index} style={{
                color: test.passed ? theme.colors.ui.success : theme.colors.ui.error,
                marginBottom: theme.spacing.xs
              }}>
                {test.passed ? '✅' : '❌'} {test.name}: {test.details}
              </div>
            ))}
          </TestResults>
        )}

        <div style={{ marginTop: theme.spacing.md }}>
          <h4 style={{
            fontFamily: 'Press Start 2P',
            fontSize: theme.fontSizes.sm,
            color: theme.colors.secondary.diamond,
            marginBottom: theme.spacing.sm
          }}>
            Problematic Word List Test
          </h4>
          <div style={{
            background: theme.colors.ui.background,
            padding: theme.spacing.md,
            borderRadius: theme.borderRadius.sm,
            border: `2px solid ${theme.colors.ui.border}`,
            fontFamily: theme.fonts.mono,
            fontSize: theme.fontSizes.base,
            lineHeight: theme.typography.lineHeight.relaxed,
            maxWidth: '400px',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            wordBreak: 'normal',
            hyphens: 'none'
          }}>
            {testData.problematicWordList}
          </div>
          <p style={{ fontSize: theme.fontSizes.xs, color: theme.colors.ui.textMuted, marginTop: theme.spacing.xs }}>
            ✅ Words like "deepslate", "netherite", "obsidian" should wrap as complete units
          </p>
        </div>
      </DemoSection>

      <DemoSection>
        <DemoTitle>📝 Typing Content Areas (pre-wrap)</DemoTitle>
        <TypingContentDemo>
          {typingContent}
        </TypingContentDemo>
        <p style={{ fontSize: theme.fontSizes.xs, color: theme.colors.ui.textMuted }}>
          ✅ Uses white-space: pre-wrap, preserves formatting, wraps complete words
        </p>
      </DemoSection>

      <DemoSection>
        <DemoTitle>📋 Instruction Text (normal wrap)</DemoTitle>
        <InstructionDemo>
          {instructionText}
        </InstructionDemo>
        <p style={{ fontSize: theme.fontSizes.xs, color: theme.colors.ui.textMuted }}>
          ✅ Uses word-wrap: break-word, flows naturally, no mid-word breaks
        </p>
      </DemoSection>

      <DemoSection>
        <DemoTitle>🎮 UI Text Elements (keep-all)</DemoTitle>
        <UITextDemo>
          {uiText}
        </UITextDemo>
        <p style={{ fontSize: theme.fontSizes.xs, color: theme.colors.ui.textMuted }}>
          ✅ Uses word-break: keep-all, prevents breaking of UI elements
        </p>
      </DemoSection>

      <DemoSection>
        <DemoTitle>🔤 Long Word Handling Test</DemoTitle>
        <Grid columns={2} minWidth="250px">
          {longMinecraftWords.map((word, index) => (
            <LongWordTest key={index}>
              <strong>Test {index + 1}:</strong><br />
              {word}
            </LongWordTest>
          ))}
        </Grid>
        <p style={{ fontSize: theme.fontSizes.xs, color: theme.colors.ui.textMuted }}>
          ✅ Long Minecraft item names wrap as complete units, no hyphens
        </p>
      </DemoSection>

      <DemoSection>
        <DemoTitle>📱 Responsive Breakpoint Demo</DemoTitle>
        <ResponsiveShowcase>
          <BreakpointDemo breakpoint={theme.breakpoints.sm}>
            Small (640px)
          </BreakpointDemo>
          <BreakpointDemo breakpoint={theme.breakpoints.md}>
            Medium (768px)
          </BreakpointDemo>
          <BreakpointDemo breakpoint={theme.breakpoints.lg}>
            Large (1024px)
          </BreakpointDemo>
          <BreakpointDemo breakpoint={theme.breakpoints.xl}>
            XL (1280px)
          </BreakpointDemo>
        </ResponsiveShowcase>
        <p style={{ fontSize: theme.fontSizes.xs, color: theme.colors.ui.textMuted }}>
          ✅ Resize window to see breakpoints activate (highlighted in green)
        </p>
      </DemoSection>

      <DemoSection>
        <DemoTitle>📐 Responsive Font Scaling</DemoTitle>
        <div style={{ 
          fontSize: theme.fontSizes.base,
          lineHeight: theme.typography.lineHeight.normal,
          marginBottom: theme.spacing.md 
        }}>
          <strong>Base Font:</strong> This text uses clamp() for responsive scaling
        </div>
        <div style={{ 
          fontSize: theme.fontSizes.lg,
          lineHeight: theme.typography.lineHeight.normal,
          marginBottom: theme.spacing.md 
        }}>
          <strong>Large Font:</strong> Scales fluidly between viewport sizes
        </div>
        <div style={{ 
          fontSize: theme.fontSizes['2xl'],
          lineHeight: theme.typography.lineHeight.tight 
        }}>
          <strong>XL Font:</strong> Maintains readability at all sizes
        </div>
        <p style={{ fontSize: theme.fontSizes.xs, color: theme.colors.ui.textMuted }}>
          ✅ All fonts scale smoothly using clamp() functions
        </p>
      </DemoSection>

      <DemoSection>
        <DemoTitle>🎯 Line Height Variations</DemoTitle>
        <div style={{ marginBottom: theme.spacing.md }}>
          <div style={{ 
            lineHeight: theme.typography.lineHeight.tight,
            marginBottom: theme.spacing.sm,
            background: 'rgba(255,0,0,0.1)',
            padding: theme.spacing.xs
          }}>
            <strong>Tight (1.2):</strong> Perfect for headings and titles that need compact spacing
          </div>
          <div style={{ 
            lineHeight: theme.typography.lineHeight.normal,
            marginBottom: theme.spacing.sm,
            background: 'rgba(0,255,0,0.1)',
            padding: theme.spacing.xs
          }}>
            <strong>Normal (1.4):</strong> Ideal for body text and general content reading
          </div>
          <div style={{ 
            lineHeight: theme.typography.lineHeight.relaxed,
            background: 'rgba(0,0,255,0.1)',
            padding: theme.spacing.xs
          }}>
            <strong>Relaxed (1.6):</strong> Best for instructions and detailed explanations that need extra breathing room
          </div>
        </div>
        <p style={{ fontSize: theme.fontSizes.xs, color: theme.colors.ui.textMuted }}>
          ✅ Optimized line heights for different content types
        </p>
      </DemoSection>

      <DemoSection>
        <DemoTitle>📋 Word-Wrapping Test Cases</DemoTitle>
        <Grid columns={1} minWidth="100%">
          {wordWrappingTestCases.map((testCase) => (
            <TestCase key={testCase.id}>
              <TestCaseTitle>{testCase.name}</TestCaseTitle>
              <TestCaseContent>{testCase.content}</TestCaseContent>
              <TestCaseExpected>Expected: {testCase.expectedBehavior}</TestCaseExpected>
            </TestCase>
          ))}
        </Grid>
      </DemoSection>

      <DemoSection>
        <DemoTitle>📱 Content Type Examples</DemoTitle>
        {Object.entries(contentTypeExamples).map(([key, category]) => (
          <div key={key} style={{ marginBottom: theme.spacing.lg }}>
            <h4 style={{
              fontFamily: 'Press Start 2P',
              fontSize: theme.fontSizes.md,
              color: theme.colors.secondary.diamond,
              marginBottom: theme.spacing.sm
            }}>
              {category.title}
            </h4>
            <p style={{
              fontSize: theme.fontSizes.xs,
              color: theme.colors.ui.textSecondary,
              marginBottom: theme.spacing.md
            }}>
              {category.description}
            </p>
            {category.examples.map((example, index) => (
              <div key={index} className={
                key === 'typingContent' ? 'typing-content' :
                key === 'instructionText' ? 'instruction-text' : 'ui-text'
              } style={{
                background: 'rgba(0, 0, 0, 0.1)',
                padding: theme.spacing.sm,
                borderRadius: theme.borderRadius.sm,
                marginBottom: theme.spacing.xs,
                fontFamily: key === 'typingContent' ? theme.fonts.mono : 'Press Start 2P'
              }}>
                {example}
              </div>
            ))}
          </div>
        ))}
      </DemoSection>
    </Container>
  );
};
