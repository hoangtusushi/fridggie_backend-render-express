const productController = require('../controllers/ProductController');
const { authenticate } = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMiddleware');
const express = require('express');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.post('/', upload.single('image'), productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
