import { Request, Response } from 'express';
import { profileService } from '../services/profileService';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

export class ProfileController {
  async getCurrentProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const profile = await profileService.getProfileByUserId(req.user.userId);
      res.status(200).json(profile);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async deleteAccount(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      await profileService.deleteAccount(req.user.userId);
      res.status(200).json(true);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async getProfileByUsername(req: Request, res: Response): Promise<void> {
    try {
      const profile = await profileService.getProfileByUsername(req.params.username);
      res.status(200).json(profile);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Profile not found') {
          res.status(404).json({ error: error.message });
        } else {
          res.status(400).json({ error: error.message });
        }
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const updatedProfile = await profileService.updateProfile(req.user.userId, req.body);
      
      res.status(200).json(updatedProfile);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Username already taken') || 
            error.message.includes('Profile not found') ||
            error.message.includes('Image upload failed')) {
          res.status(400).json({ error: error.message });
        } else {
          res.status(400).json({ error: error.message });
        }
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}

export const profileController = new ProfileController();