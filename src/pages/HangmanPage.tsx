import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Container, Title, Button, FlexContainer } from '../styles/StyledComponents';
import { HangmanGallows } from '../components/HangmanGallows';
import { WordDisplay } from '../components/WordDisplay';
import { LetterGrid } from '../components/LetterGrid';
import { useHangman } from '../hooks/useHangman';
import { hangmanSessionsStorage, hangmanStatsStorage, userProgressStorage } from '../utils/storage';
import { checkHangmanAchievements } from '../utils/hangmanAchievements';
import type { HangmanSession, DifficultyLevel, HangmanCategory } from '../types/index';

const PageContainer = styled.div`
  padding: ${theme.spacing.lg} 0;
  min-height: calc(100vh - 80px);
`;

const GameContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
`;

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const GameInfo = styled.div`
  background: linear-gradient(135deg, ${theme.colors.ui.surface} 0%, ${theme.colors.ui.surfaceLight} 100%);
  border: 3px solid ${theme.colors.ui.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
`;

const ScoreDisplay = styled.div`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.secondary.gold};
  text-align: center;
  margin-bottom: ${theme.spacing.md};
  text-shadow: 1px 1px 0px ${theme.colors.ui.background};
`;

const GameStatus = styled.div<{ status: 'won' | 'lost' | 'playing' | 'paused' }>`
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.lg};
  text-align: center;
  margin: ${theme.spacing.lg} 0;
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  text-shadow: 2px 2px 0px ${theme.colors.ui.background};
  
  ${({ status }) => {
    switch (status) {
      case 'won':
        return `
          background: ${theme.colors.ui.success};
          color: ${theme.colors.ui.text};
          border: 3px solid ${theme.colors.primary.grass};
        `;
      case 'lost':
        return `
          background: ${theme.colors.ui.error};
          color: ${theme.colors.ui.text};
          border: 3px solid ${theme.colors.secondary.redstone};
        `;
      case 'paused':
        return `
          background: ${theme.colors.secondary.gold};
          color: ${theme.colors.ui.background};
          border: 3px solid ${theme.colors.secondary.iron};
        `;
      default:
        return `
          background: transparent;
          color: ${theme.colors.ui.textSecondary};
          border: none;
        `;
    }
  }}
`;

const ControlsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  justify-content: center;
  margin-bottom: ${theme.spacing.lg};
`;

const FilterButton = styled(Button)<{ active: boolean }>`
  font-size: ${theme.fontSizes.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  
  ${({ active }) => active && `
    background: ${theme.colors.secondary.diamond};
    border-color: ${theme.colors.secondary.lapis};
  `}
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.sm};
  font-family: 'Press Start 2P', ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.ui.textSecondary};
`;

