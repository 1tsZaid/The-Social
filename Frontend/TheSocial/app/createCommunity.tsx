import React, { useState } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { CommunityIconUpload } from '@/components/CommunityIconUpload';
import { CommunityFormField } from '@/components/CommunityFormField';
import { CommunityGuidelinesLink } from '@/components/CommunityGuidelinesLink';
import MainButton from '@/components/MainButton';

import { createCommunity, CreateCommunityPayload } from '@/services/community';

interface CommunityFormData {
  name: string;
  description: string;
  locationName: string;
  longitude: string;
  latitude: string;
}

export default function CreateCommunityScreen() {
  const [formData, setFormData] = useState<CommunityFormData>({
    name: '',
    description: '',
    locationName: '',
    longitude: '',
    latitude: '',
  });

  const handleIconUpload = () => {
    // TODO: Implement image picker functionality
    Alert.alert('Upload Icon', 'Image picker functionality to be implemented');
  };

  const handleGuidelinesPress = () => {
    // TODO: Navigate to community guidelines
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

    if (!formData.longitude.trim() || !formData.latitude.trim()) {
      Alert.alert('Error', 'Please enter valid longitude and latitude');
      return;
    }

    const lng = parseFloat(formData.longitude);
    const lat = parseFloat(formData.latitude);

    if (isNaN(lng) || isNaN(lat)) {
      Alert.alert('Error', 'Longitude and Latitude must be valid numbers');
      return;
    }

    try {
      const payload: CreateCommunityPayload = {
        name: formData.name,
        description: formData.description,
        banner: '', // optional → handle later if you support banners
        location: {
          name: formData.locationName,
          coordinates: [lng, lat] as [number, number],
        },
      };

      await createCommunity(payload);
      console.log('Community created with payload:', payload);
      Alert.alert('Success', 'Community created successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to create community. Please try again.');
      console.error(error);
    }
  };

  const isFormValid =
    !!formData.name.trim() &&
    !!formData.description.trim() &&
    !!formData.locationName.trim() &&
    formData.longitude !== null &&
    formData.latitude !== null;

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
          <CommunityIconUpload onPress={handleIconUpload} />

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

          {/* Separate Longitude and Latitude */}
          <CommunityFormField
            label="Longitude"
            placeholder="Enter longitude (e.g. 12.34)"
            value={formData.longitude}
            onChangeText={(text) => setFormData((prev) => ({ ...prev, longitude: text }))}
          />

          <CommunityFormField
            label="Latitude"
            placeholder="Enter latitude (e.g. 56.78)"
            value={formData.latitude}
            onChangeText={(text) => setFormData((prev) => ({ ...prev, latitude: text }))}
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
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
  },
});
