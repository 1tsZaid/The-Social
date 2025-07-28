import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface MainButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

const MainButton: React.FC<MainButtonProps> = ({ title, onPress, disabled, style }) => (
  <TouchableOpacity
    style={[styles.button, style, disabled && { opacity: 0.6 }]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.8}
  >
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    gap: 10,
    width: 380,
    height: 48,
    backgroundColor: '#FFA500',
    borderColor: '#202124',
    borderWidth: 3,
    borderRadius: 50,
    shadowColor: '#202124',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    marginBottom: 8,
  },
  text: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.01,
    color: '#202124',
    textAlign: 'center',
  },
});

export default MainButton; 