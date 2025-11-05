const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  }
});

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
    minlength: [2, 'Customer name must be at least 2 characters'],
    maxlength: [100, 'Customer name cannot exceed 100 characters']
  },
  customerPhone: {
    type: String,
    required: [true, 'Customer phone is required'],
    trim: true,
    match: [/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 'Invalid phone number format']
  },
  customerAddress: {
    type: String,
    required: [true, 'Customer address is required'],
    trim: true,
    minlength: [5, 'Address must be at least 5 characters'],
    maxlength: [500, 'Address cannot exceed 500 characters']
  },
  items: {
    type: [orderItemSchema],
    required: true,
    validate: {
      validator: function(items) {
        return items && items.length > 0;
      },
      message: 'Order must have at least one item'
    }
  },
  totalPrice: {
    type: Number,
    required: true,
    min: [0, 'Total price cannot be negative']
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      message: 'Invalid order status'
    },
    default: 'pending'
  }
}, {
  timestamps: true
});

// Index for faster queries
orderSchema.index({ customerName: 1, status: 1, createdAt: -1 });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

