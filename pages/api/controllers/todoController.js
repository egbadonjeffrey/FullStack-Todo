const Todo = require("../models/todoModel");
const mongoose = require("mongoose");

// GET all todos
const getTodos = async (req, res) => {
  const todos = await Todo.find({}).sort({ createdAt: -1 });

  res.status(200).json(todos);
};

// GET single todo

const getTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "Todo does not exist",
    });
  }

  try {
    const todo = await Todo.findById(id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

// CREATE a todo
const createTodo = async (req, res) => {
  const { title, description, priority, completedTask } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!priority) {
    emptyFields.push("priority");
  }

  if (emptyFields.length > 0) {
    res.status(400).json({ error: "Please fill in all fields", emptyFields });
  }

  // adding document to database
  try {
    const todo = await Todo.create({
      title,
      description,
      priority,
      completedTask,
    });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// DELETE a todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({
      error: "Cannot Delete Todo That does not exist",
    });
  }

  try {
    const todo = await Todo.findOneAndDelete({ _id: id });
    res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

// UPDATE a todo
const updateTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      error: "Cannot find Todo",
    });
  }

  try {
    const todo = await Todo.findOneAndUpdate(
      {
        _id: id,
      },
      {
        ...req.body,
      }
    );
    if (!todo) {
      return res.status(404).json({
        error: "Todo Does not exist",
      });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  deleteTodo,
  updateTodo,
};
