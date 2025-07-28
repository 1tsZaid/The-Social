import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ForgotPasswordLinkProps {
  onPress: () => void;
}

const ForgotPasswordLink: React.FC<ForgotPasswordLinkProps> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Text style={styles.text}>Forgot Password ?</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: 380,
    alignItems: 'flex-end',
    marginTop: 8,
    marginBottom: 16,
  },
  text: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: -0.01,
    color: '#2196F3',
    textAlign: 'right',
  },
});

export default ForgotPasswordLink; 