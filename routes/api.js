const userController = require("../controllers/UserController");
const loginController = require("../controllers/LoginController");
const express = require("express");
const authMiddleware = require("../middleware/AuthMiddleware");

const router = express.Router();

router.get("/", userController.getUsers);
router.get("/getUser", authMiddleware, userController.getUser);
router.post("/upload", authMiddleware, userController.upload);

router.post('/login', loginController.login);
router.post('/signup', loginController.registration);

module.exports = router;