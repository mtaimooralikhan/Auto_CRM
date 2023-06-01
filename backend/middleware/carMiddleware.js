const asyncHandler = require("express-async-handler");
const Car = require("../models/carSchema");

// Middleware function to get a category by ID
const carMiddleware = asyncHandler(async (req, res, next) => {
  try {
    car = await Car.findById(req.params.id).populate("category");
    if (car == null) {
      return res.status(404).json({ message: "Cannot find car" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.car = car;
  next();
});

module.exports = { carMiddleware };
