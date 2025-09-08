import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { PanResponder, Platform } from 'react-native';
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

import entities from '@/games/snake/entities';
import Physics from '@/games/snake/physics';

import { GAME_SNAKE } from '@/services/game';


export default function App() {
  const [username, setUsername] = useState('');
  const { game, communityId } = useLocalSearchParams();
  const [running, setRunning] = useState(false);
  const gameEngineRef = useRef<GameEngine | null>(null);
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
    if (!username || !leaderboards[GAME_SNAKE]) return;
    // Prefer currentUser if available, else check topPlayers
    if (leaderboards[GAME_SNAKE].currentUser) {
      setHighestPoints(leaderboards[GAME_SNAKE].currentUser.score);
    } else if (leaderboards[GAME_SNAKE].topPlayers) {
      const userInTop = leaderboards[GAME_SNAKE].topPlayers.find(p => p.username === username);
      if (userInTop) {
        setHighestPoints(userInTop.score);
      }
    }
  }, [leaderboards[GAME_SNAKE], username]);

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

// Store direction in a ref to avoid stale closures
  const directionRef = useRef('RIGHT');

  // Handle swipe gestures (mobile)
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10,
      onPanResponderRelease: (_, gestureState) => {
        const { dx, dy } = gestureState;
        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx > 0) changeDirection('RIGHT');
          else changeDirection('LEFT');
        } else {
          if (dy > 0) changeDirection('DOWN');
          else changeDirection('UP');
        }
      },
    })
  ).current;

  // Handle arrow keys (web/desktop)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault(); // stop scrolling
      }
      switch (e.key) {
        case 'ArrowUp':
          changeDirection('UP'); console.log('ArrowUp pressed');
          break;
        case 'ArrowDown':
          changeDirection('DOWN');
          break;
        case 'ArrowLeft':
          changeDirection('LEFT');
          break;
        case 'ArrowRight':
          changeDirection('RIGHT');
          break;
      }
    }
    if (Platform.OS === 'web') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  // Change direction logic (prevent reverse)
  function changeDirection(newDir: string) {
    const opposite = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT',
    };
    if (directionRef.current !== opposite[newDir]) {
      directionRef.current = newDir;
      console.log('Direction ref updated to:', newDir);
      if (gameEngineRef.current) {
        gameEngineRef.current.dispatch({ type: 'change_direction', direction: newDir });
      }
    }
  }

  return (
    <ThemedView style={styles.container} {...(Platform.OS !== 'web' ? panResponder.panHandlers : {})} >
      <ThemedText style={styles.inGameScore}>{currentPoints}</ThemedText>
      <ThemedView style={styles.gameWrapper}>
        <GameEngine
          ref={(ref) => (gameEngineRef.current = ref)}
          systems={[Physics]}
          entities={entities()}
          running={running}
          onEvent={(e) => {
            switch (e.type) {
              case 'game_over':
                setRunning(false);
                gameEngineRef.current?.stop(); 
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
      </ThemedView>
      {!running && (
        <ThemedView style={styles.overlay}>
          <NewHighScoreBanner
            newScore={currentPoints}
            visible={showHighScoreBanner}
          />
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
          <ThemedView style={styles.buttonGroup}>
            <MainButton
              title="START GAME"
              onPress={() => {
                setCurrentPoints(0);
                setRunning(true);
                gameEngineRef.current?.swap(entities());
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
    justifyContent: "center",  // vertically center children
    alignItems: "center",      // horizontally center children
  },
  inGameScore: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    padding: 20,
  },
  gameWrapper: {
    width: 400,
    height: 400,
    overflow: "hidden",       // clip anything outside
    borderRadius: 12,
    backgroundColor: "pink",
  },
  gameEngine: {
    flex: 1,                  // fill wrapper
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  scoreBox: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    minWidth: 120,
  },
  scoreLabel: {
    fontSize: 16,
    fontWeight: "600",
    opacity: 0.8,
    marginBottom: 6,
  },
  currentScore: {
    fontSize: 32,
    fontWeight: "bold",
  },
  highestScore: {
    fontSize: 32,
    fontWeight: "bold",
  },
  buttonGroup: {
    width: "100%",
    gap: 16,
    paddingHorizontal: 30,
  },
});

