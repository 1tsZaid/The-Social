import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

interface AddToPhotoIconProps {
  onPress: () => void;
}

const AddToPhotoIcon: React.FC<AddToPhotoIconProps> = ({ onPress }) => {
  const color = useThemeColor({}, 'textPrimary');
  return (
    <ThemedView style={styles.container} backgroundType="surface">
      <TouchableOpacity onPress={onPress}>
        <MaterialIcons name="add-to-photos" size={32} color={color} />
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    padding: 8,
    borderRadius: 8,
  },
});

export default AddToPhotoIcon;