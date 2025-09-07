import React, { useState } from "react";
import { LogOut, User, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProfileMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { user, logoutUser } = useUser(); // <-- matches context
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); // clears token + user and redirects to /login
  };

  return (
    <div className="relative">
      {/* Avatar / Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full"
      >
        <span className="font-medium hidden md:block">
          {user?.name || "Citizen"}
        </span>
        <img
          src={user?.avatar || "https://ui-avatars.com/api/?name=C"}
          alt="profile"
          className="w-8 h-8 rounded-full"
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl p-2 z-50">
          <button
            className="flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded-lg"
            onClick={() => {
              setOpen(false);
              navigate("/profile");
            }}
          >
            <User className="w-4 h-4 mr-2" /> Profile
          </button>

          <button
            className="flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded-lg"
            onClick={() => {
              setOpen(false);
              navigate("/settings");
            }}
          >
            <Settings className="w-4 h-4 mr-2" /> Settings
          </button>

          <button
            className="flex items-center w-full px-3 py-2 hover:bg-red-50 rounded-lg text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
