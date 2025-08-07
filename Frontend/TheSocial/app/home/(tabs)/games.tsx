import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LeaderboardCard } from '@/components/LeaderboardCard';
import { GameCard } from '@/components/GameCard';
import { GameListItem } from '@/components/GameListItem';
import { useModal } from '@/components/ModalContext';
import { useScrollHandler } from '@/hooks/useScrollHandler';

export default function GamesScreen() {
  const { openModal } = useModal();
  const { onScroll } = useScrollHandler();
  
  // Mock data for the leaderboard
  const leaderboardPlayers = [
    { name: 'Player Name 1', rank: '1st' },
    { name: 'Player Name 2', rank: '2nd' },
    { name: 'Player Name 3', rank: '3rd' },
    { name: 'You', rank: '80th', isCurrentUser: true },
  ];

  // Mock data for currently playing games
  const playingGames = [
    { title: 'Game Alpha', subtitle: '8 inside', icon: '🎮' },
    { title: 'Game Beta', subtitle: '2 inside', icon: '🎲' },
  ];

  // Mock data for recent games
  const recentGames = [
    { title: 'Game Gamma', subtitle: '30min ago', icon: '🎯' },
    { title: 'Game Delta', subtitle: '1hr 31min ago', icon: '🧩' },
  ];

  // Mock data for available games
  const availableGames = [
    {
      title: 'Space Voyager',
      description: 'Explore distant galaxies...',
      icon: '🚀',
    },
    {
      title: 'Epic Quest',
      description: 'Embark on a grand adventure...',
      icon: '⚔️',
    },
    {
      title: 'Firefight Arena',
      description: 'Battle it out in intense combat...',
      icon: '🔥',
    },
  ];

  const handleGamePress = (gameTitle: string) => {
    console.log(`Pressed: ${gameTitle}`);
    // Add navigation logic here
    openModal('game1');
  };

  return (
    <ThemedView style={styles.container} backgroundType="background">
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {/* Leaderboard Section */}
        <View style={styles.section}>
          <ThemedText style={styles.headings} variant="h2" colorType='textPrimary'>LeaderBoard</ThemedText>
          <LeaderboardCard players={leaderboardPlayers} />
        </View>

        {/* Playing Section */}
        <View style={styles.section}>
          <ThemedText style={styles.headings} variant='h3' colorType='textPrimary' >Playing</ThemedText>
          <View style={styles.horizontalCardsContainer}>
            {playingGames.map((game, index) => (
              <View key={index} style={styles.horizontalCard}>
                <GameCard
                  title={game.title}
                  subtitle={game.subtitle}
                  icon={game.icon}
                  onPress={() => handleGamePress(game.title)}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Recent Section */}
        <View style={styles.section}>
          <ThemedText style={styles.headings} variant='h3'colorType='textPrimary'>Recent</ThemedText>
          <View style={styles.horizontalCardsContainer}>
            {recentGames.map((game, index) => (
              <View key={index} style={styles.horizontalCard}>
                <GameCard
                  title={game.title}
                  subtitle={game.subtitle}
                  icon={game.icon}
                  onPress={() => handleGamePress(game.title)}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Games Section */}
        <View style={styles.section}>
          <ThemedText style={styles.headings} variant='h3' colorType='textPrimary'>Games</ThemedText>
          <View style={styles.gamesListContainer}>
            {availableGames.map((game, index) => (
              <GameListItem
                key={index}
                title={game.title}
                description={game.description}
                icon={game.icon}
                onPress={() => handleGamePress(game.title)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingTop: 50,
  },
  scrollContent: {
    padding: 16,
  },
  headings: {
    marginBottom: 10,
  },
  section: {
    marginBottom: 32,
  },
  horizontalCardsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  horizontalCard: {
    flex: 1,
  },
  gamesListContainer: {
    gap: 8,
  },
});
