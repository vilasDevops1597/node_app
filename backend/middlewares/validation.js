const { body, validationResult } = require('express-validator');

// Validation middleware wrapper
const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    });
  };
};

// Product validation rules
const validateProduct = [
  body('name')
    .trim()
    .notEmpty().withMessage('Product name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Product name must be between 2 and 100 characters'),
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required')
    .isIn(['Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Meat', 'Beverages', 'Snacks', 'Grains', 'Other'])
    .withMessage('Invalid category'),
  body('price')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('stockQuantity')
    .optional()
    .isInt({ min: 0 }).withMessage('Stock quantity must be a non-negative integer')
];

// Order validation rules
const validateOrder = [
  body('customerName')
    .trim()
    .notEmpty().withMessage('Customer name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Customer name must be between 2 and 100 characters'),
  body('customerPhone')
    .trim()
    .notEmpty().withMessage('Customer phone is required')
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/)
    .withMessage('Invalid phone number format'),
  body('customerAddress')
    .trim()
    .notEmpty().withMessage('Customer address is required')
    .isLength({ min: 5, max: 500 }).withMessage('Address must be between 5 and 500 characters'),
  body('items')
    .isArray({ min: 1 }).withMessage('Order must have at least one item'),
  body('items.*.product')
    .notEmpty().withMessage('Product ID is required for each item')
    .isMongoId().withMessage('Invalid product ID format'),
  body('items.*.quantity')
    .isInt({ min: 1 }).withMessage('Quantity must be at least 1 for each item')
];

// Order status validation
const validateOrderStatus = [
  body('status')
    .trim()
    .notEmpty().withMessage('Status is required')
    .isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
    .withMessage('Invalid order status')
];

module.exports = {
  validate,
  validateProduct,
  validateOrder,
  validateOrderStatus
};

