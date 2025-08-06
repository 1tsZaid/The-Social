import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Typography } from '@/constants/Typography';

interface CommunityFormFieldProps extends TextInputProps {
  label: string;
  placeholder: string;
  multiline?: boolean;
  showLocationIcon?: boolean;
}

export function CommunityFormField({ 
  label, 
  placeholder, 
  multiline = false, 
  showLocationIcon = false,
  ...textInputProps 
}: CommunityFormFieldProps) {
  const backgroundColor = useThemeColor({}, 'surface');
  const borderColor = useThemeColor({}, 'borderDivider');
  const textColor = useThemeColor({}, 'textPrimary');
  const placeholderColor = useThemeColor({}, 'borderDivider');
  const iconColor = useThemeColor({}, 'textSecondary');

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label} variant="bodySmall" colorType="textSecondary">
        {label}
      </ThemedText>
      <View style={[styles.inputContainer, { backgroundColor, borderColor }]}>
        <TextInput
          style={[
            styles.input,
            Typography.body,
            { color: textColor },
            multiline && styles.multilineInput
          ]}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          textAlignVertical={multiline ? 'top' : 'center'}
          {...textInputProps}
        />
        {showLocationIcon && (
          <Ionicons 
            name="location" 
            size={20} 
            color={iconColor} 
            style={styles.locationIcon} 
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  multilineInput: {
    paddingTop: 12,
    paddingBottom: 12,
    minHeight: 120,
  },
  locationIcon: {
    marginLeft: 8,
  },
}); 