import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  title: string;
  onPress?: () => void;
  ColorType?: 'textPrimary' | 'textSecondary';
  chevron?: boolean;
  children?: React.ReactNode; // for dropdown items
}

export const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  color,
  title,
  onPress,
  chevron = false,
  ColorType = 'textPrimary',
  children,
}) => {
  const [expanded, setExpanded] = useState(false);
  const iconBackgroundColor = useThemeColor({}, 'background');

  const styles = StyleSheet.create({
    container: {
      marginBottom: 8,
      borderRadius: 8, // rounded corners for the whole block
      overflow: 'hidden', // ensures children respect radius
    },
    item: {
      height: 52,
      justifyContent: 'center',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      height: '100%',
    },
    icon: {
      textAlign: 'center',
      width: 43,
      height: 43,
      backgroundColor: iconBackgroundColor,
      borderRadius: 100,
      padding: 5,
      paddingTop: 8,
      marginRight: 12,
    },
    title: {
      flex: 1,
    },
    chevronContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    chevron: {
      fontSize: 22,
      transform: [{ rotate: expanded ? '90deg' : '0deg' }],
    },
    dropdown: {
      borderTopWidth: 1,
      paddingBottom: 10,
      paddingTop: 10,
    },
  });

  const handlePress = () => {
    if (children) {
      setExpanded(!expanded);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <ThemedView style={styles.container} backgroundType="surface">
      <TouchableOpacity onPress={handlePress}>
        <ThemedView backgroundType="surface" style={styles.item}>
          <View style={styles.content}>
            <Ionicons
              name={icon}
              size={25}
              color={color}
              style={styles.icon}
            />
            <ThemedText
              variant="body"
              colorType={ColorType}
              style={styles.title}
            >
              {title}
            </ThemedText>
            {(children || chevron) && (
              <View style={styles.chevronContainer}>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="gray"
                  style={styles.chevron}
                />
              </View>
            )}
          </View>
        </ThemedView>
      </TouchableOpacity>

      {expanded && children && (
        <View style={styles.dropdown}>{children}</View>
      )}
    </ThemedView>
  );
};
