import api from './api';
import { API_CONFIG } from '../constants/Api';
import { getTokens } from '../utils/tokenStorage';

export interface Profile {
  username: string; // unique identifier for the user
  profileImageUrl?: string;
  banner: string;
  joinedDate: string; // Date with year and month i.e. "2023-10"
}

export interface UpdateProfilePayload {
  username?: string;
  profileImageInBase64?: string; // base64 encoded string of the profile image
  banner?: string;
}

// get profile of the current user
export const getProfile = async (): Promise<Profile> => {
  try {
    const tokens = await getTokens();
    const response = await api.get(API_CONFIG.ENDPOINTS.PROFILE.BASE, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const data = response.data;
    return {
      username: data.username,
      profileImageUrl: data.profileImageUrl ? `${API_CONFIG.STATIC_BASE_URL}${data.profileImageUrl}` : undefined,
      banner: data.banner,
      joinedDate: data.joinedDate,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// update profile of the current user
export const updateProfile = async (payload: UpdateProfilePayload): Promise<Profile> => {
  try {
    const tokens = await getTokens();
    const response = await api.put(API_CONFIG.ENDPOINTS.PROFILE.UPDATE, payload, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const data = response.data;
    return {
      username: data.username,
      profileImageUrl: data.profileImageUrl ? `${API_CONFIG.STATIC_BASE_URL}${data.profileImageUrl}` : undefined,
      banner: data.banner,
      joinedDate: data.joinedDate,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get profile by username
export const getProfileByUsername = async (username: string): Promise<Profile> => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.PROFILE.GET_BY_USERNAME(username));
    const data = response.data;
    return {
      username: data.username,
      profileImageUrl: data.profileImageUrl ? `${API_CONFIG.STATIC_BASE_URL}${data.profileImageUrl}` : undefined,
      banner: data.banner,
      joinedDate: data.joinedDate,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Delete current user's account
export const deleteAccount = async (): Promise<boolean> => {
  try {
    const tokens = await getTokens();
    const response = await api.delete(API_CONFIG.ENDPOINTS.PROFILE.DELETE, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
