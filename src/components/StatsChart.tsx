import React from 'react';
import styled from 'styled-components';
import type { SessionStats } from '../types/index';
import { theme } from '../styles/theme';
import { Card, Subtitle } from '../styles/StyledComponents';

interface StatsChartProps {
  sessions: SessionStats[];
  type: 'wpm' | 'accuracy' | 'both';
  timeRange: 'week' | 'month' | 'all';
}

const ChartContainer = styled(Card)`
  background: linear-gradient(135deg, ${theme.colors.ui.surface} 0%, ${theme.colors.ui.surfaceLight} 100%);
  padding: ${theme.spacing.lg};
`;

const ChartArea = styled.div`
  height: 300px;
  position: relative;
  margin: ${theme.spacing.lg} 0;
  background: rgba(0, 0, 0, 0.1);
  border-radius: ${theme.borderRadius.sm};
  overflow: hidden;
`;

const ChartGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
    background-size: 40px 40px;
  }
`;

const GridLine = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
  
  &::after {
    content: attr(data-value);
    position: absolute;
    left: -40px;
    top: -8px;
    font-family: 'Press Start 2P', ${theme.fonts.primary};
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.ui.textMuted};
  }
`;

const ChartLine = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const DataPoint = styled.circle<{ color: string }>`
  fill: ${({ color }) => color};
  stroke: ${theme.colors.ui.background};
  stroke-width: 2;
  cursor: pointer;
  transition: ${theme.transitions.fast};
  
  &:hover {
    r: 6;
    stroke-width: 3;
  }
`;

const ChartPath = styled.path<{ color: string }>`
  fill: none;
  stroke: ${({ color }) => color};
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const Legend = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.md};
`;

const LegendItem = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.ui.textSecondary};
  
  &::before {
    content: '';
    width: 16px;
    height: 3px;
    background: ${({ color }) => color};
    border-radius: 2px;
  }
`;

const NoDataMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.ui.textMuted};
  text-align: center;
  line-height: 1.6;
`;

const StatsSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const SummaryItem = styled.div`
  text-align: center;
  padding: ${theme.spacing.sm};
  background: rgba(0, 0, 0, 0.1);
  border-radius: ${theme.borderRadius.sm};
`;

const SummaryValue = styled.div`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.secondary.gold};
  margin-bottom: ${theme.spacing.xs};
`;

const SummaryLabel = styled.div`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.ui.textSecondary};
  text-transform: uppercase;
`;

const filterSessionsByTimeRange = (sessions: SessionStats[], timeRange: 'week' | 'month' | 'all'): SessionStats[] => {
  if (timeRange === 'all') return sessions;
  
  const now = new Date();
  const cutoffDate = new Date();
  
  if (timeRange === 'week') {
    cutoffDate.setDate(now.getDate() - 7);
  } else if (timeRange === 'month') {
    cutoffDate.setMonth(now.getMonth() - 1);
  }
  
  return sessions.filter(session => new Date(session.date) >= cutoffDate);
};

const generatePath = (points: { x: number; y: number }[]): string => {
  if (points.length === 0) return '';
  
  let path = `M ${points[0].x} ${points[0].y}`;
  
  for (let i = 1; i < points.length; i++) {
    const curr = points[i];
    const next = points[i + 1];
    
    if (next) {
      // Smooth curve using quadratic bezier
      const cpx = curr.x;
      const cpy = curr.y;
      path += ` Q ${cpx} ${cpy} ${(curr.x + next.x) / 2} ${(curr.y + next.y) / 2}`;
    } else {
      path += ` L ${curr.x} ${curr.y}`;
    }
  }
  
  return path;
};

export const StatsChart: React.FC<StatsChartProps> = ({
  sessions,
  type,
  timeRange,
}) => {
  const filteredSessions = filterSessionsByTimeRange(sessions, timeRange);
  
  if (filteredSessions.length === 0) {
    return (
      <ChartContainer>
        <Subtitle>📈 Progress Chart</Subtitle>
        <NoDataMessage>
          <div style={{ fontSize: theme.fontSizes['2xl'], marginBottom: theme.spacing.md }}>
            📊
          </div>
          <div>No data available</div>
          <div style={{ fontSize: theme.fontSizes.xs, marginTop: theme.spacing.sm }}>
            Complete some lessons to see your progress!
          </div>
        </NoDataMessage>
      </ChartContainer>
    );
  }

  // Calculate summary statistics
  const avgWpm = Math.round(filteredSessions.reduce((sum, s) => sum + s.wpm, 0) / filteredSessions.length);
  const avgAccuracy = Math.round(filteredSessions.reduce((sum, s) => sum + s.accuracy, 0) / filteredSessions.length);
  const maxWpm = Math.max(...filteredSessions.map(s => s.wpm));
  const totalTime = Math.round(filteredSessions.reduce((sum, s) => sum + s.duration, 0) / 60); // in minutes

  // Prepare chart data
  const chartWidth = 100; // percentage
  const chartHeight = 100; // percentage
  const padding = 10;

  const wpmMax = Math.max(100, maxWpm + 10);
  const accuracyMax = 100;

  const wpmPoints = filteredSessions.map((session, index) => ({
    x: padding + (index / (filteredSessions.length - 1)) * (chartWidth - 2 * padding),
    y: chartHeight - padding - (session.wpm / wpmMax) * (chartHeight - 2 * padding),
  }));

  const accuracyPoints = filteredSessions.map((session, index) => ({
    x: padding + (index / (filteredSessions.length - 1)) * (chartWidth - 2 * padding),
    y: chartHeight - padding - (session.accuracy / accuracyMax) * (chartHeight - 2 * padding),
  }));

  return (
    <ChartContainer>
      <Subtitle>📈 Progress Chart ({timeRange})</Subtitle>
      
      <StatsSummary>
        <SummaryItem>
          <SummaryValue>{avgWpm}</SummaryValue>
          <SummaryLabel>Avg WPM</SummaryLabel>
        </SummaryItem>
        <SummaryItem>
          <SummaryValue>{avgAccuracy}%</SummaryValue>
          <SummaryLabel>Avg Accuracy</SummaryLabel>
        </SummaryItem>
        <SummaryItem>
          <SummaryValue>{maxWpm}</SummaryValue>
          <SummaryLabel>Best WPM</SummaryLabel>
        </SummaryItem>
        <SummaryItem>
          <SummaryValue>{totalTime}m</SummaryValue>
          <SummaryLabel>Total Time</SummaryLabel>
        </SummaryItem>
      </StatsSummary>

      <ChartArea>
        <ChartGrid>
          {[0, 25, 50, 75, 100].map(value => (
            <GridLine key={value} data-value={type === 'wpm' ? Math.round(wpmMax * value / 100) : value} />
          ))}
        </ChartGrid>
        
        <ChartLine viewBox="0 0 100 100" preserveAspectRatio="none">
          {(type === 'wpm' || type === 'both') && wpmPoints.length > 1 && (
            <>
              <ChartPath
                d={generatePath(wpmPoints)}
                color={theme.colors.secondary.diamond}
              />
              {wpmPoints.map((point, index) => (
                <DataPoint
                  key={`wpm-${index}`}
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  color={theme.colors.secondary.diamond}
                />
              ))}
            </>
          )}
          
          {(type === 'accuracy' || type === 'both') && accuracyPoints.length > 1 && (
            <>
              <ChartPath
                d={generatePath(accuracyPoints)}
                color={theme.colors.ui.success}
              />
              {accuracyPoints.map((point, index) => (
                <DataPoint
                  key={`accuracy-${index}`}
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  color={theme.colors.ui.success}
                />
              ))}
            </>
          )}
        </ChartLine>
      </ChartArea>

      <Legend>
        {(type === 'wpm' || type === 'both') && (
          <LegendItem color={theme.colors.secondary.diamond}>
            WPM
          </LegendItem>
        )}
        {(type === 'accuracy' || type === 'both') && (
          <LegendItem color={theme.colors.ui.success}>
            Accuracy
          </LegendItem>
        )}
      </Legend>
    </ChartContainer>
  );
};
