import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Typography } from '@/constants/Typography';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface MessageInputProps {
  onSendMessage?: (message: string) => void;
  placeholder?: string;
}

export function MessageInput({ 
  onSendMessage, 
  placeholder = "Text Message" 
}: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && onSendMessage) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const placeholderTextColor = useThemeColor({}, 'borderDivider');
  const borderColor = useThemeColor({}, 'borderDivider');
  const color = useThemeColor({}, 'textSecondary');
  const buttonBackground = useThemeColor({}, 'textPrimary');
  
  const theme = useColorScheme() ?? 'light';
  const buttonColor = theme == 'light' ? Colors.light.surface : Colors.dark.background;

  
  const styles = StyleSheet.create({
    container: {
      paddingVertical: 5,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 16,
    },
    textInput: {
      flex: 1,
      height: 46,
      borderWidth: 1,
      borderColor,
      borderRadius: 50,
      paddingHorizontal: 20,
      paddingVertical: 12,
      color,
      ...Typography,
    },
    sendButton: {
      width: 40,
      height: 40,
      backgroundColor: buttonBackground,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendIcon: {
      fontSize: 20,
      color: buttonColor,
    },
  }); 

  return (
    <ThemedView style={styles.container} backgroundType="background">
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          multiline={false}
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSend}
          activeOpacity={0.7}
        >
          <ThemedText style={styles.sendIcon} colorType="textPrimary">
            ➤
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}
