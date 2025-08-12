import api from './api';
import { API_CONFIG } from '../constants/Api';

// store refresh and access token
// use refresh token to get new access token
// check the validation of access token and refresh token before making API calls

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload extends LoginPayload {
  username: string; // unique identifier for the user
}

export const login = async ({ email, password }: LoginPayload): Promise<TokenResponse> => {
  try {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, { email, password });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const register = async ({ email, password, username }: RegisterPayload): Promise<TokenResponse> => {
  try {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, { email, password, username });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  try {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// export const logout = async () => {
//   try {
//     const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };