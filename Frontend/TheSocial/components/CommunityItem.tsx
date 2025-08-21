import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

interface CommunityItemProps {
  name: string;
  imageUri?: string;
  location: string;
  memberCount: number;
  isSelected: boolean;
  onPress: () => void;
  owner: boolean;
  onActionPress?: () => void;
  style?: ViewStyle;
}

export function CommunityItem({
  name,
  imageUri,
  location,
  memberCount,
  isSelected = false,
  owner = false,
  onPress,
  onActionPress,
  style,
}: CommunityItemProps) {
  const surfaceColor = useThemeColor({}, 'surface');
  const backgroundColor = useThemeColor({}, 'background');
  const iconBackgroundColor = useThemeColor({}, 'background');

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
      {/* Left: community image */}
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.communityImage}
            resizeMode="cover"
          />
        ) : (
          <View
            style={[
              styles.placeholderContainer,
              { backgroundColor: iconBackgroundColor },
            ]}
          >
            <Ionicons name="people" size={20} color="white" />
          </View>
        )}
      </View>
      
      {/* Middle: text details */}
      <View style={styles.content}>
        <ThemedText
          style={styles.name}
          variant="body"
          colorType="textPrimary"
          numberOfLines={1}
        >
          {name}
        </ThemedText>
        
        <ThemedText
          style={styles.location}
          variant="caption"
          colorType="textSecondary"
          numberOfLines={1}
        >
          {location}
        </ThemedText>
        
        <View style={styles.statsContainer}>
          <View style={styles.onlineIndicator} />
          <ThemedText
            variant="caption"
            colorType="textSecondary"
          >
            {memberCount} members
          </ThemedText>
        </View>

      {/* Right: Action text */}
      {isSelected && (
        <TouchableOpacity
          onPress={onActionPress}
          activeOpacity={0.7}
        >
          <ThemedText variant="bodySmall" colorType="red">
            {owner ? 'Delete' : 'Leave'}
          </ThemedText>
        </TouchableOpacity>
      )}
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
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
    overflow: 'hidden',
  },
  communityImage: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
