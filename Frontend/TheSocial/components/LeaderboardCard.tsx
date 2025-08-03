import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { PlayerRow } from './PlayerRow';
import { useThemeColor } from '@/hooks/useThemeColor';

export type Player = {
  name: string;
  rank: string;
  isCurrentUser?: boolean;
};

export type LeaderboardCardProps = {
  players: Player[];
};

export function LeaderboardCard({ players }: LeaderboardCardProps) {
  const surfaceColor = useThemeColor({}, 'surface');
  const textSecondaryColor = useThemeColor({}, 'textSecondary');
  
  return (
    <ThemedView 
      style={[styles.container, { backgroundColor: surfaceColor }]}
      backgroundType="surface"
    >
      <View style={styles.contentContainer}>
        <View style={styles.playerListContainer}>
          {players.map((player, index) => (
            <PlayerRow
              key={index}
              name={player.name}
              rank={player.rank}
              isCurrentUser={player.isCurrentUser}
            />
          ))}
        </View>
        
        <View style={styles.controllerContainer}>
          <ThemedView style={styles.controllerBackground}>
            <ThemedText style={[styles.controllerIcon, { color: textSecondaryColor }]}>
              🎮
            </ThemedText>
          </ThemedView>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerListContainer: {
    flex: 1,
    marginRight: 16,
  },
  controllerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  controllerBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3A3A3A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controllerIcon: {
    fontSize: 48,
  },
}); 