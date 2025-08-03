import React, { useState } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { PostCard, type PostData } from '@/components/PostCard';

// Mock data for demonstration
const mockPosts: PostData[] = [
  {
    id: '1',
    user: {
      name: 'Name',
      avatar: undefined,
    },
    timestamp: '8d',
    content: {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      media: 'placeholder-image.jpg',
    },
    interactions: {
      likes: 1500,
      comments: 25,
      shares: 9,
    },
    isBookmarked: false,
    borderColor: 'blue',
  },
  {
    id: '2',
    user: {
      name: 'Name',
      avatar: undefined,
    },
    timestamp: '8d',
    content: {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      media: 'placeholder-image.jpg',
    },
    interactions: {
      likes: 1500,
      comments: 25,
      shares: 9,
    },
    isBookmarked: false,
    borderColor: 'red',
  },
];

export default function FeedScreen() {
  const [posts, setPosts] = useState<PostData[]>(mockPosts);

  const handleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, interactions: { ...post.interactions, likes: post.interactions.likes + 1 } }
          : post
      )
    );
  };

  const handleComment = (postId: string) => {
    Alert.alert('Comment', `Comment on post ${postId}`);
  };

  const handleShare = (postId: string) => {
    Alert.alert('Share', `Share post ${postId}`);
  };

  const handleBookmark = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post
      )
    );
  };

  const handleOptions = (postId: string) => {
    Alert.alert('Options', `Options for post ${postId}`);
  };

  return (
    <ThemedView style={styles.container} backgroundType="background">
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
            onBookmark={handleBookmark}
            onOptions={handleOptions}
          />
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 15,
  },
});
