import React from 'react';
import styled from 'styled-components';
import type { Lesson } from '../types/index';
import { theme } from '../styles/theme';
import { Card, Button } from '../styles/StyledComponents';
import { Lock, CheckCircle, Star, Target } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
  onClick: (lessonId: string) => void;
  disabled?: boolean;
}

const LessonCardContainer = styled(Card)<{ unlocked: boolean; completed: boolean }>`
  cursor: ${({ unlocked }) => unlocked ? 'pointer' : 'not-allowed'};
  opacity: ${({ unlocked }) => unlocked ? 1 : 0.6};
  transition: ${theme.transitions.normal};
  position: relative;
  overflow: hidden;

  ${({ unlocked }) => unlocked && `
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${theme.shadows.xl};
    }
  `}
  
  ${({ completed }) => completed && `
    border-color: ${theme.colors.ui.success};
    background: linear-gradient(135deg, 
      ${theme.colors.ui.success}20 0%, 
      ${theme.colors.ui.surface} 100%
    );
  `}
`;

const LessonHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

const LessonTitle = styled.h3`
  font-family: 'Press Start 2P', ${theme.fonts.heading};
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.secondary.diamond};
  margin: 0;
  margin-bottom: ${theme.spacing.xs};
  line-height: ${theme.typography.lineHeight.tight};

  /* Enhanced word wrapping for titles */
  ${theme.typography.wordWrap.keepAll}

  /* Responsive typography */
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes.sm};
  }
`;

const LessonDescription = styled.p`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.ui.textSecondary};
  line-height: ${theme.typography.lineHeight.relaxed};
  margin: 0;
  margin-bottom: ${theme.spacing.md};

  /* Enhanced word wrapping for descriptions */
  ${theme.typography.wordWrap.normal}

  /* Responsive typography */
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes['xs-fixed']};
    line-height: ${theme.typography.lineHeight.normal};
  }
`;

const DifficultyBadge = styled.div<{ difficulty: string }>`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 2px solid;
  
  ${({ difficulty }) => {
    switch (difficulty) {
      case 'beginner':
        return `
          background: ${theme.colors.ui.success}20;
          border-color: ${theme.colors.ui.success};
          color: ${theme.colors.ui.success};
        `;
      case 'intermediate':
        return `
          background: ${theme.colors.ui.warning}20;
          border-color: ${theme.colors.ui.warning};
          color: ${theme.colors.ui.warning};
        `;
      case 'advanced':
        return `
          background: ${theme.colors.ui.error}20;
          border-color: ${theme.colors.ui.error};
          color: ${theme.colors.ui.error};
        `;
      default:
        return `
          background: ${theme.colors.ui.textMuted}20;
          border-color: ${theme.colors.ui.textMuted};
          color: ${theme.colors.ui.textMuted};
        `;
    }
  }}
`;

const CategoryBadge = styled.div`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${theme.colors.primary.stone}40;
  border: 1px solid ${theme.colors.primary.stone};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.ui.text};
  text-transform: capitalize;
  margin-bottom: ${theme.spacing.sm};
`;

const RequirementsSection = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const RequirementItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.ui.textSecondary};
  margin-bottom: ${theme.spacing.xs};
  
  svg {
    width: 12px;
    height: 12px;
    color: ${theme.colors.secondary.diamond};
  }
`;

const BestStatsSection = styled.div`
  background: rgba(0, 0, 0, 0.2);
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  margin-bottom: ${theme.spacing.md};
`;

const BestStatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.ui.textSecondary};
  margin-bottom: ${theme.spacing.xs};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const BestStatValue = styled.span`
  color: ${theme.colors.secondary.gold};
`;

const StatusIcon = styled.div<{ status: 'locked' | 'unlocked' | 'completed' }>`
  position: absolute;
  top: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 20px;
    height: 20px;
    color: ${({ status }) => {
      switch (status) {
        case 'completed':
          return theme.colors.ui.success;
        case 'unlocked':
          return theme.colors.secondary.diamond;
        case 'locked':
        default:
          return theme.colors.ui.textMuted;
      }
    }};
  }
