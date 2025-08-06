import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  title: string;
  onPress: () => void;
}

export const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  color,
  title,
  onPress,
}) => {
  const iconBackgroundColor = useThemeColor({}, 'background');
  
  const styles = StyleSheet.create({
    container: {
      marginBottom: 8,
    },
    item: {
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
    title: {
      flex: 1,
    },
    chevronContainer: {
      marginLeft: 8,
      marginBottom: 3,
    },
    chevron: {
      fontSize: 30,
      fontWeight: '400',
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <ThemedView backgroundType="surface" style={styles.item}>
        <View style={styles.content}>
          <Ionicons 
            name={icon} 
            size={24} 
            color={color} 
            style={styles.icon}
          />
          <ThemedText 
            variant="body" 
            colorType="textPrimary"
            style={styles.title}
          >
            {title}
          </ThemedText>
          <View style={styles.chevronContainer}>
          <ThemedText style={styles.chevron} colorType='textSecondary'>
            ›
          </ThemedText>
        </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
};
