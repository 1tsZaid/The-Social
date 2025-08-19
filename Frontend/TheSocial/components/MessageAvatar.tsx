import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ThemedView } from './ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

import { API_CONFIG } from '@/constants/Api'

interface MessageAvatarProps {
  imageUrl?: string;
  size?: number;
}

export function MessageAvatar({ imageUrl, size = 36 }: MessageAvatarProps) {
  const iconColor = useThemeColor({}, 'textPrimary');
  const surfaceColor = useThemeColor({}, 'surface');

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
    },
    profileImagePlaceholder: {
      width: size,
      height: size,
      borderRadius: 45,
      backgroundColor: surfaceColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }); 
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {imageUrl ? (
        // TODO: Add Image component when imageUrl is provided
        <View style={styles.profileImagePlaceholder}>
          <Image source={{ uri: API_CONFIG.STATIC_BASE_URL + imageUrl }} style={{ 
            width: size, 
            height: size, 
            borderRadius: 45 }}/>
        </View>
      ) : (
        <View style={styles.profileImagePlaceholder}>
          <Ionicons name="person" size={20} color={iconColor} />
        </View>
      )}
    </View>
  );
}
