import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const authRoutes = express.Router();

authRoutes.post("/register", (req, res) => {
  console.log(req.body);
});
authRoutes.post("/login", (req, res) => {
  console.log(req.body);
});

export default authRoutes;
