//server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const taskRoutes = require('./routes/taskRoutes.js');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
//Command: brew services start mongodb-community
mongoose.connect('mongodb://localhost:27017/todoListDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Successful Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));

// Routes
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
