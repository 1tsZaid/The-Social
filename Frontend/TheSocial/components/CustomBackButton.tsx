import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function CustomBackButton() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'surface');
  const iconColor = useThemeColor({}, 'textSecondary');

  return (
    <TouchableOpacity 
      onPress={() => router.back()}
      style={[styles.backButton, { backgroundColor }]}
    >
      <MaterialIcons name="arrow-back" size={24} color={iconColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
}); 