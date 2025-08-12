import api from './api';
import { API_CONFIG } from '../constants/Api';

interface Location {
  coordinates: [number, number]; // [longitude, latitude]
  name: string;
}

interface CommunityStats {
  members: number;
  online: number;
}

interface CreateCommunityPayload {
  name: string;
  description: string;
  location: Location;
  image?: string;
  banner: string;
}

interface Community extends CreateCommunityPayload {
  communityId: string;
  stats: CommunityStats;
}

interface FindCommunitiesParams {
  latitude: number;
  longitude: number;
  radius?: number; // in kilometers
  limit?: number;
  page?: number;
}

export const createCommunity = async (payload: CreateCommunityPayload): Promise<Community> => {
  try {
    const response = await api.post(API_CONFIG.ENDPOINTS.COMMUNITIES.CREATE_COMMUNITIES, payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get communities created by or joined by the current user
export const getYourCommunities = async (): Promise<Community[]> => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.COMMUNITIES.YOUR_COMMUNITIES);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Find communities near a specific location
export const findNearbyCommunities = async (params: FindCommunitiesParams): Promise<Community[]> => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.COMMUNITIES.NEARBY, {
      params: {
        lat: params.latitude,
        lng: params.longitude,
        radius: params.radius || 5, // default 5km radius
        limit: params.limit || 20,   // default 20 communities per page
        page: params.page || 1       // default first page
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCommunity = async (id: string): Promise<Community> => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.COMMUNITIES.GET_ONE(id));
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
