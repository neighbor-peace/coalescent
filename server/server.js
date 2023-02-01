const fs = require('fs');
const https = require('https');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const apiRouter = require('./routes/api.js');
const privateKey = fs.readFileSync(
  path.join(__dirname, '../sslcert/server.key'),
  'utf8'
);
const certificate = fs.readFileSync(
  path.join(__dirname, '../sslcert/server.crt'),
  'utf8'
);

require('dotenv').config();
const { NODE_ENV, TEST_URI, MONGO_URI } = process.env;
const port = NODE_ENV === 'development' ? 8443 : 443;

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

// const server = app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });
const server = https.createServer({ key: privateKey, cert: certificate }, app);
server.listen(port, () => console.log(`listening on port ${port}`));

// TODO: resolve cors
const io = require('socket.io')(server, { cors: { origin: '*' } });
io.on('connection', (socket) => {
  console.log('websocket connection established');
  io.emit('message', 'test message asdf');
});

module.exports = io;
