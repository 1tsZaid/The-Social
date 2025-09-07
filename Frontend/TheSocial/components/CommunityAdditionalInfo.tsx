import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

interface CommunityAdditionalInfoProps {
  description: string;
  location: string;
}

export const CommunityAdditionalInfo: React.FC<CommunityAdditionalInfoProps> = ({
  description,
  location,
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
      justifyContent: 'center',
    },
    content: {
      paddingHorizontal: 16,
      paddingTop: 5,
      paddingBottom: 5,
      height: '100%',
    },
    title: {
      flex: 1,
      paddingVertical: 3,
    },
  });

  return (
    <ThemedView style={styles.container} backgroundType="surface">
      <ThemedView backgroundType="surface" style={styles.item}>
        <View style={styles.content}>
          <ThemedText
            variant="body"
            colorType='textSecondary'
            style={styles.title}
          >
            Description
          </ThemedText>
          <ThemedText
            variant="caption"
            colorType='textPrimary'
            style={styles.title}
          >
            {description}
          </ThemedText>
          <ThemedText
            variant="body"
            colorType='textSecondary'
            style={[styles.title, { marginTop: 8}]}
          >
            Location
          </ThemedText>
          <ThemedText
            variant="caption"
            colorType='textPrimary'
            style={styles.title}
          >
            {location}
          </ThemedText>
        </View>
      </ThemedView>
    </ThemedView>
  );
};
