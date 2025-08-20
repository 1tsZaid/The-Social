import prisma from '../config/database';
import { profileUploadService, postUploadService } from '../utils/fileUpload';

interface PostUser { 
  username: string; // unique identifier for the user 
  profileImage?: string;
  banner: string;
} 

interface PostStats { 
  likes: number; 
} 

interface Post { 
  id: string;
  communityId: string; // unique identifier for the community 
  content: string; 
  attachImage?: string; 
} 

interface CreatePostPayload extends Omit<Post, 'id'> {} 

interface RecieveMessagePayload extends Post { 
  author: PostUser; 
  stats: PostStats; 
  createdAt: string; // year, month, day, time: using isoString format 
} 

interface GetPostsParams { 
  communityId: string; 
  limit?: number; 
  page?: number; 
  sortBy?: 'latest' | 'popular'; 
} 

interface GetBeforePostsParams { 
  communityId: string; 
  beforePostId: string; 
  limit?: number; 
  page?: number; 
  sortBy?: 'latest' | 'popular'; 
} 

interface PostsResponse { 
  posts: RecieveMessagePayload[]; 
  totalPosts: number; 
  hasMore: boolean; 
}

export class PostService {
  /**
   * Create a new post
   */
  async createPost(
    userId: string,
    payload: CreatePostPayload
  ): Promise<RecieveMessagePayload> {
    const post = await prisma.post.create({
      data: {
        content: payload.content,
        communityId: payload.communityId,
        userId: userId,
      },
    });

    // get user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        banner: true,
      },
    });

    if (!user) throw new Error('user not found');

    let postImageUrl = profileUploadService.getFileWithPng(post.postId) || undefined;
    if (payload.attachImage) {
      try {
        if (postImageUrl) {
          await profileUploadService.deleteImage(postImageUrl);
        }

        postImageUrl = await postUploadService.saveBase64Image(post.postId, payload.attachImage);
      } catch (error) {
        throw new Error(`Image upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    const response: RecieveMessagePayload = {
      id: post.postId,
      communityId: post.communityId,
      content: post.content,
      attachImage: postUploadService.getFileWithPng(post.postId) || undefined,
      createdAt: post.postTime.toISOString(),
      author: {
        username: user.username,
        profileImage: profileUploadService.getFileWithPng(user.id) || undefined,
        banner: user.banner,
      },
      stats: {
        likes: 0,
      },
    };

    return response;
  }


  /**
   * Like a post
   */
  async likePostByUserId(postId: string, userId: string): Promise<void> {
    await prisma.like.upsert({
      where: {
        userId_postId: { userId, postId }, // matches @@unique([userId, postId])
      },
      update: {}, // nothing to update if already exists
      create: { postId, userId },
    });
}

  /**
   * Get posts of a community
   */
  async getCommunityPosts(
    communityId: string,
    params: Omit<GetPostsParams, 'communityId'> = {}
  ): Promise<PostsResponse> {
    const { limit = 10, page = 1, sortBy = 'latest' } = params;

    const orderBy =
      sortBy === 'popular'
        ? { likes: { _count: 'desc' } }
        : { postTime: 'desc' };

    const [posts, totalPosts] = await Promise.all([
      prisma.post.findMany({
        where: { communityId },
        include: { user: true, likes: true },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.post.count({ where: { communityId } }),
    ]);

    const responsePosts: RecieveMessagePayload[] = posts.map((post) => ({
      id: post.postId,
      communityId: post.communityId,
      content: post.content,
      attachImage: postUploadService.getFileWithPng(post.postId) || undefined,
      createdAt: post.postTime.toISOString(),
      author: {
        username: post.user.username,
        profileImage: profileUploadService.getFileWithPng(post.user.id) || undefined,
        banner: post.user.banner ?? '',
      },
      stats: {
        likes: post.likes.length,
      },
    }));

    return {
      posts: responsePosts,
      totalPosts,
      hasMore: page * limit < totalPosts,
    };
  }


  /**
   * Get posts before a specific postId
   */
  async getCommunityPostsBeforeId(
    communityId: string,
    params: Omit<GetBeforePostsParams, 'communityId'>
  ): Promise<PostsResponse> {
    const { beforePostId, limit = 10, sortBy = 'latest' } = params;

    const beforePost = await prisma.post.findUnique({
      where: { postId: beforePostId },
    });

    if (!beforePost) {
      return { posts: [], totalPosts: 0, hasMore: false };
    }

    const orderBy =
      sortBy === 'popular'
        ? { likes: { _count: 'desc' } }
        : { postTime: 'desc' };

    const posts = await prisma.post.findMany({
      where: {
        communityId,
        postTime: { lt: beforePost.postTime },
      },
      include: { user: true, likes: true }, 
      orderBy,
      take: limit,
    });

    const responsePosts: RecieveMessagePayload[] = posts.map((post) => ({
      id: post.postId,
      communityId: post.communityId,
      content: post.content,
      attachImage: postUploadService.getFileWithPng(post.postId) || undefined,
      createdAt: post.postTime.toISOString(),
      author: {
        username: post.user.username,
        profileImage:
          profileUploadService.getFileWithPng(post.user.id) || undefined,
        bannerImage: post.user.banner ?? '',
      },
      stats: {
        likes: post.likes.length,
      },
    }));

    return {
      posts: responsePosts,
      totalPosts: responsePosts.length,
      hasMore: responsePosts.length === limit,
    };
  }

}

export const postService = new PostService();
