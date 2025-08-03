import React from 'react';
import { View, StyleSheet } from 'react-native';
import { InteractionButton } from './InteractionButton';

interface PostFooterProps {
  interactions: {
    likes: number;
    comments: number;
    shares: number;
  };
  isBookmarked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
}

export function PostFooter({
  interactions,
  isBookmarked = false,
  onLike,
  onComment,
  onShare,
  onBookmark,
}: PostFooterProps) {
  return (
    <View style={styles.container}>
      <View style={styles.interactionsContainer}>
        <InteractionButton
          type="like"
          count={interactions.likes}
          onPress={onLike}
        />
        <InteractionButton
          type="comment"
          count={interactions.comments}
          onPress={onComment}
        />
        <InteractionButton
          type="share"
          count={interactions.shares}
          onPress={onShare}
        />
      </View>
      
      <InteractionButton
        type="bookmark"
        isActive={isBookmarked}
        onPress={onBookmark}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  interactionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
  },
}); 