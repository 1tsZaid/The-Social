import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MessageItem } from '@/components/MessageItem';
import { MessageInput } from '@/components/MessageInput';
import { useScrollHandler } from '@/hooks/useScrollHandler';
import { DateSeparator } from '@/components/DateSeparator';
import { useCommunities } from '@/components/CommunitiesContext';

import { subscribeToMessages, unsubscribeFromMessages, sendMessage, RecieveMessagePayload, SendMessagePayload } from '@/services/message';


export default function MessagesScreen({ communityId }: { communityId: string }) {
  // Messages mapped by communityId
  const [messagesByCommunity, setMessagesByCommunity] = useState<Record<string, RecieveMessagePayload[]>>({});
  const { selectedCommunityId, communities } = useCommunities();
  const { onScroll } = useScrollHandler();
  
  // Get messages for the current communityId
  const community = selectedCommunityId 
    ? communities.find(c => c.communityId === selectedCommunityId) 
    : null;
  const messages = selectedCommunityId ? (messagesByCommunity[selectedCommunityId] || []) : [];

  useEffect(() => {
    if (!selectedCommunityId) return;

    // Subscribe to incoming messages for this community
    subscribeToMessages(selectedCommunityId, (msg) => {
      console.log('Received message:', msg);

      setMessagesByCommunity((prev) => {
        const existing = prev[selectedCommunityId] || [];
        return {
          ...prev,
          [selectedCommunityId]: [...existing, msg],
        };
      });
    });
    
    // Cleanup on unmount or community change
    return () => {
      unsubscribeFromMessages(selectedCommunityId);
    };
  }, [selectedCommunityId]);
  
  if (!selectedCommunityId) {
    return (
      <ThemedView style={styles.container} backgroundType="background">
        <ThemedText style={{ padding: 20 }}>Please select a community to view messages.</ThemedText>
      </ThemedView>
    );
  }

  const handleSendMessage = (newMessage: string) => {
    if (!selectedCommunityId) return;

    console.log('Sending message:', newMessage);

    sendMessage({
      communityId: selectedCommunityId,
      content: newMessage,
    });
  };

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

        {messages.map((msg, index) => (
          <MessageItem
            key={index}
            senderName={msg.username}
            banner={msg.banner || '#ff0000'}
            imageUrl={msg.userImage}
            timestamp={msg.createdAt!}
            message={msg.content}
          />
        ))}
      </ScrollView>

      <MessageInput onSendMessage={handleSendMessage} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingTop: 60,
  },
  scrollContent: {
    paddingBottom: 40,
  },
});
