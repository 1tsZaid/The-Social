import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import {ThemedText} from '@/components/ThemedText';
import { Typography } from '@/constants/Typography';
import { useThemeColor } from '@/hooks/useThemeColor';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  rightIcon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChangeText, placeholder, secureTextEntry, rightIcon }) => {
  const backgroundColor = useThemeColor({}, 'surface');
  const borderColor = useThemeColor({}, 'borderDivider')
  const color = useThemeColor({}, 'textPrimary');
  const placeholderTextColor = useThemeColor({}, 'borderDivider')
  
  const styles = StyleSheet.create({
    container: {
      height: 70,
      gap: 2,
      marginBottom: 8,
      marginTop: 8,
    },
    label: {
      marginBottom: 2,
    },
    inputArea: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 0,
      paddingHorizontal: 14,
      height: 45,
      backgroundColor,
      borderColor,
      borderWidth: 1,
      borderRadius: 50,
    },
    input: {
      flex: 1,
      color,
      paddingVertical: 0,
      paddingHorizontal: 0,
    },
  });

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label} variant='caption'>{label}</ThemedText>
      <View style={styles.inputArea}>
        <TextInput
          style={[styles.input, Typography.body]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={secureTextEntry}
        />
        {rightIcon && <TouchableOpacity>{rightIcon}</TouchableOpacity>}
      </View>
    </View>
  );
}


export default InputField; 