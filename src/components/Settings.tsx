import React, { useState } from 'react';
import styled from 'styled-components';
import type { UserSettings, FontSize, ThemeVariant } from '../types/index';
import { theme } from '../styles/theme';
import { Card, Button, FlexContainer, Subtitle } from '../styles/StyledComponents';
import { userSettingsStorage } from '../utils/storage';
import { Volume2, Eye, Target, Type } from 'lucide-react';

interface SettingsProps {
  settings: UserSettings;
  onSettingsChange: (settings: UserSettings) => void;
  onClose?: () => void;
}

const SettingsContainer = styled(Card)`
  background: linear-gradient(135deg, ${theme.colors.ui.surface} 0%, ${theme.colors.ui.surfaceLight} 100%);
  max-width: 600px;
  margin: 0 auto;
`;

const SettingsSection = styled.div`
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 2px solid ${theme.colors.ui.border};
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-family: 'Press Start 2P', ${theme.fonts.heading};
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.secondary.diamond};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const SettingItem = styled.div`
  margin-bottom: ${theme.spacing.md};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SettingLabel = styled.label`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.ui.text};
  display: block;
  margin-bottom: ${theme.spacing.xs};
  cursor: pointer;
`;

const SettingDescription = styled.p`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.ui.textMuted};
  margin: ${theme.spacing.xs} 0;
  line-height: 1.4;
`;

const ToggleSwitch = styled.div<{ enabled: boolean }>`
  width: 60px;
  height: 30px;
  background: ${({ enabled }) => enabled ? theme.colors.ui.success : theme.colors.ui.textMuted};
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  transition: ${theme.transitions.normal};
  border: 2px solid ${({ enabled }) => enabled ? theme.colors.ui.success : theme.colors.ui.textMuted};
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ enabled }) => enabled ? '32px' : '2px'};
    width: 22px;
    height: 22px;
    background: ${theme.colors.ui.text};
    border-radius: 50%;
    transition: ${theme.transitions.normal};
  }
  
  &:hover {
    transform: scale(1.05);
  }
`;

const SelectContainer = styled.div`
  position: relative;
`;

const Select = styled.select`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.ui.background};
  border: 3px solid ${theme.colors.ui.border};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.ui.text};
  width: 100%;
  cursor: pointer;
  
  &:focus {
    border-color: ${theme.colors.secondary.diamond};
    outline: none;
  }
  
  option {
    background: ${theme.colors.ui.background};
    color: ${theme.colors.ui.text};
    padding: ${theme.spacing.sm};
  }
`;

const SliderContainer = styled.div`
  margin: ${theme.spacing.sm} 0;
`;

const Slider = styled.input`
  width: 100%;
  height: 8px;
  background: ${theme.colors.ui.background};
  border-radius: 4px;
  outline: none;
  border: 2px solid ${theme.colors.ui.border};
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background: ${theme.colors.secondary.diamond};
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid ${theme.colors.ui.text};
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: ${theme.colors.secondary.diamond};
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid ${theme.colors.ui.text};
  }
`;

const SliderValue = styled.div`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.secondary.gold};
  text-align: center;
  margin-top: ${theme.spacing.xs};
`;

const ButtonGroup = styled(FlexContainer)`
  margin-top: ${theme.spacing.lg};
  justify-content: center;
  gap: ${theme.spacing.md};
`;

const PreviewText = styled.div<{ fontSize: FontSize }>`
  font-family: 'Press Start 2P', ${theme.fonts.mono};
  padding: ${theme.spacing.md};
  background: ${theme.colors.ui.background};
  border: 2px solid ${theme.colors.ui.border};
  border-radius: ${theme.borderRadius.sm};
  margin-top: ${theme.spacing.sm};
  
  font-size: ${({ fontSize }) => {
    switch (fontSize) {
      case 'small': return theme.fontSizes.sm;
      case 'medium': return theme.fontSizes.md;
      case 'large': return theme.fontSizes.lg;
      case 'extra-large': return theme.fontSizes.xl;
      default: return theme.fontSizes.md;
    }
  }};
`;

