import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

// Configure CORS with options
app.use(
  cors({
    origin: ['https://car-listing-ixro.onrender.com', 'http://localhost:5173'], 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import userRoutes from './routes/user.routes.js';
app.use('/api/user', userRoutes);

import carRoutes from './routes/car.routes.js';
app.use('/api/car', carRoutes);

export default app;
