import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { PostHeader } from './PostHeader';
import { PostContent } from './PostContent';
import { PostFooter } from './PostFooter';
import { useThemeColor } from '@/hooks/useThemeColor';

interface PostCardProps {
  username: string;
  imageUrl?: string;
  timestamp: string;
  banner: string;
  content: string;
  contentImageUrl?: string;
  likes: number;
  onLike: () => void;
  // onComment?: (postId: string) => void;
  // onShare?: (postId: string) => void;
  // onBookmark?: (postId: string) => void;
  // onOptions?: (postId: string) => void;
}

export function PostCard({
  username,
  imageUrl,
  timestamp,
  banner,
  content,
  contentImageUrl,
  likes,
  onLike,
}: PostCardProps) {
  const [isLike, setIsLike] = useState(false);

  return (
    <ThemedView
      style={[
        styles.container,
        {
          borderColor: banner + '50',
          borderWidth: 1,
        },
      ]}
      backgroundType="surface"
    >
      <PostHeader
        name={username}
        imageUrl={imageUrl}
        banner={banner}
        timestamp={timestamp}
        onOptions={() => {console.log('Options pressed for post');}}
      />
      <PostContent content={content} imageUrl={contentImageUrl} />
      <PostFooter
        likes={likes}
        isLike={isLike}
        onLike={() => {console.log('Like pressed for post'); onLike(); setIsLike(true)}}
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