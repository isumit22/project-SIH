import React from 'react';
import { BarChart3, Users, MapPin, AlertCircle, TrendingUp, Calendar } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { title: 'Active Citizens', value: '12,459', change: '+8.2%', color: 'text-green-600' },
    { title: 'Waste Workers', value: '342', change: '+2.1%', color: 'text-blue-600' },
    { title: 'Daily Collections', value: '1,285', change: '+5.7%', color: 'text-purple-600' },
    { title: 'Green Coins Distributed', value: '45,320', change: '+12.4%', color: 'text-yellow-600' }
  ];

  const recentAlerts = [
    { id: 1, type: 'High Priority', message: 'Waste overflow reported at Sector 21', time: '10 min ago', severity: 'red' },
    { id: 2, type: 'Worker Emergency', message: 'SOS triggered by Worker ID: WK-2341', time: '25 min ago', severity: 'red' },
    { id: 3, type: 'System Alert', message: 'Vehicle GPS offline - VH-1045', time: '1 hour ago', severity: 'yellow' },
    { id: 4, type: 'Compliance', message: 'QR scan violations in Zone 5', time: '2 hours ago', severity: 'orange' }
  ];

  const topPerformingAreas = [
    { area: 'Sector 15', score: 98, collections: 245, complaints: 2 },
    { area: 'Green Park', score: 96, collections: 189, complaints: 1 },
    { area: 'Model Town', score: 94, collections: 203, complaints: 3 },
    { area: 'City Center', score: 91, collections: 167, complaints: 5 }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor city-wide waste management operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-gray-400" />
              </div>
              <div className="mt-4">
                <span className={`text-sm font-medium ${stat.color}`}>{stat.change}</span>
                <span className="text-gray-500 text-sm ml-2">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Alerts */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Alerts</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm">View All</button>
            </div>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full mt-2 bg-${alert.severity}-500`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-800">{alert.type}</span>
                      <span className="text-xs text-gray-500">{alert.time}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{alert.message}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm">View</button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-700">Manage Workers</span>
                </div>
              </button>
              
              <button className="w-full text-left p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-700">Route Optimization</span>
                </div>
              </button>
              
              <button className="w-full text-left p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-700">Generate Reports</span>
                </div>
              </button>
              
              <button className="w-full text-left p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-orange-700">Complaint Center</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Performance Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performing Areas */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Top Performing Areas</h2>
            <div className="space-y-4">
              {topPerformingAreas.map((area, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">#{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{area.area}</h3>
                      <p className="text-sm text-gray-600">{area.collections} collections this month</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{area.score}</div>
                    <div className="text-xs text-gray-500">{area.complaints} complaints</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">System Health</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Vehicle Fleet Status</span>
                  <span className="text-green-600 font-medium">98% Active</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Worker Attendance</span>
                  <span className="text-blue-600 font-medium">94% Present</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Collection Efficiency</span>
                  <span className="text-purple-600 font-medium">91% On Time</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-purple-500 h-3 rounded-full" style={{ width: '91%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Citizen Satisfaction</span>
                  <span className="text-yellow-600 font-medium">4.7/5.0</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;