import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from "express";
import { connectDB } from "./lib/db.js";
import authRouters from "./routes/auth.route.js";
import messageRouters from "./routes/message.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

app.use("/api/auth", authRouters);
app.use("/api/message", messageRouters);

app.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
  connectDB();
});
