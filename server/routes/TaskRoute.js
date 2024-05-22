import express from "express";
import jwt from "jsonwebtoken";
import { TaskModel } from "../model/TaskModel.js";
let router = express.Router();

// Create Task
router.post("/tasks", async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = new TaskModel({ title, description });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await TaskModel.find({ userId: req.userId });
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Task
router.put('/tasks/:id', async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const task = await TaskModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, description, status },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Delete Task
router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await TaskModel.findByIdAndDelete(req.params.id);
    console.log('this is deleted task', task)
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export { router };
