import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";

// Middleware to protect routes and verify JWT token
export const protectedRoute = async (req, res, next) => {
  try {
    const token = req?.cookies?.jwt;
    console.log(token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provider" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
    const user = await User.findById(decode.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach the user to the request object
    next();
  } catch (error) {
    console.log("Error in protectedRoute middleware:", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};
