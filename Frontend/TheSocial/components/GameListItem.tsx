import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export type GameListItemProps = {
  title: string;
  description: string;
  icon: string;
  banner: string;
  onPress?: () => void;
};

export function GameListItem({ title, description, icon, banner, onPress }: GameListItemProps) {
  const surfaceColor = useThemeColor({}, 'surface');
  const textSecondaryColor = useThemeColor({}, 'textSecondary');
  
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
      backgroundColor: banner + '80',
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
      fontSize: 30,
      fontWeight: '400',
    },
  }); 

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
          <ThemedText style={styles.chevron} colorType='textSecondary'>
            ›
          </ThemedText>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}
