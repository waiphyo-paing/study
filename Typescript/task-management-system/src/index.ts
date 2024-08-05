// src/index.ts
// import express from 'express';
import express from "express";
import connectDB from './config/database';

import userRoutes from "./routes/userRoutes";

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('API Running'));

// Routes
app.use('/api/user/', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
