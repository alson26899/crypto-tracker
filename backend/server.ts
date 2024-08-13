import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import StockModel from './models/StockModel';
import { fetchAndStoreCryptoData } from './utils/StockData';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Polling interval in milliseconds
const POLL_INTERVAL = 10000; // 10 seconds

// Polling function
const pollData = async () => {
    try {
        await fetchAndStoreCryptoData();
    } catch (error) {
        console.error('Error polling data:', error);
    }
};

// Start polling
setInterval(pollData, POLL_INTERVAL);

// API route to fetch data
app.get('/api/data/:symbol', async (req, res) => {
    const { symbol } = req.params;
    try {
        const data = await StockModel.find({ symbol })
            .sort({ timestamp: -1 })
            .limit(20);
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
