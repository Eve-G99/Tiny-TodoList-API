//server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Load environment variable
const dotenv = require('dotenv');
dotenv.config();

// Import routes
const taskRoutes = require('./routes/taskRoutes.js');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
//Command: brew services start mongodb-community
const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, {})
    .then(() => console.log("Successful Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));

const connection = mongoose.connection;

// Routes
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});