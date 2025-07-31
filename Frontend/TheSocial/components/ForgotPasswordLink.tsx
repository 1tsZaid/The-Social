import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import {ThemedText} from '@/components/ThemedText';

interface ForgotPasswordLinkProps {
  onPress: () => void;
}

const ForgotPasswordLink: React.FC<ForgotPasswordLinkProps> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <ThemedText style={styles.text} variant='link' colorType='blue'>Forgot Password ?</ThemedText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  text: {
    textAlign: 'right',
  },
});

export default ForgotPasswordLink; 