import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/auth.model.js";
import bcrypt from "bcryptjs";

export const signupController = async (req, res) => {
  // Destructure the request body to get email, fullName, and password
  const { email, fullName, password, profilePic } = req.body;

  // Validate required fields
  if (!email || !fullName || !password) {
    return res.status(400).json({ message: "All fields are required" });
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

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    //validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if the user exists
    const existsingUser = await User.findOne({ email });
    if (!existsingUser) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(
      password,
      existsingUser.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // If the credentials are valid, generate a JWT token
    // and send the user data in the response
    generateToken(existsingUser._id, res);
    res.status(200).json({
      _id: existsingUser._id,
      email: existsingUser.email,
      fullName: existsingUser.fullName,
      profilePic: existsingUser.profilePic,
    });
  } catch (error) {
    console.log("Error in loginController:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutController = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 }); // Clear the cookie by setting its maxAge to 0
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error in logoutController:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id; // Get the user ID from the request object
    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    // Upload the profile picture to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    // Find the user by ID and update the profile picture
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url }, // Update the profilePic field with the uploaded image URL
      { new: true } // Return the updated user document
    );
    res.status(200).json({ updatedUser });
  } catch (error) {
    console.log("Error in updateProfileController:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuthController = async (req, res) => {
  console.log(req.user);
  try {
    res.status(200).json(req.user); // Send the authenticated user data
  } catch (error) {
    console.log("Error in checkAuthController:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
