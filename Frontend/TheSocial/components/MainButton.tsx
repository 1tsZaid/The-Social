import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

interface MainButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

const MainButton: React.FC<MainButtonProps> = ({ title, onPress, disabled, style }) => (
  <Shadow stretch={true} distance={0} startColor={'#202124'} endColor={'#202124'} offset={[4, 4]}>
    <TouchableOpacity
      style={[styles.button, style, disabled && { opacity: 0.6 }]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  </Shadow>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    height: 45,
    backgroundColor: '#FFA500',
    borderColor: '#202124',
    borderWidth: 3,
    borderRadius: 50,
    shadowColor: '#202124',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: '#202124',
    textAlign: 'center',
  },
});

export default MainButton; 