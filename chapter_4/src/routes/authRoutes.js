import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../prismaClient.js";
// Load environment variables
dotenv.config();

const authRoutes = express.Router();

authRoutes.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    // default task for new user
    const defaultTodo =
      "Welcome to your todo list! Click the + button to add a new task.";
    await prisma.todo.create({
      data: {
        task: defaultTodo,
        userId: user.id,
      },
    });

    // create a Token object
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
});
authRoutes.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    // check if user exists
    if (!user) {
      return res
        .status(401)
        .json({ error: "Try to  register to Our website " });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    // check if password is correct
    if (!isMatch) {
      return res.status(404).json({ error: "Invalid username or password" });
    }
    console.log(user);
    // After check the successful authentication create a Token object and send it to the client
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
});

export default authRoutes;
