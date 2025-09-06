import React, { createContext, useContext, useState, ReactNode } from "react";
import { getLeaderboard, getPlayerLeaderboardStats, updatePlayerScore } from "@/services/game";

// ---- Interfaces ---- //
export interface LeaderboardEntry {
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
  currentUser?: LeaderboardEntry; // if not in top players, user stats may be here
  lastUpdated: string;
}

// ---- Context Props ---- //
interface LeaderboardContextProps {
  leaderboard: GameLeaderboard | null;
  fetchLeaderboard: (game: string, communityId: string, username: string, limit?: number) => Promise<void>;
  updateScore: (game: string, communityId: string, username: string, score: number, limit?: number) => Promise<void>;
  resetLeaderboard: () => void;
}

const LeaderboardContext = createContext<LeaderboardContextProps | undefined>(undefined);

export const LeaderboardProvider = ({ children }: { children: ReactNode }) => {
  const [leaderboard, setLeaderboard] = useState<GameLeaderboard | null>(null);

  const fetchLeaderboard = async (game: string, communityId: string, username: string, limit: number = 3) => {
    try {
      const data = await getLeaderboard(game, communityId, limit);

      let currentUser: LeaderboardEntry | undefined = data.topPlayers.find(p => p.username === username);

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

  const updateScore = async (game: string, communityId: string, username: string, score: number, limit: number = 3) => {
    try {
      // update the player's score
      await updatePlayerScore({ game, communityId, scoreAchieved: score });
      resetLeaderboard();

      // refresh leaderboard so ranks are correct
      await fetchLeaderboard(game, communityId, username, limit);

    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  const resetLeaderboard = () => {
    setLeaderboard(null);
  };

  return (
    <LeaderboardContext.Provider value={{ leaderboard, fetchLeaderboard, updateScore, resetLeaderboard }}>
      {children}
    </LeaderboardContext.Provider>
  );
};

export const useLeaderboard = () => {
  const context = useContext(LeaderboardContext);
  if (!context) throw new Error("useLeaderboard must be used inside LeaderboardProvider");
  return context;
};
