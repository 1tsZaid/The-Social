import api from './api';
import { API_CONFIG } from '../constants/Api';

interface Profile {
  username: string; // unique identifier for the user
  profileImage?: string;
  bannerImage: string;
  joinedDate: string; // Date with year and month i.e. "2023-10"
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
    const response = await api.get(API_CONFIG.ENDPOINTS.PROFILE.GET_BY_USERNAME(username));
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
