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

import { Colors } from '@/constants/Colors';

export default function GamesScreen() {
  const [player, setPlayer] = useState<string | null>(null);

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
    { title: 'Epic Quest', subtitle: '40sec avg', icon: '🧩' },
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
      title: 'Epic Quest',
      description: 'Embark on a grand adventure...',
      subtitle: '40sec avg',
      banner: '#F9DC35',
      icon: '🧩',
    },
    {
      title: 'Firefight Arena',
      description: 'Battle it out in intense combat...',
      subtitle: '1min avg',
      banner: '#FE5F55',
      icon: '⚔️',
    },
  ];

  const { leaderboard, fetchLeaderboard } = useLeaderboard();

  useEffect(() => {
    fetchLeaderboardData();
  }, [selectedCommunityId]);

  const fetchLeaderboardData = async () => {
    if (selectedCommunityId) {
      if (!player) {
        fetchProfileData();
      }
      await fetchLeaderboard("flappy-bird", selectedCommunityId, "current-user-id", 3);
    }
  }

  const fetchProfileData = async () => {
    const tokenFlag = await checkTokens();
    if (tokenFlag) {
      const profileData = await getProfile();
      setPlayer(profileData.username);
      console.log('Profile data fetched:', profileData);
    } else {
      deleteTokens();
      router.replace('/login');
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
          <ThemedText style={styles.headings} variant="h2" colorType='textPrimary'>LeaderBoard</ThemedText>
          {leaderboard &&
            <LeaderboardCard players={leaderboard.topPlayers.map((p) => ({
              name: p.username,
              rank: p.rank,
              userImage: p.userImage,
              isCurrentUser: player === p.username,
            }))} gameImage={availableGames[0].icon} gameBanner={availableGames[0].banner}/>
          }
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
