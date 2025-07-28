import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Logo = () => (
  <View style={styles.container}>
    <Image
      source={require('@/assets/images/logo-icon.png')}
      style={styles.logo}
      resizeMode="contain"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 1,
    gap: 10,
    width: 328,
    height: 77,
  },
  logo: {
    width: 200,
    height: 75,
  },
});

export default Logo; 