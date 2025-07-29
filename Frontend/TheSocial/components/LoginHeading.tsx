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
    height: 100,
  },
  heading: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 32,
    lineHeight: 40,
    color: '#1A1C1E',
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