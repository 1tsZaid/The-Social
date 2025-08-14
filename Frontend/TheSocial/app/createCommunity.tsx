import React, { useState } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { CommunityIconUpload } from '@/components/CommunityIconUpload';
import { CommunityFormField } from '@/components/CommunityFormField';
import { CommunityGuidelinesLink } from '@/components/CommunityGuidelinesLink';
import MainButton from '@/components/MainButton';

interface CommunityFormData {
  name: string;
  description: string;
  location: string;
}

export default function CreateCommunityScreen() {
  const [formData, setFormData] = useState<CommunityFormData>({
    name: '',
    description: '',
    location: '',
  });

  const handleIconUpload = () => {
    // TODO: Implement image picker functionality
    Alert.alert('Upload Icon', 'Image picker functionality to be implemented');
  };

  const handleGuidelinesPress = () => {
    // TODO: Navigate to community guidelines
    Alert.alert('Community Guidelines', 'Navigate to guidelines page');
  };

  const handleCreateCommunity = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter a community name');
      return;
    }

    if (!formData.description.trim()) {
      Alert.alert('Error', 'Please enter a community description');
      return;
    }

    if (!formData.location.trim()) {
      Alert.alert('Error', 'Please enter a community location');
      return;
    }

    // TODO: Implement community creation logic
    Alert.alert('Success', 'Community created successfully!');
  };

  const isFormValid = formData.name.trim() && 
                     formData.description.trim() && 
                     formData.location.trim();

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
            onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
          />

          <CommunityFormField
            label="Description"
            placeholder="Tell us about your community"
            multiline
            value={formData.description}
            onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
          />

          <CommunityFormField
            label="Location"
            placeholder="Enter community location"
            showLocationIcon
            value={formData.location}
            onChangeText={(text) => setFormData(prev => ({ ...prev, location: text }))}
          />

          {/* Guidelines Link */}
          <CommunityGuidelinesLink onPress={handleGuidelinesPress} />

          {/* Create Button */}
          <MainButton 
            title="Create"
            onPress={handleCreateCommunity}
            disabled={!isFormValid}
          />
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
