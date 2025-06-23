import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const WordContainer = styled.div`
  text-align: center;
  margin: ${theme.spacing.lg} 0;
  padding: ${theme.spacing.lg};
  background: linear-gradient(135deg, ${theme.colors.ui.surface} 0%, ${theme.colors.ui.surfaceLight} 100%);
  border: 3px solid ${theme.colors.ui.border};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.md};
`;

const WordText = styled.div`
  font-family: 'Press Start 2P', ${theme.fonts.mono};
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.secondary.gold};
  text-shadow: 2px 2px 0px ${theme.colors.ui.background};
  letter-spacing: 8px;
  margin-bottom: ${theme.spacing.md};
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.lg};
    letter-spacing: 4px;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes.md};
    letter-spacing: 2px;
  }
`;

const Letter = styled.span<{ isRevealed: boolean; isSpace: boolean }>`
  display: inline-block;
  min-width: ${({ isSpace }) => isSpace ? '20px' : '30px'};
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-bottom: ${({ isSpace }) => isSpace ? 'none' : `3px solid ${theme.colors.ui.border}`};
  margin: 0 2px;
  
  ${({ isRevealed, isSpace }) => {
    if (isSpace) {
      return `
        border-bottom: none;
        width: 20px;
      `;
    }
    
    if (isRevealed) {
      return `
        color: ${theme.colors.secondary.diamond};
        border-bottom-color: ${theme.colors.secondary.diamond};
        animation: letterReveal 0.3s ease-in-out;
      `;
    }
    
    return `
      color: transparent;
      border-bottom-color: ${theme.colors.ui.border};
    `;
  }}
  
  @keyframes letterReveal {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    min-width: ${({ isSpace }) => isSpace ? '15px' : '25px'};
    height: 35px;
    line-height: 35px;
  }
`;

const HintText = styled.div`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.ui.textSecondary};
  margin-top: ${theme.spacing.md};
  line-height: 1.6;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes.xs};
  }
`;

const CategoryBadge = styled.span`
  display: inline-block;
  background: ${theme.colors.secondary.lapis};
  color: ${theme.colors.ui.text};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing.sm};
  border: 2px solid ${theme.colors.ui.border};
`;

const DifficultyBadge = styled.span<{ difficulty: 'beginner' | 'intermediate' | 'advanced' }>`
  display: inline-block;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  text-transform: uppercase;
  margin-left: ${theme.spacing.sm};
  border: 2px solid;
  
  ${({ difficulty }) => {
    switch (difficulty) {
      case 'beginner':
        return `
          background: ${theme.colors.primary.grass};
          border-color: ${theme.colors.primary.leaves};
          color: ${theme.colors.ui.text};
        `;
      case 'intermediate':
        return `
          background: ${theme.colors.secondary.gold};
          border-color: ${theme.colors.secondary.iron};
          color: ${theme.colors.ui.background};
        `;
      case 'advanced':
        return `
          background: ${theme.colors.secondary.redstone};
          border-color: ${theme.colors.ui.error};
          color: ${theme.colors.ui.text};
        `;
    }
  }}
`;

interface WordDisplayProps {
  word: string;
  displayWord: string;
  hint: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  guessedLetters: string[];
}

export const WordDisplay: React.FC<WordDisplayProps> = ({
  word,
  hint,
  category,
  difficulty,
  guessedLetters,
}) => {
  const renderWord = () => {
    return word.split('').map((char, index) => {
      const isSpace = char === ' ';
      const isRevealed = isSpace || guessedLetters.includes(char);
      
      return (
        <Letter
          key={index}
          isRevealed={isRevealed}
          isSpace={isSpace}
        >
          {isRevealed ? char : '_'}
        </Letter>
      );
    });
  };

  return (
    <WordContainer>
      <div>
        <CategoryBadge>{category}</CategoryBadge>
        <DifficultyBadge difficulty={difficulty}>{difficulty}</DifficultyBadge>
      </div>
      
      <WordText>
        {renderWord()}
      </WordText>
      
      <HintText>
        💡 Hint: {hint}
      </HintText>
    </WordContainer>
  );
};
