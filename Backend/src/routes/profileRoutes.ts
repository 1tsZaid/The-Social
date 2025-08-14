import { Router } from 'express';
import { profileController } from '../controllers/profileController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Get current user's profile (authenticated)
router.get('/', authenticateToken, profileController.getCurrentProfile.bind(profileController));

// Update current user's profile (authenticated)
router.put('/update', authenticateToken, profileController.updateProfile.bind(profileController));

// Get profile by username (public)
router.get('/:username', profileController.getProfileByUsername.bind(profileController));

export default router;