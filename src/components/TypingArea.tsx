import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTyping } from '../hooks/useTyping';
import { theme } from '../styles/theme';
import { generateWordGroups } from '../utils/typingUtils';
import type { TypingStats } from '../utils/typingUtils';

interface TypingAreaProps {
  text: string;
  onComplete?: (stats: TypingStats) => void;
  onProgress?: (stats: TypingStats) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  minWpm?: number;
  minAccuracy?: number;
}

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: min(800px, 100% - 2rem);
  margin: 0 auto;
  padding: 0 ${theme.spacing.sm};

  @media (min-width: ${theme.breakpoints.md}) {
    padding: 0;
  }
`;

const TextDisplay = styled.div`
  font-family: 'Press Start 2P', ${theme.fonts.mono};
  font-size: ${theme.fontSizes.lg};
  line-height: ${theme.typography.lineHeight.relaxed};
  padding: clamp(${theme.spacing.md}, 4vw, ${theme.spacing.xl});
  background: ${theme.colors.ui.background};
  border: 3px solid ${theme.colors.ui.border};
  border-radius: ${theme.borderRadius.md};
  min-height: clamp(150px, 25vh, 250px);
  position: relative;

  /* Enhanced word wrapping for typing content - preserve formatting but allow word wrapping */
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: normal;
  hyphens: none;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;

  /* Minecraft-style inner shadow */
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);

  &:focus-within {
    border-color: ${theme.colors.secondary.diamond};
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(0, 191, 255, 0.3);
  }

  /* Responsive typography */
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes.base};
    line-height: ${theme.typography.lineHeight.normal};
  }

  @media (max-width: 480px) {
    font-size: ${theme.fontSizes.sm};
    padding: ${theme.spacing.md};
  }
`;

const WordGroup = styled.span`
  /* Ensure words wrap as complete units */
  display: inline-block;
  white-space: nowrap;
`;

const Character = styled.span<{ status: string }>`
  color: ${({ status }) => {
    switch (status) {
      case 'correct':
        return theme.colors.typing.correct;
      case 'incorrect':
        return theme.colors.typing.incorrect;
      case 'current':
        return theme.colors.typing.current;
      case 'completed':
        return theme.colors.typing.completed;
      case 'pending':
      default:
        return theme.colors.typing.pending;
    }
  }};

  background-color: ${({ status }) => {
    if (status === 'current') {
      return theme.colors.typing.current;
    }
    if (status === 'incorrect') {
      return 'rgba(244, 67, 54, 0.2)';
    }
    return 'transparent';
  }};

  ${({ status }) => status === 'current' && `
    animation: pulse 1s infinite;
    color: ${theme.colors.ui.background};
    font-weight: bold;
  `}

  ${({ status }) => status === 'incorrect' && `
    text-decoration: underline;
    text-decoration-color: ${theme.colors.typing.incorrect};
    animation: shake 0.3s ease-in-out;
  `}
`;

const WhitespaceCharacter = styled.span<{ status: string }>`
  color: ${({ status }) => {
    switch (status) {
      case 'correct':
        return theme.colors.typing.correct;
      case 'incorrect':
        return theme.colors.typing.incorrect;
      case 'current':
        return theme.colors.typing.current;
      case 'completed':
        return theme.colors.typing.completed;
      case 'pending':
      default:
        return theme.colors.typing.pending;
    }
  }};

  background-color: ${({ status }) => {
    if (status === 'current') {
      return theme.colors.typing.current;
    }
    if (status === 'incorrect') {
      return 'rgba(244, 67, 54, 0.2)';
    }
    return 'transparent';
  }};

  ${({ status }) => status === 'current' && `
    animation: pulse 1s infinite;
    color: ${theme.colors.ui.background};
    font-weight: bold;
  `}

  ${({ status }) => status === 'incorrect' && `
    text-decoration: underline;
    text-decoration-color: ${theme.colors.typing.incorrect};
    animation: shake 0.3s ease-in-out;
  `}
`;

const HiddenInput = styled.input`
  position: absolute;
  left: -9999px;
  opacity: 0;
  pointer-events: none;
`;

// Removed unused Cursor component

const Instructions = styled.div`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.ui.textSecondary};
  text-align: center;
  margin-bottom: ${theme.spacing.md};
  padding: ${theme.spacing.sm};
  background: rgba(0, 0, 0, 0.2);
  border-radius: ${theme.borderRadius.sm};

  /* Enhanced word wrapping for instructions */
  ${theme.typography.wordWrap.normal}
  line-height: ${theme.typography.lineHeight.relaxed};

  /* Responsive typography */
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes.xs};
    padding: ${theme.spacing.xs};
  }
