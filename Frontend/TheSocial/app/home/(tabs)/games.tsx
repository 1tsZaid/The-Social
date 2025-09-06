import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Video, ResizeMode } from "expo-av";
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LeaderboardCard } from '@/components/LeaderboardCard';
import { GameCard } from '@/components/GameCard';
import { GameListItem } from '@/components/GameListItem';

import { useLeaderboard } from '@/components/LeaderboardContext';
import { useCommunities } from '@/components/CommunitiesContext';
import { useModal } from '@/components/ModalContext';

import { useScrollHandler } from '@/hooks/useScrollHandler';
import { useColorScheme } from '@/hooks/useColorScheme';
import { deleteTokens } from '@/utils/tokenStorage';
import { getProfile } from '@/services/profile';

import { checkTokens } from '@/utils/checkTokens';

import { GAME_FLAPPY_BIRD, GAME_SNAKE } from '@/services/game';
import { Colors } from '@/constants/Colors';

export default function GamesScreen() {
  const [username, setUsername] = useState<string | null>(null);
  const [currentLeaderboardGame, setCurrentLeaderboardGame] = useState<'Flappy Bird' | 'Snake'>('Flappy Bird');

  const { selectedCommunityId } = useCommunities();
  const { openModal } = useModal();
  const { onScroll } = useScrollHandler();

  const theme = useColorScheme() ?? 'light';

  // Mock data for currently playing games
  // const playingGames = [
  //   { title: 'Game Alpha', subtitle: '8 inside', icon: '🎮' },
  //   { title: 'Game Beta', subtitle: '2 inside', icon: '🎲' },
  // ];

  // Mock data for recent games
  const featuredGames = [
    { title: 'Flappy Bird', subtitle: '20sec avg', icon: '🚀' },
    { title: 'Snake', subtitle: '1min avg', icon: '⚔️' },
  ];

  // Mock data for recent games
  // const recentGames = [
  //   { title: 'Flappy Bird', subtitle: '20sec avg', icon: '🚀' },
  //   { title: 'Epic Quest', subtitle: '40sec avg', icon: '🧩' },
  // ];

  // Mock data for available games
  const availableGames = [
    {
      title: 'Flappy Bird',
      description: 'One-tap arcade game where the player controls a bird to fly through gaps in green pipes, scoring a point for each successful passage',
      subtitle: '20sec avg',
      banner: Colors.games.flappyBird,
      icon: '🚀',
    },
    {
      title: 'Snake',
      description: 'A classic video game where the player controls a line that grows longer by consuming food items while avoiding collisions with the boundaries of the game area or its own body',
      subtitle: '1min avg',
      banner: Colors.games.snake,
      icon: '⚔️',
    },
  ];

  const { leaderboards, fetchLeaderboard } = useLeaderboard();

  // Add a state to store the leaderboard for each game
  const [leaderboard, setLeaderboard] = useState<any>(null);

  // Switch leaderboard game every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLeaderboardGame(prev =>
        prev === 'Flappy Bird' ? 'Snake' : 'Flappy Bird'
      );
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Fetch leaderboard when selectedCommunityId, username, or currentLeaderboardGame changes
  useEffect(() => {
    fetchLeaderboardData();
  }, [selectedCommunityId, username, currentLeaderboardGame]);

  useEffect(() => {
    const gameKey =
      currentLeaderboardGame === 'Flappy Bird'
        ? GAME_FLAPPY_BIRD
        : GAME_SNAKE;
    setLeaderboard(leaderboards[gameKey]);
  }, [leaderboards, currentLeaderboardGame]);

  const fetchLeaderboardData = async () => {
    if (selectedCommunityId) {
      if (!username) {
        await fetchUsername();
      }
      if (username) {
        const gameKey =
          currentLeaderboardGame === 'Flappy Bird'
            ? GAME_FLAPPY_BIRD
            : GAME_SNAKE;
        await fetchLeaderboard(gameKey, selectedCommunityId, username, 3);
      }
    }
  };

  const fetchUsername = async () => {
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
  };

  const handleGamePress = (gameTitle: string) => {
    console.log(`Pressed: ${gameTitle}`);
    // Add navigation logic here
    openModal('flappyBirdInfo');
  };

  if (!selectedCommunityId) {  
    const videoSource =
      theme === "dark"
      ? require("@/assets/videos/home.dark.mp4")
      : require("@/assets/videos/home.light.mp4");

    return (
      <ThemedView style={styles.containerNull} backgroundType="background">
        <ThemedView style={styles.videoWrapper}>
          <Video
            source={videoSource}
            style={styles.video}
            videoStyle={{ width: 300, height: 300 }}
            resizeMode={ResizeMode.STRETCH}   // keeps full video visible
            shouldPlay
            isLooping
            isMuted
          />
        </ThemedView>
        <ThemedText style={{ padding: 20, textAlign: 'center' }}>Please select a community to view games.</ThemedText>
      </ThemedView>
    );
  }

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
          <ThemedText style={styles.headings} variant="h2" colorType='textPrimary'>LeaderBoard - {currentLeaderboardGame}</ThemedText>
          {leaderboard && (
            <LeaderboardCard
              players={[
                ...leaderboard.topPlayers
                  .filter(p => !leaderboard.currentUser || p.username !== leaderboard.currentUser.username)
                  .map((p) => ({
                    name: p.username,
                    rank: p.rank,
                    userImage: p.userImage,
                    userBanner: p.userBanner,
                    isCurrentUser: username === p.username,
                  })),
                ...(leaderboard.currentUser ? [{
                  name: leaderboard.currentUser.username,
                  rank: leaderboard.currentUser.rank,
                  userImage: leaderboard.currentUser.userImage,
                  userBanner: leaderboard.currentUser.userBanner,
                  isCurrentUser: true,
                }] : [])
              ]}
              gameImage={availableGames.find(g => g.title === currentLeaderboardGame)?.icon}
              gameBanner={availableGames.find(g => g.title === currentLeaderboardGame)?.banner}
            />
          )}
        </View>

        {/* Playing Section */}
        {/* <View style={styles.section}>
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
        </View> */}

        {/* Featured Section */}
        <View style={styles.section}>
          <ThemedText style={styles.headings} variant='h3'colorType='textPrimary'>Featured</ThemedText>
          <View style={styles.horizontalCardsContainer}>
            {featuredGames.map((game, index) => (
              <View key={index} style={styles.horizontalCard}>
                <GameCard
                  title={game.title}
                  subtitle={game.subtitle}
                  icon={game.icon}
                  banner={availableGames.find(g => g.title === game.title)?.banner}
                  onPress={() => handleGamePress(game.title)}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Recent Section */}
        {/* <View style={styles.section}>
          <ThemedText style={styles.headings} variant='h3'colorType='textPrimary'>Recent</ThemedText>
          <View style={styles.horizontalCardsContainer}>
            {recentGames.map((game, index) => (
              <View key={index} style={styles.horizontalCard}>
                <GameCard
                  title={game.title}
                  subtitle={game.subtitle}
                  icon={game.icon}
                  banner={availableGames.find(g => g.title === game.title)?.banner}
                  onPress={() => handleGamePress(game.title)}
                />
              </View>
            ))}
          </View>
        </View> */}

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
                banner={game.banner}
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
  containerNull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoWrapper: {
    width: "100%",       // take full width
    aspectRatio: 1,      // keep square
    maxWidth: 300,       // optional limit
    alignSelf: "center", // keep centered
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});
