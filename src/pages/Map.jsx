import { useState } from "react";
import JharkhandMap from "../assets/jharkhand-map.svg";

const WASTE_CENTERS = [
  {
    id: 1,
    name: "Green Earth Recycling Center",
    address: "123 Main Street, Ranchi, Jharkhand 834001",
    city: "Ranchi",
    state: "Jharkhand",
    phone: "+91 98765 43210",
    hours: "Mon-Sat: 9 AM - 6 PM",
    types: ["Plastic", "Paper", "Metal", "Glass"],
    lat: 23.3441,
    lng: 85.3096,
    distance: "2.5 km",
  },
  {
    id: 2,
    name: "Eco Waste Management Hub",
    address: "456 Gandhi Nagar, Patna, Bihar 800001",
    city: "Patna",
    state: "Bihar",
    phone: "+91 87654 32109",
    hours: "Mon-Fri: 8 AM - 7 PM",
    types: ["Organic", "E-Waste", "Plastic", "Paper"],
    lat: 25.5941,
    lng: 85.1376,
    distance: "15.3 km",
  },
  {
    id: 3,
    name: "Sustainable Collection Point",
    address: "789 MG Road, Hazaribagh, Jharkhand 825301",
    city: "Hazaribagh",
    state: "Jharkhand",
    phone: "+91 76543 21098",
    hours: "Tue-Sun: 10 AM - 5 PM",
    types: ["Plastic", "Glass", "Metal"],
    lat: 23.9887,
    lng: 85.3596,
    distance: "65.2 km",
  },
  {
    id: 4,
    name: "Community Recycling Station",
    address: "321 Station Road, Dhanbad, Jharkhand 826001",
    city: "Dhanbad",
    state: "Jharkhand",
    phone: "+91 65432 10987",
    hours: "Mon-Sat: 9 AM - 6 PM",
    types: ["Paper", "Cardboard", "Plastic"],
    lat: 23.7957,
    lng: 86.4304,
    distance: "120.5 km",
  },
  {
    id: 5,
    name: "Green Valley Waste Center",
    address: "654 Village Market, Bokaro, Jharkhand 827001",
    city: "Bokaro",
    state: "Jharkhand",
    phone: "+91 54321 09876",
    hours: "Mon-Fri: 8 AM - 6 PM",
    types: ["E-Waste", "Plastic", "Metal"],
    lat: 23.6693,
    lng: 86.1511,
    distance: "95.8 km",
  },
  {
    id: 6,
    name: "Clean City Collection Point",
    address: "987 Bypass Road, Jamshedpur, Jharkhand 831001",
    city: "Jamshedpur",
    state: "Jharkhand",
    phone: "+91 43210 98765",
    hours: "Daily: 9 AM - 7 PM",
    types: ["All Types"],
    lat: 22.8046,
    lng: 86.2029,
    distance: "135.7 km",
  },
  {
    id: 7,
    name: "Rural Waste Management Unit",
    address: "Village Panchayat, Ramgarh, Jharkhand 829122",
    city: "Ramgarh",
    state: "Jharkhand",
    phone: "+91 32109 87654",
    hours: "Mon-Sat: 10 AM - 4 PM",
    types: ["Organic", "Plastic", "Paper"],
    lat: 23.6345,
    lng: 85.5097,
    distance: "45.3 km",
  },
  {
    id: 8,
    name: "Metro Recycling Facility",
    address: "147 Commercial Street, Kolkata, West Bengal 700001",
    city: "Kolkata",
    state: "West Bengal",
    phone: "+91 21098 76543",
    hours: "Mon-Sat: 8 AM - 8 PM",
    types: ["All Types", "E-Waste"],
    lat: 22.5726,
    lng: 88.3639,
    distance: "280.4 km",
  },
];

