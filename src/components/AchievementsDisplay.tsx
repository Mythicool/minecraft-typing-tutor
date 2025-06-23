import React, { useState } from 'react';
import styled from 'styled-components';
import type { Achievement, AchievementRarity } from '../types/index';
import { theme } from '../styles/theme';
import { Card, FlexContainer, Subtitle, Button } from '../styles/StyledComponents';
import { achievements } from '../data/achievements';

interface AchievementsDisplayProps {
  unlockedAchievements: Achievement[];
  showAll?: boolean;
}

const AchievementsContainer = styled(Card)`
  background: linear-gradient(135deg, ${theme.colors.ui.surface} 0%, ${theme.colors.ui.surfaceLight} 100%);
`;

const AchievementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`;

const AchievementCard = styled.div<{ rarity: AchievementRarity; unlocked: boolean }>`
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  border: 2px solid;
  position: relative;
  transition: ${theme.transitions.normal};
  opacity: ${({ unlocked }) => unlocked ? 1 : 0.4};
  
  ${({ rarity, unlocked }) => {
    const colors = {
      common: theme.colors.ui.textMuted,
      uncommon: theme.colors.ui.success,
      rare: theme.colors.secondary.diamond,
      epic: theme.colors.ui.warning,
      legendary: theme.colors.secondary.gold,
    };
    
    const color = colors[rarity];
    
    return `
      border-color: ${color};
      background: ${unlocked ? `${color}15` : 'rgba(0,0,0,0.2)'};
      
      ${unlocked && `
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px ${color}40;
        }
      `}
    `;
  }}
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: ${theme.borderRadius.md};
    background: ${({ rarity, unlocked }) => {
      if (!unlocked) return 'none';
      
      const gradients = {
        common: 'none',
        uncommon: `linear-gradient(45deg, ${theme.colors.ui.success}20, transparent)`,
        rare: `linear-gradient(45deg, ${theme.colors.secondary.diamond}20, transparent)`,
        epic: `linear-gradient(45deg, ${theme.colors.ui.warning}20, ${theme.colors.ui.warning}10, transparent)`,
        legendary: `linear-gradient(45deg, ${theme.colors.secondary.gold}30, ${theme.colors.secondary.gold}10, transparent)`,
      };
      
      return gradients[rarity];
    }};
    z-index: -1;
    opacity: 0.5;
  }
`;

const AchievementIcon = styled.div<{ unlocked: boolean }>`
  font-size: ${theme.fontSizes['3xl']};
  text-align: center;
  margin-bottom: ${theme.spacing.sm};
  filter: ${({ unlocked }) => unlocked ? 'none' : 'grayscale(100%)'};
  
  ${({ unlocked }) => unlocked && `
    animation: bounce 2s ease-in-out infinite;
    
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-4px);
      }
      60% {
        transform: translateY(-2px);
      }
    }
  `}
`;

const AchievementTitle = styled.h4<{ rarity: AchievementRarity }>`
  font-family: 'Press Start 2P', ${theme.fonts.heading};
  font-size: ${theme.fontSizes.sm};
  margin: 0 0 ${theme.spacing.xs} 0;
  text-align: center;
  
  color: ${({ rarity }) => {
    const colors = {
      common: theme.colors.ui.text,
      uncommon: theme.colors.ui.success,
      rare: theme.colors.secondary.diamond,
      epic: theme.colors.ui.warning,
      legendary: theme.colors.secondary.gold,
    };
    return colors[rarity];
  }};
`;

const AchievementDescription = styled.p`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.ui.textSecondary};
  text-align: center;
  line-height: 1.4;
  margin: 0;
`;

const RarityBadge = styled.div<{ rarity: AchievementRarity }>`
  position: absolute;
  top: ${theme.spacing.xs};
  right: ${theme.spacing.xs};
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  padding: 2px 6px;
  border-radius: ${theme.borderRadius.sm};
  text-transform: uppercase;
  
  ${({ rarity }) => {
    const styles = {
      common: `
        background: ${theme.colors.ui.textMuted}20;
        color: ${theme.colors.ui.textMuted};
        border: 1px solid ${theme.colors.ui.textMuted};
      `,
      uncommon: `
        background: ${theme.colors.ui.success}20;
        color: ${theme.colors.ui.success};
        border: 1px solid ${theme.colors.ui.success};
      `,
      rare: `
        background: ${theme.colors.secondary.diamond}20;
        color: ${theme.colors.secondary.diamond};
        border: 1px solid ${theme.colors.secondary.diamond};
      `,
      epic: `
        background: ${theme.colors.ui.warning}20;
        color: ${theme.colors.ui.warning};
        border: 1px solid ${theme.colors.ui.warning};
      `,
      legendary: `
        background: ${theme.colors.secondary.gold}20;
        color: ${theme.colors.secondary.gold};
        border: 1px solid ${theme.colors.secondary.gold};
        box-shadow: 0 0 8px ${theme.colors.secondary.gold}40;
      `,
    };
    return styles[rarity];
  }}
`;

const UnlockedDate = styled.div`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.ui.textMuted};
  text-align: center;
  margin-top: ${theme.spacing.xs};
`;

const FilterButtons = styled(FlexContainer)`
  margin-bottom: ${theme.spacing.lg};
  justify-content: center;
  flex-wrap: wrap;
