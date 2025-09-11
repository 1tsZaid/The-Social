import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Toast from "react-native-toast-message";

import { ThemedView } from '@/components/ThemedView';
import { Typography } from '@/constants/Typography';
import { useThemeColor } from '../hooks/useThemeColor';
import { createPost } from '@/services/post';
import { useCommunities } from '@/components/CommunitiesContext';
import { imageUriToBase64 } from '@/utils/imageUriToBase64';
import { checkTokens } from '@/utils/checkTokens';
import { deleteTokens } from '@/utils/tokenStorage';

const PostScreen = () => {
  const { selectedCommunityId } = useLocalSearchParams<{ selectedCommunityId: string }>();
  const router = useRouter();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);

  const color = useThemeColor({}, 'textPrimary');
  const placeholderTextColor = useThemeColor({}, 'borderDivider');

  const styles = StyleSheet.create({
    SafeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
    headerIcons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 80,
    },
    textInput: {
      padding: 16,
      color,
      borderWidth: 0,
    },
    previewImage: {
      width: 100,
      height: 100,
      borderRadius: 8,
      marginLeft: 16,
      marginBottom: 10,
    },
  });

  // Handle post creation
  const handleSend = async () => {

    try {
      setLoading(true);

      const payload = {
        communityId: selectedCommunityId!,
        content: text,
        attachImage: await imageUriToBase64(imageUri),
      };

      const tokenFlag = await checkTokens();
      if (!tokenFlag) {
        deleteTokens();
        router.replace("/login");
      }

      const data = await createPost(payload);

      if (!data?.id) {
        // ❌ Show error toast
        Toast.show({
          type: "error",
          text1: "Failed to create post",
          text2: "The Social Community Violation Filter has blocked this post.",
        });
      } else {
        // ✅ Success toast
        Toast.show({
          type: "success",
          text1: "Success!",
          text2: "Your post has been created 🎉",
        });
      }


      setText("");
      setImageUri(undefined);
      router.back();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to create post.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle image picking
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'We need access to your gallery to attach images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
     <SafeAreaView style={styles.SafeArea} >
      <ThemedView style={styles.container} backgroundType="background">
        <ThemedView style={styles.header} backgroundType="background">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={color} />
          </TouchableOpacity>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={pickImage}>
              <Ionicons name="attach" size={24} color={color} />
            </TouchableOpacity>
            <TouchableOpacity disabled={loading} onPress={handleSend}>
              {loading ? (
                <ActivityIndicator size="small" color={color} />
              ) : (
                <Ionicons name="send" size={24} color={color} />
              )}
            </TouchableOpacity>
          </View>
        </ThemedView>

        <TextInput
          style={[styles.textInput, Typography.body]}
          multiline
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          placeholderTextColor={placeholderTextColor}
        />

        {imageUri && (
          <View>
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
            <TouchableOpacity onPress={() => setImageUri(undefined)} style={{ marginLeft: 16 }}>
              <Ionicons name="close-circle" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
      </ThemedView>
     </SafeAreaView>
  );
};

export default PostScreen;
