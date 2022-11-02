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
          // conflicting data in server (username not unique)
          status: 409,
          log: `Error in userController.createUser: ${err}`,
        });
      });
  },
  readUser(req, res, next) {
    console.log('reading user');
    const _id = req.cookies.id;
    console.log(`searching for user with id: ${_id}`);
    User.findOne({ _id })
      .then((user) => {
        if (user) {
          console.log(`user found: ${user}`);
          res.locals.user = user;
          return next();
        } else {
          return next({
            log: 'Error in userController.readUser: User not found',
          });
        }
      })
      .catch((err) =>
        next({ log: `Error in userController.readUser. ${err}` })
      );
  },
  verifyUser(req, res, next) {
    console.log('verifying user');
    const { username, password } = req.body;
    User.findOne({ username, password })
      .then((user) => {
        if (!user) {
          return next({
            status: 401,
            log: 'Error in userController.verifyUser. User not found',
          });
        } else {
          console.log('user verified');
          res.locals.user = user;
          return next();
        }
      })
      .catch((err) =>
        next({ log: `Error in userController.verifyUser. ${err}` })
      );
  },
};

module.exports = userController;
