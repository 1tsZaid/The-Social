import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

import { API_CONFIG } from '@/constants/Api'

interface MessageAvatarProps {
  username: string;
  imageUrl?: string;
  userBanner: string;
  size?: number;
}

export function MessageAvatar({ username, imageUrl, userBanner, size = 36 }: MessageAvatarProps) {
  const surfaceColor = useThemeColor({}, 'textPrimary');

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
          <ThemedText 
            variant="h2"
            style={{ fontWeight: 'bold', fontSize: 20, color: userBanner }}
          >
            {username?.charAt(0).toUpperCase()}
          </ThemedText>
        </View>
      )}
    </View>
  );
}
