import prisma from '../config/database';
import { fileUploadService } from '../utils/fileUpload';

interface Profile {
  username: string;
  profileImageUrl?: string;
  banner: string;
  joinedDate: string; // Format: "YYYY-MM"
}

interface UpdateProfilePayload {
  username?: string;
  profileImageInBase64?: string;
  banner?: string;
}

export class ProfileService {
  async getProfileByUserId(id: string): Promise<Profile> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        banner: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new Error('user not found');
    }

    return {
      username: user.username,
      banner: user.banner,
      profileImageUrl: fileUploadService.getFileWithExtension(user.id) || undefined,
      joinedDate: user.createdAt.toISOString().slice(0, 7),
    };
  }

  async getProfileByUsername(username: string): Promise<Profile> {
    const user = await prisma.user.findUnique({
      where: { username: username.toLowerCase() },
      select: {
        id: true,
        username: true,
        banner: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new Error('user not found');
    }

    return {
      username: user.username,
      banner: user.banner,
      profileImageUrl: fileUploadService.getFileWithExtension(user.id) || undefined,
      joinedDate: user.createdAt.toISOString().slice(0, 7),
    };
  }

  async updateProfile(id: string, payload: UpdateProfilePayload): Promise<Profile> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        username: true,
        banner: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new Error('user not found');
    }

    let profileImageUrl = fileUploadService.getFileWithExtension(id) || undefined;
    let username = user.username;

    // Handle profile image update
    if (payload.profileImageInBase64) {
      try {
        // Delete old image if exists
        if (profileImageUrl) {
          await fileUploadService.deleteImage(profileImageUrl);
        }
        
        // Save new image
        profileImageUrl = await fileUploadService.saveBase64Image(id, payload.profileImageInBase64);
      } catch (error) {
        throw new Error(`Image upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // Handle username update
    if (payload.username) {
      const existingProfile = await prisma.user.findUnique({
        where: { username: payload.username.toLowerCase() },
      });

      if (existingProfile) {
        throw new Error('Username already taken');
      }

      username = payload.username.toLowerCase();

      // Also update the username in the User table for consistency
      await prisma.user.update({
        where: { id: id },
        data: { username: payload.username.toLowerCase() },
      });
    }

    return {
      username,
      profileImageUrl: fileUploadService.getFileWithExtension(id) || undefined,
      banner: user.banner,
      joinedDate: user.createdAt.toISOString().slice(0, 7),
    };
  }
}

export const profileService = new ProfileService();