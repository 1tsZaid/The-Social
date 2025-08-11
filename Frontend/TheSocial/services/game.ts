import api from './api';
import { API_CONFIG } from '../constants/Api';

interface GamePayload {
  //game?: string; unique identifier for the game
  //image?: string;
  //banner?: string;
  //description: string;
  //averagePlayTime?: string; //optional timestamp
}

interface GameLeaderboardPayload {
  //game?: string;
  //image?: string;
  //banner?: string;
  //user1?: string;
  //user1Score?: number;
  //user1Image?: string;
  //user2?: string;
  //user2Score?: number;
  //user2Image?: string;
  //user3?: string;
  //user3Score?: number;
  //user3Image?: string;
}

interface YourLeaderboardPayload {
  //game?: string;
  //username?: string;
  //score?: number;
  //rank?: number;
}

export const getGameInfo = async () => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.GAMES.BASE);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const playGame = async (gameId: string) => {
  try {
    const response = await api.post(API_CONFIG.ENDPOINTS.GAMES.PLAY(gameId));
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
