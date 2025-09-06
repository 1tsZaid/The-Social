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
import { GAME_FLAPPY_BIRD } from '@/services/game';
import { Colors } from '@/constants/Colors';

const GameInfoScreen: React.FC = () => {
  const { closeModal } = useModal();

  const { leaderboard } = useLeaderboard();
  const { selectedCommunityId } = useCommunities();
  
  const handlePlayPress = () => {
    console.log('Play button pressed');

    closeModal();
    router.push({
      pathname: "/flappyBird",
      params: { game: GAME_FLAPPY_BIRD, communityId: selectedCommunityId },
    })
    // Add your game launch logic here
  };
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView backgroundType='background'>
        {/* Banner */}
        <View style={[styles.banner, { backgroundColor: Colors.games.flappyBird }]}>
            <View style={styles.bannerContent}>
              <GameLogo size="medium" />
            </View>
        </View>
        
        {/* Game Info Card */}
        <ThemedView style={styles.cardContainer} backgroundType='background'>
            <GameInfoCard
            title="Flappy Bird"
            description="One-tap arcade game where the player controls a bird to fly through gaps in green pipes, scoring a point for each successful passage."
            playtime="20 sec"
            onPlayPress={handlePlayPress}
            playButtonText="Play"
            disabled={false}
            />
        </ThemedView>
        
        {/* Leaderboard */}
        {leaderboard && <Leaderboard
            title="Leaderboard"
            data={
              (() => {
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
            gameBanner={Colors.games.flappyBird}
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
