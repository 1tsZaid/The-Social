import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

interface PostHeaderProps {
  user: {
    name: string;
    avatar?: string;
  };
  timestamp: string;
  onOptions?: () => void;
}

export function PostHeader({ user, timestamp, onOptions }: PostHeaderProps) {
  const iconColor = useThemeColor({}, 'borderDivider');
  const dotColor = useThemeColor({}, 'textSecondary');
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingTop: 10,
      paddingBottom: 15,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      gap: 10,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 10,
      backgroundColor: '#99A2AD',
    },
    userDetails: {
      flex: 1,
      gap: 1,
    },
    timestampContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
    },
    optionsButton: {
      padding: 5,
      borderRadius: 15,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    optionsIcon: {
      flexDirection: 'row',
      gap: 2,
    },
    dot: {
      width: 3,
      height: 3,
      backgroundColor: dotColor,
      borderRadius: 1.5,
    },
  }); 

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        {/* Avatar placeholder */}
        <View style={styles.avatar} />
        
        <View style={styles.userDetails}>
          <ThemedText
            colorType="textPrimary"
            variant="body"
          >
            {user.name}
          </ThemedText>
          
          <View style={styles.timestampContainer}>
            <Ionicons name="time-outline" size={16} color={iconColor} />
            <ThemedText
              colorType="textSecondary"
              variant="caption"
            >
              {timestamp}
            </ThemedText>
          </View>
        </View>
      </View>
      
      <TouchableOpacity style={styles.optionsButton} onPress={onOptions}>
        <View style={styles.optionsIcon}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
