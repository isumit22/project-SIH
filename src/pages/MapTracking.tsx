import React, { useState } from 'react';
import { MapPin, Truck } from 'lucide-react';

const MapTracking: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [trackingMode, setTrackingMode] = useState<'vehicles' | 'complaints' | 'pickups'>('vehicles');

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

  const pickupPoints = [
    {
      area: 'Alpha 1',
      points: [
        { location: 'Alpha 1 Main Market', time: '7:00 AM - 8:00 AM' },
        { location: 'Alpha 1 Block A', time: '8:15 AM - 9:00 AM' },
      ]
    },
    {
      area: 'Beta 1',
      points: [
        { location: 'Beta Plaza', time: '7:30 AM - 8:30 AM' },
        { location: 'Beta Park Area', time: '8:45 AM - 9:30 AM' },
      ]
    },
    {
      area: 'Gamma 1',
      points: [
        { location: 'Gamma 1 Gate No. 2', time: '6:30 AM - 7:30 AM' },
        { location: 'Gamma Market Road', time: '7:45 AM - 8:30 AM' },
      ]
    },
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Real-Time Tracking</h1>
          <p className="text-gray-600">Monitor vehicles, complaints & pickup schedules</p>
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
              Vehicles
            </button>
            <button
              onClick={() => setTrackingMode('complaints')}
              className={`px-6 py-3 rounded-lg transition-colors ${
                trackingMode === 'complaints'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              Complaints
            </button>
            <button
              onClick={() => setTrackingMode('pickups')}
              className={`px-6 py-3 rounded-lg transition-colors ${
                trackingMode === 'pickups'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              Pickup Points
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden relative">
            <div
              className="h-96 bg-cover bg-center relative"
              style={{ backgroundImage: "url('/folder/greater-noida-map.jpg')" }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>

              {/* 🚛 Truck Markers */}
              {vehicles.map((v, index) => {
                const positions = [
                  { left: "45%", top: "55%" }, // VH-001
                  { left: "60%", top: "35%" }, // VH-002
                  { left: "72%", top: "65%" }, // VH-003
                ];

                return (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVehicle(v)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={positions[index]}
                  >
                    <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <Truck className="w-5 h-5 text-white" />
                    </div>
                    <div className="mt-1 bg-white px-2 py-1 rounded shadow text-xs font-semibold text-gray-800 text-center">
                      {v.id} ({v.status})
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {trackingMode === 'vehicles' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Active Vehicles</h2>
                {vehicles.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVehicle(v)}
                    className={`mb-4 p-3 border rounded-lg hover:border-blue-400 cursor-pointer ${
                      selectedVehicle?.id === v.id ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className="font-semibold">{v.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(v.status)}`}>
                        {v.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{v.driver}</p>
                    <p className="text-xs text-gray-500">{v.location}</p>
                  </div>
                ))}
              </div>
            )}

            {trackingMode === 'complaints' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Active Complaints</h2>
                {complaints.map((c) => (
                  <div key={c.id} className="mb-4 p-3 border rounded-lg">
                    <h3 className="font-semibold">{c.type}</h3>
                    <p className="text-sm text-gray-600">{c.location}</p>
                    <p className="text-xs text-gray-500">{c.timeReported}</p>
                  </div>
                ))}
              </div>
            )}

            {trackingMode === 'pickups' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Pickup Points</h2>
                {pickupPoints.map((area) => (
                  <div key={area.area} className="mb-4">
                    <h3 className="font-semibold text-orange-600">{area.area}</h3>
                    <ul className="pl-4 list-disc text-sm text-gray-700">
                      {area.points.map((p, i) => (
                        <li key={i}>
                          {p.location} – <span className="text-gray-500">{p.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapTracking;
