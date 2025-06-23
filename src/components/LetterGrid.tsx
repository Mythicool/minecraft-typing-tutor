import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: ${theme.spacing.sm};
  max-width: 400px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(4, 1fr);
    gap: ${theme.spacing.xs};
    padding: ${theme.spacing.md};
  }
`;

const LetterButton = styled.button<{ 
  isGuessed: boolean; 
  isCorrect?: boolean; 
  disabled: boolean;
}>`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.sm};
  width: 50px;
  height: 50px;
  border: 3px solid;
  border-radius: ${theme.borderRadius.sm};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: ${theme.transitions.fast};
  position: relative;
  overflow: hidden;
  
  ${({ isGuessed, isCorrect, disabled }) => {
    if (disabled && !isGuessed) {
      return `
        background: ${theme.colors.ui.surface};
        border-color: ${theme.colors.ui.border};
        color: ${theme.colors.ui.textMuted};
        opacity: 0.5;
      `;
    }
    
    if (isGuessed) {
      if (isCorrect) {
        return `
          background: ${theme.colors.ui.success};
          border-color: ${theme.colors.primary.grass};
          color: ${theme.colors.ui.text};
          transform: scale(0.95);
        `;
      } else {
        return `
          background: ${theme.colors.ui.error};
          border-color: ${theme.colors.secondary.redstone};
          color: ${theme.colors.ui.text};
          transform: scale(0.95);
        `;
      }
    }
    
    return `
      background: linear-gradient(135deg, ${theme.colors.primary.stone} 0%, ${theme.colors.primary.cobblestone} 100%);
      border-color: ${theme.colors.ui.border};
      color: ${theme.colors.ui.text};
      
      &:hover {
        background: linear-gradient(135deg, ${theme.colors.secondary.diamond} 0%, ${theme.colors.secondary.lapis} 100%);
        border-color: ${theme.colors.secondary.diamond};
        transform: translateY(-2px);
        box-shadow: ${theme.shadows.md};
      }
      
      &:active {
        transform: translateY(0);
      }
    `;
  }}
  
  /* Minecraft button press effect */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255,255,255,0.3), 
      transparent
    );
    transition: left 0.5s;
  }
  
  &:hover::after {
    left: 100%;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 40px;
    height: 40px;
    font-size: ${theme.fontSizes.xs};
  }
`;

const SectionTitle = styled.h3`
  font-family: 'Press Start 2P', ${theme.fonts.heading};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.secondary.gold};
  text-align: center;
  margin-bottom: ${theme.spacing.md};
  text-shadow: 1px 1px 0px ${theme.colors.ui.background};
`;

interface LetterGridProps {
  guessedLetters: string[];
  currentWord: string;
  onLetterClick: (letter: string) => void;
  disabled: boolean;
}

export const LetterGrid: React.FC<LetterGridProps> = ({
  guessedLetters,
  currentWord,
  onLetterClick,
  disabled,
}) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  const isLetterCorrect = (letter: string): boolean => {
    return currentWord.includes(letter);
  };
  
  const isLetterGuessed = (letter: string): boolean => {
    return guessedLetters.includes(letter);
  };

  return (
    <div>
      <SectionTitle>Choose a Letter</SectionTitle>
      <GridContainer>
        {alphabet.map(letter => (
          <LetterButton
            key={letter}
            isGuessed={isLetterGuessed(letter)}
            isCorrect={isLetterGuessed(letter) ? isLetterCorrect(letter) : undefined}
            disabled={disabled || isLetterGuessed(letter)}
            onClick={() => onLetterClick(letter)}
          >
            {letter}
          </LetterButton>
        ))}
      </GridContainer>
    </div>
  );
};
