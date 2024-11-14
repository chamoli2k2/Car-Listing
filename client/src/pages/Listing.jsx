import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/constants.js';

const Listing = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // For search loading state
  const navigate = useNavigate();

  // Fetch all cars
  const fetchCars = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/car/get_all_car`);
      setCars(response.data);
      setFilteredCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  // Handle Search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return; // Avoid empty searches
    setIsLoading(true); // Start loading
    try {
      const response = await axios.get(`${BASE_URL}/api/car/search`, {
        params: { query: searchQuery }
      });
      setFilteredCars(response.data);
    } catch (error) {
      console.error('Error searching cars:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Navigate to profile page
  const handleProfileClick = () => {
    navigate('/profile');
  };

  // Navigate to car creation form
  const handleAddCar = () => {
    navigate('/create-car');
  };

  // Handle logout
  const handleLogout = () => {
    // Clear the token and redirect to the home page
    localStorage.removeItem('token');
    navigate('/'); // Redirect to home page or login page
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-white">Car Listings</h2>
        <div className="flex space-x-4">
          <button
            onClick={handleProfileClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Profile
          </button>
          <button
            onClick={handleAddCar}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          >
            Add New Car
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search cars..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/3 p-3 bg-gray-700 border border-gray-600 rounded-l-lg focus:outline-none"
        />
        <button
          type="submit"
          className="p-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-r-lg flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M4 12a8 8 0 1 1 16 0" />
            </svg>
          ) : (
            'Search'
          )}
        </button>
      </form>

      {/* Car Listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <Link
              to={`/car/${car._id}`}
              key={car._id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition transform hover:scale-105"
            >
              <img
                src={car.imageUrls[0]}
                alt={car.title}
                className="h-48 w-full object-cover rounded"
              />
              <div className="mt-4">
                <h3 className="text-2xl font-bold">{car.title}</h3>
                <p className="text-gray-400">Year: {car.year}</p>
                <p className="text-gray-400">Type: {car.type}</p>
                <p className="text-green-500 font-bold">₹ {car.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No cars found</p>
        )}
      </div>
    </div>
  );
};

export default Listing;
