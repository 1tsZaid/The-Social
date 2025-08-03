import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';

interface PostContentProps {
  content: {
    text: string;
    media?: string;
  };
}

export function PostContent({ content }: PostContentProps) {
  const truncatedText = content.text.length > 100 
  ? `${content.text.substring(0, 100)}...` 
  : content.text;

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
    mediaPlaceholder: {
      width: '100%',
      height: '100%',
      backgroundColor: '#99A2AD',
      borderRadius: 10,
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
        {content.text.length > 100 && (
          <ThemedText
            style={styles.seeMore}
            colorType="textSecondary"
            variant="caption"
          >
            see more
          </ThemedText>
        )}
      </View>
      
      {content.media && (
        <View style={styles.mediaContainer}>
          <View style={styles.mediaPlaceholder} />
        </View>
      )}
    </View>
  );
}
