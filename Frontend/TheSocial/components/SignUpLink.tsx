import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';

interface SignUpLinkProps {
  onPress: () => void;
}

const SignUpLink: React.FC<SignUpLinkProps> = ({ onPress }) => (
  <ThemedView style={styles.container}>
    <ThemedText variant='caption'>Don’t have an account? </ThemedText>
    <TouchableOpacity onPress={onPress}>
      <ThemedText variant='link' colorType='blue'>Sign Up</ThemedText>
    </TouchableOpacity>
  </ThemedView>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    width: "100%",
    height: 17,
    marginTop: 16,
    marginBottom: 8,
  },
});

export default SignUpLink; 