const asyncHandler = require("express-async-handler");
const Category = require("../models/categorySchema");

// Middleware function to get a category by ID
const categoryMiddleware = asyncHandler(async (req, res, next) => {
  try {
    category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: "Cannot find category" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.category = category;
  next();
});

module.exports = { categoryMiddleware };
