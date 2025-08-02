import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import MainButton from '@/components/MainButton';
import { useThemeColor } from '@/hooks/useThemeColor';

interface GameInfoCardProps {
  title: string;
  description: string;
  playtime: string;
  onPlayPress: () => void;
  playButtonText?: string;
  disabled?: boolean;
}

const GameInfoCard: React.FC<GameInfoCardProps> = ({ 
  title,
  description,
  playtime,
  onPlayPress,
  playButtonText = 'Play',
  disabled = false
}) => {
  const iconColor = useThemeColor({}, 'borderDivider');

  return (
    <ThemedView style={styles.gameInfoCard} backgroundType="surface">
      <ThemedText variant="h2" colorType="textPrimary" style={styles.gameTitle}>
        {title}
      </ThemedText>
      
      <ThemedText variant="bodySmall" colorType="textSecondary" style={styles.gameDescription}>
        {description}
      </ThemedText>
      
      <View style={styles.playtimeContainer}>
        <Ionicons name="time-outline" size={16} color={iconColor} />
        <ThemedText variant="bodySmall" colorType="textSecondary" style={styles.playtimeText}>
          Avg. Playtime: {playtime}
        </ThemedText>
      </View>
      
      <MainButton 
        title={playButtonText} 
        onPress={onPlayPress}
        disabled={disabled}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  gameInfoCard: {
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  gameTitle: {
    marginBottom: 8,
  },
  gameDescription: {
    marginBottom: 16,
  },
  playtimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  playtimeText: {
    marginLeft: 8,
  },
});

export default GameInfoCard; 