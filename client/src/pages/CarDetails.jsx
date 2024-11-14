import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/constants.js';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch car details
  const fetchCarDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/car/get-details/${id}`);
      setCar(response.data);
    } catch (error) {
      console.error('Error fetching car details:', error);
    }
  };

  // Handle image change
  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  // Back to listing page
  const handleBackToListings = () => {
    navigate('/listing');
  };

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  if (!car) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Container for content */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Image Gallery Section */}
        <div className="lg:w-1/2 space-y-6">
          <div className="relative">
            {/* Main image */}
            <img
              src={car.imageUrls[currentImageIndex]}
              alt={car.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            {/* Left Arrow */}
            <div
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white cursor-pointer bg-gray-800 rounded-full p-2"
              onClick={() => handleImageChange((currentImageIndex - 1 + car.imageUrls.length) % car.imageUrls.length)}
            >
              &#10094;
            </div>
            {/* Right Arrow */}
            <div
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white cursor-pointer bg-gray-800 rounded-full p-2"
              onClick={() => handleImageChange((currentImageIndex + 1) % car.imageUrls.length)}
            >
              &#10095;
            </div>
          </div>

          {/* Thumbnails for image navigation */}
          <div className="flex space-x-4 mt-4">
            {car.imageUrls.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`h-16 w-16 object-cover rounded-lg cursor-pointer transition-transform transform hover:scale-110 ${
                  index === currentImageIndex ? 'border-4 border-yellow-500' : ''
                }`}
                onClick={() => handleImageChange(index)}
              />
            ))}
          </div>
        </div>

        {/* Car Information Section */}
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-4xl font-semibold">{car.title}</h2>
          <p className="text-lg text-gray-400">Model: {car.model}</p>
          <p className="text-lg text-gray-400">Year: {car.year}</p>
          <p className="text-lg text-gray-400">Type: {car.type}</p>
          <p className="text-3xl font-bold text-green-500">₹ {car.price}</p>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Description</h3>
            <p className="text-lg">{car.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-6 mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full lg:w-auto transition-colors">
              Contact Seller
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg w-full lg:w-auto transition-colors">
              Add to Cart
            </button>
          </div>

          {/* Back to Listings Button */}
          <div className="mt-6">
            <button
              onClick={handleBackToListings}
              className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg w-full lg:w-auto transition-colors"
            >
              Back to Listings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
