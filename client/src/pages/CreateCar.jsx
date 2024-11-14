import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/constants.js';

const CreateCar = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('year', year);
    formData.append('model', model);
    formData.append('price', price);
    formData.append('type', type);
    formData.append('tags', tags);
    images.forEach((image) => formData.append('images', image));

    setLoading(true); // Set loading state to true

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${BASE_URL}/api/car/create`, formData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      alert('Car created successfully');
      navigate('/listing');
    } catch (error) {
      alert('Failed to create car');
    } finally {
      setLoading(false); // Set loading state to false after the request
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-8 text-center">Add a New Car</h2>

        {/* Car Information */}
        <div className="space-y-4 mb-6">
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 bg-gray-700 rounded" />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 bg-gray-700 rounded"></textarea>
          <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} className="w-full p-3 bg-gray-700 rounded" />
          <input type="text" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} className="w-full p-3 bg-gray-700 rounded" />
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-3 bg-gray-700 rounded" />
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-3 bg-gray-700 rounded">
            <option value="">Select Car Type</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="hatchback">Hatchback</option>
            <option value="coupe">Coupe</option>
            <option value="convertible">Convertible</option>
            <option value="pickup">Pickup Truck</option>
            <option value="minivan">Minivan</option>
            <option value="wagon">Wagon</option>
            <option value="crossover">Crossover</option>
          </select>
          <input type="text" placeholder="Tags (comma-separated)" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full p-3 bg-gray-700 rounded" />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Upload Images:</label>
          <input type="file" multiple onChange={handleImageChange} className="block w-full text-gray-500" />
          <div className="grid grid-cols-3 gap-4 mt-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img src={URL.createObjectURL(image)} alt="Preview" className="h-32 w-full object-cover rounded" />
                <button onClick={() => removeImage(index)} className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1">X</button>
              </div>
            ))}
          </div>
        </div>

        {/* Loading Spinner and Submit Button */}
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="w-8 h-8 border-4 border-t-4 border-gray-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700 py-4 rounded">Add Car</button>
            <button onClick={() => navigate('/listing')} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded">Back to Listing</button>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateCar;
