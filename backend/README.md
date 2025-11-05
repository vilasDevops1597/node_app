# Grocery Shop Backend API

Node.js backend API for grocery shop management system.

## Features

- Product Management (CRUD operations)
- Order Management (Create orders, view history, update status)
- Automatic stock management
- Input validation and error handling
- MongoDB database integration

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
copy env.example .env
```

3. Update `.env` with your MongoDB connection string:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/grocery_shop
```

## Running

**Start server:**
```bash
npm start
```

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Seed database:**
```bash
npm run seed
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status
- `GET /api/orders/customer/:phone` - Get customer orders

## Project Structure

```
backend/
├── config/          # Database configuration
├── controllers/     # Business logic
├── data/           # Seed scripts
├── middlewares/    # Validation & error handling
├── models/         # Mongoose schemas
├── routes/         # API routes
├── server.js       # Entry point
└── package.json
```

