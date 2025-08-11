export const API_CONFIG = {
  BASE_URL: 'https://your-backend-url.com/api',
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
      GET_ONE: (game: string) => `/games/${game}`,
      LEADERBOARD: (game: string) => `/games/${game}/leaderboard`,
      PLAYER_STATS: (game: string) => `/games/${game}/player-stats`,
      UPDATE_SCORE: (game: string) => `/games/${game}/update-score`
    },
    MESSAGES: {
      BASE: '/messages'
    },
    POSTS: {
      BASE: '/posts',
      BY_COMMUNITY: (communityId: string) => `/posts/community/${communityId}`,
      BY_USER: (userId: string) => `/posts/user/${userId}`
    },
    PROFILE: {
      BASE: '/profile',
      UPDATE: '/profile/update',
      GET_BY_USERNAME: (username: string) => `/profile/${username}`
    }
  }
};
