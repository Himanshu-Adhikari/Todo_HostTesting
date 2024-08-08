const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const todo = require('./models/DBSchema'); // Ensure correct path and model name

dotenv.config();

const PORT = process.env.PORT || 5000;
const URI = process.env.DB_URI;

const app = express();

app.use(cors());
app.use(express.json());


app.use(cors(
  {
    origin:["https://todo-host-testing-frontend.vercel.app/"],
    methods:['POST','GET','PUT','DELETE'],
    credentials:true
  }
))


// Connecting to the database
mongoose.connect(URI, { dbName: 'todos_db' })
  .then(() => console.log('Connection successful'))
  .catch(error => console.error('Connection failed', error));

// Routes
app.get('/todo', async (req, res) => {
  try {
    const todoData = await todo.find();
    res.json(todoData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/todo/add', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const newTask = await todo.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(400).json({ message: error.message });
  }
});

app.delete('/todo/delete/:id', async (req, res) => {
  try {
    const result = await todo.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/todo/update/:id', async (req, res) => {
  const { id } = req.params;
  const { complete, ...otherUpdates } = req.body;

  try {
    const updatedTask = await todo.findByIdAndUpdate(id, { complete, ...otherUpdates }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
