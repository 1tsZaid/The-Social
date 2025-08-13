import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EditProfileHeader } from '@/components/EditProfileHeader';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function ProfileScreen() {
  const userData = {
    username: 'UserName',
    joinedDate: 'January 2024',
    profileImage: undefined,
    bannerColor: "#FF8000",
  };

  const divderColor = useThemeColor({}, 'borderDivider')
  const backgroundColor = useThemeColor({}, 'background');
  
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
  });

  return (
    <SafeAreaView style={styles.safeArea} >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Profile Header */}
          <EditProfileHeader
            username={userData.username}
            profileImage={userData.profileImage}
            bannerColor={userData.bannerColor}
            onUsernameChange={(username) => console.log('Username changed:', username)}
            onProfileEdit={() => Alert.alert('Edit Profile')}
            onBannerEdit={() => Alert.alert('Edit Banner')}
            onCancel={() => router.back()}
            onSave={() => Alert.alert('Profile Saved')}
          />
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
