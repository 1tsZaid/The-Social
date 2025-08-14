import api from './api';
import { API_CONFIG } from '../constants/Api';

interface Profile {
  username: string; // unique identifier for the user
  profileImageUrl?: string;
  banner: string;
  joinedDate: string; // Date with year and month i.e. "2023-10"
}

interface UpdateProfilePayload {
  username?: string;
  profileImageInBase64?: string; // base64 encoded string of the profile image
  banner?: string;
}

// get profile of the current user
export const getProfile = async (): Promise<Profile> => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.PROFILE.BASE);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// update profile of the current user
export const updateProfile = async (payload: UpdateProfilePayload): Promise<Profile> => {
  try {
    const response = await api.put(API_CONFIG.ENDPOINTS.PROFILE.UPDATE, payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get profile by username
export const getProfileByUsername = async (username: string): Promise<Profile> => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.PROFILE.GET_BY_USERNAME(username));
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
