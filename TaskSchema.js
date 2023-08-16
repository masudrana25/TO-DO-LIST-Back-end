const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isComplete: {
    type: Boolean,
    default : false,
  },
});

module.exports = mongoose.model("Tasks", TaskSchema);