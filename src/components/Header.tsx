import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useNotifications } from '../context/NotificationContext';
import { Coins, Bell } from 'lucide-react';
import ProfileMenu from './ProfileMenu'; // ✅ Works if ProfileMenu is inside components

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { notifications, clearNotifications } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b-2 border-green-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                SWACHH
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Smart Waste Analytics</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <button onClick={() => navigate('/dashboard')} className="text-gray-600 hover:text-green-600 transition">
              Dashboard
            </button>
            <button onClick={() => navigate('/scanner')} className="text-gray-600 hover:text-green-600 transition">
              Scanner
            </button>
            <button onClick={() => navigate('/community')} className="text-gray-600 hover:text-green-600 transition">
              Community
            </button>
            <button onClick={() => navigate('/tracking')} className="text-gray-600 hover:text-green-600 transition">
              Tracking
            </button>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Green Coins */}
            {user && (
              <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1 rounded-full">
                <Coins className="w-4 h-4 text-yellow-600" />
                <span className="font-semibold text-yellow-700">{user.greenCoins}</span>
              </div>
            )}

            {/* Notifications */}
            <div className="relative">
              <div
                className="cursor-pointer relative"
                onClick={() => setShowNotifications((prev) => !prev)}
              >
                <Bell className="w-6 h-6 text-gray-600 hover:text-green-600" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                    {notifications.length}
                  </span>
                )}
              </div>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-lg p-4 z-50">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-gray-800 font-bold">Notifications</h3>
                    {notifications.length > 0 && (
                      <button
                        onClick={clearNotifications}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  {notifications.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center">No new notifications</p>
                  ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`flex justify-between items-center p-2 rounded-lg text-sm
                            ${notif.type === 'success' ? 'bg-green-50 text-green-700' : ''}
                            ${notif.type === 'error' ? 'bg-red-50 text-red-700' : ''}
                            ${notif.type === 'info' ? 'bg-blue-50 text-blue-700' : ''}
                            ${notif.type === 'warning' ? 'bg-yellow-50 text-yellow-700' : ''}
                          `}
                        >
                          <span>{notif.message}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Profile Menu (Replaces direct Logout button) */}
            <ProfileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
