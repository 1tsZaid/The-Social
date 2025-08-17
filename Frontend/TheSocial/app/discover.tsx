import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { View, StyleSheet, ScrollView, Alert, RefreshControl, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SearchInput } from '@/components/SearchInput';
import { CommunityCard } from '@/components/CommunityCard';
import { findNearbyCommunities, joinCommunity, Community } from '@/services/community';

import { checkTokens } from '@/utils/checkTokens';
import { deleteTokens } from '@/utils/tokenStorage'

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [communities, setCommunities] = useState<Community[]>([]);
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Get device location
  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Permission to access location was denied');
        return null;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
      setLocation(coords);
      return coords;
    } catch (error) {
      console.error('Error getting location:', error);
      setLocationError('Failed to get location');
      return null;
    }
  };

  // Fetch nearby communities
  const fetchCommunities = async (coords?: { latitude: number; longitude: number }) => {
    try {
      if (!coords && !location) return;
      
      const locationToUse = coords || location!;

      // checking tokens
      const tokenFlag = await checkTokens();
      if (!tokenFlag) {
        deleteTokens();
        router.replace('/login');
      } 

      const data = await findNearbyCommunities({
        latitude: locationToUse.latitude,
        longitude: locationToUse.longitude,
        limit: 20,
        page: 1,
      });
      
      setCommunities(data);
      setFilteredCommunities(data);
    } catch (error) {
      console.error('Error fetching communities:', error);
      Alert.alert(
        'Error',
        'Failed to load nearby communities. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  // Initial load
  useEffect(() => {
    const initializeScreen = async () => {
      setLoading(true);
      const coords = await getLocation();
      if (coords) {
        await fetchCommunities(coords);
      }
      setLoading(false);
    };

    initializeScreen();
  }, []);

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredCommunities(communities);
      return;
    }

    const filtered = communities.filter(community =>
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.location.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredCommunities(filtered);
  };

  // Handle search query changes
  useEffect(() => {
    handleSearch();
  }, [searchQuery, communities]);

  // Handle pull to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    if (location) {
      const tokenFlag = await checkTokens();
      if (!tokenFlag) {
        deleteTokens();
        router.replace('/login');
      } 
      await fetchCommunities();
    } else {
      const coords = await getLocation();
      if (coords) {
        const tokenFlag = await checkTokens();
        if (!tokenFlag) {
          deleteTokens();
          router.replace('/login');
        } 
        await fetchCommunities(coords);
      }
    }
    setRefreshing(false);
  };

  // Handle join community
  const handleJoinCommunity = async (communityId: string) => {
    const community = communities.find(c => c.communityId === communityId);
    
    try {
      const tokenFlag = await checkTokens();
      if (!tokenFlag) {
        deleteTokens();
        router.replace('/login');
      } 

      await joinCommunity(communityId);
      
      // Update local state to reflect the join
      const updatedCommunities = communities.map(c =>
        c.communityId === communityId
          ? { ...c, members: c.members + 1 }
          : c
      );
      setCommunities(updatedCommunities);
      
      Alert.alert(
        'Success',
        `You have successfully joined "${community?.name}"!`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error joining community:', error);
      Alert.alert(
        'Error',
        'Failed to join community. Please try again.',
        [{ text: 'OK' }]
      );
    }

  };

  // Show loading state
  if (loading) {
    return (
      <ThemedView style={styles.container} backgroundType="background">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <ThemedText style={styles.loadingText} variant="body" colorType="textSecondary">
            {locationError ? locationError : 'Finding nearby communities...'}
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  // Show location error state
  if (locationError && !location) {
    return (
      <ThemedView style={styles.container} backgroundType="background">
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText} variant="h4" colorType="textPrimary">
            Location Access Required
          </ThemedText>
          <ThemedText style={styles.errorDescription} variant="body" colorType="textSecondary">
            We need your location to find nearby communities. Please enable location services and try again.
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container} backgroundType="background">
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
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
            Nearby Communities ({filteredCommunities.length})
          </ThemedText>
          
          {/* Community Cards */}
          <View style={styles.cardsContainer}>
            {filteredCommunities.length === 0 ? (
              <View style={styles.emptyContainer}>
                <ThemedText style={styles.emptyText} variant="body" colorType="textSecondary">
                  {searchQuery ? 'No communities found matching your search.' : 'No nearby communities found.'}
                </ThemedText>
              </View>
            ) : (
              filteredCommunities.map((community) => (
                <CommunityCard
                  key={community.communityId}
                  title={community.name}
                  description={community.description}
                  memberCount={community.members}
                  location={community.location.name}
                  bannerColor={community.banner}
                  iconName="people" // Default icon, you might want to add an icon field to your Community interface
                  onJoinPress={() => handleJoinCommunity(community.communityId)}
                />
              ))
            )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 16,
  },
  errorDescription: {
    textAlign: 'center',
    lineHeight: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    textAlign: 'center',
  },
});