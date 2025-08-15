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
  banner: string;
}

export interface TokenVerificationResult {
  isValid: boolean;
  error?: string;
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

export const register = async ({ email, password, username, banner }: RegisterPayload): Promise<TokenResponse> => {
  try {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, { email, password, username, banner });
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

export const verifyAccessToken = async (accessToken: string): Promise<TokenVerificationResult> => {
  try {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.VERIFY_ACCESS_TOKEN, { accessToken });
    return response.data;
  } catch (error) {
    console.error(error);
    return { isValid: false, error: 'Verification failed' };
  }
};

export const verifyRefreshToken = async (accessToken: string): Promise<TokenVerificationResult> => {
  try {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.VERIFY_ACCESS_TOKEN, { accessToken });
    return response.data;
  } catch (error) {
    console.error(error);
    return { isValid: false, error: 'Verification failed' };
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