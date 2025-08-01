import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from './ThemedText';

interface CommunityGuidelinesLinkProps {
  onPress?: () => void;
}

export function CommunityGuidelinesLink({ onPress }: CommunityGuidelinesLinkProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.text} variant="caption">
        By creating a community, you agree to the{' '}
        <ThemedText 
          style={styles.link} 
          variant="link" 
          onPress={onPress}
        >
          Social's Community Guidelines
        </ThemedText>
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 4,
  },
  text: {
    textAlign: 'center',
  },
  link: {
    textDecorationLine: 'underline',
  },
}); 