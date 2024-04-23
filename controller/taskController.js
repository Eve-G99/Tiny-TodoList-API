// controllers/taskController.js
const Task = require('../model/task.js');

// Get all tasks with optional filters and sorting
exports.getAllTasks = async (req, res) => {
    try {
        let query = Task.find();

        // Filter for completed tasks
        if (req.query.completed) {
            query = query.where('completed').equals(req.query.completed === 'true');
        }

        // Sorting: TODO: Expected using:?sort_by=+createdDate, try to encode with %2B, but not working
        if (req.query.sort_by) {
            // Check for descending sort, which uses the '-' sign.
            let sortDirection = req.query.sort_by.startsWith('-') ? '-' : '';
            // If '-' is present, remove it to get the field name.
            let sortByField = sortDirection ? req.query.sort_by.substring(1) : req.query.sort_by;
            query = query.sort(`${sortDirection}${sortByField}`);
        }

        const tasks = await query.exec();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get single task by id
exports.getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Create new task
exports.createTask = async (req, res) => {
    const task = new Task({
        taskDescription: req.body.taskDescription,
        dueDate: req.body.dueDate,
        completed: req.body.completed
    });
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update an existing task
exports.updateTask = async (req, res) => {
    const updates = req.body;
    delete updates.createdDate; // TODO: Can not update createdDate, could remove after finishing front-end setting

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task successfully deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};