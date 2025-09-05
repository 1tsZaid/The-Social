import React, { createContext, useContext, useState, ReactNode } from "react";
import { getLeaderboard, getPlayerLeaderboardStats, updatePlayerScore } from "@/services/game";

// ---- Interfaces ---- //
export interface LeaderboardEntry {
  userId: string;
  username: string;
  userImage?: string;
  userBanner: string;
  score: number;
  rank: number;
}

export interface GameLeaderboard {
  communityId: string;
  game: string;
  topPlayers: LeaderboardEntry[];
  currentUser?: LeaderboardEntry; // always present if userId is passed
  lastUpdated: string;
}

// ---- Context Props ---- //
interface LeaderboardContextProps {
  leaderboard: GameLeaderboard | null;
  fetchLeaderboard: (game: string, communityId: string, userId: string, limit?: number) => Promise<void>;
  updateScore: (game: string, communityId: string, userId: string, score: number, limit?: number) => Promise<void>;
}

const LeaderboardContext = createContext<LeaderboardContextProps | undefined>(undefined);

export const LeaderboardProvider = ({ children }: { children: ReactNode }) => {
  const [leaderboard, setLeaderboard] = useState<GameLeaderboard | null>(null);

  const fetchLeaderboard = async (game: string, communityId: string, userId: string, limit: number = 3) => {
    try {
      const data = await getLeaderboard(game, communityId, limit);

      let currentUser: LeaderboardEntry | undefined = data.topPlayers.find(p => p.userId === userId);

      // If the user is not already in leaderboard, fetch their stats
      if (!currentUser) {
        try {
          const playerData = await getPlayerLeaderboardStats(game, communityId);
          currentUser = playerData.player;
        } catch (err) {
          console.warn("Could not fetch current user stats:", err);
        }
      }

      setLeaderboard({
        ...data,
        currentUser,
      });
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  const updateScore = async (game: string, communityId: string, userId: string, score: number, limit: number = 3) => {
    try {
      // update the player's score
      const updatedPlayer = await updatePlayerScore({ game, communityId, scoreAchieved: score });

      // refresh leaderboard so ranks are correct
      await fetchLeaderboard(game, communityId, userId, limit);

    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  return (
    <LeaderboardContext.Provider value={{ leaderboard, fetchLeaderboard, updateScore }}>
      {children}
    </LeaderboardContext.Provider>
  );
};

export const useLeaderboard = () => {
  const context = useContext(LeaderboardContext);
  if (!context) throw new Error("useLeaderboard must be used inside LeaderboardProvider");
  return context;
};
