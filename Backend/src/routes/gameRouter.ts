import { Router } from 'express';
import { gameController } from '../controllers/gameController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/:game/leaderboard/:communityId', gameController.getLeaderboard.bind(gameController));
router.get('/:game/player-stats/:communityId', authenticateToken, gameController.getPlayerLeaderboardStats.bind(gameController));
router.post('/:game/update-score/:communityId', authenticateToken, gameController.updatePlayerScore.bind(gameController));

export default router;