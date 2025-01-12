import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import userRoutes from './routes/user.route.js';

const app = express();

// dotenv
dotenv.config();

// connect to db
connectDB();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Define the PORT
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
