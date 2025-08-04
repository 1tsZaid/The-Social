import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import MainButton from '@/components/MainButton';

interface ProfileHeaderProps {
  username: string;
  joinedDate: string;
  profileImage?: string;
  bannerColor?: string;
  onEditProfile: () => void;
  onNotification: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  joinedDate,
  profileImage,
  bannerColor,
  onEditProfile,
  onNotification,
}) => {
  const accentColor = useThemeColor({}, 'accent');
  const surfaceColor = useThemeColor({}, 'surface');
  const textSecondaryColor = useThemeColor({}, 'textSecondary');
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
    },
    banner: {
      height: 144,
    },
    content: {
      flexDirection: 'row',
      paddingHorizontal: 24,
      paddingTop: 20,
      paddingBottom: 20,
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
      backgroundColor: surfaceColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -75, // Overlap with banner
    },
    profileImagePlaceholder: {
      width: 88,
      height: 88,
      borderRadius: 45,
      backgroundColor: surfaceColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    userSection: {
      flex: 1,
      justifyContent: 'space-between',
      paddingTop: 30,
    },
    userInfo: {
      flex: 1,
      justifyContent: 'center',
    },
    usernameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    username: {
      flex: 1,
    },
    notificationButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: surfaceColor,
    },
    joinedInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    joinedText: {
      marginLeft: 4,
    },
    editButtonContainer: {
      marginTop: 16,
    },
  });

  return (
    <View style={styles.container}>

      <View style={[styles.banner, { backgroundColor: bannerColor }]} />
      
      <View style={styles.content}>
        <View style={styles.profilePictureContainer}>
          <View style={[styles.profilePicture, { borderColor: accentColor }]}>
            {profileImage ? (
              <View style={styles.profileImagePlaceholder}>
                {/* Image would be rendered here */}
              </View>
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Ionicons name="person" size={40} color={textSecondaryColor} />
              </View>
            )}
          </View>
        </View>
        
        {/* User Info and Button Section */}
        <View style={styles.userSection}>
          {/* User Info with Notification Button */}
          <View style={styles.userInfo}>
            <View style={styles.usernameRow}>
              <ThemedText 
                variant="h3" 
                colorType="textPrimary"
                style={styles.username}
              >
                {username}
              </ThemedText>
              
              <TouchableOpacity style={styles.notificationButton} onPress={onNotification}>
                <Ionicons name="notifications-outline" size={24} color={textSecondaryColor} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.joinedInfo}>
              <Ionicons name="calendar-outline" size={14} color={textSecondaryColor} />
              <ThemedText 
                variant="bodySmall" 
                colorType="textSecondary"
                style={styles.joinedText}
              >
                Joined {joinedDate}
              </ThemedText>
            </View>
          </View>
          
          {/* Edit Profile Button */}
          <View style={styles.editButtonContainer}>
            <MainButton 
              title="Edit Profile" 
              onPress={onEditProfile}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
