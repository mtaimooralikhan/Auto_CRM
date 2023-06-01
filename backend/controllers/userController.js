const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const User = require("../models/userSchama");

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check for user
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
    throw new Error("Invalid Credentials");
    return;
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //check if user exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400).json({ message: "User already exists" });
    throw new Error("User already exists");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });

    // Send welcome email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: "mtaimouralikhan@gmail.com",
        pass: "fhhajdqlhdxpdros",
      },
    });

    const mailOptions = {
      from: "mtaimouralikhan@gmail.com",
      to: email,
      subject: "Welcome to Car App",
      text: `Welcome to Car App! Your account has been successfully created. Your password is ${password}. Please keep it safe and secure.`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent to " + email);
      }
    });
  } else {
    res.status(400).json({ message: "Invalid User data" });
    throw new Error("Invalid User data");
  }
});

const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
  return;
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = {
  loginUser,
  registerUser,
  getMe,
};
