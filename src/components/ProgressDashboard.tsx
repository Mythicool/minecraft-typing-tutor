import React from 'react';
import styled from 'styled-components';
import type { UserProgress } from '../types/index';
import { theme } from '../styles/theme';
import { Card, FlexContainer, ProgressBar, Title, Subtitle } from '../styles/StyledComponents';
import { Trophy, Target, Clock, Zap, Award, TrendingUp } from 'lucide-react';

interface ProgressDashboardProps {
  userProgress: UserProgress;
  totalLessons: number;
  completedLessons: number;
}

const DashboardContainer = styled.div`
  margin-bottom: ${theme.spacing['2xl']};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const StatCard = styled(Card)<{ variant?: 'default' | 'success' | 'warning' | 'info' }>`
  text-align: center;
  padding: ${theme.spacing.lg};
  position: relative;
  overflow: hidden;
  
  ${({ variant = 'default' }) => {
    switch (variant) {
      case 'success':
        return `
          background: linear-gradient(135deg, ${theme.colors.ui.success}20 0%, ${theme.colors.ui.surface} 100%);
          border-color: ${theme.colors.ui.success};
        `;
      case 'warning':
        return `
          background: linear-gradient(135deg, ${theme.colors.ui.warning}20 0%, ${theme.colors.ui.surface} 100%);
          border-color: ${theme.colors.ui.warning};
        `;
      case 'info':
        return `
          background: linear-gradient(135deg, ${theme.colors.secondary.diamond}20 0%, ${theme.colors.ui.surface} 100%);
          border-color: ${theme.colors.secondary.diamond};
        `;
      default:
        return '';
    }
  }}
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity ${theme.transitions.normal};
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const StatIcon = styled.div<{ color: string }>`
  width: 48px;
  height: 48px;
  margin: 0 auto ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ color }) => color}20;
  border: 2px solid ${({ color }) => color};
  border-radius: ${theme.borderRadius.md};
  color: ${({ color }) => color};
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const StatValue = styled.div`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes['2xl']};
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

const StatSubtext = styled.div`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.ui.textMuted};
  margin-top: ${theme.spacing.xs};
`;

const LevelSection = styled(Card)`
  background: linear-gradient(135deg, ${theme.colors.secondary.gold}20 0%, ${theme.colors.ui.surface} 100%);
  border-color: ${theme.colors.secondary.gold};
  margin-bottom: ${theme.spacing.lg};
  text-align: center;
`;

const LevelBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.secondary.gold};
  text-shadow: 1px 1px 0px ${theme.colors.ui.background};
  margin-bottom: ${theme.spacing.md};
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const ExperienceBar = styled.div`
  margin-top: ${theme.spacing.md};
`;

const ExperienceLabel = styled.div`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.ui.textSecondary};
  margin-bottom: ${theme.spacing.xs};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StreakSection = styled(Card)`
  background: linear-gradient(135deg, ${theme.colors.ui.accent}20 0%, ${theme.colors.ui.surface} 100%);
  border-color: ${theme.colors.ui.accent};
  text-align: center;
`;

const StreakFlame = styled.div<{ active: boolean }>`
  font-size: ${theme.fontSizes['3xl']};
  margin-bottom: ${theme.spacing.md};
  ${({ active }) => active && 'animation: bounce 2s infinite;'}
`;

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  userProgress,
  totalLessons,
  completedLessons,
}) => {
  const completionPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  const currentLevelExp = userProgress.experience % 100;
  const nextLevelExp = 100;
  const expPercentage = (currentLevelExp / nextLevelExp) * 100;

  return (
    <DashboardContainer>
      <Title size="md">📊 Your Progress</Title>
      
      <LevelSection>
        <LevelBadge>
          <Award />
          Level {userProgress.level}
        </LevelBadge>
        <ExperienceBar>
          <ExperienceLabel>
            <span>Experience</span>
            <span>{currentLevelExp} / {nextLevelExp} XP</span>
          </ExperienceLabel>
          <ProgressBar progress={expPercentage} variant="success" />
        </ExperienceBar>
      </LevelSection>

      <StatsGrid>
        <StatCard variant="success">
          <StatIcon color={theme.colors.ui.success}>
            <Trophy />
          </StatIcon>
          <StatValue>{completedLessons}</StatValue>
          <StatLabel>Lessons Completed</StatLabel>
          <StatSubtext>of {totalLessons} total</StatSubtext>
        </StatCard>

        <StatCard variant="info">
          <StatIcon color={theme.colors.secondary.diamond}>
            <Target />
          </StatIcon>
          <StatValue>{userProgress.bestWpm}</StatValue>
          <StatLabel>Best WPM</StatLabel>
          <StatSubtext>Personal Record</StatSubtext>
        </StatCard>

        <StatCard variant="warning">
          <StatIcon color={theme.colors.ui.warning}>
            <TrendingUp />
          </StatIcon>
          <StatValue>{userProgress.bestAccuracy}%</StatValue>
          <StatLabel>Best Accuracy</StatLabel>
          <StatSubtext>Highest Score</StatSubtext>
        </StatCard>

        <StatCard>
          <StatIcon color={theme.colors.ui.textSecondary}>
            <Clock />
          </StatIcon>
          <StatValue>{formatTime(userProgress.totalTimeSpent)}</StatValue>
          <StatLabel>Time Practiced</StatLabel>
          <StatSubtext>{userProgress.totalSessions} sessions</StatSubtext>
        </StatCard>
      </StatsGrid>

      <FlexContainer gap={theme.spacing.md} wrap>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <StreakSection>
            <StreakFlame active={userProgress.currentStreak > 0}>
              🔥
            </StreakFlame>
            <StatValue>{userProgress.currentStreak}</StatValue>
            <StatLabel>Day Streak</StatLabel>
            <StatSubtext>Longest: {userProgress.longestStreak} days</StatSubtext>
          </StreakSection>
        </div>

        <div style={{ flex: 1, minWidth: '300px' }}>
          <StatCard>
            <StatIcon color={theme.colors.secondary.diamond}>
              <Zap />
            </StatIcon>
            <StatValue>{Math.round(completionPercentage)}%</StatValue>
            <StatLabel>Course Progress</StatLabel>
            <div style={{ marginTop: theme.spacing.md }}>
              <ProgressBar progress={completionPercentage} variant="success" />
            </div>
          </StatCard>
        </div>
      </FlexContainer>

      {userProgress.averageWpm > 0 && (
        <Card variant="stone" style={{ marginTop: theme.spacing.lg, textAlign: 'center' }}>
          <Subtitle>📈 Performance Averages</Subtitle>
          <FlexContainer justify="space-around" align="center">
            <div>
              <StatValue style={{ fontSize: theme.fontSizes.lg }}>
                {userProgress.averageWpm}
              </StatValue>
              <StatLabel>Average WPM</StatLabel>
            </div>
            <div>
              <StatValue style={{ fontSize: theme.fontSizes.lg }}>
                {userProgress.averageAccuracy}%
              </StatValue>
              <StatLabel>Average Accuracy</StatLabel>
            </div>
          </FlexContainer>
        </Card>
      )}
    </DashboardContainer>
  );
};
