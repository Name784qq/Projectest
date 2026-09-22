require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Allows the React front end to communicate with this API

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => {
        console.error('Database connection failed:', err);
        process.exit(1);
    });

// Placeholder for future routes
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'Course Registration API is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});