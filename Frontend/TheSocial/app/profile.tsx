import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';
import { ProfileHeader } from '@/components/ProfileHeader';
import { SettingsList } from '@/components/SettingsList';
import { LogoutButton } from '@/components/LogoutButton';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function ProfileScreen() {
  const userData = {
    username: 'UserName',
    joinedDate: 'January 2024',
    profileImage: undefined,
    bannerColor: "#FF8000",
  };

  const divderColor = useThemeColor({}, 'borderDivider')

  const handleEditProfile = () => {
    // Navigate to edit profile screen
    console.log('Edit Profile pressed');
  };

  const handleNotification = () => {
    // Navigate to notifications screen
    console.log('Notification pressed');
  };

  const handleMyAccount = () => {
    console.log('My Account pressed');
  };

  const handleAppearance = () => {
    console.log('Appearance pressed');
  };

  const handlePermissions = () => {
    console.log('Permissions pressed');
  };

  const handlePrivacySafety = () => {
    console.log('Privacy & Safety pressed');
  };

  const handleBilling = () => {
    console.log('Billing pressed');
  };

  const handleSupport = () => {
    console.log('Support pressed');
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            // Handle logout logic here
            console.log('User logged out');
            router.replace('/login');
          },
        },
      ]
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    divider: {
      height: 1,
      backgroundColor: divderColor,
      marginHorizontal: 25,
      marginTop: 20, 
    },
    bottomSpacing: {
      height: 40,
    },
  });

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <ProfileHeader
          username={userData.username}
          joinedDate={userData.joinedDate}
          profileImage={userData.profileImage}
          bannerColor={userData.bannerColor}
          onEditProfile={handleEditProfile}
          onNotification={handleNotification}
        />
        
        {/* Divider */}
        <View style={styles.divider} />
        
        {/* Settings List */}
        <SettingsList
          onMyAccount={handleMyAccount}
          onAppearance={handleAppearance}
          onPermissions={handlePermissions}
          onPrivacySafety={handlePrivacySafety}
          onBilling={handleBilling}
          onSupport={handleSupport}
        />
        
        {/* Logout Button */}
        <LogoutButton onLogout={handleLogout} />
        
        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </ThemedView>
  );
}
