const mongoose = require('mongoose');
const User = require('../models/userModel');

const userController = {
  createUser(req, res, next) {
    console.log('creating user');
    const { username, password, firstName, lastName, team, isAdmin } = req.body;
    User.create({ username, password, firstName, lastName, isAdmin, team })
      .then((user) => {
        console.log(`User created: ${user}`);
        res.locals.user = user;
        return next();
      })
      .catch((err) => {
        return next({
          status: 409,
          log: `Error in userController.createUser: ${err}`,
        });
      });
  },
};

module.exports = userController;
