import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';

import { ProfileHeader } from '@/components/ProfileHeader';
import { SettingsList } from '@/components/SettingsList';
import { LogoutButton } from '@/components/LogoutButton';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useCommunities } from '@/components/CommunitiesContext';
import { useLeaderboard } from '@/components/LeaderboardContext';

import { deleteTokens, getTokens } from '@/utils/tokenStorage';
import { checkTokens } from '@/utils/checkTokens';
import { clearMessages } from '@/utils/messageStorage'

import socket from '@/services/socket';
import { getProfile, Profile, deleteAccount } from '@/services/profile';

export default function ProfileScreen() {
  const [userData, setUserData] = useState<Profile | undefined>(undefined);
  const divderColor = useThemeColor({}, 'borderDivider')
  const backgroundColor = useThemeColor({}, 'background');
  const isFocused = useIsFocused();
  const { resetCommunities } = useCommunities();
  const { resetLeaderboard } = useLeaderboard();

  useEffect(() => {
    if (isFocused) {
      fetchProfileData();
    } else {
      console.log('Profile Screen ❌');
    }
  }, [isFocused]);

  const fetchProfileData = async () => {
    const tokenFlag = await checkTokens();
    if (tokenFlag) {
      const profileData = await getProfile();
      setUserData(profileData);
      console.log('Profile data fetched:', profileData);
    } else {
      deleteTokens();
      router.replace('/login');
    }
  };

  if (!userData) {
    return <ActivityIndicator />;
  }

  const handleEditProfile = () => {
    // Navigate to edit profile screen
    router.push('/editProfile');
  };

  const handleNotification = () => {
    // Navigate to notifications screen
    console.log('Notification pressed');
  };

  const handleMyAccount = () => {
    console.log('My Account pressed');
  };

  const handleAccountDelete = async () => {
    // Clear Communities Context
    clearMessages();
    resetCommunities();
    resetLeaderboard();    

    // Handle delete Account logic
    const tokens = await getTokens();
    console.log('Tokens before logout:', tokens);
    socket.disconnect('/chat');

    await deleteAccount();

    console.log('User delete');
    await deleteTokens();
    console.log('Tokens after user delete:', await getTokens());
    router.replace('/login');
  };

  const handleChangePassword = () => {
    console.log('Change Password pressed');
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

  const handleLogout = async () => {
    // Clear Communities Context
    clearMessages();
    resetCommunities();
    resetLeaderboard();    

    // Handle logout logic
    const tokens = await getTokens();
    console.log('Tokens before logout:', tokens);
    socket.disconnect('/chat');
    console.log('User logged out');
    await deleteTokens();
    console.log('Tokens after logout:', await getTokens());
    router.replace('/login');
  };
  
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor,
    },
    scrollView: {
      flex: 1,
    },
    container: {
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
    <SafeAreaView style={styles.safeArea} >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {/* Profile Header */}
          <ProfileHeader
            username={userData.username}
            joinedDate={userData.joinedDate}
            profileImage={userData.profileImageUrl}
            bannerColor={userData.banner}
            onEditProfile={handleEditProfile}
            onNotification={handleNotification}
          />
          
          {/* Divider */}
          <View style={styles.divider} />
          
          {/* Settings List */}
          <SettingsList
            onMyAccount={handleMyAccount}
            onAccountDelete={handleAccountDelete}
            onChangePassword={handleChangePassword}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
