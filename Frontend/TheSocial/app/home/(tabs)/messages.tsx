import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Video, ResizeMode } from "expo-av";
import Toast from "react-native-toast-message";

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MessageItem } from '@/components/MessageItem';
import { MessageInput } from '@/components/MessageInput';
import { DateSeparator } from '@/components/DateSeparator';
import { useCommunities } from '@/components/CommunitiesContext';

import { useScrollHandler } from '@/hooks/useScrollHandler';
import { useColorScheme } from '@/hooks/useColorScheme';

import { subscribeToMessages, unsubscribeFromMessages, sendMessage, RecieveMessagePayload } from '@/services/message';


export default function MessagesScreen() {
  const [messagesByCommunity, setMessagesByCommunity] = useState<Record<string, RecieveMessagePayload[]>>({});
  const [communityListner, setCommunityListner] = useState<Record<string, boolean>>({});
  const { selectedCommunityId } = useCommunities();
  const { onScroll } = useScrollHandler();
  const theme = useColorScheme() ?? 'light';

  useEffect(() => {
    console.log('from useEffect of messages for community:', selectedCommunityId);
    if (!selectedCommunityId) return;

    if (communityListner[selectedCommunityId]) return;
    unsubscribeFromMessages(selectedCommunityId);
    setCommunityListner((prev) => ({ ...prev, [selectedCommunityId]: true }));

    // Subscribe to incoming messages for this community
    subscribeToMessages(selectedCommunityId, (msg) => {
      console.log('Received message:', msg);

      setMessagesByCommunity((prev) => {
        // if (selectedCommunityId !== msg.communityId) return prev;
        console.log('the message is', msg);
        console.log('new message for community:', msg.communityId);

        const existing = prev[msg.communityId] || [];
        return {
          ...prev,
          [msg.communityId]: [...existing, msg],
        };
      });
    });
    
    // Cleanup on unmount or community change
    // return () => {
    //   unsubscribeFromMessages(selectedCommunityId);
    // };
  }, [selectedCommunityId]);
  
  const handleSendMessage = (newMessage: string) => {
    if (!selectedCommunityId) return;
    
    console.log('Sending message:', newMessage);
    
    sendMessage({
      communityId: selectedCommunityId,
      content: newMessage,
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
        <ThemedText style={{ padding: 20, textAlign: 'center' }}>Please select a community to view messages.</ThemedText>
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
      >
        {/* Date separator */}
        {/* <DateSeparator date="Yesterday" /> */}

        {selectedCommunityId && messagesByCommunity[selectedCommunityId] ? messagesByCommunity[selectedCommunityId].map((msg, index) => (
          <MessageItem
            key={index}
            senderName={msg.username}
            banner={msg.banner || '#ff0000'}
            imageUrl={msg.userImage}
            timestamp={msg.createdAt!}
            message={msg.content}
          />
        )) : null}
      </ScrollView>

      <Toast position='bottom'  />

      <MessageInput onSendMessage={handleSendMessage} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  scrollView: {
    flex: 1,
    paddingTop: 60,
  },
  scrollContent: {
    paddingBottom: 40,
  },
});
