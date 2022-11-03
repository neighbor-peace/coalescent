const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  team: { type: String, required: true },
});

const projectSchema = new Schema({
  // owner_id: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'user',
  //   required: true,
  // },
  title: { type: String, required: true, unique: true },
  tasks: [taskSchema],
});

const Project = mongoose.model('project', projectSchema);

module.exports = Project;
