import React from "react";
import { useUser } from "../context/UserContext";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  User, 
  Settings, 
  Award, 
  Coins, 
  Calendar,
  Scan,
  BookOpen,
  Users,
  MapPin,
  TrendingUp,
  Recycle,
  Leaf,
  Trophy,
  Clock,
  Edit3,
  Mail,
  Phone,
  MapPin as Location,
  ChevronRight,
  LogOut
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, logoutUser } = useUser(); // ✅ use logoutUser

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl">You are not logged in.</p>
        <a
          href="/login"
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="bg-green-500 text-white rounded-2xl p-6 flex items-center space-x-4">
        <img
          src={user.avatar || "https://ui-avatars.com/api/?name=C"}
          alt="profile"
          className="w-20 h-20 rounded-full border-4 border-white shadow-md"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-sm">{user.email}</p>
          <p className="text-sm mt-1">
            Level {user.level} Contributor • {user.greenCoins} Green Coins
          </p>
        </div>
      </div>

      {/* Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-2">Achievements</h2>
          <ul className="space-y-2">
            <li className="bg-green-50 p-2 rounded-md">
              🏆 Scanned 50+ items
            </li>
            <li className="bg-green-50 p-2 rounded-md">
              🌱 Completed 5 challenges
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-2">Your Coins</h2>
          <p className="text-3xl font-bold text-green-600">{user.greenCoins}</p>
          <p className="text-gray-500 text-sm">+25 this week</p>
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={logoutUser}
          className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
