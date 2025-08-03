import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

type InteractionType = 'like' | 'comment' | 'share' | 'bookmark';

interface InteractionButtonProps {
  type: InteractionType;
  count?: number;
  isActive?: boolean;
  onPress?: () => void;
}

export function InteractionButton({
  type,
  count,
  isActive = true,
  onPress,
}: InteractionButtonProps) {
  const iconColor = useThemeColor({}, 'textSecondary');
  
  const getIcon = () => {
    const iconSize = 18;
    
    switch (type) {
      case 'like':
        return (
          <Ionicons 
            name={isActive ? "heart" : "heart-outline"} 
            size={iconSize} 
            color={isActive ? '#FF6B6B' : iconColor} 
          />
        );
      case 'comment':
        return (
          <Ionicons 
            name="chatbubble-outline" 
            size={iconSize} 
            color={iconColor} 
          />
        );
      case 'share':
        return (
          <Ionicons 
            name="share-outline" 
            size={iconSize} 
            color={iconColor} 
          />
        );
      case 'bookmark':
        return (
          <Ionicons 
            name={isActive ? "bookmark" : "bookmark-outline"} 
            size={iconSize} 
            color={isActive ? '#FFD700' : iconColor} 
          />
        );
    }
  };

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {getIcon()}
      {count !== undefined && type !== 'bookmark' && (
        <ThemedText
          colorType="textSecondary"
          variant="caption"
        >
          {formatCount(count)}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
}); 