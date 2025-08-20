import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MessageItem } from '@/components/MessageItem';
import { MessageInput } from '@/components/MessageInput';
import { useScrollHandler } from '@/hooks/useScrollHandler';
import { DateSeparator } from '@/components/DateSeparator';
import { useCommunities } from '@/components/CommunitiesContext';

import { subscribeToMessages, unsubscribeFromMessages, sendMessage, RecieveMessagePayload } from '@/services/message';


export default function MessagesScreen() {
  const [messagesByCommunity, setMessagesByCommunity] = useState<Record<string, RecieveMessagePayload[]>>({});
  const [communityListner, setCommunityListner] = useState<Record<string, boolean>>({});
  const { selectedCommunityId } = useCommunities();
  const { onScroll } = useScrollHandler();

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
    return (
      <ThemedView style={styles.constainerNull} backgroundType="background">
        <ThemedText style={{ padding: 20 }}>Please select a community to view messages.</ThemedText>
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

      <MessageInput onSendMessage={handleSendMessage} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  constainerNull: {  flex: 1, justifyContent: 'center', alignItems: 'center'},
  scrollView: {
    flex: 1,
    paddingTop: 60,
  },
  scrollContent: {
    paddingBottom: 40,
  },
});
