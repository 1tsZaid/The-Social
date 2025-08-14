import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

import { EditProfileHeader } from '@/components/EditProfileHeader';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function ProfileScreen() {
  // data from backend
  const userData = {
    username: 'UserName',
    joinedDate: 'January 2024',
    profileImage: undefined,
    bannerColor: "#FF8000",
  };

  const [profileImage, setProfileImage] = useState<string | undefined>(userData.profileImage);
  const [username, setUsername] = useState(userData.username);

  const divderColor = useThemeColor({}, 'borderDivider')
  const backgroundColor = useThemeColor({}, 'background');

  
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

  const onSave = () => {
    //data to backend
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
            username={username}
            profileImage={profileImage}
            bannerColor={userData.bannerColor}
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
