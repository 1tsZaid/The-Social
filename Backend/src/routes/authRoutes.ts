import { Router } from 'express';
import { authController } from '../controllers/authController';

const router = Router();

router.post('/login', authController.login.bind(authController));
router.post('/register', authController.register.bind(authController));
router.post('/refresh-token', authController.refreshToken.bind(authController));
router.post('/verify-access-token', authController.verfiyAccessToken.bind(authController));
router.post('/verify-refresh-token', authController.verfiyRefreshToken.bind(authController));
router.post('/change-password', authController.changePassword.bind(authController));

export default router;
