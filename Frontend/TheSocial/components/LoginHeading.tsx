import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoginHeading = () => (
  <View style={styles.container}>
    <Text style={styles.heading}>WELCOME BACK!</Text>
    <Text style={styles.subtitle}>Ready to discover who’s around?</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    width: 300,
    height: 64,
    marginBottom: 32,
  },
  heading: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 32,
    lineHeight: 42,
    letterSpacing: -0.02,
    color: '#1A1C1E',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: -0.01,
    color: '#6C7278',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default LoginHeading; 