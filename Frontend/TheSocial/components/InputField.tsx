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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 2,
    width: 380,
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    lineHeight: 19,
    letterSpacing: -0.02,
    color: '#202124',
    marginBottom: 2,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 14,
    width: 380,
    height: 46,
    backgroundColor: '#FAFAFA',
    borderColor: '#BABCBE',
    borderWidth: 1,
    borderRadius: 50,
    boxShadow: '0px 1px 2px rgba(228, 229, 231, 0.24)',
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.01,
    color: '#1A1C1E',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});

export default InputField; 