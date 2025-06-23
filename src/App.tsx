import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { Container, Title } from './styles/StyledComponents';
import { Navigation } from './components/Navigation';
import { TypingArea } from './components/TypingArea';
import { StatsDisplay } from './components/StatsDisplay';
import { Settings } from './components/Settings';
import { AchievementsDisplay } from './components/AchievementsDisplay';
import { LessonsPage } from './pages/LessonsPage';
import { StatsPage } from './pages/StatsPage';
import { useLessons } from './hooks/useLessons';
import { userSettingsStorage, sessionsStorage } from './utils/storage';
import { checkAchievements } from './data/achievements';
import styled from 'styled-components';
import type { TypingStats } from './utils/typingUtils';
import type { TypingSession, Lesson, UserSettings } from './types/index';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: ${theme.spacing.lg} 0;
`;

// Removed unused styled components

const LessonView = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: linear-gradient(135deg, ${theme.colors.primary.stone} 0%, ${theme.colors.primary.cobblestone} 100%);
  border: 3px solid ${theme.colors.primary.cobblestone};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.ui.text};
  cursor: pointer;
  margin-bottom: ${theme.spacing.lg};
  transition: ${theme.transitions.fast};

  &:hover {
    background: linear-gradient(135deg, ${theme.colors.primary.cobblestone} 0%, ${theme.colors.primary.stone} 100%);
    transform: translateY(-2px);
  }
`;

function App() {
  const {
    currentLesson,
    userProgress,
    setCurrentLesson,
    completeLesson,
  } = useLessons();

  const [currentStats, setCurrentStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 100,
    correctChars: 0,
    incorrectChars: 0,
    totalChars: 0,
    timeElapsed: 0,
  });

  const [userSettings, setUserSettings] = useState<UserSettings>(() => userSettingsStorage.get());

  const handleLessonSelect = (lesson: Lesson) => {
    setCurrentLesson(lesson);
  };

  const handleLessonComplete = (stats: TypingStats) => {
    if (!currentLesson) return;

    // Create session record
    const session: TypingSession = {
      id: Date.now().toString(),
      lessonId: currentLesson.id,
      startTime: new Date(Date.now() - stats.timeElapsed * 1000),
      endTime: new Date(),
      stats,
      completed: true,
      text: Array.isArray(currentLesson.content.data)
        ? currentLesson.content.data.join(' ')
        : currentLesson.content.data,
      userInput: '', // This would be tracked in a real implementation
    };

    // Save session
    sessionsStorage.add(session);

    // Use the lesson management hook to complete the lesson
    const success = completeLesson(currentLesson.id, stats);

    // Check for new achievements
    if (success) {
      checkAchievements(userProgress);
      // In a real app, you'd show achievement notifications here
    }
  };

  const handleStatsUpdate = (stats: TypingStats) => {
    setCurrentStats(stats);
  };

  const handleBackToLessons = () => {
    setCurrentLesson(null);
    setCurrentStats({
      wpm: 0,
      accuracy: 100,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
      timeElapsed: 0,
    });
  };

  const handleSettingsChange = (newSettings: UserSettings) => {
    setUserSettings(newSettings);
  };

  const getLessonText = (lesson: Lesson): string => {
    if (Array.isArray(lesson.content.data)) {
      return lesson.content.data.join(' ');
    }
    return lesson.content.data;
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AppContainer>
          <Navigation
            userLevel={userProgress.level}
            userExperience={userProgress.experience}
          />

          <Routes>
            <Route
              path="/"
              element={
                currentLesson ? (
                  <Container>
                    <LessonView>
                      <BackButton onClick={handleBackToLessons}>
                        ← Back to Lessons
                      </BackButton>

                      <Title size="md">{currentLesson.title}</Title>
                      <p style={{
                        fontFamily: 'Press Start 2P',
                        fontSize: theme.fontSizes.xs,
                        color: theme.colors.ui.textSecondary,
                        textAlign: 'center',
                        marginBottom: theme.spacing.lg,
                        lineHeight: 1.6
                      }}>
                        {currentLesson.description}
                        <br />
                        {currentLesson.content.instructions}
                      </p>

                      <StatsDisplay
                        stats={currentStats}
                        variant="detailed"
                        realTime={true}
                        showDetailed={false}
                      />

                      <TypingArea
                        text={getLessonText(currentLesson)}
                        onComplete={handleLessonComplete}
                        onProgress={handleStatsUpdate}
                        minWpm={currentLesson.minWpmToPass}
                        minAccuracy={currentLesson.minAccuracyToPass}
                        autoFocus={true}
                      />
                    </LessonView>
                  </Container>
                ) : (
                  <LessonsPage onLessonSelect={handleLessonSelect} />
                )
              }
            />
            <Route path="/practice" element={<LessonsPage onLessonSelect={handleLessonSelect} />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route
              path="/achievements"
              element={
                <Container style={{ padding: theme.spacing.lg }}>
                  <AchievementsDisplay
                    unlockedAchievements={userProgress.achievements}
                    showAll={true}
                  />
                </Container>
              }
            />
            <Route
              path="/settings"
              element={
                <Container style={{ padding: theme.spacing.lg }}>
                  <Settings
                    settings={userSettings}
                    onSettingsChange={handleSettingsChange}
                  />
                </Container>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
