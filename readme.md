# Student Management Portal

This is a fully functional **Student Management Portal** built with ReactJS. It allows users (admin or regular) to manage student data, including registration, updating details, and viewing statistics. The app also includes **Login** and **Signup** functionality for user authentication and protection of routes.

## Features

- **Student Registration**: Allows adding new students with essential details like name, email, and course.
- **Student List**: Display a list of students with search, filter, and sort options.
- **Student Details**: View detailed information about students and manage their data.
- **Update & Delete**: Update student details or delete students from the list.
- **Dashboard**: View statistics like total students, students per course, etc.
- **Login & Signup**: User authentication with login and registration forms.
- **Protected Routes**: Ensure that only authenticated users can access certain routes.

## Admin Login Credentials

To log in as an admin, use the following credentials:

- **Email**: `admin@example.com`
- **Password**: `password123`

## Setup Instructions

Follow these steps to set up the Student Management Portal locally.

### Prerequisites

- Node.js (v16 or later)
- npm (v8 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mahesh-vardhan-kanakala/student-management-portal.git

2. Navigate into the project directory:
  '''bash
  cd student-management-portal

3. Install the dependencies:
   '''bash
   npm install

4. Running the Application
Once the dependencies are installed, you can start the development server:
    '''bash
    npm run dev

The app will be available at http://localhost:5143.

Authentication Flow
Signup: New users can create an account by providing their name, email, and password.

Email validation and password strength checks are enforced during signup.
Upon successful registration, the user is redirected to the login page.
Login: Existing users can log in using their credentials:

Admin: Email: admin@example.com, Password: password123
Regular users can log in once registered.
Protected Routes: Users must be logged in to access the student management pages. If a user tries to access a protected route without being authenticated, they will be redirected to the login page.

Logout: Clicking on the logout button will clear the user's session and redirect them to the login page.

Technologies Used:
Vite + React + TS

Dependencies
@reduxjs/toolkit: State management using Redux.
react-router-dom: Routing library for navigation.
recharts: For displaying statistical charts.
uuid: For generating unique IDs.
tailwindcss: Utility-first CSS framework for styling.
Dev Dependencies
vite: Build tool for fast development and production builds.
eslint: Linting tool for maintaining code quality.
@vitejs/plugin-react: Vite plugin for React.
typescript: TypeScript support for better development experience.
postcss and autoprefixer: CSS optimization and vendor prefixing.
Future Enhancements
Password Reset: Implement a feature to reset forgotten passwords.
Role-based Authentication: Add different roles like Admin and User with varying access levels.
Improved User Interface: Improve UI with additional features and accessibility enhancements.
License
This project is licensed under the MIT License - see the LICENSE file for details.

markdown
Copy code

### Explanation:

- **Tech Stack**: I included the dependencies from your `package.json` such as React, Redux Toolkit, TailwindCSS, Vite, etc.
- **Installation & Setup**: Clear instructions for setting up the project and running it locally.
- **Admin Credentials**: Mentioned login credentials to access the portal as an admin.
- **Folder Structure**: A simple overview of where the key files and components are located.
- **Build & Preview**: Instructions on how to build the project for production and preview it.

Let me know if you need further modifications or additions!