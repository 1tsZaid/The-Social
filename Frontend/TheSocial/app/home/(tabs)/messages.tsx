import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { MessageItem } from '@/components/MessageItem';
import { MessageInput } from '@/components/MessageInput';
import { useScrollHandler } from '@/hooks/useScrollHandler';
import { DateSeparator } from '@/components/DateSeparator';

import { subscribeToMessages, unsubscribeFromMessages, sendMessage } from '@/services/message';

interface Message {
  id?: string;
  communityId: string;
  senderId: string;
  senderName: string;
  banner?: string;
  imageUrl?: string;
  timestamp?: string;
  message: string;
}

export default function MessagesScreen({ communityId }: { communityId: string }) {
  // Messages mapped by communityId
  const [messagesByCommunity, setMessagesByCommunity] = useState<Record<string, Message[]>>({});
  const { onScroll } = useScrollHandler();

  // Get messages for the current communityId
  const messages = messagesByCommunity[communityId] || [];

  useEffect(() => {
    // Subscribe to incoming messages for this community
    subscribeToMessages(communityId, (msg) => {
      setMessagesByCommunity((prev) => {
        const existing = prev[communityId] || [];
        return {
          ...prev,
          [communityId]: [...existing, msg],
        };
      });
    });

    // Cleanup on unmount
    return () => {
      unsubscribeFromMessages(communityId);
    };
  }, [communityId]);

  const handleSendMessage = (newMessage: string) => {
    const message: Message = {
      communityId,
      senderId: 'you', // real userId will come from backend JWT
      senderName: 'You',
      message: newMessage,
    };

    // Optimistic update in UI
    setMessagesByCommunity((prev) => {
      const existing = prev[communityId] || [];
      return {
        ...prev,
        [communityId]: [...existing, message],
      };
    });

    // Send through socket
    sendMessage({
      communityId,
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
            senderName={msg.senderName}
            banner={msg.banner || '#ff0000'}
            imageUrl={msg.imageUrl}
            timestamp={msg.timestamp!}
            message={msg.message}
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
