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
    maxWidth: 300,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    width: 380,
    height: 18,
    marginVertical: 28,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#BABCBE',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: '#6C7278',
    textAlign: 'center',
    marginHorizontal: 8,
  },
});

export default OrDivider; 