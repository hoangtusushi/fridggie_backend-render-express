const categoryController = require('../controllers/CategoryController');
const { authenticate } = require('../middleware/authMiddleware');
const express = require('express');

const router = express.Router();

router.post('/', authenticate, categoryController.createCategory);
router.get('/', authenticate, categoryController.getAllCategories);
router.get('/:id', authenticate, categoryController.getCategoryById);
router.put('/:id', authenticate, categoryController.updateCategory);
router.delete('/:id', authenticate, categoryController.deleteCategory);

module.exports = router;
