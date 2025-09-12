import bcrypt from 'bcryptjs';
import prisma from '../config/database';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken, verifyAccessToken } from '../utils/jwt';

export interface ChangePasswordRequest {
  email: string;
  password: string;
  newPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  username: string;
  banner: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface AuthUser {
  id: string;
  email: string;
  username: string;
}

export interface TokenVerificationResult {
  isValid: boolean;
  error?: string;
}


export class AuthService {
  async register({ email, password, username, banner }: RegisterRequest): Promise<TokenResponse> {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username: username.toLowerCase() }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new Error('Email already registered');
      }
      if (existingUser.username === username.toLowerCase()) {
        throw new Error('Username already taken');
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username: username.toLowerCase(),
        password: hashedPassword,
        banner,
      },
    });

    // Generate tokens
    const accessToken = generateAccessToken({ userId: user.id });
    const refreshToken = generateRefreshToken({ userId: user.id });

    return { accessToken, refreshToken };
  }

  async login({ email, password }: LoginRequest): Promise<TokenResponse> {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate tokens
    const accessToken = generateAccessToken({ userId: user.id });
    const refreshToken = generateRefreshToken({ userId: user.id });
    
    return { accessToken, refreshToken };
  }
  

  async changePassword({ email, password, newPassword }: ChangePasswordRequest): Promise<void> {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error('User not found');
    }
    // Verify current password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid current password');
    }
    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    // Update password
    await prisma.user.update({
      where: { email },
      data: { password: hashedNewPassword },
    });
  }

  async refreshAccessToken(token: RefreshTokenRequest): Promise<string> {
    // Verify refresh token
    const payload = verifyRefreshToken(token.refreshToken);

    // Generate new access token
    const accessToken = generateAccessToken({
      userId: payload.userId,
    });

    return accessToken;
  }

  verifyAccessToken(token: string): TokenVerificationResult {
    try {
      const payload = verifyAccessToken(token);

      return {
        isValid: true,
      }
    } catch (error) {
      return {
        isValid: false,
        error: error instanceof Error ? error.message : 'Invalid access token'
      };
    }
  }

  verifyRefreshToken(token: string): TokenVerificationResult {
    try {
      const payload = verifyRefreshToken(token);

      return {
        isValid: true,
      };
    } catch (error) {
      return {
        isValid: false,
        error: error instanceof Error ? error.message : 'Invalid refresh token'
      };
    }
  }

  // async getUserById(userId: string): Promise<AuthUser | null> {
  //   const user = await prisma.user.findUnique({
  //     where: { id: userId },
  //     select: {
  //       id: true,
  //       email: true,
  //       username: true,
  //     },
  //   });

  //   return user;
  // }
}

export const authService = new AuthService();
