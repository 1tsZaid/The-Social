import api from './api';
import { API_CONFIG } from '../constants/Api';
import { getTokens } from '../utils/tokenStorage';

export interface CommunityMember {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  profileImageUrl?: string;
  banner: string;
}

interface UpdateCommunityPayload {
  name?: string;
  description?: string;
  communityImageInBase64?: string; // base64 encoded string of the community image
  banner?: string;
}

interface Location {
  coordinates: [number, number]; // [longitude, latitude]
  name: string;
}

export interface CreateCommunityPayload {
  name: string; // unique name for the community
  description: string;
  location: Location;
  communityImageInBase64?: string; // base64 encoded string of the community image
  banner: string;
}

export interface Community extends Omit<CreateCommunityPayload, 'communityImageInBase64'> {
  communityId: string; // unique identifier for the community set by the backend
  communityImageUrl?: string; // URL to the community image
  members: number;
  owner: boolean;
  nearby: boolean;
}

interface FindCommunitiesParams {
  latitude: number;
  longitude: number;
  limit?: number;
  page?: number;
}

export const updateCommunity = async (communityId: string, payload: UpdateCommunityPayload): Promise<Community> => {
  try {
    const tokens = await getTokens();
    const response = await api.put(API_CONFIG.ENDPOINTS.COMMUNITIES.UPDATE(communityId), payload, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    return normalizeCommunity(response.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCommunityMembers = async (communityId: string): Promise<CommunityMember[]> => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.COMMUNITIES.MEMBERS(communityId));
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const changeCommunityOwner = async (communityId: string, newOwnerId: string): Promise<void> => {
  try {
    const tokens = await getTokens();
    await api.post(API_CONFIG.ENDPOINTS.COMMUNITIES.CHANGE_OWNER(communityId), { newOwnerId }, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createCommunity = async (payload: CreateCommunityPayload): Promise<Community> => {
  try {
    const tokens = await getTokens();
    const response = await api.post(API_CONFIG.ENDPOINTS.COMMUNITIES.CREATE_COMMUNITIES, payload, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    return normalizeCommunity(response.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get communities created by or joined by the current user
export const getYourCommunities = async (param: FindCommunitiesParams): Promise<Community[]> => {
  try {
    const tokens = await getTokens();
    const response = await api.get(API_CONFIG.ENDPOINTS.COMMUNITIES.YOUR_COMMUNITIES, {
      params: {
        latitude: param.latitude,
        longitude: param.longitude,
        limit: param.limit || 20, // default 20 communities per page
        page: param.page || 1     // default first page
      },
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    return response.data.map((c: any) => normalizeCommunity(c));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Find communities near a specific location
export const findNearbyCommunities = async (params: FindCommunitiesParams): Promise<Community[]> => {
  try {
    const tokens = await getTokens();
    const response = await api.get(API_CONFIG.ENDPOINTS.COMMUNITIES.NEARBY, {
      params: {
        latitude: params.latitude,
        longitude: params.longitude,
        limit: params.limit || 20,   // default 20 communities per page
        page: params.page || 1       // default first page
      },
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    return response.data.map((c: any) => normalizeCommunity(c));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCommunity = async (id: string): Promise<(Omit<Community, 'owner'> & { ownerId: string }) | null> => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.COMMUNITIES.GET_ONE(id));
    return normalizeGetCommunity(response.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const joinCommunity = async (communityId: string): Promise<void> => {
  try {
    const tokens = await getTokens();
    await api.post(API_CONFIG.ENDPOINTS.COMMUNITIES.JOIN(communityId), 
    {},
    {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const leaveCommunity = async (communityId: string): Promise<void> => {
  try {
    const tokens = await getTokens();
    await api.post(API_CONFIG.ENDPOINTS.COMMUNITIES.LEAVE(communityId), 
    {},
    {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const normalizeCommunity = (data: any): Community => ({
  communityId: data.communityId,
  name: data.name,
  description: data.description,
  location: data.location,
  banner: data.banner,
  members: data.members,
  communityImageUrl: data.communityImageUrl
    ? `${API_CONFIG.STATIC_BASE_URL}${data.communityImageUrl}`
    : undefined,
  nearby: data.nearby,
  owner: data.owner
});

const normalizeGetCommunity = (data: any): (Omit<Community, 'owner'> & { ownerId: string }) => ({
  communityId: data.communityId,
  name: data.name,
  description: data.description,
  location: data.location,
  banner: data.banner,
  members: data.members,
  communityImageUrl: data.communityImageUrl
    ? `${API_CONFIG.STATIC_BASE_URL}${data.communityImageUrl}`
    : undefined,
  nearby: data.nearby,
  ownerId: data.ownerId
});