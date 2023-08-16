const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const TaskSchema = require('./TaskSchema');

require('dotenv').config();
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} successfully`);
});

//mongodb database connection
mongoose.connect('mongodb+srv://my-own-projects:my-own-projects@cluster0.nadvefp.mongodb.net/to-do-list')
  .then((res) => {
    console.log('Database connected successfully');
  })
  .catch((err) => console.error(err));

//Home Page of Server with get request and response
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Home page of my server.</h1>')
});

//add task post request
app.post('/addTask', async (req, res) => {
  try {
    const newTask = new TaskSchema({
      title: req.body.title,
      date: req.body.date,
      description: req.body.description,
    })
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.send(error => console.log(error))
  }
});

// find / get data from database
app.get('/taskData', async (req, res) => {
  try {
    const taskData = await TaskSchema.find();
    res.json(taskData);
  } catch (error) {
    res.send(err => console.log(err));
  }
});

//delete data 
app.delete('/taskData/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await TaskSchema.findByIdAndDelete({_id : id});
    res.send('deleted successfully');
  } catch (error) {
    res.send(err => console.log(err));
  }
});

//findOne And Update complete status of that data
app.patch('/taskData/findOneAndUpdate/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const matchedData = await TaskSchema.findById({ _id: id });
    matchedData.isComplete = !matchedData.isComplete;
    await matchedData.save();
    res.send(matchedData);
  } catch (error) {
    res.send(err => console.log(err));
  }
});

//find data for edit 
app.get('/taskData/getEditData/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const matchedData = await TaskSchema.findById({ _id: id });
    res.send(matchedData);
  } catch (error) {
    res.send(err => console.log(err));
  }
});

//update data after edit 
app.put('/taskData/updateEditData/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const matchedData = await TaskSchema.findByIdAndUpdate({ _id: id },{title : req.body.title, date : req.body.date, description : req.body.description});
    res.json(matchedData);
  } catch (error) {
    res.send(err => console.log(err));
  }
});