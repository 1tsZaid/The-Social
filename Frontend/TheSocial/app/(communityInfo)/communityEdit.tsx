import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EditCommunityHeader } from '@/components/EditCommunityHeader';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCommunities } from '@/components/CommunitiesContext';
import { imageUriToBase64 } from '@/utils/imageUriToBase64';
import { updateCommunity } from '@/services/community';

interface CommunityEditProps {
  toSettings: () => void;
}

export default function CommunityEditScreen({toSettings}: CommunityEditProps) {
  const { communities, selectedCommunityId, refreshCommunities } = useCommunities();
  const community = communities.find(c => c.communityId === selectedCommunityId);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [communityImage, setCommunityImage] = useState<string | undefined>(undefined);
  const [banner, setBanner] = useState('');
  const [loading, setLoading] = useState(false);
  const backgroundColor = useThemeColor({}, 'background');

  useEffect(() => {
    if (community) {
      setName(community.name || '');
      setDescription(community.description || '');
      setCommunityImage(community.communityImageUrl);
      setBanner(community.banner || '');
    }
  }, [community]);

  if (!community) {
    return <ActivityIndicator />;
  }

  const pickImage = async () => {
    const permissionResult = await import('expo-image-picker').then(ImagePicker => ImagePicker.requestMediaLibraryPermissionsAsync());
    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'You need to allow access to photos.');
      return;
    }
    const ImagePicker = await import('expo-image-picker');
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setCommunityImage(result.assets[0].uri);
    }
  };

  const onSave = async () => {
    setLoading(true);
    try {
      let communityImageInBase64: string | undefined = undefined;
      if (communityImage && communityImage !== community.communityImageUrl) {
        communityImageInBase64 = await imageUriToBase64(communityImage);
      }
      await updateCommunity(community.communityId, {
        name: name !== community.name ? name : undefined,
        description: description !== community.description ? description : undefined,
        communityImageInBase64,
        banner: banner !== community.banner ? banner : undefined,
      });
      await refreshCommunities();
      Alert.alert('Success', 'Community updated successfully!');
      // You may want to navigate back or to the settings screen
    } catch (e) {
      Alert.alert('Error', 'Failed to update community.');
    } finally {
      setLoading(false);
    }
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
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <EditCommunityHeader
            communityName={name}
            communityImage={communityImage}
            bannerColor={banner}
            onNameChange={setName}
            onDescriptionChange={setDescription}
            onProfileEdit={pickImage}
            onBannerEdit={() => Alert.alert('Edit Banner')}
            onCancel={toSettings}
            onSave={onSave}
            description={description}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
