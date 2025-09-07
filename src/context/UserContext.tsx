import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// -----------------------------
// User Type (extended with stats)
// -----------------------------
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "citizen" | "worker" | "admin" | "committee";
  greenCoins: number;
  level: number;
  location: string;

  // Mock stats
  totalScans?: number;
  wasteRecycled?: number;
  co2Saved?: number;
  challengesCompleted?: number;
  daysActive?: number;

  // Mock activity
  recentActivity?: {
    id: number;
    type: string;
    title: string;
    reward: string;
    time: string;
  }[];
}

interface UserContextType {
  user: User | null;
  setUser: (u: User | null) => void;
  updateGreenCoins: (delta: number) => void;
  logoutUser: () => void;
}

// -----------------------------
// Create Context
// -----------------------------
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage (or create mock one)
  useEffect(() => {
    const storedUser = localStorage.getItem("swachh_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // ✅ Default mock user
      setUser({
        id: "1",
        name: "Citizen",
        email: "citizen@example.com",
        avatar: "https://ui-avatars.com/api/?name=C",
        role: "citizen",
        greenCoins: 150,
        level: 3,
        location: "City Center",

        // Mock stats
        totalScans: 78,
        wasteRecycled: 25,
        co2Saved: 40,
        challengesCompleted: 6,
        daysActive: 12,

        // Mock activity
        recentActivity: [
          {
            id: 1,
            type: "scan",
            title: "Scanned plastic bottle",
            reward: "5 Green Coins",
            time: "2 hours ago",
          },
          {
            id: 2,
            type: "challenge",
            title: "Completed recycling challenge",
            reward: "20 Green Coins",
            time: "1 day ago",
          },
        ],
      });
    }
  }, []);

  // Persist user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("swachh_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("swachh_user");
    }
  }, [user]);

  // Update coins
  const updateGreenCoins = (delta: number) => {
    if (!user) return;
    setUser({ ...user, greenCoins: user.greenCoins + delta });
  };

  // Logout
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("swachh_user");
    localStorage.removeItem("swachh_token");
    window.location.href = "/login"; // redirect to login
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, updateGreenCoins, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

// -----------------------------
// Hook for consuming context
// -----------------------------
export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
};
