import prisma from '../config/database';
import { profileUploadService } from '../utils/fileUpload';

interface LeaderboardEntry {
  userId: string;
  username: string;
  userImage?: string;
  userBanner: string;
  score: number;
  rank: number;
}

interface GameLeaderboardPayload {
  communityId: string;
  game: string;
  topPlayers: LeaderboardEntry[];
  lastUpdated: string;
}

interface PlayerLeaderboardPayload {
  communityId: string;
  game: string;
  player: LeaderboardEntry;
}

class GameService {
  /**
   * Validate game and community parameters
   */
  private validateGameParams(game: string, communityId: string): void {
    if (!game || typeof game !== 'string' || game.trim().length === 0) {
      throw new Error('Invalid game parameter');
    }
    if (!communityId || typeof communityId !== 'string' || communityId.trim().length === 0) {
      throw new Error('Invalid communityId parameter');
    }
  }

  /**
   * Check if community exists
   */
  private async validateCommunityExists(communityId: string): Promise<void> {
    console.log(`[GameService] Validating community exists: ${communityId}`);
    
    const community = await prisma.community.findUnique({
      where: { communityId }
    });
    
    if (!community) {
      console.error(`[GameService] Community not found: ${communityId}`);
      throw new Error('Community not found');
    }
    
    console.log(`[GameService] Community validated: ${community.name}`);
  }

  /**
   * Get leaderboard for a game in a community
   * FIXED: Parameter order corrected to match frontend calls
   */
  async getLeaderBoard(game: string, communityId: string, limit: number = 3): Promise<GameLeaderboardPayload> {
    console.log(`[GameService] Getting leaderboard for game: ${game}, community: ${communityId}, limit: ${limit}`);
    
    try {
      // Validate parameters
      this.validateGameParams(game, communityId);
      await this.validateCommunityExists(communityId);

      if (limit <= 0 || limit > 100) {
        console.warn(`[GameService] Invalid limit ${limit}, using default 3`);
        limit = 3;
      }

      console.log(`[GameService] Fetching leaderboard entries from database...`);
      
      const entries = await prisma.leaderboard.findMany({
        where: { communityId, game },
        orderBy: { score: 'desc' },
        include: { 
          user: {
            select: {
              id: true,
              username: true,
              banner: true
            }
          }
        },
        take: limit,
      });

      console.log(`[GameService] Found ${entries.length} leaderboard entries`);

      const topPlayers: LeaderboardEntry[] = entries.map((entry, index) => {
        const userImage = profileUploadService.getFileWithPng(entry.userId);
        console.log(`[GameService] Processing player ${index + 1}: ${entry.user?.username || 'Unknown'}, score: ${entry.score}`);
        
        return {
          userId: entry.userId,
          username: entry.user?.username || 'Unknown User',
          userBanner: entry.user?.banner || '#000000',
          userImage: userImage || undefined,
          score: entry.score,
          rank: index + 1,
        };
      });

      const payload = {
        communityId,
        game,
        topPlayers,
        lastUpdated: new Date().toISOString(),
      };

      console.log(`[GameService] Successfully retrieved leaderboard for ${game} in community ${communityId}`);
      return payload;
      
    } catch (error) {
      console.error(`[GameService] Error getting leaderboard for game ${game} in community ${communityId}:`, error);
      throw error;
    }
  }

  /**
   * Get a single player's leaderboard stats
   */
  async getPlayerLeaderboardStats(
    userId: string,
    communityId: string,
    game: string
  ): Promise<PlayerLeaderboardPayload> {
    console.log(`[GameService] Getting player stats for user: ${userId}, game: ${game}, community: ${communityId}`);
    
    try {
      // Validate parameters
      this.validateGameParams(game, communityId);
      await this.validateCommunityExists(communityId);

      if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid userId parameter');
      }

      console.log(`[GameService] Fetching all leaderboard entries to calculate rank...`);

      const entries = await prisma.leaderboard.findMany({
        where: { communityId, game },
        orderBy: { score: 'desc' },
        include: { 
          user: {
            select: {
              id: true,
              username: true,
              banner: true
            }
          }
        },
      });

      console.log(`[GameService] Found ${entries.length} total entries for ranking calculation`);

      const playerIndex = entries.findIndex(e => e.userId === userId);
      if (playerIndex === -1) {
        console.error(`[GameService] Player ${userId} not found in leaderboard for game ${game}`);
        throw new Error('Player not found in leaderboard');
      }

      const entry = entries[playerIndex];
      console.log(`[GameService] Player found at rank ${playerIndex + 1} with score ${entry.score}`);

      const userImage = profileUploadService.getFileWithPng(entry.userId);

      const payload = {
        communityId,
        game,
        player: {
          userId: entry.userId,
          username: entry.user?.username || 'Unknown User',
          userBanner: entry.user?.banner || '#000000',
          userImage: userImage || undefined,
          score: entry.score,
          rank: playerIndex + 1,
        },
      };

      console.log(`[GameService] Successfully retrieved player stats for ${userId}`);
      return payload;
      
    } catch (error) {
      console.error(`[GameService] Error getting player stats for user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Update or insert player score
   */
  async updatePlayerScore(
    userId: string,
    communityId: string,
    game: string,
    score: number
  ): Promise<PlayerLeaderboardPayload> {
    console.log(`[GameService] Updating score for user: ${userId}, game: ${game}, community: ${communityId}, score: ${score}`);
    
    try {
      // Validate parameters
      this.validateGameParams(game, communityId);
      await this.validateCommunityExists(communityId);

      if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid userId parameter');
      }

      if (typeof score !== 'number' || score < 0) {
        throw new Error('Invalid score: must be a non-negative number');
      }

      console.log(`[GameService] Upserting leaderboard entry...`);

      // Upsert leaderboard entry
      const entry = await prisma.leaderboard.upsert({
        where: {
          userId_communityId_game: { userId, communityId, game },
        },
        update: { 
          score,
        },
        create: { 
          userId, 
          communityId, 
          game, 
          score 
        },
        include: { 
          user: {
            select: {
              id: true,
              username: true,
              banner: true
            }
          }
        },
      });

      console.log(`[GameService] Score updated successfully. New score: ${entry.score}`);

      // Recalculate ranks by fetching all entries
      console.log(`[GameService] Recalculating player rank...`);
      
      const entries = await prisma.leaderboard.findMany({
        where: { communityId, game },
        orderBy: { score: 'desc' },
        include: { 
          user: {
            select: {
              id: true,
              username: true,
              banner: true
            }
          }
        },
      });

      const playerIndex = entries.findIndex(e => e.userId === userId);
      const newRank = playerIndex + 1;
      
      console.log(`[GameService] Player new rank: ${newRank} out of ${entries.length} players`);

      const userImage = profileUploadService.getFileWithPng(entry.userId);

      const payload = {
        communityId,
        game,
        player: {
          userId: entry.userId,
          username: entry.user?.username || 'Unknown User',
          userBanner: entry.user?.banner || '#000000',
          userImage: userImage || undefined,
          score: entry.score,
          rank: newRank,
        },
      };

      console.log(`[GameService] Successfully updated player score for ${userId}`);
      return payload;
      
    } catch (error) {
      console.error(`[GameService] Error updating player score for user ${userId}:`, error);
      throw error;
    }
  }
}

export const gameService = new GameService();