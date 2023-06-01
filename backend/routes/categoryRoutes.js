const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { protect } = require("../middleware/authMiddleware");

const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { categoryMiddleware } = require("../middleware/categoryMiddleware");

router.route("/").get(protect, getAllCategories).post(protect, createCategory);

router
  .route("/:id")
  .get(protect, categoryMiddleware, getCategory)
  .patch(protect, categoryMiddleware, updateCategory)
  .delete(protect, categoryMiddleware, deleteCategory);

module.exports = router;
