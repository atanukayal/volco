import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

const app = express();

// dotenv
dotenv.config();

// connect to db
connectDB();

app.use(express.json());
app.use(morgan('dev'));


app.use('/api/v1/user', require('./routes/userRoutes.js'));
app.use('/api/v1/admin', require('./routes/adminRoutes.js'));
app.use('/api/v1/organisation', require('./routes/orgRoutes.js')); // organisation routes


app.get('/', (req, res) => {
  res.send('Hello World');
});