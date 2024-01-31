const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/blogs', { useNewUrlParser: true, useUnifiedTopology: true });

const todoSchema = new mongoose.Schema({
  task: String,
  completed: Boolean,
}, { timestamps: true });
  

const Todo = mongoose.model('Todo', todoSchema);

app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save();
  res.json(newTodo);
});

// ... (previous code)

 
  
  // ... (previous code)
  
  // Add endpoint for updating a todo by ID
  app.put('/todos/:id', async (req, res) => {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedTodo);
    } catch (error) {
      res.status(400).json({ error: 'Error updating todo' });
    }
  });
  
  // Add endpoint for deleting a todo by ID
  app.delete('/todos/:id', async (req, res) => {
    try {
      await Todo.findByIdAndDelete(req.params.id);
      res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Error deleting todo' });
    }
  });
  
  // ... (previous code)
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
