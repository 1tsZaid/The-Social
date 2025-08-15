import { Request, Response } from 'express';
import { authService } from '../services/authService';

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const tokens = await authService.register(req.body);
      
      res.status(201).json(tokens);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const tokens = await authService.login(req.body);
      
      res.status(200).json(tokens);
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const accessToken = await authService.refreshAccessToken(req.body);
      
      res.status(200).json({ accessToken });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async verfiyAccessToken(req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.verifyAccessToken(req.body.accessToken);
      
      if (result.isValid) {
        res.status(200).json(result);
      } else {
        res.status(401).json({ error: result.error }); // result.error = invalid signature
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async verfiyRefreshToken(req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.verifyRefreshToken(req.body.refreshToken);
      
      if (result.isValid) {
        res.status(200).json(result);
      } else {
        res.status(401).json({ error: result.error }); // result.error = invalid signature
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export const authController = new AuthController();
