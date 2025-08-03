import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export type GameListItemProps = {
  title: string;
  description: string;
  icon: string;
  onPress?: () => void;
};

export function GameListItem({ title, description, icon, onPress }: GameListItemProps) {
  const surfaceColor = useThemeColor({}, 'surface');
  const textSecondaryColor = useThemeColor({}, 'textSecondary');
  
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
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
            colorType="textSecondary"
            variant="bodySmall"
          >
            {description}
          </ThemedText>
        </View>
        
        <View style={styles.chevronContainer}>
          <ThemedText style={styles.chevron}>
            ›
          </ThemedText>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  iconContainer: {
    marginRight: 16,
  },
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#3A3A3A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
  chevronContainer: {
    marginLeft: 8,
  },
  chevron: {
    fontSize: 24,
    fontWeight: '400',
  },
}); 