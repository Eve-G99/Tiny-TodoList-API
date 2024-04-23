// models/task.js

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskDescription: {
        type: String,
        required: true,
    },
    createdDate: { //Do not need to set required since already have a default value
        type: Date,
        default: Date.now,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false
    },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

