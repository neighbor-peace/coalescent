const express = require('express');
const app = express();
const path = require('path');

app.get('/api', (req, res) => {
  return res.status(200).json({ log: 'Server is working' });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
