import { Request, Response } from 'express';
import { gameService } from '../services/gameService';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

export class GameController {
  async getLeaderboard(req: Request, res: Response) {
    console.log(`[GameController] GET leaderboard request: ${req.method} ${req.originalUrl}`);
    console.log(`[GameController] Params:`, req.params);
    console.log(`[GameController] Query:`, req.query);
    
    try {
      const { game, communityId } = req.params;
      const { limit } = req.query;
      
      // Validate required parameters
      if (!game || !communityId) {
        console.error(`[GameController] Missing required parameters - game: ${game}, communityId: ${communityId}`);
        res.status(400).json({ error: 'Missing required parameters: game and communityId' });
        return;
      }

      // Parse and validate limit parameter
      let parsedLimit = 3; // default
      if (limit && typeof limit === 'string') {
        const limitNum = parseInt(limit, 10);
        if (!isNaN(limitNum) && limitNum > 0 && limitNum <= 100) {
          parsedLimit = limitNum;
        } else {
          console.warn(`[GameController] Invalid limit parameter: ${limit}, using default 3`);
        }
      }

      console.log(`[GameController] Fetching leaderboard with limit: ${parsedLimit}`);
      
      const leaderboard = await gameService.getLeaderBoard(game, communityId, parsedLimit);
      
      console.log(`[GameController] Successfully retrieved leaderboard with ${leaderboard.topPlayers.length} players`);
      res.status(200).json(leaderboard);
      
    } catch (error) {
      console.error(`[GameController] Error in getLeaderboard:`, error);
      
      if (error instanceof Error) {
        // Handle specific error types
        if (error.message.includes('not found')) {
          res.status(404).json({ error: error.message });
        } else if (error.message.includes('Invalid')) {
          res.status(400).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'Failed to fetch leaderboard' });
        }
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async getPlayerLeaderboardStats(req: AuthenticatedRequest, res: Response) {
    console.log(`[GameController] GET player stats request: ${req.method} ${req.originalUrl}`);
    console.log(`[GameController] Params:`, req.params);
    console.log(`[GameController] User:`, req.user?.userId);
    
    try {
      if (!req.user?.userId) {
        console.error(`[GameController] User not authenticated or missing userId`);
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const { game, communityId } = req.params;
      
      // Validate required parameters
      if (!game || !communityId) {
        console.error(`[GameController] Missing required parameters - game: ${game}, communityId: ${communityId}`);
        res.status(400).json({ error: 'Missing required parameters: game and communityId' });
        return;
      }

      console.log(`[GameController] Fetching player stats for user: ${req.user.userId}`);

      const playerLeaderboard = await gameService.getPlayerLeaderboardStats(
        req.user.userId, 
        communityId, 
        game
      );
      
      console.log(`[GameController] Successfully retrieved player stats - rank: ${playerLeaderboard.player.rank}, score: ${playerLeaderboard.player.score}`);
      res.status(200).json(playerLeaderboard);
      
    } catch (error) {
      console.error(`[GameController] Error in getPlayerLeaderboardStats:`, error);
      
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          res.status(404).json({ error: error.message });
        } else if (error.message.includes('Invalid')) {
          res.status(400).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'Failed to fetch player stats' });
        }
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async updatePlayerScore(req: AuthenticatedRequest, res: Response) {
    console.log(`[GameController] POST update score request: ${req.method} ${req.originalUrl}`);
    console.log(`[GameController] Params:`, req.params);
    console.log(`[GameController] Body:`, req.body);
    console.log(`[GameController] User:`, req.user?.userId);
    
    try {
      if (!req.user?.userId) {
        console.error(`[GameController] User not authenticated or missing userId`);
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const { game, communityId } = req.params;
      const { score } = req.body;

      // Validate required parameters
      if (!game || !communityId) {
        console.error(`[GameController] Missing required parameters - game: ${game}, communityId: ${communityId}`);
        res.status(400).json({ error: 'Missing required parameters: game and communityId' });
        return;
      }

      // Enhanced score validation
      if (score === undefined || score === null) {
        console.error(`[GameController] Score is required`);
        res.status(400).json({ error: 'Score is required' });
        return;
      }

      if (typeof score !== 'number' || isNaN(score) || score < 0) {
        console.error(`[GameController] Invalid score value: ${score}`);
        res.status(400).json({ error: 'Invalid score: must be a non-negative number' });
        return;
      }

      // Check for reasonable score limits (optional)
      if (score > 1000000) { // Adjust based on your game
        console.warn(`[GameController] Unusually high score detected: ${score}`);
      }

      console.log(`[GameController] Checking current player stats before update...`);

      // Get current player stats to check if score is actually better
      try {
        const currentStats = await gameService.getPlayerLeaderboardStats(
          req.user.userId, 
          communityId, 
          game
        );
        
        console.log(`[GameController] Current player score: ${currentStats.player.score}, new score: ${score}`);
        
        if (currentStats.player.score >= score && currentStats.player.score > 0) {
          console.log(`[GameController] New score ${score} is not better than current score ${currentStats.player.score}, returning current stats`);
          res.status(200).json(currentStats);
          return;
        }
      } catch (error) {
        // Player doesn't exist in leaderboard yet, continue with update
        console.log(`[GameController] Player not in leaderboard yet, proceeding with first score entry`);
      }

      console.log(`[GameController] Updating player score...`);

      const updatedPlayerScore = await gameService.updatePlayerScore(
        req.user.userId, 
        communityId, 
        game, 
        score
      );
      
      console.log(`[GameController] Successfully updated player score - new rank: ${updatedPlayerScore.player.rank}, score: ${updatedPlayerScore.player.score}`);
      res.status(200).json(updatedPlayerScore);
      
    } catch (error) {
      console.error(`[GameController] Error in updatePlayerScore:`, error);
      
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          res.status(404).json({ error: error.message });
        } else if (error.message.includes('Invalid')) {
          res.status(400).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'Failed to update player score' });
        }
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}

export const gameController = new GameController();