export const Settings: React.FC<SettingsProps> = ({
  settings,
  onSettingsChange,
  onClose,
}) => {
  const [localSettings, setLocalSettings] = useState<UserSettings>(settings);

  const handleSettingChange = <K extends keyof UserSettings>(
    key: K,
    value: UserSettings[K]
  ) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
  };

  const handleSave = () => {
    userSettingsStorage.set(localSettings);
    onSettingsChange(localSettings);
    if (onClose) onClose();
  };

  const handleReset = () => {
    userSettingsStorage.reset();
    const resetSettings = userSettingsStorage.get();
    setLocalSettings(resetSettings);
    onSettingsChange(resetSettings);
  };

  return (
    <SettingsContainer>
      <Subtitle>⚙️ Settings</Subtitle>

      <SettingsSection>
        <SectionTitle>
          <Type />
          Display Settings
        </SectionTitle>

        <SettingItem>
          <SettingLabel>Font Size</SettingLabel>
          <SettingDescription>
            Adjust the size of text in typing lessons
          </SettingDescription>
          <SelectContainer>
            <Select
              value={localSettings.fontSize}
              onChange={(e) => handleSettingChange('fontSize', e.target.value as FontSize)}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="extra-large">Extra Large</option>
            </Select>
          </SelectContainer>
          <PreviewText fontSize={localSettings.fontSize}>
            The quick brown fox jumps over the lazy dog
          </PreviewText>
        </SettingItem>

        <SettingItem>
          <SettingLabel>Theme</SettingLabel>
          <SettingDescription>
            Choose your preferred visual theme
          </SettingDescription>
          <SelectContainer>
            <Select
              value={localSettings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value as ThemeVariant)}
            >
              <option value="default">Default</option>
              <option value="dark">Dark Mode</option>
              <option value="overworld">Overworld</option>
              <option value="nether">Nether</option>
              <option value="end">The End</option>
            </Select>
          </SelectContainer>
        </SettingItem>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>
          <Volume2 />
          Audio Settings
        </SectionTitle>

        <SettingItem>
          <FlexContainer justify="space-between" align="center">
            <div>
              <SettingLabel>Sound Effects</SettingLabel>
              <SettingDescription>
                Enable typing sounds and feedback
              </SettingDescription>
            </div>
            <ToggleSwitch
              enabled={localSettings.soundEnabled}
              onClick={() => handleSettingChange('soundEnabled', !localSettings.soundEnabled)}
            />
          </FlexContainer>
        </SettingItem>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>
          <Eye />
          Typing Assistance
        </SectionTitle>

        <SettingItem>
          <FlexContainer justify="space-between" align="center">
            <div>
              <SettingLabel>Show Virtual Keyboard</SettingLabel>
              <SettingDescription>
                Display on-screen keyboard for reference
              </SettingDescription>
            </div>
            <ToggleSwitch
              enabled={localSettings.showKeyboard}
              onClick={() => handleSettingChange('showKeyboard', !localSettings.showKeyboard)}
            />
          </FlexContainer>
        </SettingItem>

        <SettingItem>
          <FlexContainer justify="space-between" align="center">
            <div>
              <SettingLabel>Highlight Errors</SettingLabel>
              <SettingDescription>
                Show incorrect characters with red highlighting
              </SettingDescription>
            </div>
            <ToggleSwitch
              enabled={localSettings.highlightErrors}
              onClick={() => handleSettingChange('highlightErrors', !localSettings.highlightErrors)}
            />
          </FlexContainer>
        </SettingItem>

        <SettingItem>
          <FlexContainer justify="space-between" align="center">
            <div>
              <SettingLabel>Auto Advance</SettingLabel>
              <SettingDescription>
                Automatically move to next lesson when completed
              </SettingDescription>
            </div>
            <ToggleSwitch
              enabled={localSettings.autoAdvance}
              onClick={() => handleSettingChange('autoAdvance', !localSettings.autoAdvance)}
            />
          </FlexContainer>
        </SettingItem>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>
          <Target />
          Goals
        </SectionTitle>

        <SettingItem>
          <SettingLabel>Target WPM</SettingLabel>
          <SettingDescription>
            Set your words per minute goal
          </SettingDescription>
          <SliderContainer>
            <Slider
              type="range"
              min="10"
              max="120"
              value={localSettings.targetWpm}
              onChange={(e) => handleSettingChange('targetWpm', parseInt(e.target.value))}
            />
            <SliderValue>{localSettings.targetWpm} WPM</SliderValue>
          </SliderContainer>
        </SettingItem>

        <SettingItem>
          <SettingLabel>Target Accuracy</SettingLabel>
          <SettingDescription>
            Set your accuracy percentage goal
          </SettingDescription>
          <SliderContainer>
            <Slider
              type="range"
              min="70"
              max="100"
              value={localSettings.targetAccuracy}
              onChange={(e) => handleSettingChange('targetAccuracy', parseInt(e.target.value))}
            />
            <SliderValue>{localSettings.targetAccuracy}%</SliderValue>
          </SliderContainer>
        </SettingItem>
      </SettingsSection>

      <ButtonGroup>
        <Button variant="success" onClick={handleSave}>
          Save Settings
        </Button>
        <Button variant="warning" onClick={handleReset}>
          Reset to Default
        </Button>
        {onClose && (
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        )}
      </ButtonGroup>
    </SettingsContainer>
  );
};
