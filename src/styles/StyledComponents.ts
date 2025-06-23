import styled, { css } from 'styled-components';
import { theme } from './theme';

// Container components
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  
  @media (min-width: ${theme.breakpoints.sm}) {
    padding: 0 ${theme.spacing.lg};
  }
`;

export const Card = styled.div<{ variant?: 'default' | 'grass' | 'stone' | 'wood' }>`
  background: ${({ variant }) => {
    switch (variant) {
      case 'grass':
        return `linear-gradient(135deg, ${theme.colors.primary.grass} 0%, ${theme.colors.primary.leaves} 100%)`;
      case 'stone':
        return `linear-gradient(135deg, ${theme.colors.primary.stone} 0%, ${theme.colors.primary.cobblestone} 100%)`;
      case 'wood':
        return `linear-gradient(135deg, ${theme.colors.primary.wood} 0%, #CD853F 100%)`;
      default:
        return theme.colors.ui.surface;
    }
  }};
  border: 3px solid ${theme.colors.ui.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  position: relative;
  
  /* Minecraft block-style border effect */
  &::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    background: linear-gradient(45deg, 
      rgba(255,255,255,0.2) 0%, 
      transparent 50%, 
      rgba(0,0,0,0.2) 100%
    );
    border-radius: ${theme.borderRadius.md};
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
    transition: ${theme.transitions.normal};
  }
`;

// Button components
const buttonBase = css`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 3px solid;
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:active {
    transform: translateY(1px);
  }
  
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
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' }>`
  ${buttonBase}
  
  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return css`
          background: linear-gradient(135deg, ${theme.colors.primary.grass} 0%, ${theme.colors.primary.leaves} 100%);
          border-color: ${theme.colors.primary.leaves};
          color: ${theme.colors.ui.text};
          
          &:hover {
            background: linear-gradient(135deg, ${theme.colors.primary.leaves} 0%, ${theme.colors.primary.grass} 100%);
          }
        `;
      case 'secondary':
        return css`
          background: linear-gradient(135deg, ${theme.colors.primary.stone} 0%, ${theme.colors.primary.cobblestone} 100%);
          border-color: ${theme.colors.primary.cobblestone};
          color: ${theme.colors.ui.text};
          
          &:hover {
            background: linear-gradient(135deg, ${theme.colors.primary.cobblestone} 0%, ${theme.colors.primary.stone} 100%);
          }
        `;
      case 'success':
        return css`
          background: linear-gradient(135deg, ${theme.colors.ui.success} 0%, #388E3C 100%);
          border-color: #388E3C;
          color: ${theme.colors.ui.text};
          
          &:hover {
            background: linear-gradient(135deg, #388E3C 0%, ${theme.colors.ui.success} 100%);
          }
        `;
      case 'warning':
        return css`
          background: linear-gradient(135deg, ${theme.colors.ui.warning} 0%, #F57C00 100%);
          border-color: #F57C00;
          color: ${theme.colors.ui.text};
          
          &:hover {
            background: linear-gradient(135deg, #F57C00 0%, ${theme.colors.ui.warning} 100%);
          }
        `;
      case 'danger':
        return css`
          background: linear-gradient(135deg, ${theme.colors.ui.error} 0%, #D32F2F 100%);
          border-color: #D32F2F;
          color: ${theme.colors.ui.text};
          
          &:hover {
            background: linear-gradient(135deg, #D32F2F 0%, ${theme.colors.ui.error} 100%);
          }
        `;
    }
  }}
`;

// Input components
export const Input = styled.input`
  font-family: 'Press Start 2P', ${theme.fonts.mono};
  font-size: ${theme.fontSizes.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.ui.background};
  border: 3px solid ${theme.colors.ui.border};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.ui.text};
  width: 100%;
  
  &:focus {
    border-color: ${theme.colors.secondary.diamond};
    box-shadow: 0 0 0 2px rgba(0, 191, 255, 0.3);
  }
  
  &::placeholder {
    color: ${theme.colors.ui.textMuted};
  }
`;

// Typography components
export const Title = styled.h1<{ size?: 'sm' | 'md' | 'lg' | 'xl' }>`
  font-family: 'Press Start 2P', ${theme.fonts.heading};
  color: ${theme.colors.secondary.gold};
  text-shadow: 2px 2px 0px ${theme.colors.ui.background};
  margin-bottom: ${theme.spacing.lg};
  text-align: center;
  
  ${({ size = 'lg' }) => {
    switch (size) {
      case 'sm':
        return css`font-size: ${theme.fontSizes.lg};`;
      case 'md':
        return css`font-size: ${theme.fontSizes.xl};`;
      case 'lg':
        return css`font-size: ${theme.fontSizes['2xl']};`;
      case 'xl':
        return css`font-size: ${theme.fontSizes['3xl']};`;
    }
  }}
`;

export const Subtitle = styled.h2`
  font-family: 'Press Start 2P', ${theme.fonts.heading};
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.secondary.diamond};
  text-shadow: 1px 1px 0px ${theme.colors.ui.background};
  margin-bottom: ${theme.spacing.md};
`;

// Layout components
export const FlexContainer = styled.div<{ 
  direction?: 'row' | 'column';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  gap?: string;
  wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  justify-content: ${({ justify = 'flex-start' }) => justify};
  align-items: ${({ align = 'stretch' }) => align};
  gap: ${({ gap = theme.spacing.md }) => gap};
  flex-wrap: ${({ wrap = false }) => wrap ? 'wrap' : 'nowrap'};
`;

export const Grid = styled.div<{ columns?: number; gap?: string }>`
  display: grid;
  grid-template-columns: repeat(${({ columns = 1 }) => columns}, 1fr);
  gap: ${({ gap = theme.spacing.md }) => gap};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

// Progress components
export const ProgressBar = styled.div<{ progress: number; variant?: 'default' | 'success' | 'warning' | 'danger' }>`
  width: 100%;
  height: 20px;
  background: ${theme.colors.ui.background};
  border: 3px solid ${theme.colors.ui.border};
  border-radius: ${theme.borderRadius.sm};
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ progress }) => Math.min(100, Math.max(0, progress))}%;
    background: ${({ variant = 'default' }) => {
      switch (variant) {
        case 'success':
          return `linear-gradient(90deg, ${theme.colors.ui.success} 0%, #4CAF50 100%)`;
        case 'warning':
          return `linear-gradient(90deg, ${theme.colors.ui.warning} 0%, #FF9800 100%)`;
        case 'danger':
          return `linear-gradient(90deg, ${theme.colors.ui.error} 0%, #F44336 100%)`;
        default:
          return `linear-gradient(90deg, ${theme.colors.secondary.diamond} 0%, #00BFFF 100%)`;
      }
    }};
    transition: width ${theme.transitions.normal};
  }
`;
