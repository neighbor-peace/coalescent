const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const apiRouter = require('./routes/api.js');
// 'mongodb://localhost:27017/dev'
const mongoURI = 'mongodb://localhost:27017/project-solo-dev';
mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`mongoose connection error: ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// /api/signup?isAdmin=true

//
app.use('/api', apiRouter);

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
