import Car from '../models/car.model.js';
import uploadImageToCloudinary from '../utils/uploadImageToCloudinary.js';

// Create a new car entry
const createCar = async (req, res) => {
    try {
        const { title, description, year, model, price, type, tags } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'At least one image is required' });
        }

        const imageUrls = await Promise.all(
            req.files.map(async (file) => await uploadImageToCloudinary(file))
        );

        const newCar = new Car({
            user: req.user.id,
            title,
            description,
            year: parseInt(year, 10),
            model,
            price: parseFloat(price),
            type,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            imageUrls,
        });

        const savedCar = await newCar.save();
        res.status(201).json({ message: 'Car created successfully', car: savedCar });
    } catch (error) {
        console.error('Error creating car:', error);
        res.status(500).json({ error: 'Failed to create car' });
    }
};

// Get all cars
const getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cars' });
    }
};

// Get all cars for the logged-in user
const getCarsOfUser = async (req, res) => {
    try {
        const cars = await Car.find({ user: req.user.id });
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user cars' });
    }
};

// Search cars by keyword
const searchCars = async (req, res) => {
    const { query } = req.query;

    try {
        const cars = await Car.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { tags: { $regex: query, $options: 'i' } },
                { type: { $regex: query, $options: 'i' } }
            ]
        });
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search cars' });
    }
};

// Get details of a specific car
const getCarDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get car details' });
    }
};

// Delete a car
const deleteCar = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await Car.findOneAndDelete({ _id: id, user: req.user.id });
        if (!car) {
            return res.status(404).json({ error: 'Car not found or unauthorized' });
        }
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete car' });
    }
};

// Update car details
const updateCar = async (req, res) => {
    const { id } = req.params;
    const { title, description, year, model, price, type, tags } = req.body;
    try {
        const car = await Car.findOne({ _id: id, user: req.user.id });
        if (!car) {
            return res.status(404).json({ error: 'Car not found or unauthorized' });
        }

        // Update existing fields
        car.title = title || car.title;
        car.description = description || car.description;
        car.year = year ? parseInt(year, 10) : car.year;
        car.model = model || car.model;
        car.price = price ? parseFloat(price) : car.price;
        car.type = type || car.type;

        // Check if new images are uploaded
        if (req.files && req.files.length > 0) {
            const imageUrls = await Promise.all(
                req.files.map(file => uploadImageToCloudinary(file))
            );
            car.imageUrls.push(...imageUrls);
        }

        const updatedCar = await car.save();
        res.status(200).json({ message: 'Car updated successfully', car: updatedCar });
    } catch (error) {
        console.error('Error updating car:', error);
        res.status(500).json({ error: 'Failed to update car' });
    }
};


export { createCar, getCars, searchCars, getCarsOfUser, getCarDetails, deleteCar, updateCar };