const userController = require("../controllers/UserController");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const express = require("express");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

//router.get('/', authenticate, authorize('admin'), userController.getAllUsers);
// router.get('/:id', authenticate, authorize('user'), userController.getUserById);
// router.put('/:id', authenticate, authorize('user'), userController.updateUser);
// router.delete('/:id', authenticate, authorize('admin'), userController.deleteUser);

module.exports = router;
