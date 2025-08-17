// Backend/src/controllers/communityController.ts
import { Request, Response } from 'express';
import { communityService, FindCommunitiesParams } from '../services/communityService';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

export class CommunityController {
  async createCommunity(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const payload = req.body;
      // console.log('Creating community with payload:', payload);
      const community = await communityService.createCommunity(req.user.userId, payload);
      // console.log('Community created:', community);
      res.status(200).json(community);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async getYourCommunities(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const { latitude, longitude, limit, page } = req.query;
      // Required check for coordinates
      if (latitude === undefined || longitude === undefined) {
        res.status(400).json({ error: 'Latitude and longitude are required' });
        return;
      }

      // Safely convert all to numbers
      const params: FindCommunitiesParams = {
        latitude: Number(latitude),
        longitude: Number(longitude),
        limit: limit ? Number(limit) : 20,
        page: page ? Number(page) : 1,
      };

      console.log('Fetching user communities with params:', params);

      const communities = await communityService.getUserCommunities(req.user.userId, params);
      res.status(200).json(communities);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async findNearbyCommunities(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }
      const { latitude, longitude, limit, page } = req.query;

      // Required check for coordinates
      if (latitude === undefined || longitude === undefined) {
        res.status(400).json({ error: 'Latitude and longitude are required' });
        return;
      }

      // Safely convert all to numbers
      const params: FindCommunitiesParams = {
        latitude: Number(latitude),
        longitude: Number(longitude),
        limit: limit ? Number(limit) : 20,
        page: page ? Number(page) : 1,
      };

      // Extra guard in case parsing fails
      if (isNaN(params.latitude) || isNaN(params.longitude)) {
        res.status(400).json({ error: 'Invalid latitude or longitude' });
        return;
      }

      const communities = await communityService.getCommunitiesNearby(req.user.userId, params);
      res.status(200).json(communities);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async getCommunity(req: Request, res: Response) {
    try {
      const communityId = req.params.communityId;
      const community = await communityService.getCommunity(communityId);
      res.status(200).json(community);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async joinCommunity(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        console.log('hello from the join community controller', req.user);
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const communityId: string = req.params.communityId;
      const join = await communityService.joinCommunity(req.user.userId, communityId);
      res.status(200).json(join);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async leaveCommunity(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const communityId: string = req.params.communityId;
      const leave = await communityService.leaveCommunity(req.user.userId, communityId);
      res.status(200).json(leave);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
};

export const communityController = new CommunityController();