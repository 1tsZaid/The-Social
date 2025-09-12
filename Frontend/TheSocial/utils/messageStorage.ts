import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = "messagesByCommunity";

export async function saveMessages(messages: Record<string, any[]>) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (e) {
    console.error("Failed to save messages:", e);
  }
}

export async function loadMessages(): Promise<Record<string, any[]>> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error("Failed to load messages:", e);
    return {};
  }
}

export async function clearMessages() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear messages:", e);
  }
}
