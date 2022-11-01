const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');
const projectController = require('./controllers/projectController');

// 'mongodb://localhost:27017/dev'
const mongoURI = 'mongodb://localhost:27017/dev';
mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`mongoose connection error: ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  return res.status(200).json({ log: 'Server is working' });
});

// /api/signup?isAdmin=true
// TODO: Stretch: Add competent authorization
// TODO: add cookie simulating JWT
// TODO: Reroute to homepage
app.post('/api/signup', userController.createUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

app.post('/api/project', projectController.createProject, (req, res) => {
  return res.status(200).json(res.locals.project);
});

// TODO: create task route handler
// app.post('/api/task', projectController.pushTask, (req, res) => {
//   return res.status(200).json(res.locals.project);
// });

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
