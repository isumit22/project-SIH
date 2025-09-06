import React, { useState } from 'react';
import { Trophy, Users, Camera, Target, Star, Medal, Upload } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNotifications } from '../context/NotificationContext';

const CommunityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('challenges');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { updateGreenCoins } = useUser();
  const { addNotification } = useNotifications();

  const challenges = [
    {
      id: 1,
      title: 'Plastic-Free Week',
      description: 'Avoid single-use plastics for 7 days',
      duration: '7 days remaining',
      participants: 1249,
      reward: 100,
      progress: 65,
      status: 'active'
    },
    {
      id: 2,
      title: 'Community Cleanup Drive',
      description: 'Clean your neighborhood and share photos',
      duration: '3 days remaining',
      participants: 892,
      reward: 75,
      progress: 40,
      status: 'active'
    },
    {
      id: 3,
      title: 'Eco-Warrior Training',
      description: 'Complete all training modules',
      duration: 'Ongoing',
      participants: 567,
      reward: 150,
      progress: 85,
      status: 'ongoing'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Priya Sharma', area: 'Sector 15', points: 2890, badge: '🏆' },
    { rank: 2, name: 'Rajesh Kumar', area: 'Green Park', points: 2756, badge: '🥈' },
    { rank: 3, name: 'Anjali Singh', area: 'Model Town', points: 2643, badge: '🥉' },
    { rank: 4, name: 'Vikram Gupta', area: 'City Center', points: 2501, badge: '⭐' },
    { rank: 5, name: 'Sunita Devi', area: 'Sector 12', points: 2387, badge: '⭐' }
  ];

  const recentActivities = [
    {
      user: 'Amit Patel',
      action: 'completed Plastic-Free Week challenge',
      time: '2 hours ago',
      points: 100,
      image: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      user: 'Neha Joshi',
      action: 'organized community cleanup',
      time: '5 hours ago',
      points: 75,
      image: 'https://images.pexels.com/photos/6962875/pexels-photo-6962875.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      user: 'Ravi Mehta',
      action: 'shared waste segregation tips',
      time: '1 day ago',
      points: 25,
      image: null
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        // Simulate AI verification
        setTimeout(() => {
          updateGreenCoins(50);
          addNotification('Photo verified! Earned 50 Green Coins', 'success');
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Community Hub</h1>
          <p className="text-gray-600">Join challenges, compete with neighbors, and make a difference together</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8 bg-white rounded-xl p-2 shadow-lg">
          {[
            { id: 'challenges', label: 'Challenges', icon: Target },
            { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
            { id: 'activities', label: 'Activities', icon: Camera }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'challenges' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{challenge.title}</h3>
                    <Trophy className="w-6 h-6 text-yellow-500" />
                  </div>
                  
                  <p className="text-gray-600 mb-4">{challenge.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">{challenge.duration}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Participants</span>
                      <span className="font-medium">{challenge.participants.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Reward</span>
                      <span className="font-medium text-green-600">{challenge.reward} coins</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Your Progress</span>
                      <span className="font-medium">{challenge.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-colors">
                    {challenge.status === 'active' ? 'Continue Challenge' : 'Join Challenge'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">City Leaderboard</h2>
            <div className="space-y-4">
              {leaderboard.map((user) => (
                <div 
                  key={user.rank}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    user.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{user.badge}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.area}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">{user.points.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Green Coins</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="text-center">
                <Medal className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-bold text-gray-800 mb-1">Your Current Rank</h3>
                <p className="text-purple-600 text-xl font-bold">#47 in your city</p>
                <p className="text-sm text-gray-600">Keep participating to climb higher!</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="space-y-6">
            {/* Photo Upload Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Share Your Green Actions</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="photo-upload"
                />
                
                {uploadedImage ? (
                  <div className="space-y-4">
                    <img src={uploadedImage} alt="Uploaded" className="max-w-64 mx-auto rounded-lg" />
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 rounded-full">
                        <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-green-700 font-medium">AI Verifying...</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Your Cleanup Photos</h3>
                    <p className="text-gray-600 mb-4">Share before/after photos of your cleanup activities</p>
                    <label
                      htmlFor="photo-upload"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:from-green-600 hover:to-blue-600 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Choose Photo</span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Community Feed</h2>
              <div className="space-y-6">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    {activity.image ? (
                      <img src={activity.image} alt="Activity" className="w-16 h-16 rounded-lg object-cover" />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Star className="w-8 h-8 text-white" />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{activity.user}</h4>
                        <span className="text-sm text-gray-500">{activity.time}</span>
                      </div>
                      <p className="text-gray-600 mb-2">{activity.action}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600 font-medium">+{activity.points} coins</span>
                        <span className="text-gray-400">•</span>
                        <button className="text-blue-600 hover:text-blue-700 text-sm">Like</button>
                        <button className="text-blue-600 hover:text-blue-700 text-sm">Share</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;