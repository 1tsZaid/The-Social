import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface HamburgerIconProps {
  onPress?: () => void;
  size?: number;
}

export function HamburgerIcon({ onPress, size = 25 }: HamburgerIconProps) {
  const iconColor = useThemeColor({}, 'textSecondary');

  return (
    <TouchableOpacity
      style={[styles.container, { width: size + 16, height: size + 16 }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { width: size, height: size }]}>
        <View style={[styles.line, { backgroundColor: iconColor, width: size * 0.75 }]} />
        <View style={[styles.line, { backgroundColor: iconColor, width: size * 0.75 }]} />
        <View style={[styles.line, { backgroundColor: iconColor, width: size * 0.75 }]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  iconContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 2,
  },
  line: {
    height: 3,
    borderRadius: 1,
  },
}); 