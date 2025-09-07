import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

interface LogoutButtonProps {
  onDelete: () => void;
}

export const DeleteButton: React.FC<LogoutButtonProps> = ({ onDelete }) => {
  const redColor = useThemeColor({}, 'red');
  const iconBackgroundColor = useThemeColor({}, 'background');
  
  const styles = StyleSheet.create({
    container: {
    },
    button: {
      height: 52,
      borderRadius: 8,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 14,
      height: '100%',
    },
    icon: {
      textAlign: 'center',
      width: 43,
      height: 43,
      backgroundColor: iconBackgroundColor,
      borderRadius: 100,
      padding: 5,
      paddingTop: 9,
      marginRight: 12,
    },
  });

  return (
    <TouchableOpacity onPress={onDelete} style={styles.container}>
      <ThemedView backgroundType="surface" style={styles.button}>
        <View style={styles.content}>
          <Ionicons 
            name="close-circle" 
            size={24} 
            color={redColor} 
            style={styles.icon}
          />
          <ThemedText 
            variant="body" 
            colorType="red"
          >
            Delete Community
          </ThemedText>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
};
