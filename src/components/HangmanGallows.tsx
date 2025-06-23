import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const GallowsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 350px;
  margin: 0 auto;
  position: relative;
  background: linear-gradient(135deg, ${theme.colors.primary.wood} 0%, ${theme.colors.primary.dirt} 100%);
  border: 3px solid ${theme.colors.ui.border};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.md};
`;

const GallowsArt = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.2;
  color: ${theme.colors.ui.text};
  white-space: pre;
  text-align: center;
  text-shadow: 1px 1px 0px ${theme.colors.ui.background};
`;

const StageIndicator = styled.div`
  position: absolute;
  bottom: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.secondary.redstone};
  background: rgba(0, 0, 0, 0.7);
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
`;

interface HangmanGallowsProps {
  incorrectGuesses: number;
  maxGuesses: number;
}

export const HangmanGallows: React.FC<HangmanGallowsProps> = ({ 
  incorrectGuesses, 
  maxGuesses 
}) => {
  const getGallowsArt = (stage: number): string => {
    const stages = [
      // Stage 0 - Empty gallows
      `
   ┌─────┐
   │     │
   │      
   │      
   │      
   │      
   │      
 ┌─┴─┐    
 │   │    
 └───┘    `,
      
      // Stage 1 - Head
      `
   ┌─────┐
   │     │
   │     ●
   │      
   │      
   │      
   │      
 ┌─┴─┐    
 │   │    
 └───┘    `,
      
      // Stage 2 - Body
      `
   ┌─────┐
   │     │
   │     ●
   │     │
   │     │
   │      
   │      
 ┌─┴─┐    
 │   │    
 └───┘    `,
      
      // Stage 3 - Left arm
      `
   ┌─────┐
   │     │
   │     ●
   │    ╱│
   │     │
   │      
   │      
 ┌─┴─┐    
 │   │    
 └───┘    `,
      
      // Stage 4 - Right arm
      `
   ┌─────┐
   │     │
   │     ●
   │    ╱│╲
   │     │
   │      
   │      
 ┌─┴─┐    
 │   │    
 └───┘    `,
      
      // Stage 5 - Left leg
      `
   ┌─────┐
   │     │
   │     ●
   │    ╱│╲
   │     │
   │    ╱ 
   │      
 ┌─┴─┐    
 │   │    
 └───┘    `,
      
      // Stage 6 - Right leg (game over)
      `
   ┌─────┐
   │     │
   │     ●
   │    ╱│╲
   │     │
   │    ╱ ╲
   │      
 ┌─┴─┐    
 │   │    
 └───┘    `,
    ];

    return stages[Math.min(stage, stages.length - 1)];
  };

  return (
    <GallowsContainer>
      <GallowsArt>
        {getGallowsArt(incorrectGuesses)}
      </GallowsArt>
      <StageIndicator>
        {incorrectGuesses}/{maxGuesses}
      </StageIndicator>
    </GallowsContainer>
  );
};