`;

const StartButton = styled.button`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: linear-gradient(135deg, ${theme.colors.primary.grass} 0%, ${theme.colors.primary.leaves} 100%);
  border: 3px solid ${theme.colors.primary.leaves};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.ui.text};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  text-transform: uppercase;
  
  &:hover {
    background: linear-gradient(135deg, ${theme.colors.primary.leaves} 0%, ${theme.colors.primary.grass} 100%);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CompletionMessage = styled.div<{ passed: boolean }>`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.md};
  text-align: center;
  padding: clamp(${theme.spacing.md}, 3vw, ${theme.spacing.lg});
  margin-top: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  border: 3px solid;

  /* Enhanced word wrapping for completion messages */
  ${theme.typography.wordWrap.normal}
  line-height: ${theme.typography.lineHeight.normal};

  ${({ passed }) => passed ? `
    background: linear-gradient(135deg, ${theme.colors.ui.success} 0%, #4CAF50 100%);
    border-color: #4CAF50;
    color: ${theme.colors.ui.text};
  ` : `
    background: linear-gradient(135deg, ${theme.colors.ui.warning} 0%, #FF9800 100%);
    border-color: #FF9800;
    color: ${theme.colors.ui.text};
  `}

  /* Responsive typography */
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes.sm};
    padding: ${theme.spacing.md};
  }
`;

export const TypingArea: React.FC<TypingAreaProps> = ({
  text,
  onComplete,
  onProgress,
  disabled = false,
  autoFocus = true,
  minWpm = 0,
  minAccuracy = 0,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    typingState,
    characterStates,
    isCompleted,
    isPassed,
    handleInput,
    start,
    reset,
  } = useTyping({
    text,
    onComplete,
    onProgress,
    minWpm,
    minAccuracy,
    autoStart: false,
  });

  // Generate word groups for proper word wrapping
  const wordGroups = generateWordGroups(characterStates);

  // Focus input when component mounts or when starting
  useEffect(() => {
    if (autoFocus && inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [autoFocus, disabled, typingState.isActive]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    handleInput(e.target.value);
  };

  // Handle click on text display to focus input
  const handleTextClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle start button click
  const handleStart = () => {
    if (!disabled) {
      start();
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  // Handle reset button click
  const handleReset = () => {
    if (!disabled) {
      reset();
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <Container>
      {!typingState.isActive && !isCompleted && (
        <Instructions>
          Click "Start Typing" to begin, then type the text below exactly as shown.
          Focus on accuracy first, then build up your speed!
        </Instructions>
      )}
      
      <TextDisplay onClick={handleTextClick}>
        {wordGroups.map((wordGroup, groupIndex) => {
          // Handle whitespace characters (spaces, newlines, tabs)
          if (wordGroup.word === ' ' || wordGroup.word === '\n' || wordGroup.word === '\t') {
            const charState = wordGroup.characters[0];
            return (
              <WhitespaceCharacter key={`whitespace-${groupIndex}`} status={charState.status}>
                {wordGroup.word === ' ' ? '\u00A0' : wordGroup.word}
              </WhitespaceCharacter>
            );
          }

          // Handle regular words - wrap them in WordGroup to prevent breaking
          return (
            <WordGroup key={`word-${groupIndex}`}>
              {wordGroup.characters.map((charState, charIndex) => (
                <Character key={`${groupIndex}-${charIndex}`} status={charState.status}>
                  {charState.char}
                </Character>
              ))}
            </WordGroup>
          );
        })}

        <HiddenInput
          ref={inputRef}
          type="text"
          value={typingState.userInput}
          onChange={handleInputChange}
          disabled={disabled || !typingState.isActive}
          autoComplete="off"
          spellCheck={false}
        />
      </TextDisplay>
      
      {!typingState.isActive && !isCompleted && (
        <div style={{ textAlign: 'center', marginTop: theme.spacing.md }}>
          <StartButton onClick={handleStart} disabled={disabled}>
            Start Typing
          </StartButton>
        </div>
      )}
      
      {isCompleted && (
        <>
          <CompletionMessage passed={isPassed}>
            {isPassed ? '🎉 Lesson Completed!' : '⚠️ Try Again'}
            <br />
            <small style={{ fontSize: theme.fontSizes.xs, marginTop: theme.spacing.sm, display: 'block' }}>
              {isPassed 
                ? 'Great job! You met the requirements.' 
                : `Need ${minWpm} WPM and ${minAccuracy}% accuracy to pass.`
              }
            </small>
          </CompletionMessage>
          
          <div style={{ textAlign: 'center', marginTop: theme.spacing.md }}>
            <StartButton onClick={handleReset} disabled={disabled}>
              Try Again
            </StartButton>
          </div>
        </>
      )}
    </Container>
  );
};
