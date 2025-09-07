import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { DrawerActionButton } from './DrawerActionButton';
import { CommunityItem } from './CommunityItem';
import { useModal } from '@/components/ModalContext';
import { useCommunities } from '@/components/CommunitiesContext';

import { leaveCommunity } from '@/services/community';
import { checkTokens } from '@/utils/checkTokens';

export function DrawerContent() {
  const { openModal } = useModal();
  const { 
    communities, 
    loading, 
    error, 
    selectedCommunityId, 
    setSelectedCommunity, 
    refreshCommunities 
  } = useCommunities();

  const handleCreateCommunity = () => {
    openModal('createCommunity');
  };

  const handleDiscoverCommunity = () => {
    openModal('discover');
  };

  const handleCommunityPress = (communityId: string) => {
    setSelectedCommunity(communityId);
    // Optional: Close drawer after selection
    // navigation.closeDrawer();
  };

  const handleRefresh = () => {
    refreshCommunities();
  };

  return (
    <ThemedView style={styles.container} backgroundType="background">
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Action Buttons */}
        <ThemedView style={styles.actionSection}>
          <DrawerActionButton
            icon="add"
            title="Create My Own"
            onPress={handleCreateCommunity}
          />
          <DrawerActionButton
            icon="compass"
            title="Discover a New Community"
            onPress={handleDiscoverCommunity}
          />
          <DrawerActionButton
            icon="refresh"
            title="Refresh Communities"
            onPress={handleRefresh}
          />
        </ThemedView>

        {/* Communities Section */}
        <ThemedView style={styles.communitiesSection}>
          <ThemedText
            style={styles.sectionTitle}
            variant="link"
            colorType="textSecondary"
          >
            YOUR COMMUNITIES
          </ThemedText>

          <ThemedView style={styles.communitiesList}>
            {loading ? (
              <ThemedView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#666" />
                <ThemedText style={styles.loadingText}>Loading communities...</ThemedText>
              </ThemedView>
            ) : error ? (
              <ThemedView style={styles.errorContainer}>
                <ThemedText style={styles.errorText} colorType="textSecondary">
                  {error}
                </ThemedText>
                <DrawerActionButton
                  icon="refresh"
                  title="Try Again"
                  onPress={handleRefresh}
                />
              </ThemedView>
            ) : communities.length === 0 ? (
              <ThemedView style={styles.emptyContainer}>
                <ThemedText style={styles.emptyText} colorType="textSecondary">
                  No communities found. Create or discover one!
                </ThemedText>
              </ThemedView>
            ) : (
              communities.map((community) => (
                community.nearby ? (
                <CommunityItem
                  key={community.communityId}
                  name={community.name}
                  imageUri={community.communityImageUrl}
                  banner={community.banner}
                  location={community.location.name}
                  memberCount={community.members}
                  owner={community.owner}
                  isSelected={selectedCommunityId === community.communityId}
                  onPress={() => handleCommunityPress(community.communityId)}
                  onAdminPress={() => openModal('communityInfo')}
                  onMemberPress={async () => {await checkTokens(); await leaveCommunity(community.communityId); await refreshCommunities(); setSelectedCommunity(null);} }
                />
                ) : null
              ))
            )}
          </ThemedView>
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
  actionSection: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  communitiesSection: {
    paddingTop: 16,
  },
  sectionTitle: {
    marginHorizontal: 28,
    marginBottom: 16,
  },
  communitiesList: {
    paddingBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  loadingText: {
    marginTop: 8,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 32,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 32,
  },
  emptyText: {
    textAlign: 'center',
  },
});