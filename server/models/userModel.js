const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  // isAdmin determined by route taken when signing up
  isAdmin: { type: Boolean },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  team: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
