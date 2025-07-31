import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

const OrDivider = () => {

  const backgroundColor = useThemeColor({}, 'borderDivider');
  
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
      backgroundColor,
    },
    text: {
      textAlign: 'center',
      marginHorizontal: 8,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <ThemedText style={styles.text} variant='caption'>Or</ThemedText>
      <View style={styles.line} />
    </View>
  );
}

export default OrDivider; 