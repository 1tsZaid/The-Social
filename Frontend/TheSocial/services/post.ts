import api from './api';
import { API_CONFIG } from '../constants/Api';

interface PostUser {
  username: string;
  profileImage?: string;
  bannerImage?: string;
}

interface PostStats {
  likes: number;
  comments: number;
}

interface PostAttachedImg {
  id?: string; // unique identifier for the attachment set by the backend
  image?: string; // url or the actual image file
}

interface CreatePostPayload {
  communityId?: string;
  content: string;
  attachments?: PostAttachedImg[];
}

interface Post extends Omit<CreatePostPayload, 'attachments'> {
  postId: string; // unique identifier for the post set by the backend
  author: PostUser;
  attachments: PostAttachedImg[];
  stats: PostStats;
  createdAt: string;
}

interface GetPostsParams {
  communityId?: string;
  limit?: number;
  page?: number;
  sortBy?: 'latest' | 'popular';
}

interface PostsResponse {
  posts: Post[];
  totalPosts: number;
  hasMore: boolean;
}

export const createPost = async (payload: CreatePostPayload): Promise<Post> => {
  try {
    const response = await api.post(API_CONFIG.ENDPOINTS.POSTS.BASE, payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCommunityPosts = async (
  communityId: string,
  params: Omit<GetPostsParams, 'communityId'> = {}
): Promise<PostsResponse> => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.POSTS.BY_COMMUNITY(communityId), {
      params: {
        limit: params.limit || 20,
        page: params.page || 1,
        sortBy: params.sortBy || 'latest'
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserPosts = async (
  userId: string,
  params: Omit<GetPostsParams, 'userId'> = {}
): Promise<PostsResponse> => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.POSTS.BY_USER(userId), {
      params: {
        limit: params.limit || 20,
        page: params.page || 1,
        sortBy: params.sortBy || 'latest'
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const likePost = async (postId: string): Promise<void> => {
  try {
    await api.post(API_CONFIG.ENDPOINTS.POSTS.LIKE(postId));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

