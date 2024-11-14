import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Listing from './pages/Listing';
import CarDetails from './pages/CarDetails';
import CreateCar from './pages/CreateCar';
import Profile from './pages/Profile.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/create-car" element={<CreateCar />} />
        <Route path='/profile' element={<Profile />} />

      </Routes>
    </Router>
  );
}

export default App;
