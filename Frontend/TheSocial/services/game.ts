import api from './api';
import { API_CONFIG } from '../constants/Api';
import { getTokens } from '../utils/tokenStorage';\

// create a normializing function

interface LeaderboardEntry {
  userId: string;
  username: string; // unique identifier for the player
  userImage?: string;
  userbanner: string;
  score: number;
  rank: number;
}

interface GameLeaderboardPayload {
  communityId: string;
  game: string;
  topPlayers: LeaderboardEntry[];
  lastUpdated: string;
}

interface PlayerLeaderboardStatsUpdate {
  communityId: string;
  game: string;
  scoreAchieved: number;
}

interface PlayerLeaderboardFetch {
  communityId: string
  game: string;
  player: LeaderboardEntry;
}

// get leaderboard for a specific game
export const getLeaderboard = async (communityId: string, game: string, limit: number = 3): Promise<GameLeaderboardPayload> => {
  try {
    const response = await api.get(
      API_CONFIG.ENDPOINTS.GAMES.LEADERBOARD({ communityId, game }),
      { params: { limit } }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};

// get player leaderboard stats for a specific game
export const getPlayerLeaderboardStats = async (communityId: string, game: string): Promise<PlayerLeaderboardFetch> => {
  try {
    const tokens = await getTokens();
    const response = await api.get(
      API_CONFIG.ENDPOINTS.GAMES.PLAYER_STATS({communityId, game}), {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching player stats:', error);
    throw error;
  }
};

// update player leaderboard stats for a specific game
export const updatePlayerScore = async (playerLeaderboardStats: PlayerLeaderboardStatsUpdate): Promise<PlayerLeaderboardFetch> => {
  try {
    const tokens = await getTokens();
    const response = await api.post(
      API_CONFIG.ENDPOINTS.GAMES.UPDATE_SCORE(playerLeaderboardStats.game),
      { score: playerLeaderboardStats.scoreAchieved, communityId: playerLeaderboardStats.communityId }, {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating player score:', error);
    throw error;
  }
};

// WebSocket methods for real-time leaderboard updates
// export const subscribeToLeaderboard = (game: string, callback: (data: GameLeaderboardPayload) => void) => {
//   socket.connect();
//   socket.emit('join_game_leaderboard', { game }); // Join the game's room
//   socket.on('leaderboard_updated', callback);
// };

// export const unsubscribeFromLeaderboard = (game: string) => {
//   socket.emit('leave_game_leaderboard', { game }); // Leave the game's room
//   socket.off('leaderboard_updated');
// };

// // WebSocket methods for real-time player stats updates
// export const subscribeToPlayerStats = (game: string, communityId: number, callback: (data: PlayerLeaderboardFetch) => void) => {
//   socket.connect('/' + communityId);
//   socket.emit('join_player_stats', { game }); // Join player stats room
//   socket.on('player_stats_updated', callback);
// };

// export const unsubscribeFromPlayerStats = (game: string, communityId: number) => {
//   socket.emit('leave_player_stats', { game }); // Leave player stats room
//   socket.off('player_stats_updated');
//   socket.disconnect('/' + communityId);
// };
