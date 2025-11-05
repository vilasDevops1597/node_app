const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  getCustomerOrders
} = require('../controllers/orderController');
const { validate, validateOrder, validateOrderStatus } = require('../middlewares/validation');

router
  .route('/')
  .get(getAllOrders)
  .post(validate(validateOrder), createOrder);

router
  .route('/:id')
  .get(getOrder);

router
  .route('/:id/status')
  .put(validate(validateOrderStatus), updateOrderStatus);

router
  .route('/customer/:phone')
  .get(getCustomerOrders);

module.exports = router;

