import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { GameEngine } from 'react-native-game-engine';
import { useLocalSearchParams } from "expo-router";
import * as ScreenOrientation from 'expo-screen-orientation';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import MainButton from '@/components/MainButton';
import NewHighScoreBanner from '@/components/NewHighScoreBanner';

import { getProfile } from '@/services/profile';
import { checkTokens } from '@/utils/checkTokens';
import { deleteTokens } from '@/utils/tokenStorage';

import { useLeaderboard } from '@/components/LeaderboardContext';

import entities from '@/games/flappyBird/entities';
import Physics from '@/games/flappyBird/physics';

import { GAME_FLAPPY_BIRD } from '@/services/game';

export default function App() {
  const [username, setUsername] = useState('');
  const { game, communityId } = useLocalSearchParams();
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [highestPoints, setHighestPoints] = useState(0);
  const [showHighScoreBanner, setShowHighScoreBanner] = useState(false);
  const { leaderboards, updateScore, fetchLeaderboard } = useLeaderboard();

  useEffect(() => {
    // Lock to portrait when this screen mounts
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    leaderboardUpdate();
    setRunning(false);
    return () => {
      // Optional: unlock when leaving screen
      ScreenOrientation.unlockAsync();
      // Or reset to default, e.g. allow all:
      // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    };
  }, []);

  useEffect(() => {
    if (!username || !leaderboards[GAME_FLAPPY_BIRD]) return;
    // Prefer currentUser if available, else check topPlayers
    if (leaderboards[GAME_FLAPPY_BIRD].currentUser) {
      setHighestPoints(leaderboards[GAME_FLAPPY_BIRD].currentUser.score);
    } else if (leaderboards[GAME_FLAPPY_BIRD].topPlayers) {
      const userInTop = leaderboards[GAME_FLAPPY_BIRD].topPlayers.find(p => p.username === username);
      if (userInTop) {
        setHighestPoints(userInTop.score);
      }
    }
  }, [leaderboards[GAME_FLAPPY_BIRD], username]);

  async function leaderboardUpdate() {
    const username = await fetchUsername();

    if (username && communityId && game) {
      await fetchLeaderboard(game as string, communityId as string, username as string);
    }
  }

  async function fetchUsername() {
    const tokenFlag = await checkTokens();
    if (tokenFlag) {
      const profileData = await getProfile();
      setUsername(profileData.username);
      console.log('Profile data fetched:', profileData);
      return profileData.username;
    } else {
      deleteTokens();
      router.replace('/login');
      return null;
    }
  }

  return (
    <ThemedView style={styles.container}>

      {/* In-game points display */}
      <ThemedText style={styles.inGameScore}>{currentPoints}</ThemedText>

      <GameEngine
        ref={(ref) => setGameEngine(ref)}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case 'game_over':
              setRunning(false);
              gameEngine.stop();
              setShowHighScoreBanner(false);
              if (currentPoints > highestPoints) {
                setHighestPoints(currentPoints);
                // check tokens ------------------------------------------
                updateScore(game, communityId, username, currentPoints);
                setShowHighScoreBanner(true);
              }
              break;
            case 'new_point':
              setCurrentPoints((prev) => prev + 1);
              break;
          }
        }}
        style={styles.gameEngine}
      >
        <StatusBar style="auto" hidden />
      </GameEngine>

      {/* Not running UI */}
      {!running && (
        <ThemedView style={styles.overlay}>
          <NewHighScoreBanner
            newScore={currentPoints}
            visible={showHighScoreBanner}
          />

          {/* Scores row */}
          <ThemedView style={styles.scoreRow}>
            <ThemedView style={styles.scoreBox}>
              <ThemedText style={styles.scoreLabel}>SCORE</ThemedText>
              <ThemedText style={styles.currentScore}>{currentPoints}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.scoreBox}>
              <ThemedText style={styles.scoreLabel}>HIGHEST SCORE</ThemedText>
              <ThemedText style={styles.highestScore}>{highestPoints}</ThemedText>
            </ThemedView>
          </ThemedView>

          {/* Buttons */}
          <ThemedView style={styles.buttonGroup}>
            <MainButton
              title="START GAME"
              onPress={() => {
                setCurrentPoints(0);
                setRunning(true);
                gameEngine.swap(entities());
              }}
            />
            <MainButton
              title="EXIT"
              onPress={() => router.back()}
            />
          </ThemedView>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inGameScore: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    padding: 20,
  },
  gameEngine: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  scoreBox: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    minWidth: 120,
  },
  scoreLabel: {
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.8,
    marginBottom: 6,
  },
  currentScore: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  highestScore: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  buttonGroup: {
    width: '100%',
    gap: 16,
    paddingHorizontal: 30,
  },
});
