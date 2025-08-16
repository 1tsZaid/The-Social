import { Router } from 'express';
import { communityController } from '../controllers/communityController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/create', authenticateToken, communityController.createCommunity.bind(communityController));
router.get('/yours', authenticateToken,  communityController.getYourCommunities.bind(communityController));
router.get('/nearby', authenticateToken, communityController.findNearbyCommunities.bind(communityController));
router.post('/join/:communityId', authenticateToken, communityController.joinCommunity.bind(communityController));
router.post('/leave/:communityId', authenticateToken, communityController.leaveCommunity.bind(communityController));
router.get('/:communityId', communityController.getCommunity.bind(communityController));

export default router;