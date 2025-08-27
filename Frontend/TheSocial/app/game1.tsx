import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';

import GameLogo from '@/components/GameLogo';
import GameInfoCard from '@/components/GameInfoCard';
import Leaderboard from '@/components/Leaderboard';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

import { useModal } from '@/components/ModalContext';

const GameScreen: React.FC = () => {
  const { closeModal } = useModal();
  const accentColor = useThemeColor({}, 'accent');
  
  const leaderboardData = [
    { rank: 1, username: 'GalacticGamer', score: '3K' },
    { rank: 2, username: 'NovaNebula', score: '2.1K' },
    { rank: 3, username: 'StellarPilot', score: '2K' },
    { rank: 99, username: 'You', score: '0.9K', isCurrentUser: true },
  ];
  
  const handlePlayPress = () => {
    console.log('Play button pressed');

    closeModal();
    router.push('/flappyBird');
    // Add your game launch logic here
  };
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView backgroundType='background'>
        {/* Banner */}
        <View style={[styles.banner, { backgroundColor: accentColor }]}>
            <View style={styles.bannerContent}>
            <GameLogo size="medium" />
            </View>
        </View>
        
        {/* Game Info Card */}
        <ThemedView style={styles.cardContainer} backgroundType='background'>
            <GameInfoCard
            title="Cosmic Conquest"
            description="Embark on an epic journey across galaxies, build your empire, and conquer new worlds in this thrilling space strategy game."
            playtime="731 min"
            onPlayPress={handlePlayPress}
            playButtonText="Play"
            disabled={false}
            />
        </ThemedView>
        
        {/* Leaderboard */}
        <Leaderboard
            title="Leaderboard"
            data={leaderboardData}
            maxEntries={10}
        />
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

export default GameScreen;
