import React from 'react';
import { MapPin, AlertTriangle, CheckCircle, Clock, Shield, Phone } from 'lucide-react';
import { useUser } from '../context/UserContext';

const WorkerDashboard: React.FC = () => {
  const { user } = useUser();

  const assignments = [
    {
      id: 1,
      location: 'Sector 15, Block A',
      type: 'Regular Collection',
      priority: 'medium',
      status: 'pending',
      distance: '1.2 km',
      households: 24,
      estimatedTime: '45 min'
    },
    {
      id: 2,
      location: 'Main Market, Shop 45',
      type: 'Complaint Resolution',
      priority: 'high',
      status: 'in-progress',
      distance: '0.8 km',
      households: 1,
      estimatedTime: '20 min'
    },
    {
      id: 3,
      location: 'Green Park, Gate 3',
      type: 'Special Cleanup',
      priority: 'low',
      status: 'scheduled',
      distance: '2.1 km',
      households: 0,
      estimatedTime: '60 min'
    }
  ];

  const emergencyContacts = [
    { name: 'Supervisor', phone: '+91-9876543210', role: 'Area Supervisor' },
    { name: 'Medical Emergency', phone: '108', role: 'Ambulance' },
    { name: 'Fire Department', phone: '101', role: 'Fire Emergency' },
    { name: 'Police', phone: '100', role: 'Police Control Room' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-600';
      case 'medium': return 'bg-yellow-100 text-yellow-600';
      case 'low': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-blue-500" />;
      default: return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h1>
              <p className="text-blue-100 mb-4">Your dedication keeps our city clean</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>3 Tasks Completed Today</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Zone: {user?.location}</span>
                </div>
              </div>
            </div>
            
            {/* Emergency SOS Button */}
            <button className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors shadow-lg">
              <Shield className="w-5 h-5" />
              <span>Emergency SOS</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Assignments */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Today's Assignments</h2>
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(assignment.status)}
                      <div>
                        <h3 className="font-semibold text-gray-800">{assignment.location}</h3>
                        <p className="text-sm text-gray-600">{assignment.type}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(assignment.priority)}`}>
                      {assignment.priority}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Distance:</span>
                      <p>{assignment.distance}</p>
                    </div>
                    <div>
                      <span className="font-medium">Households:</span>
                      <p>{assignment.households}</p>
                    </div>
                    <div>
                      <span className="font-medium">Est. Time:</span>
                      <p>{assignment.estimatedTime}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                      Start Task
                    </button>
                    <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contacts & Safety */}
          <div className="space-y-6">
            {/* Emergency Contacts */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Phone className="w-5 h-5 text-red-500" />
                <span>Emergency Contacts</span>
              </h2>
              <div className="space-y-3">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">{contact.name}</h4>
                      <p className="text-xs text-gray-600">{contact.role}</p>
                    </div>
                    <a
                      href={`tel:${contact.phone}`}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition-colors"
                    >
                      Call
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-500" />
                <span>Safety Reminders</span>
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Always wear protective gear</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Report hazardous materials immediately</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Keep emergency contacts accessible</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Stay hydrated during work</span>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">This Week's Performance</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tasks Completed</span>
                  <span className="font-bold text-green-600">18/20</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Customer Rating</span>
                  <span className="font-bold text-yellow-600">4.8/5.0</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;