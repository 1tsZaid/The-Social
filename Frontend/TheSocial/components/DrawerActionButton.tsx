import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

interface DrawerActionButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

export function DrawerActionButton({ icon, title, onPress, style }: DrawerActionButtonProps) {
  const accentColor = useThemeColor({}, 'accent');

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name={icon} size={24} color={accentColor} />
      <ThemedText
        variant="body"
        colorType="textPrimary"
      >
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 4,
  },
}); 