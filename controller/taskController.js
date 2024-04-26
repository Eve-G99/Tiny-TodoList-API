// controllers/taskController.js
const Task = require('../model/task.js');

// Get all tasks with optional filters and sorting
exports.getAllTasks = async (req, res) => {
    //Params Check
    const allowedParams = ['completed', 'sort_by'];
    const allowedSortFields = ['createdDate', 'dueDate'];
    const queryParams = Object.keys(req.query);

    const invalidParams = queryParams.filter(param => !allowedParams.includes(param));
    if (invalidParams.length > 0) {
        return res.status(400).json({ message: `Invalid parameter(s): ${invalidParams.join(', ')}. Only 'completed' and 'sort_by' are allowed.` });
    }

    try {
        let query = Task.find();

        // Filter for completed tasks
        if (req.query.completed) {
            query = query.where('completed').equals(req.query.completed === 'true');
        }

        // Sorting: 
        // Sort with "+" move to front-end "%2B"
        if (req.query.sort_by) {
            // Check for descending sort, which uses the '-' sign.
            let sortDirection = req.query.sort_by.startsWith('-') ? '-' : '';
            // If '-' is present, remove it to get the field name.
            let sortByField = sortDirection ? req.query.sort_by.substring(1) : req.query.sort_by;

            //Sort Field Check
            if (!allowedSortFields.includes(sortByField)) {
                return res.status(400).json({ message: `Invalid sort field: '${sortByField}'. Only 'createdDate' and 'dueDate' are valid sort fields.` });
            }

            query = query.sort(`${sortDirection}${sortByField}`);
        }

        const tasks = await query.exec();
        res.status(200).json(tasks);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get single task by id
exports.getTask = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: 'Missing task id' });
    }
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Create new task
exports.createTask = async (req, res) => {
    if (!req.body.taskDescription || !req.body.dueDate) {
        return res.status(400).json({ message: 'Missing required task filed' });
    }

    // Convert string dates to Date objects for comparison
    const createdDate = new Date(req.body.createdDate || Date.now());
    const dueDate = new Date(req.body.dueDate);q

    if (createdDate > dueDate) {
        return res.status(400).json({ message: 'Created date cannot be later than due date.' });
    }

    const task = new Task({
        taskDescription: req.body.taskDescription,
        createdDate: createdDate,
        dueDate: dueDate,
        completed: req.body.completed
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update an existing task
exports.updateTask = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: 'Missing task id' });
    }

    const updates = req.body;
    delete updates.createdDate; // CreatedDate can not be updated

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
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: 'Missing task id' });
    }

    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task successfully deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};