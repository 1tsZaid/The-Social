import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

interface CommunityIconUploadProps {
  uri: string | null;
  onPress: () => void;
}

export function CommunityIconUpload({ uri, onPress }: CommunityIconUploadProps) {
  const borderColor = useThemeColor({}, 'borderDivider');
  const iconColor = useThemeColor({}, 'borderDivider');

  return (
    <View style={styles.container}>
      {uri ? (
        <View style={[styles.iconContainer, { borderColor }]}>
          <Image source={{ uri }} style={{ width: 112, height: 112, borderRadius: 56 }} />
        </View>
      ) : (
        <TouchableOpacity 
          style={[styles.iconContainer, { borderColor }]} 
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Ionicons name="camera" size={24} color={iconColor} />
          <Ionicons name="add" size={16} color={iconColor} style={styles.plusIcon} />
        </TouchableOpacity>
      )}
      <ThemedText style={styles.label} variant="caption" colorType="textSecondary">
        Upload Community Icon
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconContainer: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  plusIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  label: {
    textAlign: 'center',
  },
}); 