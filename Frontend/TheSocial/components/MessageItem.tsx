import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { MessageAvatar } from './MessageAvatar';

interface MessageItemProps {
  senderName: string;
  timestamp: string;
  message: string;
  avatarSize?: number;
}

export function MessageItem({ 
  senderName, 
  timestamp, 
  message, 
  avatarSize = 45 
}: MessageItemProps) {
  return (
    <ThemedView style={styles.container} backgroundType="background">
      <MessageAvatar size={avatarSize} />
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
            {timestamp}
          </ThemedText>
        </View>
        <ThemedText 
          colorType="textPrimary"
          variant="bodySmall"
        >
          {message}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 16,
    gap: 8,
  },
  contentContainer: {
    flex: 1,
    gap: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
}); 