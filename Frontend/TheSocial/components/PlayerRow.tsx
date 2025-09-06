import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { API_CONFIG } from '@/constants/Api'

import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export type PlayerRowProps = {
  name: string;
  rank: number;
  userImage?: string;
  userBanner: string,
  isCurrentUser?: boolean;
  rankColor?: string;
};

// helper to add ordinal suffix
const formatRank = (rank: number): string => {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = rank % 100;
  return rank + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};

export function PlayerRow({ name, userImage, rank, isCurrentUser = false, rankColor, userBanner }: PlayerRowProps) {
  const borderDivider = useThemeColor({}, 'borderDivider');
  const textSecondaryColor = useThemeColor({}, 'textSecondary');
  const textPrimaryColor = useThemeColor({}, 'textPrimary');

  const gold = useThemeColor({}, 'gold');
  const silver = useThemeColor({}, 'silver');
  const bronze = useThemeColor({}, 'bronze');

  const getRankColor = () => {
    if (rankColor) return rankColor;
    if (rank === 1) return gold;
    if (rank === 2) return silver;
    if (rank === 3) return bronze;
    return textSecondaryColor;
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 4,
      height: 32,
    },
    currentUserContainer: {
      borderTopWidth: 0.8,
      borderTopColor: borderDivider,
      paddingTop: 8,
    },
    avatarContainer: {
      marginRight: 8,
    },
    avatar: {
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
      flex: 1,
    },
    rankContainer: {
      alignItems: 'flex-end',
    },
    rank: {
      fontWeight: '400',
    },
  });

  return (
    <View style={[styles.container, isCurrentUser && styles.currentUserContainer]}>
      <View style={styles.avatarContainer}>
          {userImage ? (
            <Image
              source={{ uri: API_CONFIG.STATIC_BASE_URL + userImage }} 
              style={{ width: 24, height: 24, borderRadius: 45 }} 
            />
          ) : (
            <ThemedView style={[styles.avatar, { backgroundColor: textPrimaryColor }]}>
              <ThemedText 
                variant="h2"
                style={{ fontWeight: 'bold', fontSize: 15, color: userBanner }}
              >
                {name?.charAt(0).toUpperCase()}
              </ThemedText>
            </ThemedView>
          )}
      </View>
      
      <View style={styles.contentContainer}>
        <ThemedText
          colorType="textPrimary"
          variant="body"
        >
          {name}
        </ThemedText>
      </View>
      
      <View style={styles.rankContainer}>
        <ThemedText 
          style={[styles.rank, { color: getRankColor() }]}
          variant="bodySmall"
        >
          {formatRank(rank)}
        </ThemedText>
      </View>
    </View>
  );
}
