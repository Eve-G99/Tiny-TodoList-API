# Tiny TodoList Backend with Express

This repository contains the backend code for the TodoList iOS application, implemented using Node.js and Express. This API is designed to provide endpoints for comprehensive task management, including creating, retrieving, updating, and deleting tasks, as well as advanced functionalities for sorting and filtering.

## Features

- Create tasks with due dates and descriptions.
- Retrieve tasks, complete with sorting and filtering options.
- Update the details of existing tasks.
- Delete tasks as needed.
- Filter tasks by their completion status.

## Technologies

- **Express and Node.js**: Used for creating the API.
- **MongoDB**: Used as the backend database to store task data.

### Installation

1. **Configure the Application:**
  Navigate to the server.js file and replace the mongoDB string with your connection details:
  
   ```json
   const mongoDB = your-mongodb-url;

2. **Build and Run the Application:**

   ```bash
   npm install
   node server.js

### Usage

Use Postman or any other API testing tool to interact with the API. Here are some sample requests you can perform to test the functionality of the backend:

#### Filters

- `completed` (boolean): Filter tasks by their completion status. Use `?completed=true` to retrieve completed tasks and `?completed=false` for pending tasks.
- `sort_by` (string): Sort tasks by a specific field. Use `?sort_by=createdDate` for ascending order by creation date and `?sort_by=-createdDate` for descending order. Similarly, use `?sort_by=dueDate` and `?sort_by=-dueDate` for due date sorting.

#### API Endpoints

- **Fetch All MeetingNotes**
  - `GET /api/tasks` - Retrieves all the tasks.
  
- **Filter MeetingNotes**
  - `GET /api/tasks/?completed=true` - Filter notes by complete status

- **Sort MeetingNotes**
  - `GET /api/tasks/?sort_by=-createdDate` - Sort notes in descending direction by createdDate
  - `GET /api/tasks/?sort_by=dueDate` - Sort notes in ascending direction by dueDate

- **Add a MeetingNote**
  - `POST /api/tasks` - Adds a new task note. Body requires `taskDescription`, `dueDate`, and `completed`.
  
- **Update a MeetingNote**
  - `PUT /api/tasks/:id` - Updates an existing task by ID. Body can include `taskDescription`, `dueDate`, and `completed`.
  
- **Delete a MeetingNote**
  - `DELETE /api/tasks/:id` - Deletes a task by ID.
