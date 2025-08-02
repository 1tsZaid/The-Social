import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';

interface MessageAvatarProps {
  size?: number;
}

export function MessageAvatar({ size = 36 }: MessageAvatarProps) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View 
        style={[styles.background, { width: size, height: size }]}
      />
      <View style={[styles.placeholder, { width: size, height: size }]}>
        {/* Placeholder shapes - triangle, square, gear */}
        <View style={styles.shapesContainer}>
          <View style={styles.triangle} />
          <View style={styles.square} />
          <View style={styles.gear} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  background: {
    position: 'absolute',
    borderRadius: 100,
    opacity: 0.3,
    backgroundColor: 'rgba(33, 150, 243, 0.3)',
  },
  placeholder: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: '#ECE6F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shapesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderBottomWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#5F6368',
  },
  square: {
    width: 4,
    height: 4,
    backgroundColor: '#5F6368',
    borderRadius: 1,
  },
  gear: {
    width: 6,
    height: 6,
    backgroundColor: '#5F6368',
    borderRadius: 3,
  },
}); 