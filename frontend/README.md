# Grocery Shop Frontend

React-based frontend application for the Grocery Shop Management System.

## Features

- **Product Management**: Create, update, delete, and search products
- **Order Management**: Place orders, view order history, update order status
- **Real-time Updates**: Automatic stock management
- **Responsive Design**: Works on desktop and mobile devices

## Prerequisites

- Node.js and npm installed
- Backend API running on port 3000

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Frontend

Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Build for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## API Configuration

The frontend is configured to connect to the backend API at `http://localhost:3000/api` by default.

To change the API URL, create a `.env` file in the frontend directory:
```
VITE_API_URL=http://your-api-url/api
```

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS** - Styling (no framework, pure CSS)

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ProductManagement.jsx
│   │   └── OrderManagement.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

