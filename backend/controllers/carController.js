const asyncHandler = require("express-async-handler");
const Car = require("../models/carSchema");
const Category = require("../models/categorySchema");

// Get all cars
const getAllCars = asyncHandler(async (req, res) => {
  try {
    const cars = await Car.find().populate("category");
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single car
const getCar = asyncHandler(async (req, res) => {
  res.json(res.car);
});

// Create a car
const createCar = asyncHandler(async (req, res) => {
  const { category, make, model, color, registration_no } = req.body;
  if (!category || !make || !model || !color || !registration_no) {
    res.status(400).json({ message: "Please add all required fields" });
    throw new Error("Please add all required fields");
    return;
  }

  const car = await Car.create({
    category,
    make,
    model,
    color,
    registration_no,
  });

  try {
    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a car
const updateCar = asyncHandler(async (req, res) => {
  if (req.body.category != null) {
    res.car.category = req.body.category;
  }
  if (req.body.make != null) {
    res.car.make = req.body.make;
  }
  if (req.body.model != null) {
    res.car.model = req.body.model;
  }
  if (req.body.color != null) {
    res.car.color = req.body.color;
  }
  if (req.body.registration_no != null) {
    res.car.registration_no = req.body.registration_no;
  }
  try {
    const updatedCar = await res.car.save();
    res.json(updatedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a car
const deleteCar = asyncHandler(async (req, res) => {
  try {
    await res.car.deleteOne();
    res.json({ message: "Car deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  getAllCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
};
