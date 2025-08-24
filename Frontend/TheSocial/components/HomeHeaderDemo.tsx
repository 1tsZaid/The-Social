import React from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ThemedView } from '@/components/ThemedView';
import { useCommunities } from '@/components/CommunitiesContext';
import { HamburgerIcon } from '@/components/ui/HamburgerIcon';
import { AvatarsRow } from '@/components/ui/AvatarsRow';
import { useThemeColor } from '@/hooks/useThemeColor';

export function HomeHeaderDemo() {
  const navigation = useNavigation() as any;
  const { communities, selectedCommunityId, setSelectedCommunity, loading } = useCommunities();
  const backgroundColor = useThemeColor({}, 'background');

  const handleMenuPress = () => {
    navigation.openDrawer();
  };

  const handleAvatarPress = (communityId: string) => {
    // Set the selected community when avatar is pressed
    setSelectedCommunity(communityId);
    Alert.alert('Community', `Switched to community ${communityId}`);
  };

  // Creating community data
  const selectedCommunity = (c: string): boolean => c === selectedCommunityId ? true : false;

  const createDataForCommunity = () => {
    const data = communities.flatMap((community) =>
      community.nearby
        ? [{
            id: community.communityId,
            imageUrl: community.communityImageUrl || undefined,
            isActive: selectedCommunity(community.communityId),
          }]
        : []
    );
    return data;
  };

  const communityAvatars = createDataForCommunity();
  // Completed community data

  // Get the currently selected community
  const currentCommunity = communities.find((community) => community.communityId === selectedCommunityId);
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 4,
      borderBottomLeftRadius : 20,
      borderBottomRightRadius : 20,
      backgroundColor: currentCommunity ? currentCommunity.banner + '50' :  backgroundColor,
    },
    menuContainer: {
      width: 48,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarsContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }); 

  return (
    <ThemedView style={styles.container} backgroundType="background">
      <ThemedView style={{ height: 56 }} >
        {/* Header content */}
        <View style={styles.content}>
          {/* Hamburger menu */}
          <View style={styles.menuContainer}>
            <HamburgerIcon onPress={handleMenuPress} size={22} />
          </View>
          
          {/* User avatars row */}
          <View style={styles.avatarsContainer}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#666" />
              </View>
            ) : (
              <AvatarsRow
                data={communityAvatars}
                avatarSize={40}
                maxVisible={7}
                onAvatarPress={handleAvatarPress}
              />
            )}
          </View>
        </View>
      </ThemedView>
    </ThemedView>
  );
}
