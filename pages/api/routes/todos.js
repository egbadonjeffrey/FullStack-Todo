const express = require("express");
const router = express.Router();
const {
  createTodo,
  getTodos,
  getTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoController");

// GET all Todos
router.get("/", getTodos);

// GET single Todo
router.get("/:id", getTodo);

// POST new Todo
router.post("/", createTodo);

// DELETE single Todo
router.delete("/:id", deleteTodo);

// EDIT Todo
router.patch("/:id", updateTodo);

module.exports = router;
