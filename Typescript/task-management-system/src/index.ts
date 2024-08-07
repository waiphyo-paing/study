// src/index.ts
// import express from 'express';
import express from "express";
import bodyParser from "body-parser";
import connectDB from './config/database';

import userRoutes from "./routes/userRoutes";
import projectRoutes from "./routes/projectRoute";
import taskRoutes from "./routes/taskRoutes";

const app = express();

app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('API Running'));

// Routes
app.use('/api/user/', userRoutes);
app.use('/api/project/', projectRoutes);
app.use('/api/task/', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
