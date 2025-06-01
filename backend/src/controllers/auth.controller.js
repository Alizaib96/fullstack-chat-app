import { generateToken } from "../lib/utils.js";
import User from "../models/auth.model.js";
import bcrypt from "bcryptjs";

export const signupController = async (req, res) => {
  // Destructure the request body to get email, fullName, and password
  const { email, fullName, password, profilePic } = req.body;
  console.log("BODY:", req.body);
  // Validate the input data

  const requiredFields = { email, fullName, password };

  for (const [key, value] of Object.entries(requiredFields)) {
    if (!value) {
      return res.status(400).json({ message: `${key} is required` });
    }
  }

  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ messege: "Password must be at least 6 characters long" });
    }

    // Check if the user already exists
    const exsistingUser = await User.findOne({ email });
    if (exsistingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt

    // Create a new user instance
    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
      profilePic,
    });

    if (newUser) {
      //generate jwt token
      generateToken(newUser._id, res);
      await newUser.save(); // Save the new user to the database

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signupController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginController = (req, res) => {
  res.send("Login Page");
};
export const logoutController = (req, res) => {
  res.send("Logout Page");
};
