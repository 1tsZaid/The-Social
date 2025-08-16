import api from './api';
import { API_CONFIG } from '../constants/Api';

interface Location {
  coordinates: [number, number]; // [longitude, latitude]
  name: string;
}

interface CreateCommunityPayload {
  name: string; // unique name for the community
  description: string;
  location: Location;
  communityImageInBase64?: string; // base64 encoded string of the community image
  banner: string;
}

interface Community extends Omit<CreateCommunityPayload, 'communityImageInBase64'> {
  communityId: string; // unique identifier for the community set by the backend
  communityImageUrl?: string; // URL to the community image
  members: number;
  nearby: boolean;
}

interface FindCommunitiesParams {
  latitude: number;
  longitude: number;
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
export const getYourCommunities = async (param: FindCommunitiesParams): Promise<Community[]> => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.COMMUNITIES.YOUR_COMMUNITIES, {
      params: {
        latitude: param.latitude,
        longitude: param.longitude,
        limit: param.limit || 20, // default 20 communities per page
        page: param.page || 1     // default first page
      }
    });
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
        latitude: params.latitude,
        longitude: params.longitude,
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

export const getCommunity = async (id: string): Promise<Community | null> => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.COMMUNITIES.GET_ONE(id));
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const joinCommunity = async (communityId: string): Promise<void> => {
  try {
    await api.post(API_CONFIG.ENDPOINTS.COMMUNITIES.JOIN(communityId));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const leaveCommunity = async (communityId: string): Promise<void> => {
  try {
    await api.post(API_CONFIG.ENDPOINTS.COMMUNITIES.LEAVE(communityId));
  } catch (error) {
    console.error(error);
    throw error;
  }
};