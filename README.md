# Grocery Shop Management System

Full-stack application for managing a grocery shop with separate frontend and backend directories.

## 📁 Project Structure

```
demo/
├── backend/          # Node.js/Express API
│   ├── config/       # Database configuration
│   ├── controllers/  # Business logic
│   ├── data/         # Seed scripts
│   ├── middlewares/  # Validation & error handling
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API routes
│   ├── server.js     # Backend entry point
│   └── package.json  # Backend dependencies
│
└── frontend/         # React application
    ├── src/          # React source code
    │   ├── components/
    │   └── services/
    ├── package.json  # Frontend dependencies
    └── vite.config.js
```

## 🚀 Quick Start

### Backend Setup

1. Navigate to backend:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   copy env.example .env
   ```

4. Start MongoDB (if using local MongoDB):
   ```bash
   Start-Service MongoDB
   ```

5. Seed database (optional):
   ```bash
   npm run seed
   ```

6. Start backend server:
   ```bash
   npm start
   ```
   
   Backend runs on: **http://localhost:3000**

### Frontend Setup

1. Navigate to frontend:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start frontend:
   ```bash
   npm run dev
   ```
   
   Frontend runs on: **http://localhost:5173**

## 📋 Running Both

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## 🌐 Access Points

- **Frontend UI**: http://localhost:5173
- **Backend API**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/health

## 📚 Documentation

- **Backend**: See `backend/README.md`
- **Frontend**: See `frontend/README.md`
- **MongoDB Setup**: See `backend/MONGODB_SETUP.md` (if exists)

## 🛠️ Tech Stack

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- Express Validator
- CORS

### Frontend
- React 18
- Vite
- Axios
- CSS

## ⚠️ Requirements

- Node.js and npm installed
- MongoDB running (local or Atlas)
- Two terminal windows for running both services

## 🔧 Features

- ✅ Product Management (CRUD)
- ✅ Order Management
- ✅ Stock Management
- ✅ Order Status Tracking
- ✅ Customer Management
- ✅ Search & Filter

## 📝 Notes

- Backend and frontend run independently
- Frontend connects to backend via API
- CORS is enabled for cross-origin requests
- All backend routes are prefixed with `/api`
