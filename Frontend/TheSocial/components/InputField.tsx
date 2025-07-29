import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  rightIcon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChangeText, placeholder, secureTextEntry, rightIcon }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputArea}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6C7278"
        secureTextEntry={secureTextEntry}
      />
      {rightIcon && <TouchableOpacity>{rightIcon}</TouchableOpacity>}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 70,
    gap: 2,
    marginBottom: 8,
    marginTop: 8,
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    lineHeight: 19,
    color: '#202124',
    marginBottom: 2,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 14,
    height: 45,
    backgroundColor: '#FAFAFA',
    borderColor: '#BABCBE',
    borderWidth: 1,
    borderRadius: 50,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1A1C1E',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});

export default InputField; 