export default function MapPage() {
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState("All");
  const [filterType, setFilterType] = useState("All");

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const isApiKeyValid = googleMapsApiKey && googleMapsApiKey.trim() !== "";

  // Get unique states
  const states = ["All", ...new Set(WASTE_CENTERS.map((center) => center.state))];
  
  // Get unique waste types
  const allTypes = WASTE_CENTERS.flatMap((center) => center.types);
  const wasteTypes = ["All", ...new Set(allTypes)];

  // Filter centers
  const filteredCenters = WASTE_CENTERS.filter((center) => {
    const matchesSearch =
      center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = filterState === "All" || center.state === filterState;
    
    const matchesType =
      filterType === "All" ||
      center.types.includes(filterType) ||
      center.types.includes("All Types");

    return matchesSearch && matchesState && matchesType;
  });

  const getTypeColor = (type) => {
    const colors = {
      Plastic: "bg-blue-100 text-blue-700",
      Paper: "bg-yellow-100 text-yellow-700",
      Metal: "bg-gray-100 text-gray-700",
      Glass: "bg-green-100 text-green-700",
      Organic: "bg-emerald-100 text-emerald-700",
      "E-Waste": "bg-purple-100 text-purple-700",
      Cardboard: "bg-orange-100 text-orange-700",
      "All Types": "bg-indigo-100 text-indigo-700",
    };
    return colors[type] || "bg-gray-100 text-gray-700";
  };

  const openGoogleMaps = (lat, lng) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}&hl=en`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-green-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-700 mb-2">
            🗺️ Waste Collection Centers
          </h1>
          <p className="text-gray-600">
            Find nearby recycling and waste collection centers
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔍 Search Location
              </label>
              <input
                type="text"
                placeholder="Search by name, city, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* State Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📍 Filter by State
              </label>
              <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ♻️ Filter by Waste Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {wasteTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Found {filteredCenters.length} center(s)
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Map View
              </h2>
              
              {/* Map Container */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: "600px" }}>
                {isApiKeyValid ? (
                  /* Google Maps Embed */
                  <div
  className="relative rounded-lg overflow-hidden"
  style={{ height: "600px" }}
>
  <img
    src="/src/assets/jharkhand-map.svg"
    className="w-full h-full object-cover"
    alt="Jharkhand Map"
  />

  <div className="absolute top-4 left-4 bg-white/90 px-4 py-2 rounded shadow">
    <h3 className="font-bold text-green-700">
      Jharkhand Waste Centers
    </h3>
    <p className="text-sm text-gray-600">
      Static preview map
    </p>
  </div>
</div>
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200">
                    <div className="text-center p-6">
                      {/* TODO: Replace this with a proper map image */}
                      <img src={JharkhandMap} alt="Map of Jharkhand" className="h-64 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-700 mb-2">Map Unavailable</h3>
                      <p className="text-gray-600 mb-4">
                        To view the interactive map, please set up a Google Maps API key.
                      </p>
                    </div>
                  </div>
                )}

                {/* Custom Markers Overlay Info */}
                {selectedCenter && (
                  <div className="absolute top-4 right-4 bg-white rounded-lg shadow-xl p-4 max-w-xs z-10">
                    <h3 className="font-bold text-green-700 mb-2">
                      {selectedCenter.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {selectedCenter.address}
                    </p>
                    <p className="text-xs text-gray-500">
                      📍 {selectedCenter.distance} away
                    </p>
                    <button
                      onClick={() => openGoogleMaps(selectedCenter.lat, selectedCenter.lng, selectedCenter.name)}
                      className="mt-2 w-full px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
                    >
                      View on Google Maps
                    </button>
                  </div>
                )}
              </div>

              {/* Map Legend */}
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>💡 Tip:</strong> Click on a location card to see it on the map. Use the search and filters above to find centers near you.
                </p>
              </div>
            </div>
          </div>

          {/* Location List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Locations ({filteredCenters.length})
              </h2>
              
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {filteredCenters.length > 0 ? (
                  filteredCenters.map((center) => (
                    <div
                      key={center.id}
                      onClick={() => setSelectedCenter(center)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedCenter?.id === center.id
                          ? "border-green-500 bg-green-50 shadow-md"
                          : "border-gray-200 hover:border-green-300 hover:shadow"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-green-700 text-lg">
                          {center.name}
                        </h3>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {center.distance}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        📍 {center.address}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <span>📞 {center.phone}</span>
                        <span>•</span>
                        <span>🕐 {center.hours}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {center.types.map((type, index) => (
                          <span
                            key={index}
                            className={`text-xs px-2 py-1 rounded-full ${getTypeColor(type)}`}
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openGoogleMaps(center.lat, center.lng, center.name);
                        }}
                        className="w-full mt-2 px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded hover:bg-green-700 transition"
                      >
                        🗺️ Get Directions
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-lg">🔍 No centers found</p>
                    <p className="text-sm mt-2">
                      Try adjusting your search or filters
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Center Details */}
        {selectedCenter && (
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              {selectedCenter.name}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  Location Details
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>📍 Address:</strong> {selectedCenter.address}
                  </p>
                  <p>
                    <strong>🏙️ City:</strong> {selectedCenter.city}
                  </p>
                  <p>
                    <strong>🗺️ State:</strong> {selectedCenter.state}
                  </p>
                  <p>
                    <strong>📞 Phone:</strong> {selectedCenter.phone}
                  </p>
                  <p>
                    <strong>🕐 Hours:</strong> {selectedCenter.hours}
                  </p>
                  <p>
                    <strong>📏 Distance:</strong> {selectedCenter.distance} away
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  Accepted Waste Types
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCenter.types.map((type, index) => (
                    <span
                      key={index}
                      className={`px-3 py-2 rounded-lg font-medium ${getTypeColor(type)}`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
                
                <button
                  onClick={() => openGoogleMaps(selectedCenter.lat, selectedCenter.lng)}
                  className="mt-6 w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-lg"
                >
                  🗺️ Open in Google Maps
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
