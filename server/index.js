import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
import { userRoutes } from "./routes/UserRoutes.js";
import { router } from "./routes/TaskRoute.js";

const server = express();
const PORT = process.env.PORT || 3001;

server.use(express.json());

// Configure CORS
server.use(
  cors({
    origin: "https://taskmanager-mern-krishan.netlify.app/",
    credentials: true,
  })
);

// Apply routes
server.use(cookieParser());
server.use("/auth", userRoutes);
server.use("/auth", router);

// Connect to MongoDB
const DB = process.env.DB;

mongoose
  .connect(DB)
  .then(() => console.log("Database Connected"))
  .catch((err) => {
    console.log("Error connecting to database:", err);
  });

server.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  } else {
    console.log(`Server is running at port ${PORT}`);
  }
});
