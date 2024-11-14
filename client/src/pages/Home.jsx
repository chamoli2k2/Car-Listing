import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <img src='./car.jpeg' alt="Car" className="w-full h-2/3 object-cover" />
      <h1 className="text-5xl font-bold mt-8">Welcome to CarListing</h1>
      <p className="mt-4">Find your perfect car today.</p>
      <div className="mt-8 space-x-4">
        <Link to="/login" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded">Login</Link>
        <Link to="/signup" className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded">Sign Up</Link>
      </div>
    </div>
  );
};

export default Home;
