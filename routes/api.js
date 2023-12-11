const userController = require("../controllers/UserController");
const express = require("express");

const router = express.Router();

router.get("/", userController.getUsers);
router.get("/get", userController.getUserByEmail);
router.get("/:userId", userController.getUser);
router.put("/add", userController.createUser);
router.post("/update", userController.updateUser);
router.delete("/delete", userController.deleteUser);

module.exports = router;