export const HangmanPage: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<HangmanCategory | undefined>();

  const handleGameComplete = useCallback((session: HangmanSession) => {
    // Save session to storage
    hangmanSessionsStorage.add(session);

    // Update hangman statistics
    const updatedStats = hangmanStatsStorage.update(session);

    // Check for new achievements
    const userProgress = userProgressStorage.get();
    const newAchievements = checkHangmanAchievements(session, updatedStats, userProgress.achievements);

    if (newAchievements.length > 0) {
      const updatedProgress = {
        ...userProgress,
        achievements: [...userProgress.achievements, ...newAchievements],
      };
      userProgressStorage.set(updatedProgress);

      // Show achievement notifications (could be enhanced with a toast system)
      newAchievements.forEach(achievement => {
        console.log(`🏆 Achievement Unlocked: ${achievement.title} - ${achievement.description}`);
      });
    }

    console.log('Game completed:', session);
  }, []);

  const {
    gameState,
    startNewGame,
    guessLetter,
    useHint,
    resetGame,
    getDisplayWord,
    isGameOver,
    calculateScore,
  } = useHangman(handleGameComplete);

  const handleNewGame = () => {
    startNewGame(selectedDifficulty, selectedCategory);
  };

  const handleLetterClick = (letter: string) => {
    guessLetter(letter);
  };

  const getGameStatusMessage = () => {
    if (gameState.gameStatus === 'won') {
      return '🎉 You Won! 🎉';
    } else if (gameState.gameStatus === 'lost') {
      return '💀 Game Over 💀';
    }
    return 'Guess the Minecraft word!';
  };

  const difficulties: DifficultyLevel[] = ['beginner', 'intermediate', 'advanced'];
  const categories: HangmanCategory[] = ['blocks', 'items', 'mobs', 'biomes', 'crafting', 'commands', 'phrases', 'technical'];

  return (
    <PageContainer>
      <Container>
        <Title size="xl">🎮 Minecraft Hangman 🎮</Title>
        
        <FilterSection>
          <div>
            <span style={{ 
              fontFamily: 'Press Start 2P', 
              fontSize: theme.fontSizes.xs, 
              color: theme.colors.ui.textSecondary,
              marginRight: theme.spacing.sm 
            }}>
              Difficulty:
            </span>
            {difficulties.map(difficulty => (
              <FilterButton
                key={difficulty}
                active={selectedDifficulty === difficulty}
                onClick={() => setSelectedDifficulty(
                  selectedDifficulty === difficulty ? undefined : difficulty
                )}
                variant="secondary"
              >
                {difficulty}
              </FilterButton>
            ))}
          </div>
        </FilterSection>

        <FilterSection>
          <div>
            <span style={{ 
              fontFamily: 'Press Start 2P', 
              fontSize: theme.fontSizes.xs, 
              color: theme.colors.ui.textSecondary,
              marginRight: theme.spacing.sm 
            }}>
              Category:
            </span>
            {categories.map(category => (
              <FilterButton
                key={category}
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(
                  selectedCategory === category ? undefined : category
                )}
                variant="secondary"
              >
                {category}
              </FilterButton>
            ))}
          </div>
        </FilterSection>

        <GameContainer>
          <ControlsSection>
            <FlexContainer justify="center" gap={theme.spacing.md}>
              <Button onClick={handleNewGame} variant="primary">
                New Game
              </Button>
              {gameState.currentWord && gameState.gameStatus === 'playing' && (
                <>
                  <Button onClick={useHint} variant="secondary">
                    Use Hint ({gameState.hintsUsed} used)
                  </Button>
                  <Button onClick={resetGame} variant="danger">
                    Reset
                  </Button>
                </>
              )}
            </FlexContainer>
          </ControlsSection>

          {gameState.currentWord && (
            <>
              <ScoreDisplay>
                Score: {calculateScore()}
              </ScoreDisplay>

              <GameStatus status={gameState.gameStatus}>
                {getGameStatusMessage()}
              </GameStatus>

              <WordDisplay
                word={gameState.currentWord.word}
                displayWord={getDisplayWord()}
                hint={gameState.currentWord.hint}
                category={gameState.currentWord.category}
                difficulty={gameState.currentWord.difficulty}
                guessedLetters={gameState.guessedLetters}
              />

              <GameBoard>
                <HangmanGallows
                  incorrectGuesses={gameState.incorrectGuesses}
                  maxGuesses={gameState.maxIncorrectGuesses}
                />
                
                <GameInfo>
                  <StatsRow>
                    <span>Incorrect Guesses:</span>
                    <span>{gameState.incorrectGuesses}/{gameState.maxIncorrectGuesses}</span>
                  </StatsRow>
                  <StatsRow>
                    <span>Hints Used:</span>
                    <span>{gameState.hintsUsed}</span>
                  </StatsRow>
                  <StatsRow>
                    <span>Letters Guessed:</span>
                    <span>{gameState.guessedLetters.length}</span>
                  </StatsRow>
                </GameInfo>
              </GameBoard>

              <LetterGrid
                guessedLetters={gameState.guessedLetters}
                currentWord={gameState.currentWord.word}
                onLetterClick={handleLetterClick}
                disabled={isGameOver()}
              />
            </>
          )}

          {!gameState.currentWord && (
            <div style={{
              textAlign: 'center',
              padding: theme.spacing['2xl'],
              color: theme.colors.ui.textSecondary,
              fontFamily: 'Press Start 2P',
              fontSize: theme.fontSizes.md,
              lineHeight: 1.8,
            }}>
              Click "New Game" to start guessing Minecraft words!
              <br />
              Choose difficulty and category filters above for a customized challenge.
            </div>
          )}
        </GameContainer>
      </Container>
    </PageContainer>
  );
};
