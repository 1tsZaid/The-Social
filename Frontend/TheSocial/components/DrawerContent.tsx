import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { DrawerActionButton } from './DrawerActionButton';
import { CommunityItem } from './CommunityItem';

interface Community {
  id: string;
  name: string;
  location: string;
  onlineCount: number;
  memberCount: number;
  icon: string;
  iconColor: string;
}

const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'Tech Innovato...',
    location: 'San Francisco, CA',
    onlineCount: 100,
    memberCount: 567,
    icon: 'construct',
    iconColor: 'communityTeal',
  },
  {
    id: '2',
    name: 'Gamers United',
    location: 'Austin, TX',
    onlineCount: 9,
    memberCount: 100,
    icon: 'game-controller',
    iconColor: 'communityBlue',
  },
  {
    id: '3',
    name: 'Local Foodies',
    location: 'New York, NY',
    onlineCount: 5,
    memberCount: 7,
    icon: 'restaurant',
    iconColor: 'communityBeige',
  },
  {
    id: '4',
    name: 'Bookworm Cor...',
    location: 'Chicago, IL',
    onlineCount: 9,
    memberCount: 18,
    icon: 'book',
    iconColor: 'communityGray',
  },
];

export function DrawerContent() {
  const [selectedCommunityId, setSelectedCommunityId] = useState('1');

  const handleCreateCommunity = () => {
    router.push('/createCommunity');
  };

  const handleDiscoverCommunity = () => {
    router.push('/discover');
  };

  const handleCommunityPress = (communityId: string) => {
    setSelectedCommunityId(communityId);
    // Here you would typically navigate to the community or update the current context
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
            {mockCommunities.map((community) => (
              <CommunityItem
                key={community.id}
                name={community.name}
                location={community.location}
                onlineCount={community.onlineCount}
                memberCount={community.memberCount}
                icon={community.icon as any}
                iconColor={community.iconColor}
                isSelected={selectedCommunityId === community.id}
                onPress={() => handleCommunityPress(community.id)}
              />
            ))}
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
}); 