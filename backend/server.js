import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

const app = express();

// dotenv
dotenv.config();

// connect to db
connectDB();


app.get('/', (req, res) => {
  res.send('Hello World');
});