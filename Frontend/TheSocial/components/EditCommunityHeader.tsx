import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import MainButton from '@/components/MainButton';
import { Typography } from '@/constants/Typography';

interface EditProfileHeaderProps {
  communityName: string;
  description?: string;
  communityImage?: string;
  bannerColor?: string;
  onNameChange: (username: string) => void;
  onDescriptionChange: (description: string) => void;
  onBannerEdit: () => void;
  onProfileEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export const EditCommunityHeader: React.FC<EditProfileHeaderProps> = ({
  communityName,
  description,
  communityImage,
  bannerColor,
  onNameChange,
  onDescriptionChange,
  onBannerEdit,
  onProfileEdit,
  onCancel,
  onSave,
}) => {
  const profileBorderColor = useThemeColor({}, 'background');
  const profileSurfaceColor = useThemeColor({}, 'textPrimary');
  const surfaceColor = useThemeColor({}, 'surface');
  const textSecondaryColor = useThemeColor({}, 'textSecondary');

  const [inputValue, setInputValue] = useState(communityName);
  const [descValue, setDescValue] = useState(description);

  useEffect(() => {
    setInputValue(communityName);
    setDescValue(description);
  }, [communityName, description]);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      flex: 1,
    },
    banner: {
      height: 144,
    },
    bannerEditButton: {
      position: 'absolute',
      right: 16,
      bottom: 16,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: surfaceColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingTop: 20,
      paddingBottom: 80,
    },
    profilePictureContainer: {
      marginRight: 16,
      position: 'absolute',
    },
    profilePicture: {
      width: 96,
      height: 96,
      borderRadius: 20,
      backgroundColor: profileBorderColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Platform.OS === 'web' ? -70 : -55, // Overlap with banner
    },
    profileEditButton: {
      position: 'absolute',
      right: -8,
      bottom: -8,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: surfaceColor,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: profileBorderColor,
    },
    profileImagePlaceholder: {
      width: 96,
      height: 96,
      borderRadius: 20,
      backgroundColor: profileSurfaceColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    userSection: {
      marginTop: 40,
      width: '100%',
    },
    usernameInput: {
      ...Typography.body,
      color: textSecondaryColor,
      textAlign: 'center',
      marginTop: 8,
    },
    usernameBio: {
      ...Typography.body,
      color: textSecondaryColor,
      textAlign: 'center',
      marginTop: 8,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingVertical: 16,
      paddingHorizontal: 24,

    },
  });

  return (
    <View style={styles.container}>
      <View style={[styles.banner, { backgroundColor: bannerColor }]}>
        <TouchableOpacity 
          style={styles.bannerEditButton} 
          onPress={onBannerEdit}
        >
          <Ionicons name="brush" size={24} color={textSecondaryColor} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.profilePictureContainer}>
          <View style={[styles.profilePicture, { borderColor: profileBorderColor }]}>
            {communityImage ? (
              <Image
                source={{ uri: communityImage?.startsWith('http://') || communityImage?.startsWith('https://')
                  ? `${communityImage}?cache=${Math.random()}`
                  : communityImage }} 
                style={{ width: 96, height: 96, borderRadius: 20 }} 
                />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <ThemedText 
                  variant="h2"
                  style={{ fontWeight: 'bold', fontSize: 45, color: bannerColor }}
                >
                  {communityName?.charAt(0).toUpperCase()}
                </ThemedText>
              </View>
            )}
          </View>
          <TouchableOpacity 
            style={styles.profileEditButton} 
            onPress={onProfileEdit}
          >
            <Ionicons name="brush" size={18} color={textSecondaryColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.userSection}>
            <TextInput
                style={styles.usernameInput}
                value={inputValue}
                onChangeText={(text) => {
                    setInputValue(text);
                    onNameChange(text);
                }}
                onBlur={() => onSave()}
                placeholderTextColor={textSecondaryColor}
            />
            <TextInput
                style={styles.usernameBio}
                value={descValue}
                onChangeText={(text) => {
                    setDescValue(text);
                    onDescriptionChange(text);
                }}
                onBlur={() => onSave()}
                placeholderTextColor={textSecondaryColor}
            />
            
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <MainButton title="Cancel" onPress={onCancel} />
        <MainButton title="Save" onPress={onSave} />
      </View>
    </View>
  );
};