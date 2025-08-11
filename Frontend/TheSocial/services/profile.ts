import api from './api';
import { API_CONFIG } from '../constants/Api';

interface Profile {
  username: string;
  profileImage?: string;
  bannerImage?: string;
  joinedDate: string;
}

interface UpdateProfilePayload {
  username?: string;
  profileImage?: string;
  bannerImage?: string;
}

export const getProfile = async (): Promise<Profile> => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.PROFILE.BASE);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProfile = async (payload: UpdateProfilePayload): Promise<Profile> => {
  try {
    const response = await api.put(API_CONFIG.ENDPOINTS.PROFILE.UPDATE, payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get profile by userId
export const getProfileByUsername = async (username: string): Promise<Profile> => {
  try {
    const response = await api.get(`${API_CONFIG.ENDPOINTS.PROFILE.BASE}/${username}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
