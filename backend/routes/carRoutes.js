const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { protect } = require("../middleware/authMiddleware");

const {
  getAllCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
} = require("../controllers/carController");
const { carMiddleware } = require("../middleware/carMiddleware");

router.route("/").get(protect, getAllCars).post(protect, createCar);

router
  .route("/:id")
  .get(protect, carMiddleware, getCar)
  .patch(protect, carMiddleware, updateCar)
  .delete(protect, carMiddleware, deleteCar);

module.exports = router;
