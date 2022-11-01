const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  team: { type: String, required: true },
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  tasks: [taskSchema],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
