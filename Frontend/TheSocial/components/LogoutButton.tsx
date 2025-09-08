import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

interface LogoutButtonProps {
  onLogout: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const redColor = useThemeColor({}, 'red');
  const iconBackgroundColor = useThemeColor({}, 'background');
  
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      marginTop: 10,
      marginBottom: 0,
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
      backgroundColor: redColor + '40',
      borderRadius: 100,
      padding: 5,
      paddingTop: 9,
      marginRight: 12,
    },
  });

  return (
    <TouchableOpacity onPress={onLogout} style={styles.container}>
      <ThemedView backgroundType="surface" style={styles.button}>
        <View style={styles.content}>
          <Ionicons 
            name="log-out-outline" 
            size={24} 
            color={redColor} 
            style={styles.icon}
          />
          <ThemedText 
            variant="body" 
            colorType="red"
          >
            Log Out
          </ThemedText>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
};
