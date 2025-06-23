import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTyping } from '../hooks/useTyping';
import { theme } from '../styles/theme';
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
  max-width: 800px;
  margin: 0 auto;
`;

const TextDisplay = styled.div`
  font-family: 'Press Start 2P', ${theme.fonts.mono};
  font-size: ${theme.fontSizes.lg};
  line-height: 2;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.ui.background};
  border: 3px solid ${theme.colors.ui.border};
  border-radius: ${theme.borderRadius.md};
  min-height: 200px;
  position: relative;
  overflow-wrap: break-word;
  word-break: break-word;
  
  /* Minecraft-style inner shadow */
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
  
  &:focus-within {
    border-color: ${theme.colors.secondary.diamond};
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(0, 191, 255, 0.3);
  }
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
  padding: ${theme.spacing.lg};
  margin-top: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  border: 3px solid;
  
  ${({ passed }) => passed ? `
    background: linear-gradient(135deg, ${theme.colors.ui.success} 0%, #4CAF50 100%);
    border-color: #4CAF50;
    color: ${theme.colors.ui.text};
  ` : `
    background: linear-gradient(135deg, ${theme.colors.ui.warning} 0%, #FF9800 100%);
    border-color: #FF9800;
    color: ${theme.colors.ui.text};
  `}
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
        {characterStates.map((charState, index) => (
          <Character key={index} status={charState.status}>
            {charState.char === ' ' ? '\u00A0' : charState.char}
          </Character>
        ))}
        
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
