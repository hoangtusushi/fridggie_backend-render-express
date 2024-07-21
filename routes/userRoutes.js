const userController = require('../controllers/UserController');
const { authenticate, authorize } = require('../middleware/authMiddleware')
const express = require('express');

const router = express.Router();

router.get('/', authenticate, authorize('admin'), userController.getAllUsers);
router.get('/:id', authenticate, authorize('user'), userController.getUserById);
router.put('/:id', authenticate, authorize('user'), userController.updateUser);
router.delete('/:id', authenticate, authorize('admin'), userController.deleteUser);

module.exports = router;
