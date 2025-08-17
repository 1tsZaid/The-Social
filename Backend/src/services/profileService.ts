import prisma from '../config/database';
import { profileUploadService } from '../utils/fileUpload';

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
    console.log("file", profileUploadService.getFileWithPng(user.id));
    console.log("file type", typeof profileUploadService.getFileWithPng(user.id));

    return {
      username: user.username,
      banner: user.banner,
      profileImageUrl: profileUploadService.getFileWithPng(user.id) || undefined,
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
      profileImageUrl: profileUploadService.getFileWithPng(user.id) || undefined,
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

    let profileImageUrl = profileUploadService.getFileWithPng(id) || undefined;
    let username = user.username;

    // Handle profile image update
    if (payload.profileImageInBase64) {
      try {
        // Delete old image if exists
        if (profileImageUrl) {
          await profileUploadService.deleteImage(profileImageUrl);
        }
        console.log("image in base64", payload.profileImageInBase64);
        // Save new image
        profileImageUrl = await profileUploadService.saveBase64Image(id, payload.profileImageInBase64);
        console.log("image saved", profileImageUrl);
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
      profileImageUrl: profileUploadService.getFileWithPng(id) || undefined,
      banner: user.banner,
      joinedDate: user.createdAt.toISOString().slice(0, 7),
    };
  }
}

export const profileService = new ProfileService();