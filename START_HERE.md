# 🚀 START HERE - Quick Reference

## 📁 New Structure

```
demo/
├── backend/    ← Backend API (Node.js/Express)
└── frontend/   ← Frontend App (React)
```

## ⚡ Quick Commands

### Run Backend:
```powershell
cd backend
npm install
npm start
```

### Run Frontend:
```powershell
cd frontend
npm install
npm run dev
```

## 📋 First Time Setup

### 1. Backend Setup
```powershell
cd backend
npm install
copy env.example .env
Start-Service MongoDB
npm run seed
npm start
```

### 2. Frontend Setup (in new terminal)
```powershell
cd frontend
npm install
npm run dev
```

## 🌐 URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/health

## ⚠️ Important

- **Backend** requires MongoDB to be running
- **Frontend** can run independently but needs backend for full functionality
- Use **two separate terminals** to run both

## 📚 Full Documentation

- Main README: `README.md`
- Backend: `backend/README.md`
- Frontend: `frontend/README.md`

