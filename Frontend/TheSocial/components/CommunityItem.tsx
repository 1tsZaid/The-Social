import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

interface CommunityItemProps {
  name: string;
  location: string;
  onlineCount: number;
  memberCount: number;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string | keyof typeof Colors.light;
  isSelected?: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export function CommunityItem({
  name,
  location,
  onlineCount,
  memberCount,
  icon,
  iconColor,
  isSelected = false,
  onPress,
  style,
}: CommunityItemProps) {
  const surfaceColor = useThemeColor({}, 'surface');
  const backgroundColor = useThemeColor({}, 'background');
  
  // Handle icon color - can be a theme color name or direct hex value
  const resolvedIconColor = typeof iconColor === 'string' && iconColor in Colors.light 
    ? useThemeColor({}, iconColor as keyof typeof Colors.light)
    : iconColor;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isSelected ? surfaceColor : backgroundColor,
          borderRadius: isSelected ? 20 : 5,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: resolvedIconColor },
        ]}
      >
        <Ionicons name={icon} size={20} color="white" />
      </View>
      
      <View style={styles.content}>
        <ThemedText
          style={styles.name}
          variant="body"
          colorType="textPrimary"
        >
          {name}
        </ThemedText>
        
        <ThemedText
          style={styles.location}
          variant="caption"
          colorType="textSecondary"
        >
          {location}
        </ThemedText>
        
        <View style={styles.statsContainer}>
          <View style={styles.onlineIndicator} />
          <ThemedText
            variant="caption"
            colorType="textSecondary"
          >
            {onlineCount} online • {memberCount} members
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginVertical: 2,
    minHeight: 60,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    marginBottom: 2,
  },
  location: {
    marginBottom: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginRight: 4,
  },
}); 