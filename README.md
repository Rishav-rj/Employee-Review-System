# Employees Review System

### Introduction
This Employees Review System is a web application designed to manage employee reviews and feedback. It allows administrators to add, delete, and update employee information, as well as assign employees to review others. Employees can log in to submit feedback on their peers and view their own dashboard.

## Setup
**To run this application, follow these steps:**
- Clone the repository.
- Install dependencies by running 'npm install'.
- Create a .env file in the root directory and define the following variables:

```

PORT=3000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_JWT_SECRET

```
Replace `YOUR_MONGODB_URI` with your MongoDB connection string and `YOUR_JWT_SECRET` with a secret key for JWT token generation.

## Running the Application
Run the application using the following command:
```

npm start

```


The server will start listening on the specified port (default is 3000).

## API Endpoints

- `GET /` - Renders the home page.
- `GET /dashboard` - Renders the dashboard for users.
- `GET /logout` - Logs out the user and clears the JWT token.
- `GET /employees` - Renders the page to view all employees (accessible to admins only).
- `GET /employees/:id/delete` - Deletes an employee by ID (accessible to admins only).
- `POST /employees/add` - Adds a new employee (accessible to admins only).
- `POST /employees/assign` - Assigns an employee to review another employee (accessible to admins only).
- `POST /employees/update` - Updates employee information (accessible to admins only).
- `POST /submitfeedback` - Submits feedback for an employee.
- `POST /signup` - Registers a new user.
- `POST /login` - Logs in an existing user.

## Repository Structure
- `config/mongoDB.js` - MongoDB configuration.
- `middleware`
    - `isAdminMiddleware.js` - Middleware to check if user is an admin.
    - `jwtMiddleware.js` - JWT middleware for user authentication.
- `public`
    - `images` - 404 page image.
    - `jS`
        - `employees.js` - JS code for employees html file.
        - `form.js` - JS code for sign-up & login form.
    - `Style`
        - `employees.css`   - css code for employees html file.
        - `home.css` - css code for for sign-up & login form.
        - `dashboard.css` - css code for user & admin dashboard.
- `src`
    - `routes/userRoute.js` - User routes definition.
    - `controllers/userController.js` - User controller handling route logic.
    - `models/userSchema.js` - Mongoose schema for user data.
    - `repository/userRepo.js` - Repository functions for interacting with the database.
    - `views`
       - `404.ejs` - Page not found HTML code
       - `adminDashboard.ejs` Admin Dashboard HTML code
       - `employees.ejs` - Employees HTML code for Admin user
       - `home.ejs` - Signup & login HTML code
       - `layout.ejs` - EJS default layout HTML code 
       - `userDashboard.ejs` - Employees Dashboard HTML code
- `index.js` - Entry point of the application.
- `server.js` - main file to run the application.
## Technologies Used
- Node.js
- Express.js
- MongoDB
- dotenv
- cookie-parser
- express-ejs-layouts
- JWT for authentication
- bcrypt for password hashing

Feel free to contribute to this project by submitting pull requests or reporting issues. Happy coding! 🚀
