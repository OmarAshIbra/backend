import express from "express";
import prisma from "../prismaClient.js";

//  create a new router instance
const todosRouter = express.Router();

//  get all todos
todosRouter.get("/", async (req, res) => {
  const todos = await prisma.todo.findMany({
    where: {
      userId: req.userId,
    },
  });
  res.json(todos);
});
// add todos

todosRouter.post("/", async (req, res) => {
  const { task } = req.body;
  const todos = await prisma.todo.create({
    data: {
      task,
      userId: req.userId,
    },
  });
  res.status(201).json({ todos });
});

// update todos

todosRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const updateTask = await prisma.todo.update({
    where: {
      id: parseInt(id),
      userId: req.userId,
    },

    data: {
      completed: !!completed,
    },
  });
  res.json({ massage: " Task updated successfully" });
});

// delete todos
todosRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  await prisma.todo.delete({
    where: {
      id: parseInt(id),
      userId,
    },
  });
  res.json({ massage: "Task deleted successfully" });
});

export default todosRouter;
