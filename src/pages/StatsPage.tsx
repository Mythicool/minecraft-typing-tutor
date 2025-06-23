import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Container, Title, Button, FlexContainer } from '../styles/StyledComponents';
import { StatsChart } from '../components/StatsChart';
import { StatsDisplay } from '../components/StatsDisplay';
import { sessionsStorage, calculateStoredStats } from '../utils/storage';
// Removed unused import
import type { SessionStats } from '../types/index';

const PageContainer = styled.div`
  padding: ${theme.spacing.lg} 0;
  min-height: calc(100vh - 80px);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
`;

const TimeRangeButtons = styled(FlexContainer)`
  justify-content: center;
  margin-bottom: ${theme.spacing.lg};
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;
`;

const TimeRangeButton = styled(Button)<{ active: boolean }>`
  font-size: ${theme.fontSizes.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  
  ${({ active }) => active && `
    background: ${theme.colors.secondary.diamond};
    border-color: ${theme.colors.secondary.diamond};
  `}
`;

const RecentSessionsSection = styled.div`
  margin-top: ${theme.spacing.lg};
`;

const SessionsList = styled.div`
  display: grid;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

const SessionItem = styled.div`
  background: ${theme.colors.ui.surface};
  border: 2px solid ${theme.colors.ui.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  gap: ${theme.spacing.md};
  align-items: center;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
    text-align: center;
  }
`;

const SessionDate = styled.div`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.ui.textSecondary};
`;

const SessionStat = styled.div`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.ui.text};
  text-align: center;
`;

const StatLabel = styled.div`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.ui.textMuted};
  margin-bottom: ${theme.spacing.xs};
`;

const StatValue = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.secondary.gold};
`;

export const StatsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('month');
  const [chartType, setChartType] = useState<'wpm' | 'accuracy' | 'both'>('both');

  // Get session data and convert to SessionStats format
  const sessions = sessionsStorage.get();
  const sessionStats: SessionStats[] = sessions.map(session => ({
    date: session.startTime,
    wpm: session.stats.wpm,
    accuracy: session.stats.accuracy,
    duration: session.stats.timeElapsed,
    lessonId: session.lessonId,
    difficulty: 'beginner', // This would need to be looked up from lesson data
  }));

  const storedStats = calculateStoredStats();

  // Calculate overall stats
  const overallStats = {
    wpm: storedStats.averageWpm,
    accuracy: storedStats.averageAccuracy,
    correctChars: 0, // Would need to be calculated from sessions
    incorrectChars: 0, // Would need to be calculated from sessions
    totalChars: 0, // Would need to be calculated from sessions
    timeElapsed: storedStats.totalTimeSpent,
  };

  return (
    <PageContainer>
      <Container>
        <Title size="lg">📊 Your Statistics</Title>
        
        <StatsGrid>
          <StatsDisplay
            stats={overallStats}
            variant="detailed"
            showDetailed={true}
          />
        </StatsGrid>

        <FlexContainer justify="center" gap={theme.spacing.lg} style={{ marginBottom: theme.spacing.lg }}>
          <div>
            <StatLabel>Chart Type:</StatLabel>
            <FlexContainer gap={theme.spacing.xs}>
              <TimeRangeButton
                variant="secondary"
                active={chartType === 'wpm'}
                onClick={() => setChartType('wpm')}
              >
                WPM
              </TimeRangeButton>
              <TimeRangeButton
                variant="secondary"
                active={chartType === 'accuracy'}
                onClick={() => setChartType('accuracy')}
              >
                Accuracy
              </TimeRangeButton>
              <TimeRangeButton
                variant="secondary"
                active={chartType === 'both'}
                onClick={() => setChartType('both')}
              >
                Both
              </TimeRangeButton>
            </FlexContainer>
          </div>

          <div>
            <StatLabel>Time Range:</StatLabel>
            <TimeRangeButtons>
              <TimeRangeButton
                variant="secondary"
                active={timeRange === 'week'}
                onClick={() => setTimeRange('week')}
              >
                Last Week
              </TimeRangeButton>
              <TimeRangeButton
                variant="secondary"
                active={timeRange === 'month'}
                onClick={() => setTimeRange('month')}
              >
                Last Month
              </TimeRangeButton>
              <TimeRangeButton
                variant="secondary"
                active={timeRange === 'all'}
                onClick={() => setTimeRange('all')}
              >
                All Time
              </TimeRangeButton>
            </TimeRangeButtons>
          </div>
        </FlexContainer>

        <StatsChart
          sessions={sessionStats}
          type={chartType}
          timeRange={timeRange}
        />

        <RecentSessionsSection>
          <Title size="md">📝 Recent Sessions</Title>
          
          {storedStats.recentSessions.length > 0 ? (
            <SessionsList>
              {storedStats.recentSessions.slice(0, 10).map((session) => (
                <SessionItem key={session.id}>
                  <SessionDate>
                    {new Date(session.startTime).toLocaleDateString()} at{' '}
                    {new Date(session.startTime).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </SessionDate>
                  
                  <SessionStat>
                    <StatLabel>WPM</StatLabel>
                    <StatValue>{session.stats.wpm}</StatValue>
                  </SessionStat>
                  
                  <SessionStat>
                    <StatLabel>Accuracy</StatLabel>
                    <StatValue>{session.stats.accuracy}%</StatValue>
                  </SessionStat>
                  
                  <SessionStat>
                    <StatLabel>Duration</StatLabel>
                    <StatValue>
                      {Math.floor(session.stats.timeElapsed / 60)}:
                      {(session.stats.timeElapsed % 60).toString().padStart(2, '0')}
                    </StatValue>
                  </SessionStat>
                </SessionItem>
              ))}
            </SessionsList>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: theme.spacing['2xl'],
              color: theme.colors.ui.textMuted,
              fontFamily: 'Press Start 2P',
              fontSize: theme.fontSizes.sm,
            }}>
              No sessions recorded yet. Complete some lessons to see your statistics!
            </div>
          )}
        </RecentSessionsSection>
      </Container>
    </PageContainer>
  );
};
