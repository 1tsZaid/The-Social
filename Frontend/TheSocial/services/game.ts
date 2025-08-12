import api from './api';
import { API_CONFIG } from '../constants/Api';
import socket from './socket';

interface Game {
    game: string; // unique identifier for the game
    image: string;
    banner?: string;
}

interface GamePayload extends Game {
  description: string;
  averagePlayTime?: string; // time in minutes
}

interface LeaderboardEntry {
  username: string; // unique identifier for the player
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
  playTime: string; // time in minutes
}

interface PlayerLeaderboardFetch {
  game: string;
  username: string;
  score: number;
  rank: number;
  totalPlayTime: string; // time in minutes
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

// WebSocket methods for real-time leaderboard updates
export const subscribeToLeaderboard = (game: string, callback: (data: GameLeaderboardPayload) => void) => {
  socket.connect();
  socket.emit('join_game_leaderboard', { game }); // Join the game's room
  socket.on('leaderboard_updated', callback);
};

export const unsubscribeFromLeaderboard = (game: string) => {
  socket.emit('leave_game_leaderboard', { game }); // Leave the game's room
  socket.off('leaderboard_updated');
};

// WebSocket methods for real-time player stats updates
export const subscribeToPlayerStats = (game: string, communityId: number, callback: (data: PlayerLeaderboardFetch) => void) => {
  socket.connect('/' + communityId);
  socket.emit('join_player_stats', { game }); // Join player stats room
  socket.on('player_stats_updated', callback);
};

export const unsubscribeFromPlayerStats = (game: string, communityId: number) => {
  socket.emit('leave_player_stats', { game }); // Leave player stats room
  socket.off('player_stats_updated');
  socket.disconnect('/' + communityId);
};
