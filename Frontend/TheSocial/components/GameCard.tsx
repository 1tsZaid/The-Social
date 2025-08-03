import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export type GameCardProps = {
  title: string;
  subtitle: string;
  icon: string;
  onPress?: () => void;
};

export function GameCard({ title, subtitle, icon, onPress }: GameCardProps) {
  const surfaceColor = useThemeColor({}, 'surface');
  const textSecondaryColor = useThemeColor({}, 'textSecondary');
  
  return (
    <ThemedView 
      style={styles.container}
      backgroundType="surface"
    >
      <View style={styles.iconContainer}>
        <ThemedView style={styles.iconBackground}>
          <ThemedText style={styles.icon}>
            {icon}
          </ThemedText>
        </ThemedView>
      </View>
      
      <View style={styles.contentContainer}>
        <ThemedText 
          style={styles.title}
          colorType="textPrimary"
          variant="body"
        >
          {title}
        </ThemedText>
        
        <ThemedText 
          style={styles.subtitle}
          colorType="textSecondary"
          variant="caption"
        >
          {subtitle}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  iconBackground: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#3A3A3A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 30,
  },
  contentContainer: {
    alignItems: 'center',
  },
  title: {
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
}); 