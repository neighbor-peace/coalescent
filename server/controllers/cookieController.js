const mongoose = require('mongoose');
const User = require('../models/userModel');

const cookieController = {
  setToken(req, res, next) {
    if (!res.locals.user) {
      return next({
        log: 'Error in cookieController.setToken. Res.locals.user is falsy',
      });
    }
    console.log('setting token with local data: ', res.locals.user.id);
    res.cookie('id', res.locals.user.id, {
      expires: new Date(Date.now() + 90000000),
      httpOnly: true,
    });
    return next();
  },
};

module.exports = cookieController;
