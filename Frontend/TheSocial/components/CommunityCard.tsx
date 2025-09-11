import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { Image } from 'react-native';

interface CommunityCardProps {
  title: string;
  description: string;
  memberCount: number;
  location: string;
  bannerColor: string;
  imageUrl?: string;
  iconName: string;
  distance?: string; // distance in meters, optional
  onJoinPress?: () => void;
}

export function CommunityCard({
  title,
  description,
  memberCount,
  location,
  bannerColor,
  imageUrl,
  iconName,
  distance,
  onJoinPress,
}: CommunityCardProps) {
  const backgroundColor = useThemeColor({}, 'surface');
  const borderColor = useThemeColor({}, 'borderDivider');
  const buttonBackgroundColor = useThemeColor({}, 'textPrimary');
  const iconColor = useThemeColor({}, 'textSecondary');

  const logoBackground = useThemeColor({}, 'background');
  
  const styles = StyleSheet.create({
    container: {
      borderRadius: 12,
      borderWidth: 1,
      marginBottom: 20,
      overflow: 'hidden',
    },
    banner: {
      height: 96,
      width: '100%',
    },
    iconContainer: {
      position: 'absolute',
      top: 48,
      alignSelf: 'center',
      width: 96,
      height: 96,
      borderRadius: 20,
      borderWidth: 4,
      borderColor: logoBackground,
      backgroundColor: logoBackground,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconText: {
      marginTop: 4,
      fontSize: 8,
    },
    content: {
      paddingTop: 60,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    title: {
      textAlign: 'center',
      marginBottom: 12,
    },
    metaContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 12,
      gap: 20,
    },
    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    metaText: {
      marginLeft: 4,
    },
    description: {
      textAlign: 'center',
      marginBottom: 12,
      lineHeight: 20,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
      gap: 4,
    },
    locationText: {
      marginLeft: 4,
    },
    joinButton: {
      height: 44,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }); 

  return (
    <ThemedView style={[styles.container, { backgroundColor, borderColor }]} backgroundType="surface">
      {/* Banner */}
      <View style={[styles.banner, { backgroundColor: bannerColor }]} />
      
      {/* Community Icon */}
      { imageUrl ? (
        <View style={styles.iconContainer}>
          <Image source={{ uri: imageUrl }} style={{ width: 96, height: 96, borderRadius: 20, }} />
        </View>
      ) : (
        <View style={styles.iconContainer}>
          <Ionicons name={iconName as any} size={32} color={bannerColor} />
        </View> 
      )}
      
      {/* Content */}
      <View style={styles.content}>
        <ThemedText style={styles.title} variant="h4" colorType="textPrimary">
          {title}
        </ThemedText>
        
        {/* Location and Members */}
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Ionicons name="location" size={14} color={iconColor} />
            <ThemedText style={styles.metaText} variant="bodySmall" colorType="textSecondary">
              {distance ? `${distance}m` : 'Nearby'}
            </ThemedText>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="people" size={14} color={iconColor} />
            <ThemedText style={styles.metaText} variant="bodySmall" colorType="textSecondary">
              {memberCount} Members
            </ThemedText>
          </View>
        </View>
        
        {/* Description */}
        <ThemedText style={styles.description} variant="bodySmall" colorType="textSecondary">
          {description}
        </ThemedText>
        
        {/* Specific Location */}
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={12} color={iconColor} />
          <ThemedText style={styles.locationText} variant="caption" colorType="textSecondary">
            {location}
          </ThemedText>
        </View>
        
        {/* Join Button */}
        <TouchableOpacity 
          style={[styles.joinButton, { backgroundColor: buttonBackgroundColor }]}
          onPress={onJoinPress}
        >
          <ThemedText variant="button" lightColor={Colors.dark.textPrimary} darkColor={Colors.light.textPrimary}>
            Join Community
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}
