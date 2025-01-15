import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import todosRouter from "./routes/todoRoutes.js";
import addMiddleware from "./middleware/authmeddleware.js";
// Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Get the file path directory from the URL of the current module
const __filename = fileURLToPath(import.meta.url);
// Get the directory name of the file path
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "../public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Routes
app.use("/auth", authRoutes);
app.use("/todos", addMiddleware, todosRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
