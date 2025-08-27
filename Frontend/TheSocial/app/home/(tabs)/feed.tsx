import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Alert, RefreshControl, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Video, ResizeMode } from "expo-av";

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { PostCard } from '@/components/PostCard';
import AddToPhotoIcon from '@/components/AddToPhotoIcon';
import { useCommunities } from '@/components/CommunitiesContext';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useScrollHandler } from '@/hooks/useScrollHandler';

import { getCommunityPosts, likePostHandler } from '@/services/post';

import { checkTokens } from '@/utils/checkTokens';
import { deleteTokens } from '@/utils/tokenStorage';

// Types
import { RecieveMessagePayload } from '@/services/post';

export default function FeedScreen() {
  const router = useRouter();
  const { onScroll } = useScrollHandler();
  const { selectedCommunityId } = useCommunities();

  const [posts, setPosts] = useState<Record<string, RecieveMessagePayload[]>>({});
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useColorScheme() ?? 'light';

  // Fetch posts
  const fetchPosts = async () => {
    if (!selectedCommunityId) return;
    try {
      setLoading(true);
      const data = await getCommunityPosts(selectedCommunityId, { limit: 20, page: 1 });
      setPosts( (prev) => ({ ...prev, [data.posts[0]?.communityId]: data.posts }) );
    } catch (error) {
      console.error('Error fetching posts:', error);
      Alert.alert('Error', 'Failed to load posts.');
    } finally {
      setLoading(false);
    }
  };

  // Refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  useEffect(() => {
    if (!selectedCommunityId) return;
    fetchPosts();
  }, [selectedCommunityId]);

  // Like handler
  const handleLike = async (postId: string) => {
    try {
      const tokenFlag = await checkTokens()
      if (!tokenFlag) {
        deleteTokens();
        router.replace('/login');
      }
      await likePostHandler(postId);
    } catch (error) {
      console.error('Error liking post:', error);
      Alert.alert('Error', 'Could not like post.');
    }
  };

  const handleAddToPhotoPress = () => {
    if (!selectedCommunityId) return;
    router.push({
      pathname: '/post',
      params: { selectedCommunityId: selectedCommunityId },
    });
  };

  if (!selectedCommunityId) {  
    const videoSource =
      theme === "dark"
      ? require("@/assets/videos/home.dark.mp4")
      : require("@/assets/videos/home.light.mp4");

    return (
      <ThemedView style={styles.containerNull} backgroundType="background">
        <ThemedView style={styles.videoWrapper}>
          <Video
            source={videoSource}
            style={styles.video}
            videoStyle={{ width: 300, height: 300 }}
            resizeMode={ResizeMode.STRETCH}   // keeps full video visible
            shouldPlay
            isLooping
            isMuted
          />
        </ThemedView>
        <ThemedText style={{ padding: 20, textAlign: 'center' }}>Please select a community to view posts.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container} backgroundType="background">
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {selectedCommunityId && posts[selectedCommunityId]?.map((post) => (
          <PostCard
            key={post.id}
            username={post.author.username}
            imageUrl={post.author.profileImage}
            timestamp={post.createdAt}
            banner={post.author.banner}
            content={post.content}
            contentImageUrl={post.attachImage}
            likes={post.stats.likes}
            onLike={() => handleLike(post.id)}
          />
        ))}
      </ScrollView>
      <AddToPhotoIcon onPress={handleAddToPhotoPress} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerNull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoWrapper: {
    width: "100%",       // take full width
    aspectRatio: 1,      // keep square
    maxWidth: 300,       // optional limit
    alignSelf: "center", // keep centered
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  scrollView: { flex: 1, paddingTop: Platform.OS === 'web' ? 25 : 50 },
  scrollContent: { paddingVertical: 15 },
});
