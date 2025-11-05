const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const Order = require('../models/Order');

dotenv.config();

const sampleProducts = [
  {
    name: 'Apple',
    category: 'Fruits',
    price: 2.50,
    stockQuantity: 100
  },
  {
    name: 'Banana',
    category: 'Fruits',
    price: 1.50,
    stockQuantity: 150
  },
  {
    name: 'Carrot',
    category: 'Vegetables',
    price: 1.00,
    stockQuantity: 80
  },
  {
    name: 'Tomato',
    category: 'Vegetables',
    price: 3.00,
    stockQuantity: 60
  },
  {
    name: 'Milk',
    category: 'Dairy',
    price: 4.50,
    stockQuantity: 50
  },
  {
    name: 'Cheese',
    category: 'Dairy',
    price: 6.00,
    stockQuantity: 40
  },
  {
    name: 'Bread',
    category: 'Bakery',
    price: 2.00,
    stockQuantity: 70
  },
  {
    name: 'Croissant',
    category: 'Bakery',
    price: 3.50,
    stockQuantity: 30
  },
  {
    name: 'Chicken Breast',
    category: 'Meat',
    price: 8.00,
    stockQuantity: 25
  },
  {
    name: 'Ground Beef',
    category: 'Meat',
    price: 7.50,
    stockQuantity: 20
  },
  {
    name: 'Orange Juice',
    category: 'Beverages',
    price: 3.50,
    stockQuantity: 45
  },
  {
    name: 'Water Bottle',
    category: 'Beverages',
    price: 1.00,
    stockQuantity: 100
  },
  {
    name: 'Potato Chips',
    category: 'Snacks',
    price: 2.50,
    stockQuantity: 55
  },
  {
    name: 'Cookies',
    category: 'Snacks',
    price: 4.00,
    stockQuantity: 35
  },
  {
    name: 'Rice',
    category: 'Grains',
    price: 5.00,
    stockQuantity: 40
  },
  {
    name: 'Pasta',
    category: 'Grains',
    price: 2.50,
    stockQuantity: 60
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery_shop');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${createdProducts.length} products`);

    // Create sample orders
    const sampleOrders = [
      {
        customerName: 'John Doe',
        customerPhone: '+1234567890',
        customerAddress: '123 Main St, City, State 12345',
        items: [
          {
            product: createdProducts[0]._id, // Apple
            quantity: 5,
            price: createdProducts[0].price
          },
          {
            product: createdProducts[4]._id, // Milk
            quantity: 2,
            price: createdProducts[4].price
          },
          {
            product: createdProducts[6]._id, // Bread
            quantity: 3,
            price: createdProducts[6].price
          }
        ],
        totalPrice: (createdProducts[0].price * 5) + (createdProducts[4].price * 2) + (createdProducts[6].price * 3),
        status: 'pending'
      },
      {
        customerName: 'Jane Smith',
        customerPhone: '+0987654321',
        customerAddress: '456 Oak Ave, City, State 67890',
        items: [
          {
            product: createdProducts[2]._id, // Carrot
            quantity: 10,
            price: createdProducts[2].price
          },
          {
            product: createdProducts[3]._id, // Tomato
            quantity: 6,
            price: createdProducts[3].price
          }
        ],
        totalPrice: (createdProducts[2].price * 10) + (createdProducts[3].price * 6),
        status: 'shipped'
      },
      {
        customerName: 'Bob Johnson',
        customerPhone: '+1112223333',
        customerAddress: '789 Pine Rd, City, State 54321',
        items: [
          {
            product: createdProducts[8]._id, // Chicken Breast
            quantity: 2,
            price: createdProducts[8].price
          },
          {
            product: createdProducts[11]._id, // Orange Juice
            quantity: 4,
            price: createdProducts[11].price
          }
        ],
        totalPrice: (createdProducts[8].price * 2) + (createdProducts[11].price * 4),
        status: 'delivered'
      }
    ];

    // Update stock quantities before creating orders
    for (const order of sampleOrders) {
      for (const item of order.items) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stockQuantity -= item.quantity;
          await product.save();
        }
      }
    }

    const createdOrders = await Order.insertMany(sampleOrders);
    console.log(`Inserted ${createdOrders.length} orders`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed function
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;

