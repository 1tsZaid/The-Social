import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { MessageItem } from '@/components/MessageItem';
import { DateSeparator } from '@/components/DateSeparator';
import { MessageInput } from '@/components/MessageInput';

interface Message {
  id: string;
  senderName: string;
  timestamp: string;
  message: string;
}

// Sample data for demonstration
const sampleMessages: Message[] = [
  {
    id: '1',
    senderName: 'Ali Khan',
    timestamp: '2:00pm',
    message: 'how are you',
  },
  {
    id: '2',
    senderName: 'Ali Khan',
    timestamp: '2:10pm',
    message: 'how are you',
  },
  {
    id: '3',
    senderName: 'Ali Khan',
    timestamp: '2:11pm',
    message: 'how are you',
  },
  // Date separator will be inserted here
  {
    id: '4',
    senderName: 'Ali Khan',
    timestamp: '1:00pm',
    message: 'how are you',
  },
  {
    id: '5',
    senderName: 'Ali Khan',
    timestamp: '2:10pm',
    message: 'how are you',
  },
  {
    id: '6',
    senderName: 'Ali Khan',
    timestamp: '2:11pm',
    message: 'how are you',
  },
  {
    id: '7',
    senderName: 'Ali Khan',
    timestamp: '3:11pm',
    message: 'how are you',
  },
];

export default function MessagesScreen() {
  const [messages, setMessages] = useState(sampleMessages);

  const handleSendMessage = (newMessage: string) => {
    const newMessageItem = {
      id: Date.now().toString(),
      senderName: 'You',
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      message: newMessage,
    };
    setMessages(prev => [...prev, newMessageItem]);
  };

  return (
    <ThemedView style={styles.container} backgroundType="background">
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* First set of messages */}
        {messages.slice(0, 3).map((message) => (
          <MessageItem
            key={message.id}
            senderName={message.senderName}
            timestamp={message.timestamp}
            message={message.message}
          />
        ))}
        
        {/* Date separator */}
        <DateSeparator date="Yesterday" />
        
        {/* Second set of messages */}
        {messages.slice(3).map((message) => (
          <MessageItem
            key={message.id}
            senderName={message.senderName}
            timestamp={message.timestamp}
            message={message.message}
          />
        ))}
      </ScrollView>
      
      {/* Message input at bottom */}
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
  },
  scrollContent: {
    paddingBottom: 10,
  },
});
