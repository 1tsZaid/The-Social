export const API_CONFIG = {
  BASE_URL: 'http://localhost:3000/api',
  SOCKET_BASE_URL: 'http://localhost:3000',
  STATIC_BASE_URL: 'http://localhost:3000/uploads/',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login', // Authenticates user with email and password, returns access and refresh tokens
      REGISTER: '/auth/register', // Creates new user account with email, password, and username, returns access and refresh tokens
      // LOGOUT: '/auth/logout', // Logs out the current user and invalidates their tokens
      REFRESH_TOKEN: '/auth/refresh-token', // Gets new access token using refresh token
      VERIFY_ACCESS_TOKEN: '/auth/verify-access-token', // Verifies if the provided access token is valid
      VERIFY_REFRESH_TOKEN: '/auth/verify-refresh-token' // Verifies if the provided refresh
    },
    COMMUNITIES: {
      CREATE_COMMUNITIES: '/communities/create', // Creates a new community with name, description, location, and images
      GET_ONE: (id: string) => `/communities/${id}`, // Gets details of a specific community by ID
      YOUR_COMMUNITIES: '/communities/yours', // Gets communities created by or joined by the current user
      NEARBY: '/communities/nearby', // Finds communities near a specific location with pagination support
      JOIN: (id: string) => `/communities/join/${id}`, // Joins a community by ID
      LEAVE: (id: string) => `/communities/leave/${id}` // Leaves
    },
    GAMES: {
      // BASE: '/games', // Gets information about all available games
      // GET_ONE: (game: string) => `/games/${game}`, // Gets detailed information about a specific game
      LEADERBOARD: (game: string, communityId: string) => `/games/${game}/leaderboard/${communityId}`, // Gets top players leaderboard for a specific game
      PLAYER_STATS: (game: string, communityId: string) => `/games/${game}/player-stats/${communityId}`, // Gets current user's stats for a specific game
      UPDATE_SCORE: (game: string, communityId: string) => `/games/${game}/update-score/${communityId}` // Updates player's score and play time for a game
    },
    MESSAGES: {
      BASE: '/messages' // Gets chat messages for a community with pagination and sends new messages
    },
    POSTS: {
      CREATE: '/posts/create', // Creates new posts with content and attachments
      BY_COMMUNITY: (communityId: string) => `/posts/${communityId}`, // Gets all posts for a specific community with pagination
      BY_COMMUNITY_POST_BEFORE: (communityId: string) => `/posts/before/${communityId}`, // Gets posts before a specific post ID
      // BY_USER: (userId: string) => `/posts/user/${userId}`, // Gets all posts by a specific user (currently commented out in implementation)
      LIKE: (postId: string) => `/posts/like/${postId}`, 
    },
    PROFILE: {
      BASE: '/profile', // Gets current user's profile information
      UPDATE: '/profile/update', // Updates user's profile information (username, profile image, banner)
      GET_BY_USERNAME: (username: string) => `/profile/${username}` // Gets profile information for a specific user by username
    }
  }
};
