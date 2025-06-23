import React from 'react';
import styled from 'styled-components';
import type { TypingStats } from '../utils/typingUtils';
import { theme } from '../styles/theme';
import { formatTime, getSpeedCategory, getAccuracyCategory } from '../utils/typingUtils';
import { Card, FlexContainer, ProgressBar } from '../styles/StyledComponents';

interface StatsDisplayProps {
  stats: TypingStats;
  showDetailed?: boolean;
  variant?: 'compact' | 'detailed';
  realTime?: boolean;
}

const StatsContainer = styled(Card)`
  background: linear-gradient(135deg, ${theme.colors.ui.surface} 0%, ${theme.colors.ui.surfaceLight} 100%);
  margin-bottom: ${theme.spacing.md};
`;

const StatItem = styled.div<{ highlight?: boolean }>`
  text-align: center;
  padding: ${theme.spacing.sm};
  
  ${({ highlight }) => highlight && `
    background: rgba(0, 191, 255, 0.1);
    border-radius: ${theme.borderRadius.sm};
    border: 1px solid ${theme.colors.secondary.diamond};
  `}
`;

const StatValue = styled.div<{ size?: 'small' | 'medium' | 'large' }>`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${({ size = 'medium' }) => {
    switch (size) {
      case 'small':
        return theme.fontSizes.md;
      case 'large':
        return theme.fontSizes['2xl'];
      default:
        return theme.fontSizes.lg;
    }
  }};
  color: ${theme.colors.secondary.gold};
  text-shadow: 1px 1px 0px ${theme.colors.ui.background};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.ui.textSecondary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StatCategory = styled.div<{ color: string }>`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  color: ${({ color }) => color};
  margin-top: ${theme.spacing.xs};
  padding: 2px 6px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: ${theme.borderRadius.sm};
  display: inline-block;
`;

const DetailedStats = styled.div`
  margin-top: ${theme.spacing.md};
  padding-top: ${theme.spacing.md};
  border-top: 2px solid ${theme.colors.ui.border};
`;

const ProgressSection = styled.div`
  margin-top: ${theme.spacing.md};
`;

const ProgressLabel = styled.div`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.ui.textSecondary};
  margin-bottom: ${theme.spacing.xs};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LiveIndicator = styled.div<{ active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  color: ${({ active }) => active ? theme.colors.ui.success : theme.colors.ui.textMuted};
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ active }) => active ? theme.colors.ui.success : theme.colors.ui.textMuted};
    ${({ active }) => active && 'animation: pulse 2s infinite;'}
  }
`;

const getWpmColor = (wpm: number): string => {
  if (wpm < 20) return theme.colors.ui.error;
  if (wpm < 40) return theme.colors.ui.warning;
  if (wpm < 60) return theme.colors.ui.success;
  return theme.colors.secondary.diamond;
};

const getAccuracyColor = (accuracy: number): string => {
  if (accuracy < 70) return theme.colors.ui.error;
  if (accuracy < 85) return theme.colors.ui.warning;
  if (accuracy < 95) return theme.colors.ui.success;
  return theme.colors.secondary.diamond;
};

export const StatsDisplay: React.FC<StatsDisplayProps> = ({
  stats,
  showDetailed = false,
  variant = 'detailed',
  realTime = false,
}) => {
  const wpmColor = getWpmColor(stats.wpm);
  const accuracyColor = getAccuracyColor(stats.accuracy);
  const speedCategory = getSpeedCategory(stats.wpm);
  const accuracyCategory = getAccuracyCategory(stats.accuracy);

  if (variant === 'compact') {
    return (
      <StatsContainer variant="stone">
        <FlexContainer justify="space-around" align="center">
          <StatItem>
            <StatValue size="small">{stats.wpm}</StatValue>
            <StatLabel>WPM</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue size="small">{stats.accuracy}%</StatValue>
            <StatLabel>Accuracy</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue size="small">{formatTime(stats.timeElapsed)}</StatValue>
            <StatLabel>Time</StatLabel>
          </StatItem>
          {realTime && (
            <StatItem>
              <LiveIndicator active={stats.timeElapsed > 0}>
                LIVE
              </LiveIndicator>
            </StatItem>
          )}
        </FlexContainer>
      </StatsContainer>
    );
  }

  return (
    <StatsContainer variant="stone">
      {realTime && (
        <div style={{ textAlign: 'center', marginBottom: theme.spacing.md }}>
          <LiveIndicator active={stats.timeElapsed > 0}>
            LIVE STATS
          </LiveIndicator>
        </div>
      )}
      
      <FlexContainer justify="space-around" align="center" wrap>
        <StatItem highlight={stats.wpm > 0}>
          <StatValue size="large" style={{ color: wpmColor }}>
            {stats.wpm}
          </StatValue>
          <StatLabel>Words Per Minute</StatLabel>
          <StatCategory color={wpmColor}>
            {speedCategory}
          </StatCategory>
        </StatItem>
        
        <StatItem highlight={stats.accuracy < 100}>
          <StatValue size="large" style={{ color: accuracyColor }}>
            {stats.accuracy}%
          </StatValue>
          <StatLabel>Accuracy</StatLabel>
          <StatCategory color={accuracyColor}>
            {accuracyCategory}
          </StatCategory>
        </StatItem>
        
        <StatItem>
          <StatValue size="large">
            {formatTime(stats.timeElapsed)}
          </StatValue>
          <StatLabel>Time Elapsed</StatLabel>
        </StatItem>
      </FlexContainer>

      {showDetailed && (
        <DetailedStats>
          <FlexContainer justify="space-around" align="center" wrap>
            <StatItem>
              <StatValue>{stats.correctChars}</StatValue>
              <StatLabel>Correct Characters</StatLabel>
            </StatItem>
            
            <StatItem>
              <StatValue style={{ color: theme.colors.ui.error }}>
                {stats.incorrectChars}
              </StatValue>
              <StatLabel>Incorrect Characters</StatLabel>
            </StatItem>
            
            <StatItem>
              <StatValue>{stats.totalChars}</StatValue>
              <StatLabel>Total Characters</StatLabel>
            </StatItem>
          </FlexContainer>

          <ProgressSection>
            <ProgressLabel>
              <span>Accuracy Progress</span>
              <span>{stats.accuracy}%</span>
            </ProgressLabel>
            <ProgressBar 
              progress={stats.accuracy} 
              variant={stats.accuracy >= 90 ? 'success' : stats.accuracy >= 70 ? 'warning' : 'danger'}
            />
          </ProgressSection>

          {stats.wpm > 0 && (
            <ProgressSection>
              <ProgressLabel>
                <span>Speed Progress</span>
                <span>{stats.wpm} WPM</span>
              </ProgressLabel>
              <ProgressBar 
                progress={Math.min(100, (stats.wpm / 80) * 100)} 
                variant={stats.wpm >= 60 ? 'success' : stats.wpm >= 30 ? 'warning' : 'default'}
              />
            </ProgressSection>
          )}
        </DetailedStats>
      )}
    </StatsContainer>
  );
};
