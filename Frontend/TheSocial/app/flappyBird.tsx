import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { GameEngine } from 'react-native-game-engine';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import MainButton from '@/components/MainButton';

import entities from '@/games/flappyBird/entities';
import Physics from '@/games/flappyBird/physics';

export default function App() {
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentPoints, setCurrentPoints] = useState(0)
  useEffect(() => {
    setRunning(false)
  }, [])
  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedText style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', padding: 20 }}>{currentPoints}</ThemedText>
      <GameEngine
        ref={(ref) => { setGameEngine(ref) }}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case 'game_over':
              setRunning(false)
              gameEngine.stop()
              break;
            case 'new_point':
              setCurrentPoints(currentPoints + 1)
              break;
          }
        }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <StatusBar style="auto" hidden={true} />

      </GameEngine>

      {!running ?
        <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', width: '100%', height: '100%', gap: 20 }}>
          <MainButton title={"START GAME"} onPress={() => {
            setCurrentPoints(0)
            setRunning(true)
            gameEngine.swap(entities())
          }}>
          </MainButton>
          <MainButton title={"EXIT"} onPress={() => {
            router.back();
          }}>
          </MainButton>

        </ThemedView> : null}
    </ThemedView>
  );
}