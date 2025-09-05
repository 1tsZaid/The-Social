import React from 'react';
import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import LeaderboardEntry from '@/components/LeaderboardEntry';

interface LeaderboardData {
  userId: string;
  username: string;
  userImage?: string;
  userBanner: string;
  score: number;
  rank: number;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  title?: string;
  data: LeaderboardData[];
  currentUserId?: string;
  maxEntries?: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ 
  title = 'Leaderboard',
  data,
  currentUserId,
  maxEntries
}) => {
  
  // Filter and limit entries if maxEntries is specified
  const displayData = maxEntries ? data.slice(0, maxEntries) : data;
  
  return (
    <ThemedView style={styles.leaderboardContainer} backgroundType="background">
      <ThemedText variant="h3" colorType="textPrimary" style={styles.leaderboardTitle}>
        {title}
      </ThemedText>
      
      {displayData.map((entry) => (
        <LeaderboardEntry
          key={entry.rank}
          rank={entry.rank}
          username={entry.username}
          score={entry.score}
          isCurrentUser={entry.isCurrentUser}
          avatarUrl={entry.userImage}
        />
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  leaderboardContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  leaderboardTitle: {
    marginBottom: 24,
  },
});

export default Leaderboard; 