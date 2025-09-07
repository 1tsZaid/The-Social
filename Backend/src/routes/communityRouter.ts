import { Router } from 'express';
import { communityController } from '../controllers/communityController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Community creation and info
router.post('/create', authenticateToken, communityController.createCommunity.bind(communityController));
router.put('/update/:communityId', authenticateToken, communityController.updateCommunity.bind(communityController));
router.get('/yours', authenticateToken,  communityController.getYourCommunities.bind(communityController));
router.get('/nearby', authenticateToken, communityController.findNearbyCommunities.bind(communityController));
router.get('/members/:communityId', communityController.getCommunityMembers.bind(communityController));
router.post('/change-owner/:communityId', authenticateToken, communityController.changeCommunityOwner.bind(communityController));

// Membership actions
router.post('/join/:communityId', authenticateToken, communityController.joinCommunity.bind(communityController));
router.post('/leave/:communityId', authenticateToken, communityController.leaveCommunity.bind(communityController));

// Get single community
router.get('/:communityId', communityController.getCommunity.bind(communityController));

export default router;