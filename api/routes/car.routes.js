import express from 'express';
import { createCar, getCars, searchCars, getCarsOfUser, getCarDetails, deleteCar, updateCar } from '../controllers/car.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js';

const router = express.Router();

// Route to create a car with image upload
router.post('/create', authMiddleware, upload.array('images', 10), createCar);

// Routes for other functionalities
router.get('/get_all_car', getCars);
router.get('/get_all_car_user', authMiddleware, getCarsOfUser);
router.get('/search', searchCars);
router.get('/get-details/:id', getCarDetails);
router.delete('/delete/:id/', authMiddleware, deleteCar);
router.put('/update/:id', authMiddleware, updateCar);

export default router;
