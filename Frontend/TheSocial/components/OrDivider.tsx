import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrDivider = () => (
  <View style={styles.container}>
    <View style={styles.line} />
    <Text style={styles.text}>Or</Text>
    <View style={styles.line} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    width: 380,
    height: 18,
    marginVertical: 8,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#BABCBE',
  },
  text: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.01,
    color: '#6C7278',
    textAlign: 'center',
    marginHorizontal: 8,
  },
});

export default OrDivider; 