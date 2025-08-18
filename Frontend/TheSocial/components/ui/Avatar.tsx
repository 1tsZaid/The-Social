import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

interface AvatarProps {
  id: string;
  size: number;
  imageUrl?: string;
  onPress: (communityId: string) => void;
  isActive: boolean;
}

export function Avatar({ 
  id,
  size = 40, 
  imageUrl, 
  onPress, 
  isActive = false 
}: AvatarProps) {
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

  return  <TouchableOpacity onPress={() => onPress(id)} activeOpacity={0.7}>
            <ThemedView style={containerStyle}>
            {imageUrl ? (
              // TODO: Add Image component when imageUrl is provided
              <Image source={{ uri: imageUrl }} style={{ 
                width: size, 
                height: size, 
                borderRadius: isActive ? 15 : size / 2, 
                borderWidth: isActive ? 1 : 0}} />
            ) : (
              <Ionicons 
                name="people" 
                size={size * 0.5}
                color={iconColor} 
          />
            )}
          </ThemedView>
        </TouchableOpacity>;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 