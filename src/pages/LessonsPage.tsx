import React from 'react';
import styled from 'styled-components';
import type { Lesson } from '../types/index';
import { theme } from '../styles/theme';
import { Container, Title } from '../styles/StyledComponents';
import { LessonCard } from '../components/LessonCard';
import { ProgressDashboard } from '../components/ProgressDashboard';
import { useLessons } from '../hooks/useLessons';

const PageContainer = styled.div`
  padding: ${theme.spacing.lg} 0;
  min-height: calc(100vh - 80px);
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
`;

const LessonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(350px, 100%), 1fr));
  gap: clamp(${theme.spacing.md}, 3vw, ${theme.spacing.lg});
  margin-bottom: ${theme.spacing['2xl']};
  width: 100%;

  /* Responsive adjustments */
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }

  @media (min-width: ${theme.breakpoints.xl}) {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
`;

const FilterSection = styled.div`
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  justify-content: center;
  gap: clamp(${theme.spacing.sm}, 2vw, ${theme.spacing.md});
  flex-wrap: wrap;
  align-items: center;

  /* Responsive adjustments */
  @media (max-width: ${theme.breakpoints.sm}) {
    gap: ${theme.spacing.xs};
  }
`;

const FilterButton = styled.button<{ active: boolean }>`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  padding: clamp(${theme.spacing.xs}, 1.5vw, ${theme.spacing.sm}) clamp(${theme.spacing.sm}, 2vw, ${theme.spacing.md});
  border: 3px solid ${theme.colors.ui.border};
  border-radius: ${theme.borderRadius.sm};
  background: ${({ active }) =>
    active
      ? `linear-gradient(135deg, ${theme.colors.secondary.diamond} 0%, ${theme.colors.secondary.diamond}80 100%)`
      : `linear-gradient(135deg, ${theme.colors.primary.stone} 0%, ${theme.colors.primary.cobblestone} 100%)`
  };
  color: ${theme.colors.ui.text};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  text-transform: uppercase;

  /* Enhanced word wrapping for filter buttons */
  ${theme.typography.wordWrap.keepAll}
  line-height: ${theme.typography.lineHeight.normal};

  &:hover {
    transform: translateY(-2px);
    border-color: ${theme.colors.secondary.diamond};
  }

  /* Responsive typography */
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes['xs-fixed']};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
  }
`;

interface LessonsPageProps {
  onLessonSelect: (lesson: Lesson) => void;
}

export const LessonsPage: React.FC<LessonsPageProps> = ({ onLessonSelect }) => {
  const {
    lessons,
    userProgress,
    getUnlockedLessons,
    getCompletedLessons,
    getLessonsByDifficulty,
  } = useLessons();

  const [filter, setFilter] = React.useState<'all' | 'beginner' | 'intermediate' | 'advanced' | 'unlocked' | 'completed'>('all');

  const getFilteredLessons = () => {
    switch (filter) {
      case 'beginner':
      case 'intermediate':
      case 'advanced':
        return getLessonsByDifficulty(filter);
      case 'unlocked':
        return getUnlockedLessons();
      case 'completed':
        return getCompletedLessons();
      default:
        return lessons;
    }
  };

  const filteredLessons = getFilteredLessons();

  const handleLessonClick = (lessonId: string) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson && lesson.unlocked) {
      onLessonSelect(lesson);
    }
  };

  return (
    <PageContainer>
      <Container>
        <Header>
          <Title size="xl">⛏️ Minecraft Typing Lessons ⛏️</Title>
          <p className="instruction-text" style={{
            fontFamily: 'Press Start 2P',
            fontSize: theme.fontSizes.sm,
            color: theme.colors.ui.textSecondary,
            lineHeight: theme.typography.lineHeight.relaxed,
            maxWidth: 'min(600px, 100% - 2rem)',
            margin: '0 auto',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            wordBreak: 'normal',
            hyphens: 'none'
          }}>
            Master your typing skills with Minecraft-themed lessons!
            <br />
            Learn blocks, mobs, biomes, and more while improving your WPM.
          </p>
        </Header>

        <ProgressDashboard
          userProgress={userProgress}
          totalLessons={lessons.length}
          completedLessons={getCompletedLessons().length}
        />

        <FilterSection>
          <FilterButton
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            All Lessons ({lessons.length})
          </FilterButton>
          <FilterButton
            active={filter === 'unlocked'}
            onClick={() => setFilter('unlocked')}
          >
            Unlocked ({getUnlockedLessons().length})
          </FilterButton>
          <FilterButton
            active={filter === 'completed'}
            onClick={() => setFilter('completed')}
          >
            Completed ({getCompletedLessons().length})
          </FilterButton>
          <FilterButton
            active={filter === 'beginner'}
            onClick={() => setFilter('beginner')}
          >
            Beginner ({getLessonsByDifficulty('beginner').length})
          </FilterButton>
          <FilterButton
            active={filter === 'intermediate'}
            onClick={() => setFilter('intermediate')}
          >
            Intermediate ({getLessonsByDifficulty('intermediate').length})
          </FilterButton>
          <FilterButton
            active={filter === 'advanced'}
            onClick={() => setFilter('advanced')}
          >
            Advanced ({getLessonsByDifficulty('advanced').length})
          </FilterButton>
        </FilterSection>
        
        <LessonGrid>
          {filteredLessons.map(lesson => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              onClick={handleLessonClick}
            />
          ))}
        </LessonGrid>

        {filteredLessons.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: theme.spacing['2xl'],
            color: theme.colors.ui.textMuted,
            fontFamily: 'Press Start 2P',
            fontSize: theme.fontSizes.md,
          }}>
            No lessons match the current filter.
          </div>
        )}
      </Container>
    </PageContainer>
  );
};
