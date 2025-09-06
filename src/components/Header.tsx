import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { LogOut, Coins, User, Bell } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleLogout = () => {
    localStorage.removeItem('swachh_token');
    window.location.reload();
  };

  return (
    <header className="bg-white shadow-lg border-b-2 border-green-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
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
          </div>

          <nav className="hidden md:flex space-x-6">
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-gray-600 hover:text-green-600 transition-colors duration-200"
            >
              Dashboard
            </button>
            <button 
              onClick={() => navigate('/scanner')}
              className="text-gray-600 hover:text-green-600 transition-colors duration-200"
            >
              Scanner
            </button>
            <button 
              onClick={() => navigate('/community')}
              className="text-gray-600 hover:text-green-600 transition-colors duration-200"
            >
              Community
            </button>
            <button 
              onClick={() => navigate('/tracking')}
              className="text-gray-600 hover:text-green-600 transition-colors duration-200"
            >
              Tracking
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1 rounded-full">
                <Coins className="w-4 h-4 text-yellow-600" />
                <span className="font-semibold text-yellow-700">{user.greenCoins}</span>
              </div>
            )}
            
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600 hover:text-green-600 cursor-pointer" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>

            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">{user?.name}</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;