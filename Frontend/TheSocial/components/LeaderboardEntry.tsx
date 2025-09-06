import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

import { API_CONFIG } from '@/constants/Api';

interface LeaderboardEntryProps {
  rank: number;
  username: string;
  score: number;
  isCurrentUser?: boolean;
  avatarUrl?: string;
  avatarBanner: string;
  avatarSize?: number;
}

const LeaderboardEntry: React.FC<LeaderboardEntryProps> = ({ 
  rank, 
  username, 
  score, 
  isCurrentUser = false,
  avatarUrl,
  avatarBanner,
  avatarSize = 40
}) => {
  
  const scoreColor = isCurrentUser ? 'accent' : 'textPrimary';
  const starColor = useThemeColor({}, 'gold')
  const borderColor = useThemeColor({}, 'borderDivider');
  const avatarIconColor = useThemeColor({}, 'textPrimary');
  
  const styles = StyleSheet.create({
    leaderboardEntry: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor,
    },
    rankText: {
      textAlign: 'center',
      marginRight: 12,
    },
    avatarContainer: {
      marginRight: 12,
    },
    avatar: {
      backgroundColor: avatarBanner,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarImage: {
      width: '100%',
      height: '100%',
      borderRadius: 20,
    },
    usernameText: {
      flex: 1,
    },
    scoreContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    scoreText: {
      marginLeft: 4,
    },
  });

  return (
    <ThemedView 
      style={styles.leaderboardEntry} 
      backgroundType={isCurrentUser ? 'background' : 'surface'}
    >
      <ThemedText variant="h4" colorType="textSecondary" style={styles.rankText}>
        {rank}
      </ThemedText>
      
      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2, }]}>
          {avatarUrl ? (
            <Image source={{ uri: API_CONFIG.STATIC_BASE_URL + avatarUrl }} style={styles.avatarImage} />
          ) : (
            <ThemedView style={[styles.avatar, { backgroundColor: avatarBanner }]}>
              <Ionicons name="person" size={18} color={avatarIconColor} />
            </ThemedView>
          )}
        </View>
      </View>
      
      <ThemedText variant="body" colorType='textPrimary' style={styles.usernameText}>
        {username}
      </ThemedText>
      
      <View style={styles.scoreContainer}>
        <Ionicons 
          name="star" 
          size={20} 
          color={starColor} 
        />
        <ThemedText variant="body" colorType={scoreColor} style={styles.scoreText}>
          {score}
        </ThemedText>
      </View>
    </ThemedView>
  );
};


export default LeaderboardEntry; 