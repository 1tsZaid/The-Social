import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

interface UserAvatarProps {
  size?: number;
  imageUrl?: string;
  onPress?: () => void;
  isActive?: boolean;
}

export function UserAvatar({ 
  size = 40, 
  imageUrl, 
  onPress, 
  isActive = false 
}: UserAvatarProps) {
  const backgroundColor = useThemeColor({}, 'surface');
  const borderColor = useThemeColor({}, 'borderDivider');
  const iconColor = useThemeColor({}, 'textPrimary');

  const containerStyle = [
    styles.container,
    {
      width: size,
      height: size,
      borderRadius: isActive ? 15 : size / 2,
      backgroundColor,
      borderWidth: isActive ? 1 : 0,
      borderColor: isActive ? borderColor : 'transparent',
    }
  ];

  const content = (
    <ThemedView style={containerStyle}>
      {imageUrl ? (
        // TODO: Add Image component when imageUrl is provided
        <View style={styles.placeholder} />
      ) : (
        <View style={styles.personIcon}>
          {/* Head circle */}
          <View style={[styles.head, { backgroundColor: iconColor }]} />
          {/* Body curve */}
          <View style={[styles.body, { backgroundColor: iconColor }]} />
        </View>
      )}
    </ThemedView>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  personIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 2,
  },
  body: {
    width: 12,
    height: 6,
    borderRadius: 3,
  },
}); 