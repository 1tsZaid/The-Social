import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';

import GameLogo from '@/components/GameLogo';
import GameInfoCard from '@/components/GameInfoCard';
import Leaderboard from '@/components/Leaderboard';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

import { useModal } from '@/components/ModalContext';
import { useLeaderboard } from '@/components/LeaderboardContext';
import { useCommunities } from '@/components/CommunitiesContext';

import { getProfile } from '@/services/profile';
import { GAME_SNAKE,  } from '@/services/game';
import { Colors } from '@/constants/Colors';

const GameInfoScreen: React.FC = () => {
  const { closeModal } = useModal();

  const { leaderboards } = useLeaderboard();
  const { selectedCommunityId } = useCommunities();
  
  const handlePlayPress = () => {
    console.log('Play button pressed');

    closeModal();
    router.push({
      pathname: "/snake",
      params: { game: GAME_SNAKE, communityId: selectedCommunityId },
    })
    // Add your game launch logic here
  };
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView backgroundType='background'>
        {/* Banner */}
        <View style={[styles.banner, { backgroundColor: Colors.games.snake }]}>
            <View style={styles.bannerContent}>
              <GameLogo size="medium" />
            </View>
        </View>
        
        {/* Game Info Card */}
        <ThemedView style={styles.cardContainer} backgroundType='background'>
            <GameInfoCard
            title="Snake"
            description="A classic video game where the player controls a line that grows longer by consuming food items while avoiding collisions with the boundaries of the game area or its own body."
            playtime="1 min"
            onPlayPress={handlePlayPress}
            playButtonText="Play"
            disabled={false}
            />
        </ThemedView>
        
        {/* Leaderboard */}
        {leaderboards[GAME_SNAKE] && <Leaderboard
            title="Leaderboard"
            data={
              (() => {
                const leaderboard = leaderboards[GAME_SNAKE];
                const topPlayers = leaderboard.topPlayers || [];
                const currentUser = leaderboard.currentUser;
                // Check if current user is already in topPlayers
                const isCurrentUserInTop = currentUser
                  ? topPlayers.some((p) => p.username === currentUser.username)
                  : false;
                // Mark current user in topPlayers if present
                const playersWithFlag = topPlayers.map((p) =>
                  currentUser && p.username === currentUser.username
                    ? { ...p, isCurrentUser: true }
                    : p
                );
                // If not in topPlayers, add currentUser at the end
                if (currentUser && !isCurrentUserInTop) {
                  return [...playersWithFlag, { ...currentUser, isCurrentUser: true }];
                }
                return playersWithFlag;
              })()
            }
            maxEntries={10}
            gameBanner={Colors.games.snake}
        />
        }
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    height: 192,
    paddingHorizontal: 24,
    paddingTop: 60,
},
  bannerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  cardContainer: {
    paddingHorizontal: 24,
    marginTop: 30, // Overlap with banner
  },
});

export default GameInfoScreen;
