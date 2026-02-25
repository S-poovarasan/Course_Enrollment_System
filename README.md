# Course Enrollment System

This is a simple course enrollment system built with:

- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT auth
- **Frontend**: React (Create React App), React Router, Axios, Bootstrap

It supports three roles:

- **Admin**: manage courses, assign instructors, view enrollments, list users
- **Instructor**: view assigned courses and see enrolled students
- **Student**: browse all courses, enroll/drop, and see their own enrolled courses

---

## 1. Prerequisites

- Node.js (LTS) installed
- MongoDB running locally (or a MongoDB URI in the cloud)

---

## 2. Backend Setup (`backend`)

1. Install dependencies:

   ```bash
   cd "backend"
   npm install
   ```

2. Create your `.env` file based on `.env.example`:

   ```bash
   copy .env.example .env   # On Windows PowerShell: Copy-Item .env.example .env
   ```

   Then edit `.env` and set:

   - `MONGO_URI` – your MongoDB connection string
   - `JWT_SECRET` – any random secret string
   - `PORT` – (optional) defaults to `5000`

3. Seed the database with sample users and a course:

   ```bash
   node config/seed.js
   ```

   This creates:

   - Admin: `admin@gmail.com` / `admin123`
   - Instructor: `instructor@mail.com` / `instructor123`
   - Student: `student@mail.com` / `student123`

4. Start the backend server:

   ```bash
   npm start
   ```

   The API will run at `http://localhost:5000/api`.

---

## 3. Frontend Setup (`frontend`)

1. Install dependencies:

   ```bash
   cd "frontend"
   npm install
   ```

2. Start the React app:

   ```bash
   npm start
   ```

   The app will run at `http://localhost:3000`.

---

## 4. Usage Flow

- Open `http://localhost:3000`.
- Log in using one of the seeded accounts.

### Admin

- Visit `/admin` (or click Dashboard after login).
- **Create courses**, **assign instructors**, **edit/delete courses**.
- View:
  - List of **instructors**
  - **Enrollments** (course name, code, total enrolled)

### Instructor

- Visit `/instructor`.
- See **assigned courses**.
- Click a course to see **enrolled students** (name, email).

### Student

- Visit `/student`.
- **Available Courses**: see all courses with seats and instructor info.
- **Enroll** / **Drop** buttons update seats.
- **My Courses**: separate list of only the courses the student is enrolled in.

---

## 5. Notes

- Authentication uses JWT; tokens are stored in `localStorage` and attached automatically via `frontend/src/services/api.js`.
- Basic auth state (user + token) is persisted via `frontend/src/context/AuthContext.js`, so refresh keeps you logged in until you log out.
- Modify models/controllers if you need extra fields (e.g. schedules, departments, etc.).

# Course & Instructor Management System (MERN)

## Features
- Admin, Instructor, Student roles
- JWT authentication & role-based access
- Course CRUD, instructor assignment, seat management
- Real-time seat availability
- RESTful API (Node.js, Express, MongoDB)
- React.js frontend with Bootstrap

## Setup

### Backend
1. Copy `.env.example` to `.env` and fill in your MongoDB URI and JWT secret.
2. Run `npm install` in `backend/`.
3. Seed sample data: `node config/seed.js`.
4. Start server: `node server.js` or `npm start`.

### Frontend
1. Run `npm install` in `frontend/`.
2. Start React app: `npm start`.

## Folder Structure
- backend/
  - models/
  - controllers/
  - routes/
  - middleware/
  - config/
  - server.js
- frontend/
  - components/
  - pages/
  - services/
  - context/
  - App.js

## Sample Users
- Admin: admin@mail.com / admin123
- Instructor: instructor@mail.com / instructor123
- Student: student@mail.com / student123

## Deployment
- Use environment variables for secrets
- Ready for deployment on platforms like Heroku, Vercel, etc.

---

**Replace placeholder values and add more features as needed!**
