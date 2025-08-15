import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from '@react-navigation/native';

import { EditProfileHeader } from '@/components/EditProfileHeader';
import { useThemeColor } from '@/hooks/useThemeColor';

import { deleteTokens } from '@/utils/tokenStorage';
import { checkTokens } from '@/utils/checkTokens';
import { imageUriToBase64 } from '@/utils/imageUriToBase64';
import { getProfile, updateProfile, Profile, UpdateProfilePayload } from '@/services/profile';

export default function ProfileScreen() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [userData, setUserData] = useState<Profile | undefined>(undefined);
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState('');

  const divderColor = useThemeColor({}, 'borderDivider')
  const backgroundColor = useThemeColor({}, 'background');
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchProfileData();
      setRefreshKey(refreshKey + 1);
      console.log('Edit Screen is now visible! times:', refreshKey);
    } else {
      console.log('Edit Screen is now hidden ❌');
    }
  }, [isFocused]);


  const fetchProfileData = async () => {
    const tokenFlag = await checkTokens();
    if (tokenFlag) {
      const profileData = await getProfile();
      setUserData(profileData);
      setProfileImage(profileData.profileImageUrl);
      setUsername(profileData.username);
    } else {
      deleteTokens();
      router.replace('/login');
    }
  };
  
  if (!userData) {
    return <ActivityIndicator />;
  }

  
  const pickImage = async () => {
    // Ask for permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'You need to allow access to photos.');
      return;
    }
    
    // Open picker
    const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });


    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const onSave = async () => {
    const tokenFlag = await checkTokens();
    if (tokenFlag) {
      const payload: UpdateProfilePayload = {
        username: username !== userData.username ? username : undefined,
        profileImageInBase64: profileImage !== userData.profileImageUrl ? await imageUriToBase64(profileImage) : undefined,
      };
      console.log('Payload to update profile:', payload);
      await updateProfile(payload);
      router.replace('/profile');
    } else {
      deleteTokens();
      router.replace('/login');
    }
  }

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
            refreshKey={refreshKey}
            username={username}
            profileImage={profileImage}
            bannerColor={userData.banner}
            onUsernameChange={(username) => setUsername(username)}
            onProfileEdit={pickImage}
            onBannerEdit={() => Alert.alert('Edit Banner')}
            onCancel={() => router.back()}
            onSave={onSave}
          />
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
