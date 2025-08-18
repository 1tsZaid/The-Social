import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import { getYourCommunities, Community } from '@/services/community';

import { checkTokens } from '@/utils/checkTokens';
import { deleteTokens } from '@/utils/tokenStorage'

interface CommunitiesContextType {
  communities: Community[];
  loading: boolean;
  error: string | null;
  selectedCommunityId: string | null;
  refreshCommunities: () => Promise<void>;
  setSelectedCommunity: (communityId: string | null) => void;
}

const CommunitiesContext = createContext<CommunitiesContextType | undefined>(undefined);

interface CommunitiesProviderProps {
  children: ReactNode;
}

export function CommunitiesProvider({ children }: CommunitiesProviderProps) {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);

  // Get user's location
  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return null;
      }

      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      return coords;
    } catch (err) {
      console.error('Error getting location:', err);
      setError('Failed to get location');
      return null;
    }
  };

  // Fetch communities data
  const fetchCommunities = async () => {
    try {
      setLoading(true);
      setError(null);

      const location = await getUserLocation();
      if (!location) {
        throw new Error('Location not available');
      }

      const tokenFlag = await checkTokens();
      if (!tokenFlag) {
        deleteTokens();
        router.replace('/login');
      } 

      const communitiesData = await getYourCommunities({
        latitude: location.latitude,
        longitude: location.longitude,
        limit: 20,
        page: 1,
      });

      console.log('setting Community Data', communitiesData);

      setCommunities(communitiesData);
      
      // Set first community as selected if none is selected
      if (!selectedCommunityId && communitiesData.length > 0) {
        setSelectedCommunityId(communitiesData[0].communityId);
      }
    } catch (err) {
      console.error('Error fetching communities:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch communities');
      Alert.alert('Error', 'Failed to load communities. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Refresh communities
  const refreshCommunities = async () => {
    await fetchCommunities();
  };

  // Set selected community
  const setSelectedCommunity = (communityId: string | null) => {
    setSelectedCommunityId(communityId);
  };

  // Initial load
  useEffect(() => {
    fetchCommunities();
  }, []);

  const value: CommunitiesContextType = {
    communities,
    loading,
    error,
    selectedCommunityId,
    refreshCommunities,
    setSelectedCommunity,
  };

  return (
    <CommunitiesContext.Provider value={value}>
      {children}
    </CommunitiesContext.Provider>
  );
}

// Custom hook to use the communities context
export function useCommunities() {
  const context = useContext(CommunitiesContext);
  if (context === undefined) {
    throw new Error('useCommunities must be used within a CommunitiesProvider');
  }
  return context;
}