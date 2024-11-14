import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
