const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const apiRouter = require('./routes/api.js');

require('dotenv').config();
const { NODE_ENV, TEST_URI, MONGO_URI, PORT } = process.env;

const app = express();

const mongoURI = NODE_ENV === 'test' ? TEST_URI : MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`mongoose connection error: ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', apiRouter);
app.get('/healthCheck', (req, res) => res.sendStatus(200));

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

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// TODO: resolve cors
const io = require('socket.io')(server, { cors: { origin: '*' } });
io.on('connection', (socket) => {
  console.log('websocket connection established');
  io.emit('message', 'test message asdf');
});

module.exports = io;
