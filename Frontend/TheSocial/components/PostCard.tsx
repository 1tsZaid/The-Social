import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { PostHeader } from './PostHeader';
import { PostContent } from './PostContent';
import { PostFooter } from './PostFooter';
import { useThemeColor } from '@/hooks/useThemeColor';

export interface PostData {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  timestamp: string;
  content: {
    text: string;
    media?: string;
  };
  interactions: {
    likes: number;
    comments: number;
    shares: number;
  };
  isBookmarked?: boolean;
  borderColor?: 'blue' | 'red' | 'default';
}

interface PostCardProps {
  post: PostData;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  onOptions?: (postId: string) => void;
}

export function PostCard({
  post,
  onLike,
  onComment,
  onShare,
  onBookmark,
  onOptions,
}: PostCardProps) {
  const borderBlue = useThemeColor({}, 'bannerBlue') + '50';
  const borderRed = useThemeColor({}, 'bannerRed') + '50';
  
  const getBorderColor = () => {
    switch (post.borderColor) {
      case 'blue':
        return borderBlue;
      case 'red':
        return borderRed;
      default:
        return 'transparent';
    }
  };

  return (
    <ThemedView
      style={[
        styles.container,
        {
          borderColor: getBorderColor(),
          borderWidth: post.borderColor ? 1 : 0,
        },
      ]}
      backgroundType="surface"
    >
      <PostHeader
        user={post.user}
        timestamp={post.timestamp}
        onOptions={() => onOptions?.(post.id)}
      />
      <PostContent content={post.content} />
      <PostFooter
        interactions={post.interactions}
        isBookmarked={post.isBookmarked}
        onLike={() => onLike?.(post.id)}
        onComment={() => onComment?.(post.id)}
        onShare={() => onShare?.(post.id)}
        onBookmark={() => onBookmark?.(post.id)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 7.5,
    marginVertical: 7.5,
    overflow: 'hidden',
  },
}); 