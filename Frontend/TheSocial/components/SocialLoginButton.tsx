import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View} from 'react-native';

import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';

interface SocialLoginButtonProps {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ title, icon, onPress}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <ThemedView style={[styles.button]} backgroundType='surface'>
      <View style={styles.icon}>{icon}</View>
      <ThemedText style={styles.text} variant='button' colorType='textPrimary'>{title}</ThemedText>
    </ThemedView>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    gap: 10,
    width: "100%",
    height: 45,
    borderRadius: 50,
    marginBottom: 15,
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    flex: 1,
  },
});

export default SocialLoginButton; 