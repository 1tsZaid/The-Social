import prisma from '../config/database';
import { profileUploadService, postUploadService } from '../utils/fileUpload';

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
      profileImageUrl: profileImageUrl,
      banner: user.banner,
      joinedDate: user.createdAt.toISOString().slice(0, 7),
    };
  }

  async deleteAccount(id: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!user) {
      throw new Error("user not found");
    }

    try {
      // 1. Delete likes
      await prisma.like.deleteMany({
        where: { userId: id },
      });

      // 2. Delete leaderboards
      await prisma.leaderboard.deleteMany({
        where: { userId: id },
      });

      // 3. Get user's posts to also delete attachments
      const userPosts = await prisma.post.findMany({
        where: { userId: id },
        select: { postId: true },
      });

      for (const post of userPosts) {
        const postImageUrl = postUploadService.getFileWithPng(post.postId);
        if (postImageUrl) {
          await postUploadService.deleteImage(post.postId);
        }
      }

      // 4. Delete posts
      await prisma.post.deleteMany({
        where: { userId: id },
      });

      // 5. Disconnect user from communities
      const communities = await prisma.community.findMany({
        where: { members: { some: { id } } },
        select: { communityId: true },
      });

      for (const community of communities) {
        await prisma.community.update({
          where: { communityId: community.communityId },
          data: {
            members: {
              disconnect: { id },
            },
          },
        });
      }

      // 6. Delete profile image
      const profileImageUrl = profileUploadService.getFileWithPng(id);
      if (profileImageUrl) {
        await profileUploadService.deleteImage(id);
      }

      // 7. Delete user
      await prisma.user.delete({
        where: { id },
      });

    } catch (error) {
      throw new Error(
        `Failed to delete account: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

}

export const profileService = new ProfileService();