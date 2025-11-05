# Quick Start Guide - Updated Structure

## 📁 New Project Structure

The project is now organized with separate `backend/` and `frontend/` directories.

## 🚀 Run Backend

```powershell
cd backend
npm install
copy env.example .env
Start-Service MongoDB
npm run seed
npm start
```

## 🚀 Run Frontend

```powershell
cd frontend
npm install
npm run dev
```

## 🎯 Complete Setup (All Commands)

### Backend Setup
```powershell
cd demo\backend
npm install
copy env.example .env
Start-Service MongoDB
npm run seed
npm start
```

### Frontend Setup (New Terminal)
```powershell
cd demo\frontend
npm install
npm run dev
```

## 📍 Important Paths

- **Backend code**: `demo/backend/`
- **Frontend code**: `demo/frontend/`
- **Backend runs on**: http://localhost:3000
- **Frontend runs on**: http://localhost:5173

## ✅ Verify Setup

1. **Backend**: Open http://localhost:3000/api/health
2. **Frontend**: Open http://localhost:5173

## 🔄 Development Workflow

1. Start MongoDB service
2. Start backend in one terminal
3. Start frontend in another terminal
4. Open browser to http://localhost:5173

## 📚 More Info

- See `README.md` for full documentation
- Backend docs: `backend/README.md`
- Frontend docs: `frontend/README.md`
