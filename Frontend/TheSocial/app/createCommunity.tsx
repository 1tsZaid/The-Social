import React, { useState } from 'react';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location'; // ✅ new import

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { CommunityIconUpload } from '@/components/CommunityIconUpload';
import { CommunityFormField } from '@/components/CommunityFormField';
import { CommunityGuidelinesLink } from '@/components/CommunityGuidelinesLink';
import MainButton from '@/components/MainButton';

import { createCommunity, CreateCommunityPayload } from '@/services/community';
import { Colors } from '@/constants/Colors';
import { imageUriToBase64 } from '@/utils/imageUriToBase64';
import { checkTokens } from '@/utils/checkTokens';
import { deleteTokens } from '@/utils/tokenStorage'

interface CommunityFormData {
  name: string;
  description: string;
  locationName: string;
  // longitude: string;
  // latitude: string;
}

export default function CreateCommunityScreen() {
  const [communityImageUrl, setCommunityImageUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState<CommunityFormData>({
    name: '',
    description: '',
    locationName: '',
    // longitude: '', 
    // latitude: '',  
  });

  const handleIconUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'You need to allow access to photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setCommunityImageUrl(result.assets[0].uri);
    }
  };

  const handleGuidelinesPress = () => {
    Alert.alert('Community Guidelines', 'Navigate to guidelines page');
  };

  const handleCreateCommunity = async () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter a community name');
      return;
    }

    if (!formData.description.trim()) {
      Alert.alert('Error', 'Please enter a community description');
      return;
    }

    if (!formData.locationName.trim()) {
      Alert.alert('Error', 'Please enter a community location name');
      return;
    }

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to create a community.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const lng = location.coords.longitude;
      const lat = location.coords.latitude;

      const profileBannerColors = Object.values(Colors.community);
      const randomIndex = Math.floor(Math.random() * profileBannerColors.length);
      const banner = profileBannerColors[randomIndex];

      const payload: CreateCommunityPayload = {
        name: formData.name,
        description: formData.description,
        banner: banner,
        location: {
          name: formData.locationName,
          coordinates: [lng, lat] as [number, number],
        },
      };

      if (communityImageUrl) {
        payload.communityImageInBase64 = await imageUriToBase64(communityImageUrl);
      }

      setCommunityImageUrl(null);

      const tokenFlag = await checkTokens();
      if (tokenFlag) {
        console.log('Community creation request with payload:', payload);
        const result = await createCommunity(payload);
        console.log('Community created with payload:', result);
        Alert.alert('Success', 'Community created successfully!');
      } else {
        deleteTokens();
        router.replace('/login');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create community. Please try again.');
      console.error(error);
    }
  };

  const isFormValid =
    !!formData.name.trim() &&
    !!formData.description.trim() &&
    !!formData.locationName.trim();

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <ThemedView style={styles.header}>
          <ThemedText style={styles.title} variant="h2" colorType="textPrimary">
            CREATE YOUR COMMUNITY
          </ThemedText>
          <ThemedText style={styles.subtitle} variant="body" colorType="textSecondary">
            Community is where you and people near you can connect.
          </ThemedText>
        </ThemedView>

        {/* Main Content */}
        <ThemedView style={styles.mainContent}>
          {/* Icon Upload */}
          <CommunityIconUpload uri={communityImageUrl} onPress={handleIconUpload} />

          {/* Form Fields */}
          <CommunityFormField
            label="Community Name"
            placeholder="Enter community name"
            value={formData.name}
            onChangeText={(text) => setFormData((prev) => ({ ...prev, name: text }))}
          />

          <CommunityFormField
            label="Description"
            placeholder="Tell us about your community"
            multiline
            value={formData.description}
            onChangeText={(text) => setFormData((prev) => ({ ...prev, description: text }))}
          />

          <CommunityFormField
            label="Location Name"
            placeholder="Enter community location name"
            value={formData.locationName}
            onChangeText={(text) => setFormData((prev) => ({ ...prev, locationName: text }))}
          />

          {/* Guidelines Link */}
          <CommunityGuidelinesLink onPress={handleGuidelinesPress} />

          {/* Create Button */}
          <MainButton title="Create" onPress={handleCreateCommunity} disabled={!isFormValid} />
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 32, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 12 },
  title: { textAlign: 'center', marginBottom: 8 },
  subtitle: { textAlign: 'center' },
  mainContent: { flex: 1 },
});
