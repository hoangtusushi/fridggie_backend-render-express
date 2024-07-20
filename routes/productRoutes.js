const productController = require('../controllers/ProductController');
const { authenticate } = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMiddleware');
const express = require('express');

const router = express.Router();

router.get('/', authenticate, productController.getAllProducts);
router.post('/', authenticate, upload.single('image'), productController.createProduct);
router.get('/:id', authenticate, productController.getProductById);
router.put('/:id', authenticate, upload.single('image'), productController.updateProduct);
router.delete('/:id', authenticate, productController.deleteProduct);

module.exports = router;
