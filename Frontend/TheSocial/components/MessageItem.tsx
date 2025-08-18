import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { MessageAvatar } from './MessageAvatar';
import { useThemeColor } from '@/hooks/useThemeColor';

interface MessageItemProps {
  imageUrl?: string;
  senderName: string;
  timestamp: string;
  banner: string;
  message: string;
  avatarSize?: number;
}

export function MessageItem({ 
  imageUrl,
  senderName, 
  timestamp,
  banner,
  message, 
  avatarSize = 45 
}: MessageItemProps) {


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: 8,
      paddingHorizontal: 16,
      gap: 8,
    },
    avatarContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      height: 70,
      borderRadius: 30,
      padding: 2,
      backgroundColor: banner + '50',
    },
    contentContainer: {
      flex: 1,
      gap: 1,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
  }); 

  return (
    <ThemedView style={styles.container} backgroundType="background">
      <View style={styles.avatarContainer}>
        <MessageAvatar size={avatarSize} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <ThemedText 
            colorType="textPrimary"
            variant="body"
          >
            {senderName}
          </ThemedText>
          <ThemedText 
            colorType="textSecondary"
            variant="caption"
          >
            🞄   {timestamp}
          </ThemedText>
        </View>
        <ThemedText 
          colorType="textSecondary"
          variant="bodySmall"
        >
          {message}
        </ThemedText>
      </View>
    </ThemedView>
  );
}
