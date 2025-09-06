import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Truck, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

const MapTracking: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [trackingMode, setTrackingMode] = useState<'vehicles' | 'complaints'>('vehicles');

  const vehicles = [
    {
      id: 'VH-001',
      driver: 'Rajesh Kumar',
      status: 'collecting',
      location: 'Sector 15, Block A',
      progress: 65,
      routeCompleted: '12/18 stops',
      eta: '45 minutes',
      coords: { lat: 28.5355, lng: 77.3910 }
    },
    {
      id: 'VH-002',
      driver: 'Priya Sharma',
      status: 'transit',
      location: 'En route to disposal facility',
      progress: 100,
      routeCompleted: '18/18 stops',
      eta: '20 minutes',
      coords: { lat: 28.5405, lng: 77.3960 }
    },
    {
      id: 'VH-003',
      driver: 'Amit Patel',
      status: 'maintenance',
      location: 'Service Center',
      progress: 0,
      routeCompleted: '0/15 stops',
      eta: 'Unavailable',
      coords: { lat: 28.5455, lng: 77.4010 }
    }
  ];

  const complaints = [
    {
      id: 'CMP-001',
      type: 'Overflow',
      location: 'Sector 21, Bin #45',
      severity: 'high',
      reportedBy: 'Anonymous Citizen',
      status: 'assigned',
      assignedTo: 'VH-001',
      timeReported: '2 hours ago',
      coords: { lat: 28.5305, lng: 77.3860 }
    },
    {
      id: 'CMP-002',
      type: 'Missed Collection',
      location: 'Green Park, Block B',
      severity: 'medium',
      reportedBy: 'Sunita Devi',
      status: 'in-progress',
      assignedTo: 'VH-002',
      timeReported: '4 hours ago',
      coords: { lat: 28.5505, lng: 77.4060 }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'collecting': return 'text-blue-600 bg-blue-100';
      case 'transit': return 'text-green-600 bg-green-100';
      case 'maintenance': return 'text-red-600 bg-red-100';
      case 'assigned': return 'text-yellow-600 bg-yellow-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Real-Time Tracking</h1>
          <p className="text-gray-600">Monitor waste collection vehicles and manage complaints</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-2 shadow-lg">
            <button
              onClick={() => setTrackingMode('vehicles')}
              className={`px-6 py-3 rounded-lg transition-colors ${
                trackingMode === 'vehicles'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              Vehicle Tracking
            </button>
            <button
              onClick={() => setTrackingMode('complaints')}
              className={`px-6 py-3 rounded-lg transition-colors ${
                trackingMode === 'complaints'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              Complaint Management
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-green-200 via-blue-200 to-purple-200 relative">
              {/* Simulated Map */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Navigation className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Interactive Map</h3>
                  <p className="text-gray-500">Real-time GPS tracking visualization</p>
                </div>
              </div>

              {/* Vehicle Markers */}
              {trackingMode === 'vehicles' && vehicles.map((vehicle, index) => (
                <div
                  key={vehicle.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${20 + index * 30}%`,
                    top: `${30 + index * 20}%`
                  }}
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                      <Truck className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap">
                      {vehicle.id}
                    </div>
                  </div>
                </div>
              ))}

              {/* Complaint Markers */}
              {trackingMode === 'complaints' && complaints.map((complaint, index) => (
                <div
                  key={complaint.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${25 + index * 35}%`,
                    top: `${40 + index * 15}%`
                  }}
                >
                  <div className="relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center animate-bounce ${
                      complaint.severity === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}>
                      <AlertTriangle className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap">
                      {complaint.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {trackingMode === 'vehicles' ? (
              <>
                {/* Vehicle List */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Active Vehicles</h2>
                  <div className="space-y-4">
                    {vehicles.map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                          selectedVehicle?.id === vehicle.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => setSelectedVehicle(vehicle)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-800">{vehicle.id}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                            {vehicle.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{vehicle.driver}</p>
                        <p className="text-sm text-gray-600 mb-3">{vehicle.location}</p>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{vehicle.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${vehicle.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{vehicle.routeCompleted}</span>
                            <span>ETA: {vehicle.eta}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Vehicle Details */}
                {selectedVehicle && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Vehicle Details</h2>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Truck className="w-5 h-5 text-blue-500" />
                        <div>
                          <h3 className="font-semibold">{selectedVehicle.id}</h3>
                          <p className="text-sm text-gray-600">Driver: {selectedVehicle.driver}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-green-500" />
                        <div>
                          <h4 className="font-medium">Current Location</h4>
                          <p className="text-sm text-gray-600">{selectedVehicle.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-orange-500" />
                        <div>
                          <h4 className="font-medium">Estimated Completion</h4>
                          <p className="text-sm text-gray-600">{selectedVehicle.eta}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Complaints Panel */
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Active Complaints</h2>
                <div className="space-y-4">
                  {complaints.map((complaint) => (
                    <div key={complaint.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{complaint.type}</h3>
                        <span className={`text-sm font-medium ${getSeverityColor(complaint.severity)}`}>
                          {complaint.severity.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{complaint.location}</p>
                      <p className="text-xs text-gray-500 mb-3">Reported by: {complaint.reportedBy}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className={`px-2 py-1 rounded-full ${getStatusColor(complaint.status)}`}>
                          {complaint.status}
                        </span>
                        <span className="text-gray-500">{complaint.timeReported}</span>
                      </div>
                      
                      {complaint.assignedTo && (
                        <div className="mt-2 text-xs text-blue-600">
                          Assigned to: {complaint.assignedTo}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapTracking;