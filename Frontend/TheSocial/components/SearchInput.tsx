import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Typography } from '@/constants/Typography';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSearch?: () => void;
}

export function SearchInput({ 
  placeholder, 
  value, 
  onChangeText, 
  onSearch 
}: SearchInputProps) {
  const backgroundColor = useThemeColor({}, 'surface');
  const borderColor = useThemeColor({}, 'borderDivider');
  const textColor = useThemeColor({}, 'textPrimary');
  const iconColor = useThemeColor({}, 'textSecondary');

  return (
    <View style={[styles.container, { backgroundColor, borderColor }]}>
      <TextInput
        style={[styles.input, { color: textColor }]}
        placeholder={placeholder}
        placeholderTextColor={borderColor}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSearch}
      />
      <TouchableOpacity onPress={onSearch} style={styles.searchButton}>
        <Ionicons name="search" size={24} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    ...Typography.body,
    paddingVertical: 12,
  },
  searchButton: {
    padding: 8,
  },
}); 