import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';

import { CommunityHeader } from '@/components/CommunityHeader';
import { SettingItem } from '@/components/SettingItem';
import { DeleteButton } from '@/components/DeleteButton';
import { CommunityAdditionalInfo } from '@/components/CommunityAdditionalInfo';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useCommunities } from '@/components/CommunitiesContext';
import { useLeaderboard } from '@/components/LeaderboardContext';

import { deleteTokens, getTokens } from '@/utils/tokenStorage';
import { checkTokens } from '@/utils/checkTokens';

import socket from '@/services/socket';
import { getProfile, Profile } from '@/services/profile';

export default function ProfileScreen() {
  const [userData, setUserData] = useState<Profile | undefined>(undefined);
  const divderColor = useThemeColor({}, 'borderDivider')
  const backgroundColor = useThemeColor({}, 'background');
  const blueColor = useThemeColor({}, 'blue');
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

  const handleEdit = () => {
    // Navigate to edit profile screen
    router.push('/communityEdit');
  };

  const handleDelete = async () => {
    // Clear Communities Context
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
    bodyContainer: {
      marginTop: 10,
      paddingHorizontal: 24,
      gap: 5,
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
          <CommunityHeader
            communityName={userData.username}
            communityImage={userData.profileImageUrl}
            bannerColor={userData.banner}
            onEdit={handleEdit}
          />
          
          {/* Divider */}
          {/* <View style={styles.divider} /> */}
          
          <View style={styles.bodyContainer} >
            <CommunityAdditionalInfo 
              description={'No description provided.'}
              location={'Earth'}
            />
            {/* Member Surface */}
            <SettingItem
              icon="accessibility"
              color={blueColor}
              ColorType="textSecondary"
              title="Members"
              chevron={true}
              onPress={() => console.log('Members pressed')}
            />
            
            {/* Logout Button */}
            <DeleteButton onDelete={handleDelete} />
          </View>
          
          {/* Bottom spacing */}
          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