`;

const FilterButton = styled(Button)<{ active: boolean }>`
  font-size: ${theme.fontSizes.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  
  ${({ active }) => active && `
    background: ${theme.colors.secondary.diamond};
    border-color: ${theme.colors.secondary.diamond};
  `}
`;

const ProgressSummary = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.md};
  background: rgba(0, 0, 0, 0.1);
  border-radius: ${theme.borderRadius.md};
`;

const ProgressText = styled.div`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.secondary.gold};
  margin-bottom: ${theme.spacing.xs};
`;

const ProgressSubtext = styled.div`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.ui.textSecondary};
`;

export const AchievementsDisplay: React.FC<AchievementsDisplayProps> = ({
  unlockedAchievements,
  showAll = false,
}) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | AchievementRarity>('all');
  
  const unlockedIds = new Set(unlockedAchievements.map(a => a.id));
  
  const allAchievements = achievements.map(achievement => ({
    ...achievement,
    unlocked: unlockedIds.has(achievement.id),
    unlockedAt: unlockedAchievements.find(a => a.id === achievement.id)?.unlockedAt,
  }));

  const filteredAchievements = allAchievements.filter(achievement => {
    if (!showAll && !achievement.unlocked) return false;
    
    switch (filter) {
      case 'unlocked':
        return achievement.unlocked;
      case 'all':
        return true;
      default:
        return achievement.rarity === filter;
    }
  });

  const totalAchievements = achievements.length;
  const unlockedCount = unlockedAchievements.length;
  const progressPercentage = Math.round((unlockedCount / totalAchievements) * 100);

  const rarityCount = {
    common: unlockedAchievements.filter(a => achievements.find(ac => ac.id === a.id)?.rarity === 'common').length,
    uncommon: unlockedAchievements.filter(a => achievements.find(ac => ac.id === a.id)?.rarity === 'uncommon').length,
    rare: unlockedAchievements.filter(a => achievements.find(ac => ac.id === a.id)?.rarity === 'rare').length,
    epic: unlockedAchievements.filter(a => achievements.find(ac => ac.id === a.id)?.rarity === 'epic').length,
    legendary: unlockedAchievements.filter(a => achievements.find(ac => ac.id === a.id)?.rarity === 'legendary').length,
  };

  return (
    <AchievementsContainer>
      <Subtitle>🏆 Achievements</Subtitle>
      
      <ProgressSummary>
        <ProgressText>
          {unlockedCount} / {totalAchievements} Unlocked
        </ProgressText>
        <ProgressSubtext>
          {progressPercentage}% Complete
        </ProgressSubtext>
      </ProgressSummary>

      {showAll && (
        <FilterButtons gap={theme.spacing.sm}>
          <FilterButton
            variant="secondary"
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            All
          </FilterButton>
          <FilterButton
            variant="secondary"
            active={filter === 'unlocked'}
            onClick={() => setFilter('unlocked')}
          >
            Unlocked ({unlockedCount})
          </FilterButton>
          <FilterButton
            variant="secondary"
            active={filter === 'common'}
            onClick={() => setFilter('common')}
          >
            Common ({rarityCount.common})
          </FilterButton>
          <FilterButton
            variant="secondary"
            active={filter === 'uncommon'}
            onClick={() => setFilter('uncommon')}
          >
            Uncommon ({rarityCount.uncommon})
          </FilterButton>
          <FilterButton
            variant="secondary"
            active={filter === 'rare'}
            onClick={() => setFilter('rare')}
          >
            Rare ({rarityCount.rare})
          </FilterButton>
          <FilterButton
            variant="secondary"
            active={filter === 'epic'}
            onClick={() => setFilter('epic')}
          >
            Epic ({rarityCount.epic})
          </FilterButton>
          <FilterButton
            variant="secondary"
            active={filter === 'legendary'}
            onClick={() => setFilter('legendary')}
          >
            Legendary ({rarityCount.legendary})
          </FilterButton>
        </FilterButtons>
      )}

      <AchievementGrid>
        {filteredAchievements.map(achievement => (
          <AchievementCard
            key={achievement.id}
            rarity={achievement.rarity}
            unlocked={achievement.unlocked}
          >
            <RarityBadge rarity={achievement.rarity}>
              {achievement.rarity}
            </RarityBadge>
            
            <AchievementIcon unlocked={achievement.unlocked}>
              {achievement.icon}
            </AchievementIcon>
            
            <AchievementTitle rarity={achievement.rarity}>
              {achievement.title}
            </AchievementTitle>
            
            <AchievementDescription>
              {achievement.description}
            </AchievementDescription>
            
            {achievement.unlocked && achievement.unlockedAt && (
              <UnlockedDate>
                Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
              </UnlockedDate>
            )}
          </AchievementCard>
        ))}
      </AchievementGrid>

      {filteredAchievements.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: theme.spacing['2xl'],
          color: theme.colors.ui.textMuted,
          fontFamily: 'Press Start 2P',
          fontSize: theme.fontSizes.sm,
        }}>
          {showAll ? 'No achievements match the current filter.' : 'No achievements unlocked yet. Keep practicing!'}
        </div>
      )}
    </AchievementsContainer>
  );
};