`;

const ActionButton = styled(Button)<{ unlocked: boolean }>`
  width: 100%;
  margin-top: ${theme.spacing.sm};
  
  ${({ unlocked }) => !unlocked && `
    opacity: 0.5;
    cursor: not-allowed;
  `}
`;

const ContentPreview = styled.div`
  font-family: 'Press Start 2P', ${theme.fonts.mono};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.ui.textMuted};
  background: rgba(0, 0, 0, 0.1);
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  margin-bottom: ${theme.spacing.md};
  line-height: ${theme.typography.lineHeight.normal};

  /* Enhanced word wrapping for content preview */
  ${theme.typography.wordWrap.normal}
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  /* Responsive typography */
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes['xs-fixed']};
    -webkit-line-clamp: 1;
  }
`;

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  onClick,
  disabled = false,
}) => {
  const handleClick = () => {
    if (lesson.unlocked && !disabled) {
      onClick(lesson.id);
    }
  };

  const getStatusIcon = () => {
    if (lesson.completed) {
      return <CheckCircle />;
    }
    if (lesson.unlocked) {
      return <Star />;
    }
    return <Lock />;
  };

  const getContentPreview = () => {
    if (Array.isArray(lesson.content.data)) {
      return lesson.content.data.slice(0, 3).join(', ') + '...';
    }
    return lesson.content.data.substring(0, 50) + '...';
  };

  const getStatusText = () => {
    if (lesson.completed) return 'completed';
    if (lesson.unlocked) return 'unlocked';
    return 'locked';
  };

  return (
    <LessonCardContainer
      unlocked={lesson.unlocked}
      completed={lesson.completed}
      onClick={handleClick}
      variant={lesson.completed ? 'grass' : 'default'}
    >
      <StatusIcon status={getStatusText()}>
        {getStatusIcon()}
      </StatusIcon>

      <LessonHeader>
        <div style={{ flex: 1 }}>
          <CategoryBadge>{lesson.category}</CategoryBadge>
          <LessonTitle>{lesson.title}</LessonTitle>
        </div>
        <DifficultyBadge difficulty={lesson.difficulty}>
          {lesson.difficulty}
        </DifficultyBadge>
      </LessonHeader>

      <LessonDescription>{lesson.description}</LessonDescription>

      <ContentPreview>
        Preview: {getContentPreview()}
      </ContentPreview>

      <RequirementsSection>
        <RequirementItem>
          <Target />
          <span>Min WPM: {lesson.minWpmToPass}</span>
        </RequirementItem>
        <RequirementItem>
          <Target />
          <span>Min Accuracy: {lesson.minAccuracyToPass}%</span>
        </RequirementItem>
      </RequirementsSection>

      {lesson.bestStats && (
        <BestStatsSection>
          <div style={{ 
            fontFamily: 'Press Start 2P', 
            fontSize: theme.fontSizes.xs, 
            color: theme.colors.secondary.gold,
            marginBottom: theme.spacing.xs,
            textAlign: 'center'
          }}>
            🏆 Best Performance
          </div>
          <BestStatItem>
            <span>WPM:</span>
            <BestStatValue>{lesson.bestStats.wpm}</BestStatValue>
          </BestStatItem>
          <BestStatItem>
            <span>Accuracy:</span>
            <BestStatValue>{lesson.bestStats.accuracy}%</BestStatValue>
          </BestStatItem>
        </BestStatsSection>
      )}

      <ActionButton
        variant={lesson.completed ? 'success' : 'primary'}
        unlocked={lesson.unlocked}
        disabled={!lesson.unlocked || disabled}
      >
        {lesson.completed ? 'Practice Again' : lesson.unlocked ? 'Start Lesson' : 'Locked'}
      </ActionButton>
    </LessonCardContainer>
  );
};
