const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    registration_no: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", carSchema);
