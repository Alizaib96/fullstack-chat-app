import express from "express";
import authRouters from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use("/api/auth", authRouters);

app.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
  connectDB();
});
