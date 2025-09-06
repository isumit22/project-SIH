import React, { useState } from 'react';
import { MapPin, Navigation, Phone, Clock, Star, Search } from 'lucide-react';

const FacilityLocator: React.FC = () => {
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [facilityType, setFacilityType] = useState('all');

  const facilities = [
    {
      id: 1,
      name: 'Green Earth Recycling Center',
      type: 'recycling',
      address: 'Sector 18, Phase 2, Gurgaon',
      phone: '+91-9876543210',
      distance: '2.3 km',
      rating: 4.8,
      hours: '9:00 AM - 6:00 PM',
      acceptedMaterials: ['Paper', 'Plastic', 'Metal', 'Glass'],
      pricing: '₹15/kg for paper, ₹25/kg for plastic',
      image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      name: 'EcoCompost Processing Unit',
      type: 'composting',
      address: 'Industrial Area, Sector 25',
      phone: '+91-9876543211',
      distance: '4.1 km',
      rating: 4.6,
      hours: '8:00 AM - 5:00 PM',
      acceptedMaterials: ['Food Waste', 'Garden Waste', 'Organic Matter'],
      pricing: 'Free drop-off, ₹5/kg for pickup',
      image: 'https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 3,
      name: 'TechRecycle E-Waste Hub',
      type: 'ewaste',
      address: 'Cyber City, DLF Phase 3',
      phone: '+91-9876543212',
      distance: '5.7 km',
      rating: 4.9,
      hours: '10:00 AM - 7:00 PM',
      acceptedMaterials: ['Mobile Phones', 'Laptops', 'Batteries', 'Cables'],
      pricing: 'Cash for valuable electronics',
      image: 'https://images.pexels.com/photos/3345878/pexels-photo-3345878.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 4,
      name: 'Municipal Waste Collection Point',
      type: 'general',
      address: 'Block A, Sector 14',
      phone: '+91-9876543213',
      distance: '1.8 km',
      rating: 4.2,
      hours: '24 Hours',
      acceptedMaterials: ['General Waste', 'Bulk Items'],
      pricing: 'Free municipal service',
      image: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const facilityTypes = [
    { value: 'all', label: 'All Facilities' },
    { value: 'recycling', label: 'Recycling Centers' },
    { value: 'composting', label: 'Composting Units' },
    { value: 'ewaste', label: 'E-Waste Centers' },
    { value: 'general', label: 'General Collection' }
  ];

  const filteredFacilities = facilities.filter(facility => {
    const matchesType = facilityType === 'all' || facility.type === facilityType;
    const matchesSearch = facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         facility.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'recycling': return '♻️';
      case 'composting': return '🌱';
      case 'ewaste': return '📱';
      case 'general': return '🗑️';
      default: return '📍';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'recycling': return 'text-green-600 bg-green-100';
      case 'composting': return 'text-blue-600 bg-blue-100';
      case 'ewaste': return 'text-purple-600 bg-purple-100';
      case 'general': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Navigation className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Facility Locator</h1>
          <p className="text-gray-600">Find nearby waste management facilities and recycling centers</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search facilities by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <select
              value={facilityType}
              onChange={(e) => setFacilityType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {facilityTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-green-200 via-teal-200 to-blue-200 relative">
              {/* Simulated Map */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Interactive Facility Map</h3>
                  <p className="text-gray-500">Real-time facility locations and availability</p>
                </div>
              </div>

              {/* Facility Markers */}
              {filteredFacilities.slice(0, 4).map((facility, index) => (
                <div
                  key={facility.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${20 + index * 20}%`,
                    top: `${25 + index * 15}%`
                  }}
                  onClick={() => setSelectedFacility(facility)}
                >
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                      selectedFacility?.id === facility.id ? 'ring-4 ring-blue-300' : ''
                    } bg-white`}>
                      <span className="text-xl">{getTypeIcon(facility.type)}</span>
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap">
                      {facility.distance}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedFacility && (
              <div className="p-6 border-t">
                <div className="flex items-start space-x-4">
                  <img
                    src={selectedFacility.image}
                    alt={selectedFacility.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{selectedFacility.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{selectedFacility.address}</p>
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{selectedFacility.rating}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">{selectedFacility.distance}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors">
                        Get Directions
                      </button>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
                        Call Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Facilities List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Nearby Facilities ({filteredFacilities.length})
            </h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredFacilities.map((facility) => (
                <div
                  key={facility.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedFacility?.id === facility.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => setSelectedFacility(facility)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-sm">{facility.name}</h3>
                      <p className="text-xs text-gray-600 mb-1">{facility.address}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(facility.type)}`}>
                      {facility.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span>{facility.rating}</span>
                    </div>
                    <span className="text-gray-500">{facility.distance}</span>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-600">
                    <div className="flex items-center space-x-1 mb-1">
                      <Clock className="w-3 h-3" />
                      <span>{facility.hours}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="w-3 h-3" />
                      <span>{facility.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Facility Info */}
        {selectedFacility && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedFacility.name}</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-800">Address</h4>
                      <p className="text-gray-600">{selectedFacility.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-800">Contact</h4>
                      <p className="text-gray-600">{selectedFacility.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-800">Hours</h4>
                      <p className="text-gray-600">{selectedFacility.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Accepted Materials</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedFacility.acceptedMaterials.map((material: string) => (
                    <span
                      key={material}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                    >
                      {material}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Pricing</h3>
                <p className="text-gray-600 mb-6">{selectedFacility.pricing}</p>
                
                <div className="flex space-x-4">
                  <button className="flex-1 bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
                    Get Directions
                  </button>
                  <button className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                    Schedule Pickup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacilityLocator;