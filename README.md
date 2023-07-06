# Todo App

This is a full-stack Todo App built with React, Express, and MongoDB I created as personal project. The application allows users to create, update, and delete tasks, as well as mark them as complete.

App is still in development phase, so there are some bugs and there is a lot of room for imporovement.

## Features

- User registration and login
- Create, update, and delete tasks
- Mark tasks as complete
- Responsive design

## Technologies Used

- React: A JavaScript library for building user - interfaces.
- Express: A minimal and flexible Node.js web application framework.
- MongoDB: A NoSQL database for storing and retrieving data.
- Node.js: A JavaScript runtime environment for server-side development.
- Docker: A platform for developing, shipping, and running applications using containerization.

## Installation

1. Clone the repository:

   ```bash
   https://github.com/dominikfucic/todo-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd todo-app
   ```

3. Configure the environment variables:

   - Create a `.env` file project root directory.
   - Add the following variables to the `.env` file:

     ```bash
     PORT=3001
     DB_HOST=db
     JWT_SECRET=<your-jwt-secret>
     HOST=backend
     ```
    
    Replace `<your-jwt-secret>` with a secret key of your choice.


4. Build app with Docker compose:

   ```bash
   # Build app
   docker compose build
   ```

5. Run the app

   ```bash
   # Run app
   docker compose up -d
   ```

6. Open your browser and navigate to `http://localhost` to access the Todo App.

## API Endpoints

The server provides the following API endpoints:

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Log in an existing user.
- `GET /api/users/getUser`: Return authenticated user.
- `GET /api/todos`: Get all tasks for the authenticated user.
- `POST /api/todos/newTodo`: Create a new task.
- `PATCH /api/todos/editTodo/:todoId`: Update a task by ID.
- `DELETE /api/todos/deleteTodo/:todoId`: Delete a task by ID.

## Contributing

Contributions are welcome! If you find any issues or have suggestions, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).