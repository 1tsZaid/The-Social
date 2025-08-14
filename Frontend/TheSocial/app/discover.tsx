import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SearchInput } from '@/components/SearchInput';
import { CommunityCard } from '@/components/CommunityCard';

// Mock data for communities
const communities = [
  {
    id: '1',
    title: 'Parkside Gamers',
    description: 'A friendly group for board game enthusiasts in the Parkside area. All skill levels welcome!',
    memberCount: 150,
    location: 'Parkside District, Springfield',
    bannerColor: '#2196F3',
    iconName: 'game-controller',
  },
  {
    id: '2',
    title: 'Downtown Foodies',
    description: 'Exploring the best eats in downtown. Join us for restaurant outings and potlucks.',
    memberCount: 230,
    location: 'Downtown, Springfield',
    bannerColor: '#50E3C2',
    iconName: 'restaurant',
  },
  {
    id: '3',
    title: 'Art & Craft Corner',
    description: 'Share your creative projects, learn new skills, and connect with fellow artists and crafters.',
    memberCount: 95,
    location: 'Community Center, Springfield',
    bannerColor: '#F5A623',
    iconName: 'brush',
  },
];

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const handleJoinCommunity = (communityId: string) => {
    Alert.alert(
      'Join Community',
      'Are you sure you want to join this community?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Join',
          onPress: () => {
            console.log('Joined community:', communityId);
            // Implement join community logic
          },
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container} backgroundType="background">
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle} variant="h2" colorType="textPrimary">
            DISCOVER A COMMUNITY ON
          </ThemedText>
          <ThemedText style={styles.headerSubtitle} variant="h2" colorType="accent">
            The Social
          </ThemedText>
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSearch={handleSearch}
            placeholder='Search for communities...'
          />
        </View>

        {/* Nearby Communities Section */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle} variant="h4" colorType="textPrimary">
            Nearby Communities
          </ThemedText>
          
          {/* Community Cards */}
          <View style={styles.cardsContainer}>
            {communities.map((community) => (
              <CommunityCard
                key={community.id}
                title={community.title}
                description={community.description}
                memberCount={community.memberCount}
                location={community.location}
                bannerColor={community.bannerColor}
                iconName={community.iconName}
                onJoinPress={() => handleJoinCommunity(community.id)}
              />
            ))}
          </View>
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerTitle: {
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtitle: {
    textAlign: 'center',
  },
  searchContainer: {
    marginBottom: 32,
  },
  sectionContainer: {
    flex: 1,
  },
  sectionTitle: {
    marginBottom: 20,
  },
  cardsContainer: {
    gap: 20,
  },
});