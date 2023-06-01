const asyncHandler = require("express-async-handler");
const Category = require("../models/categorySchema");

// Get all categories
const getAllCategories = asyncHandler(async (req, res) => {
  console.log("heelo");
  try {
    const categories = await Category.find();
    console.log(categories);
    return res.json(categories);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Get a single category
const getCategory = asyncHandler(async (req, res) => {
  res.json(res.category);
});

// Create a category
const createCategory = asyncHandler(async (req, res) => {
  console.log("Req",req.body.name);
  if (!req.body.name) {
    res.status(400).json({ message: "Please add a category name" });
    throw new Error("Please add a category name");
    return;
  }

  const category = await Category.create({
    name: req.body.name,
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a category
const updateCategory = asyncHandler(async (req, res) => {
  if (req.body.name != null) {
    res.category.name = req.body.name;
  }
  try {
    const updatedCategory = await res.category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a category
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    await res.category.deleteOne();
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
