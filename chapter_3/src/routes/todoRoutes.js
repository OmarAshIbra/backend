import express from "express";
import db from "../db.js";

//  create a new router instance
const todosRouter = express.Router();

//  get all todos
todosRouter.get("/", async (req, res) => {
  const getTodos = await db.prepare("SELECT * FROM todos WHERE user_id =? ");
  const todos = getTodos.all(req.userId);
  res.json(todos);
});
// add todos

todosRouter.post("/", async (req, res) => {
  const { task } = req.body;
  const insertTodo = await db.prepare(
    "INSERT INTO todos (task, user_id) VALUES (?,?)"
  );
  const result = await insertTodo.run(task, req.userId);
  res.status(201).json({ id: result.lastInsertRowid, task, completed: 0 });
});

// update todos

todosRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const updaatedTask = db.prepare(
    "UPDATE todos SET  completed = ? WHERE id = ? "
  );
  updaatedTask.run(completed, id);
  res.json({ massage: " Task updated successfully" });
});

// delete todos
todosRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleteTask = db.prepare("DELETE FROM todos WHERE id = ? ");
  deleteTask.run(id);
  res.json({ massage: "Task deleted successfully" });
});

export default todosRouter;
