const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post(
  "/signup",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  registerUser
);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
