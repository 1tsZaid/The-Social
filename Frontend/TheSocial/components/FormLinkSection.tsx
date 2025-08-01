import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';

interface FormLinkSectionProps {
  onPress: () => void;
  linkText: string;
  children: string;
}

const FormLinkSection: React.FC<FormLinkSectionProps> = ({ onPress, linkText, children }) => (
  <ThemedView style={styles.container}>
    <ThemedText variant='caption'>{children}</ThemedText>
    <TouchableOpacity onPress={onPress}>
      <ThemedText variant='link' colorType='blue'>{linkText}</ThemedText>
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

export default FormLinkSection; 