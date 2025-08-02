import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

interface DateSeparatorProps {
  date: string;
}

export function DateSeparator({ date }: DateSeparatorProps) {
  const backgroundColor = useThemeColor({}, 'borderDivider');

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      gap: 16,
      height: 18,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor,
    },
    dateText: {
      textAlign: 'center',
    },
  }); 

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <ThemedText 
        style={styles.dateText}
        colorType="textSecondary"
        variant="caption"
      >
        {date}
      </ThemedText>
      <View style={styles.line} />
    </View>
  );
}
