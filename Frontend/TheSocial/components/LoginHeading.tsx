import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

const LoginHeading = () => (
  <View style={styles.container}>
    <ThemedText style={styles.heading} variant='h1' colorType='textPrimary'>WELCOME BACK!</ThemedText>
    <ThemedText style={styles.subtitle}>Ready to discover who’s around?</ThemedText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
  heading: {
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 16,
    color: '#6C7278',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default LoginHeading; 