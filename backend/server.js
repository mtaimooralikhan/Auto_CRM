const express = require("express");
const colors = require("colors");
const helmet = require("helmet");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 8000;
const cors = require("cors");

// express app
const app = express();

// MongoDB connection
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use("/users", require("./routes/userRoutes"));
app.use("/categories", require("./routes/categoryRoutes"));
app.use("/cars", require("./routes/carRoutes"));


app.listen(port, () => console.log(`Server started on port ${port}`));
