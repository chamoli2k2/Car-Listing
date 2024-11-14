import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import userRoutes from './routes/user.routes.js';
app.use('/api/user', userRoutes); 

import carRoutes from './routes/car.routes.js';
app.use('/api/car', carRoutes);

export default app;