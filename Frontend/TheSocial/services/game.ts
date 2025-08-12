import api from './api';
import { API_CONFIG } from '../constants/Api';

interface Game {
    game: string; // unique identifier for the game
    image: string;
    banner?: string;
}

interface GamePayload extends Game {
  description: string;
  averagePlayTime?: string;
}

interface LeaderboardEntry {
  username: string;
  userImage?: string;
  score: number;
  rank: number;
}

interface GameLeaderboardPayload extends Game {
  topPlayers: LeaderboardEntry[];
  lastUpdated: string;
}

interface PlayerLeaderboardStatsUpdate {
  game: string;
  scoreAchieved: number;
  playTime: string;
}

interface PlayerLeaderboardFetch {
  game: string;
  username: string;
  score: number;
  rank: number;
  totalPlayTime: string;
}

export const getGameInfo = async (game?: string): Promise<GamePayload | GamePayload[]> => {
  try {
    const endpoint = game
      ? API_CONFIG.ENDPOINTS.GAMES.GET_ONE(game)
      : API_CONFIG.ENDPOINTS.GAMES.BASE;
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching game info:', error);
    throw error;
  }
};

export const getLeaderboard = async (game: string, limit: number = 3): Promise<GameLeaderboardPayload> => {
  try {
    const response = await api.get(
      API_CONFIG.ENDPOINTS.GAMES.LEADERBOARD(game),
      { params: { limit } }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};

export const getPlayerLeaderboardStats = async (game: string): Promise<PlayerLeaderboardFetch> => {
  try {
    const response = await api.get(
      API_CONFIG.ENDPOINTS.GAMES.PLAYER_STATS(game)
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching player stats:', error);
    throw error;
  }
};

export const updatePlayerScore = async (playerLeaderboardStats: PlayerLeaderboardStatsUpdate): Promise<PlayerLeaderboardFetch> => {
  try {
    const response = await api.post(
      API_CONFIG.ENDPOINTS.GAMES.UPDATE_SCORE(playerLeaderboardStats.game),
      { score: playerLeaderboardStats.scoreAchieved, playTime: playerLeaderboardStats.playTime }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating player score:', error);
    throw error;
  }
};
