import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle } from 'react-native';

interface SocialLoginButtonProps {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ title, icon, onPress, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.8}>
    <View style={styles.icon}>{icon}</View>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    gap: 10,
    width: 380,
    height: 48,
    backgroundColor: '#FAFAFA',
    borderRadius: 50,
    marginBottom: 15,
    shadowColor: '#F4F5FA',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 2,
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.01,
    color: '#1A1C1E',
    textAlign: 'center',
    flex: 1,
  },
});

export default SocialLoginButton; 