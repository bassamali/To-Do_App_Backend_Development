const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// ---------------- TODOS DATA ----------------
const todos = [
  { id: 1, message: 'Learn Express.js', completed: false },
  { id: 2, message: 'Happy Birthday reminder', completed: true },
  { id: 3, message: 'Test the todos app', completed: false }
];

// ---------------- BASIC TODOS CRUD ----------------
const todosPath = "/api/todos";

// GET all todos
app.get(todosPath, (req, res) => {
  res.json({
    message: "Todos fetched successfully",
    todos
  });
});

// POST a new todo
app.post(todosPath, (req, res) => {
  const { message, completed = false } = req.body;

  if (!message) {
    return res.status(400).json({
      message: "Message is required"
    });
  }

  const newTodo = {
    id: todos.length + 1,
    message,
    completed
  };

  todos.push(newTodo);

  res.status(201).json({
    message: "Todo added successfully",
    todo: newTodo
  });
});

// PUT (replace) a todo
app.put(`${todosPath}/:id`, (req, res) => {
  const todoId = parseInt(req.params.id);
  const { message, completed } = req.body;

  const index = todos.findIndex(todo => todo.id === todoId);
  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  if (message === undefined || completed === undefined) {
    return res.status(400).json({
      message: "PUT requires both message and completed fields"
    });
  }

  const updatedTodo = { id: todoId, message, completed };
  todos[index] = updatedTodo;

  res.json({
    message: "Todo replaced successfully",
    todo: updatedTodo
  });
});

// PATCH (partial update)
app.patch(`${todosPath}/:id`, (req, res) => {
  const todoId = parseInt(req.params.id);
  const { message, completed } = req.body;

  const index = todos.findIndex(todo => todo.id === todoId);
  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  const updatedTodo = {
    ...todos[index],
    ...(message !== undefined && { message }),
    ...(completed !== undefined && { completed })
  };

  todos[index] = updatedTodo;

  res.json({
    message: "Todo updated successfully",
    todo: updatedTodo
  });
});

// ---------------- SORTING APIs ----------------

// Sort by ID
app.get('/api/todos/sort-by-id', (req, res) => {
  const { k = 'asc' } = req.query;
  const sorted = [...todos].sort((a, b) =>
    k === 'desc' ? b.id - a.id : a.id - b.id
  );
  res.json({
    message: `Todos sorted by ID (${k})`,
    todos: sorted
  });
});

// Sort by message (alphabetical)
app.get('/api/todos/sort-by-message', (req, res) => {
  const { k = 'asc' } = req.query;
  const sorted = [...todos].sort((a, b) =>
    k === 'desc'
      ? b.message.localeCompare(a.message)
      : a.message.localeCompare(b.message)
  );
  res.json({
    message: `Todos sorted by message (${k})`,
    todos: sorted
  });
});

// ---------------- SEARCH API ----------------

// Search by keyword in message (case-insensitive)
app.get('/api/todos/search', (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  const result = todos.filter(todo =>
    todo.message.toLowerCase().includes(query.toLowerCase())
  );

  res.json({
    message: `Todos matching '${query}'`,
    results: result
  });
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
