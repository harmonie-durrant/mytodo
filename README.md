# EpyTodo
EpyTodo is a TODO list application with a backend built using Node.js and MySQL database. It provides an API to manage users and their tasks. The goal of the project was to introduce us to the web by making an API. As a bonus we could make a simple front end login page.

## Prerequisites
Make sure you have the following installed:
- Node.js
- MySQL

## Installation
1. Clone the repository:
```bash copy
git clone <repository-url>
```
2. Install dependencies:
```bash
cd EpyTodo
npm install
```
3. Set up the environment variables:
Create a .env file in the root directory and add the following variables:

```
Copy code
MYSQL_DATABASE=<your-mysql-database>
MYSQL_HOST=<your-mysql-host>
MYSQL_USER=<your-mysql-username>
MYSQL_ROOT_PASSWORD=<your-mysql-password>
SECRET=<your-secret-key-for-jwt>
```

4. Import the database schema:
Create a file named **epytodo.sql** and write the database schema according to the provided instructions. Import the file into your MySQL server.

5. Start the server:
```bash
npm run dev
```

6. Start the front-end:
```bash
cd bonus/frontend-epytodo
npm run dev
```

The site will be available at http://localhost:3001

## API Routes
- POST /register: Register a new user.
- POST /login: Authenticate a user and generate a JWT token.
- GET /user: Get the current user's information.
- GET /user/todos: Get all tasks for the current user.
- GET /users/:id or :email: Get user information by ID or email.
- PUT /users/:id: Update user information.
- DELETE /users/:id: Delete a user.
- GET /todos: Get all tasks.
- GET /todos/:id: Get a task by ID.
- POST /todos: Create a new task.
- PUT /todos/:id: Update a task.
- DELETE /todos/:id: Delete a task.

### Technologies Used

#### Backend
- Node.js
- Express.js
- MySQL
- Dotenv
- JsonWebToken
- BcryptJS
- Body-Parser

#### Frontend Bonus
- Next.js
- TailwindCSS
- DaisyUI
