# 🏥 Hospital Appointment System

A full-stack Hospital Appointment Management System developed using React, Express.js, MongoDB, and Mongoose.

The application allows users to:

- View available doctors
- Book appointments
- Manage appointment data
- Fetch doctor information from APIs
- Store data in MongoDB using Mongoose schemas

---

# 🚀 Frontend Setup

## Navigate to Frontend Folder

```bash
cd Frontend
```

## Install Dependencies

```bash
npm install
```

## Run Frontend

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

---

# 🚀 Backend Setup

## Navigate to Backend Folder

```bash
cd Backend
```

## Install Dependencies

```bash
npm install
```

## Run Backend

```bash
npm run dev
```

or

```bash
npm start
```

Backend will run at:

```text
http://localhost:5000
```

---

# 🍃 MongoDB Setup

## Start MongoDB

Make sure MongoDB Server is running on your system.

## Open MongoDB Compass

Create a database:

```text
HospitalDB
```

Collections:

```text
patients
doctors
appointments
```

MongoDB Connection URL:

```text
mongodb://127.0.0.1:27017/HospitalDB
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the Backend folder.

Example:

```env
MONGO_URI=mongodb://127.0.0.1:27017/HospitalDB
PORT=5000
```

---

# 🛠️ Technologies Used

### Frontend

- React.js
- React Router DOM
- Vite

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

---

# 📌 Features Implemented

### Task 1

- React Component Architecture
- Reusable AppointmentCard Component
- Props-based Data Passing

### Task 2

- React Routing
- Navigation Component
- useState Form Management

### Task 3

- Express REST APIs
- Custom Request Logger Middleware
- Global Error Handling Middleware

### Task 4

- REST API Consumption using Fetch API
- useEffect Hook
- Loading and Error States

### Task 5

- MongoDB Integration
- Mongoose Schemas
- Schema Validation
- Entity Relationships using References

---

# 👨‍💻 Author

Yug Patel

B.Tech Information Technology

DEPSTAR,CHARUSAT
