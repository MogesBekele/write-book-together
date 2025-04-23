import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet'; // For security headers
import morgan from 'morgan'; // For request logging
import UserRoute from './routes/UserRoute.js';
import BookRoute from './routes/BookRoute.js';
import connectDB from './config/db.js';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the backend');
});

// API routes
app.use('/api/user', UserRoute);
app.use('/api/book', BookRoute);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
