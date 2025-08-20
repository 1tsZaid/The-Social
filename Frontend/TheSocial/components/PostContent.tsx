import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';
import { API_CONFIG } from '@/constants/Api'

interface PostContentProps {
  content: string;
  imageUrl?: string;
}

export function PostContent({ content, imageUrl }: PostContentProps) {
  const truncatedText = content.length > 100 
  ? `${content.substring(0, 100)}...` 
  : content;

  const moreColor = useThemeColor({}, 'borderDivider');
  
  const styles = StyleSheet.create({
    container: {
      gap: 10,
    },
    textContainer: {
      paddingHorizontal: 10,
      gap: 5,
    },
    seeMore: {
      color: moreColor,
    },
    mediaContainer: {
      width: '100%',
      height: 240,
    },
  }); 

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <ThemedText
          colorType="textSecondary"
          variant="body"
        >
          {truncatedText}
        </ThemedText>
        {content.length > 100 && (
          <ThemedText
            style={styles.seeMore}
            colorType="textSecondary"
            variant="caption"
          >
            see more
          </ThemedText>
        )}
      </View>
      
      {imageUrl && (
        <View style={styles.mediaContainer}>
          <Image source={{ uri: API_CONFIG.STATIC_BASE_URL + imageUrl }} style={{ width: '100%', height: '100%' }} />
        </View>
      )}
    </View>
  );
}
