import api from './api';
import { API_CONFIG } from '../constants/Api';

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

interface CreatePostPayload extends Omit<Post, 'id'>  {
}

export interface RecieveMessagePayload extends Post {
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

// This creates a new post in the community by the current user
export const createPost = async (payload: CreatePostPayload): Promise<RecieveMessagePayload> => {
  try {
    const response = await api.post(API_CONFIG.ENDPOINTS.POSTS.CREATE, payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const likePostHandler = async (postId: string): Promise<void> => {
  try {
    await api.post(API_CONFIG.ENDPOINTS.POSTS.LIKE(postId));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Get posts in a community
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

// Get posts in a community before a specific post ID
export const getCommunityPostsBeforeId = async (
  communityId: string,
  params: Omit<GetBeforePostsParams, 'communityId'>
): Promise<PostsResponse> => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.POSTS.BY_COMMUNITY_POST_BEFORE(communityId), {
      params: {
        beforePostId: params.beforePostId,
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

// export const getUserPosts = async (
//   userId: string,
//   params: Omit<GetPostsParams, 'userId'> = {}
// ): Promise<PostsResponse> => {
//   try {
//     const response = await api.get(API_CONFIG.ENDPOINTS.POSTS.BY_USER(userId), {
//       params: {
//         limit: params.limit || 20,
//         page: params.page || 1,
//         sortBy: params.sortBy || 'latest'
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

