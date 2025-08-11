export const API_CONFIG = {
  BASE_URL: 'https://your-backend-url.com/api',
  // You can add more API related constants here
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH_TOKEN: '/auth/refresh-token'
    },
    COMMUNITIES: {
      BASE: '/communities',
      GET_ONE: (id: string) => `/communities/${id}`,
      YOUR_COMMUNITIES: '/communities/yours',
      NEARBY: '/communities/nearby'
    },
    GAMES: {
      BASE: '/games',
      PLAY: (id: string) => `/games/${id}/play`
    },
    MESSAGES: {
      BASE: '/messages'
    },
    POSTS: {
      BASE: '/posts',
      GET_ONE: (id: string) => `/posts/${id}`,
      BY_COMMUNITY: (communityId: string) => `/posts/community/${communityId}`,
      BY_USER: (userId: string) => `/posts/user/${userId}`,
      LIKE: (id: string) => `/posts/${id}/like`,
      UNLIKE: (id: string) => `/posts/${id}/unlike`,
      COMMENTS: (id: string) => `/posts/${id}/comments`
    },
    PROFILE: {
      BASE: '/profile',
      UPDATE: '/profile/update'
    }
  }
};
