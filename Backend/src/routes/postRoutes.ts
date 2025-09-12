import { Router } from 'express';
import { postController } from '../controllers/postController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/create', authenticateToken, postController.createPost.bind(postController));
router.post('/like/:postId', authenticateToken, postController.likePost.bind(postController));
router.delete('/delete/:postId', authenticateToken, postController.deletePost.bind(postController));
router.get('/before/:communityId', postController.getCommunityPostsBeforeId.bind(postController));
router.get('/:communityId', postController.getCommunityPosts.bind(postController));

export default router;
