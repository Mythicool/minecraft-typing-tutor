import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { FlexContainer } from '../styles/StyledComponents';
import { Home, BookOpen, BarChart3, Trophy, Settings, User, Gamepad2, Type } from 'lucide-react';

const NavContainer = styled.nav`
  background: linear-gradient(135deg, ${theme.colors.primary.stone} 0%, ${theme.colors.primary.cobblestone} 100%);
  border-bottom: 3px solid ${theme.colors.ui.border};
  padding: ${theme.spacing.md} 0;
  position: sticky;
  top: 0;
  z-index: ${theme.zIndex.sticky};
  box-shadow: ${theme.shadows.md};
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const NavBrand = styled(Link)`
  font-family: 'Press Start 2P', ${theme.fonts.heading};
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.secondary.gold};
  text-shadow: 2px 2px 0px ${theme.colors.ui.background};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  &:hover {
    color: ${theme.colors.secondary.diamond};
    transform: translateY(-1px);
    transition: ${theme.transitions.fast};
  }
`;

const NavLinks = styled(FlexContainer)`
  gap: ${theme.spacing.sm};
  
  @media (max-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.xs};
  }
`;

const NavLink = styled(Link)<{ active: boolean }>`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  color: ${({ active }) => active ? theme.colors.secondary.diamond : theme.colors.ui.text};
  text-decoration: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid transparent;
  border-radius: ${theme.borderRadius.sm};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  transition: ${theme.transitions.fast};
  text-transform: uppercase;
  letter-spacing: 1px;
  
  ${({ active }) => active && `
    background: rgba(0, 191, 255, 0.1);
    border-color: ${theme.colors.secondary.diamond};
  `}
  
  &:hover {
    color: ${theme.colors.secondary.diamond};
    background: rgba(0, 191, 255, 0.1);
    border-color: ${theme.colors.secondary.diamond};
    transform: translateY(-2px);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: ${theme.fontSizes.xs};
    
    span {
      display: none;
    }
  }
`;

// Removed unused MobileNavToggle component

const UserInfo = styled.div`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.ui.textSecondary};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  
  svg {
    width: 16px;
    height: 16px;
    color: ${theme.colors.secondary.gold};
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

interface NavigationProps {
  userLevel?: number;
  userExperience?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  userLevel = 1,
  userExperience = 0,
}) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: '/', label: 'Lessons', icon: <Home /> },
    { path: '/practice', label: 'Practice', icon: <BookOpen /> },
    { path: '/hangman', label: 'Hangman', icon: <Gamepad2 /> },
    { path: '/stats', label: 'Stats', icon: <BarChart3 /> },
    { path: '/achievements', label: 'Achievements', icon: <Trophy /> },
    { path: '/typography-demo', label: 'Typography', icon: <Type /> },
    { path: '/settings', label: 'Settings', icon: <Settings /> },
  ];

  return (
    <NavContainer>
      <NavContent>
        <FlexContainer justify="space-between" align="center">
          <NavBrand to="/">
            ⛏️ <span>Minecraft Typing</span>
          </NavBrand>
          
          <NavLinks>
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                active={isActive(item.path)}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </NavLinks>
          
          <UserInfo>
            <User />
            <span>Lv.{userLevel}</span>
            <span>({userExperience} XP)</span>
          </UserInfo>
        </FlexContainer>
      </NavContent>
    </NavContainer>
  );
};
