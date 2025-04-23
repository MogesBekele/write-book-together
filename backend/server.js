import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRoute from './routes/UserRoute.js';
import connectDB from './config/db.js'; // Import your database connection function
import BookRoute from './routes/BookRoute.js'; // Import BookRoute



dotenv.config(); // Load environment variables

const app = express();

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB(); // Call the database connection function

app.get('/', (req, res) => {
    res.send('welcome to the backend');
});

app.use('/api/user', UserRoute);
app.use('/api/book', BookRoute); // Ensure BookRoute is imported


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
