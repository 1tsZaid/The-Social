import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens';

export type PlayerRowProps = {
  name: string;
  rank: string;
  isCurrentUser?: boolean;
  rankColor?: string;
};

export function PlayerRow({ name, rank, isCurrentUser = false, rankColor }: PlayerRowProps) {
  const blueColor = useThemeColor({}, 'blue');
  const borderDivider = useThemeColor({}, 'borderDivider');
  const textSecondaryColor = useThemeColor({}, 'textSecondary');
  
  const getRankColor = () => {
    if (rankColor) return rankColor;
    if (rank.includes('1st')) return useThemeColor({}, 'gold');
    if (rank.includes('2nd')) return useThemeColor({}, 'silver');
    if (rank.includes('3rd')) return useThemeColor({}, 'bronze');
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
        <ThemedView style={[styles.avatar, { backgroundColor: blueColor }]}>
          <ThemedText variant='bodySmall' colorType='textPrimary'>👤</ThemedText>
        </ThemedView>
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
          {rank}
        </ThemedText>
      </View>
    </View>
  );
}
