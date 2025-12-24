import express from 'express';
import { getProducts, getProductById, createProduct, deleteProduct } from '../controllers/productController.js';
// We'll add authMiddleware later
// import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(createProduct);
router.route('/:id').get(getProductById).delete(deleteProduct);

export default router;
