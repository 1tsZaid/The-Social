import prisma from '../config/database';
import { profileUploadService } from '../utils/fileUpload';

interface LeaderboardEntry {
  userId: string;
  username: string; // unique identifier for the player
  userbanner: string;
  userImage?: string;
  score: number;
  rank: number;
}

interface GameLeaderboardPayload {
  communityId: string;
  game: string;
  topPlayers: LeaderboardEntry[];
  lastUpdated: string;
}

interface PlayerLeaderboardStatsUpdate {
  communityId: string;
  game: string;
  scoreAchieved: number;
}

interface PlayerLeaderboardFetch {
  communityId: string
  game: string;
  player: LeaderboardEntry;
}

/**
 * Get leaderboard for a game in a community
 */
export async function getLeaderBoard(communityId: string, game: string, limit: number = 3): Promise<GameLeaderboardPayload> {
  const entries = await prisma.leaderboard.findMany({
    where: { communityId, game },
    orderBy: { score: 'desc' },
    include: { user: true },
    take: limit,
  });

  const topPlayers: LeaderboardEntry[] = entries.map((entry, index) => ({
    userId: entry.userId,
    username: entry.user.username,
    userbanner: entry.user.banner, // you can change if you have user profile image
    userImage: profileUploadService.getFileWithPng(entry.userId) || undefined,
    score: entry.score,
    rank: index + 1,
  }));

  return {
    communityId,
    game,
    topPlayers,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Get a single player’s leaderboard stats
 */
export async function getPlayerLeaderboardStats(
  userId: string,
  communityId: string,
  game: string
): Promise<PlayerLeaderboardFetch> {
  const entries = await prisma.leaderboard.findMany({
    where: { communityId, game },
    orderBy: { score: 'desc' },
    include: { user: true },
  });

  const playerIndex = entries.findIndex(e => e.userId === userId);
  if (playerIndex === -1) {
    throw new Error('Player not found in leaderboard');
  }

  const entry = entries[playerIndex];

  return {
    communityId,
    game,
    player: {
      userId: entry.userId,
      username: entry.user.username,
      userbanner: entry.user.banner,
      userImage: profileUploadService.getFileWithPng(entry.userId) || undefined,
      score: entry.score,
      rank: playerIndex + 1,
    },
  };
}

/**
 * Update or insert player score
 */
export async function updatePlayerScore(
  userId: string,
  communityId: string,
  game: string,
  score: number
): Promise<PlayerLeaderboardFetch> {
  // Upsert leaderboard entry
  const entry = await prisma.leaderboard.upsert({
    where: {
      userId_communityId_game: { userId, communityId, game }, // matches @@unique
    },
    update: { score: { increment: score } },
    create: { userId, communityId, game, score },
    include: { user: true },
  });

  // Recalculate ranks
  const entries = await prisma.leaderboard.findMany({
    where: { communityId, game },
    orderBy: { score: 'desc' },
    include: { user: true },
  });

  const playerIndex = entries.findIndex(e => e.userId === userId);

  return {
    communityId,
    game,
    player: {
      userId: entry.userId,
      username: entry.user.username,
      userbanner: entry.user.banner,
      userImage: profileUploadService.getFileWithPng(entry.userId) || undefined,
      score: entry.score,
      rank: playerIndex + 1,
    },
  };
}