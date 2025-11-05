const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Public
exports.getAllOrders = async (req, res, next) => {
  try {
    const { status, customerName } = req.query;
    let query = {};

    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    // Filter by customer name if provided
    if (customerName) {
      query.customerName = { $regex: customerName, $options: 'i' };
    }

    const orders = await Order.find(query)
      .populate('items.product', 'name category price')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Public
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name category price stockQuantity');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
exports.createOrder = async (req, res, next) => {
  try {
    const { customerName, customerPhone, customerAddress, items } = req.body;

    // Validate and fetch products
    const orderItems = [];
    let totalPrice = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${item.product} not found`
        });
      }

      // Check stock availability
      if (product.stockQuantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}. Available: ${product.stockQuantity}, Requested: ${item.quantity}`
        });
      }

      const itemTotal = product.price * item.quantity;
      totalPrice += itemTotal;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });

      // Update stock quantity
      product.stockQuantity -= item.quantity;
      await product.save();
    }

    // Create order
    const order = await Order.create({
      customerName,
      customerPhone,
      customerAddress,
      items: orderItems,
      totalPrice,
      status: 'pending'
    });

    const populatedOrder = await Order.findById(order._id)
      .populate('items.product', 'name category price');

    res.status(201).json({
      success: true,
      data: populatedOrder
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Public
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // If cancelling an order, restore stock
    if (status === 'cancelled' && order.status !== 'cancelled') {
      for (const item of order.items) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stockQuantity += item.quantity;
          await product.save();
        }
      }
    }

    // If un-cancelling an order, reduce stock again
    if (order.status === 'cancelled' && status !== 'cancelled') {
      for (const item of order.items) {
        const product = await Product.findById(item.product);
        if (product) {
          if (product.stockQuantity < item.quantity) {
            return res.status(400).json({
              success: false,
              message: `Cannot reactivate order. Insufficient stock for ${product.name}`
            });
          }
          product.stockQuantity -= item.quantity;
          await product.save();
        }
      }
    }

    order.status = status;
    await order.save();

    const populatedOrder = await Order.findById(order._id)
      .populate('items.product', 'name category price');

    res.status(200).json({
      success: true,
      data: populatedOrder
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order history for a customer
// @route   GET /api/orders/customer/:phone
// @access  Public
exports.getCustomerOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ customerPhone: req.params.phone })
      .populate('items.product', 'name category price')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

