const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { validate, validateProduct } = require('../middlewares/validation');

router
  .route('/')
  .get(getAllProducts)
  .post(validate(validateProduct), createProduct);

router
  .route('/:id')
  .get(getProduct)
  .put(validate(validateProduct), updateProduct)
  .delete(deleteProduct);

module.exports = router;

