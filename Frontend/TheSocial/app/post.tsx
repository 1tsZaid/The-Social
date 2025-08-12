import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';
import { Typography } from '@/constants/Typography';
import { useThemeColor } from '../hooks/useThemeColor';

const PostScreen = () => {
  const router = useRouter();
  const [text, setText] = useState('');
  const color = useThemeColor({}, 'textPrimary');
  const placeholderTextColor = useThemeColor({}, 'borderDivider');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
    headerIcons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 80,
    },
    textInput: {
      padding: 16,
      color,
      borderWidth: 0,
    },
  });

  return (
    <ThemedView style={styles.container} backgroundType="background">
      <ThemedView style={styles.header} backgroundType="background">
        <TouchableOpacity>
          <Ionicons name="close" size={24} color={color} onPress={() => router.back()} />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="attach" size={24} color={color} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="send" size={24} color={color} />
          </TouchableOpacity>
        </View>
      </ThemedView>
      <TextInput
        style={[styles.textInput, Typography.body]}
        multiline
        value={text}
        onChangeText={setText}
        placeholder="Type a message..."
        placeholderTextColor={placeholderTextColor}
      />
    </ThemedView>
  );
};


export default PostScreen;