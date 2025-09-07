import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

interface CommunityMemberRowProps {
  name: string;
  imageUrl?: string;
  banner: string;
  onPromote: () => void;
  onKick: () => void;
}

export const CommunityMemberRow: React.FC<CommunityMemberRowProps> = ({ name, imageUrl, banner, onPromote, onKick }) => {
  const borderColor = useThemeColor({}, 'borderDivider');
  const iconColor = useThemeColor({}, 'textPrimary');

  const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftColor: banner,
    borderRadius: 10,
    borderWidth: 8,
    padding: 15,
    marginVertical: 6,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 45,
    marginRight: 8,
    backgroundColor: banner,
  },
  name: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: borderColor,
  },
  profileImagePlaceholder: {
      width: 44,
      height: 44,
      borderRadius: 45,
      backgroundColor: iconColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
    },
  });

  return (
    <View style={styles.container}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.avatar}
        />
      ) : (
          <View style={styles.profileImagePlaceholder}>
            <ThemedText 
            variant="h2"
            style={{ fontWeight: 'bold', fontSize: 25, color: banner}}
            >
            {name?.charAt(0).toUpperCase()}
            </ThemedText>
          </View>
      )}
      <ThemedText variant='body' colorType='textPrimary' style={styles.name}>{name}</ThemedText>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={onPromote}>
          <ThemedText variant='bodySmall' colorType='blue'>Promote</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onKick}>
          <ThemedText variant='bodySmall' colorType='red' >Kick</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};