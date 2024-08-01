// src/index.ts
// import express from 'express';
import express from "express";
import connectDB from './config/database';

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
