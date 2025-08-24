import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import MainButton from '@/components/MainButton';
import { Typography } from '@/constants/Typography';

interface EditProfileHeaderProps {
  username: string;
  profileImage?: string;
  bannerColor?: string;
  onUsernameChange: (username: string) => void;
  onBannerEdit: () => void;
  onProfileEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export const EditProfileHeader: React.FC<EditProfileHeaderProps> = ({
  username,
  profileImage,
  bannerColor,
  onUsernameChange,
  onBannerEdit,
  onProfileEdit,
  onCancel,
  onSave,
}) => {
  const profileBorderColor = useThemeColor({}, 'background');
  const profileSurfaceColor = useThemeColor({}, 'textPrimary');
  const surfaceColor = useThemeColor({}, 'surface');
  const textSecondaryColor = useThemeColor({}, 'textSecondary');
  const [inputValue, setInputValue] = useState(username);

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
      borderRadius: 45,
      borderWidth: 4,
      backgroundColor: profileSurfaceColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -70, // Overlap with banner
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
      width: 88,
      height: 88,
      borderRadius: 45,
      backgroundColor: profileSurfaceColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    userSection: {
      flex: 1,
      marginTop: 40,
    },
    usernameInput: {
      ...Typography.body,
      color: textSecondaryColor,
      marginTop: 8,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingVertical: 16,
      paddingHorizontal: 24,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
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
            {profileImage ? (
              <View style={styles.profileImagePlaceholder}>
                <Image
                  source={{ uri: profileImage?.startsWith('http://') || profileImage?.startsWith('https://')
                    ? `${profileImage}?cache=${Math.random()}`
                    : profileImage }} 
                  style={{ width: 88, height: 88, borderRadius: 45 }} 
                />
              </View>
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Ionicons name="person" size={45} color={textSecondaryColor} />
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
                    onUsernameChange(text);
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