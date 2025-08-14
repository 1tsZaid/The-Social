import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export async function saveTokens(tokens: { accessToken: string; refreshToken: string }) {
  if (Platform.OS === 'web') {
    localStorage.setItem('authTokens', JSON.stringify(tokens));
  } else {
    await SecureStore.setItemAsync('authTokens', JSON.stringify(tokens));
  }
}

export async function getTokens() {
  if (Platform.OS === 'web') {
    const result = localStorage.getItem('authTokens');
    return result ? JSON.parse(result) : null;
  } else {
    const result = await SecureStore.getItemAsync('authTokens');
    return result ? JSON.parse(result) : null;
  }
}

export async function deleteTokens() {
  if (Platform.OS === 'web') {
    localStorage.removeItem('authTokens');
  } else {
    await SecureStore.deleteItemAsync('authTokens');
  }
}
