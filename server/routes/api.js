const express = require('express');
const userController = require('../controllers/userController');
const projectController = require('../controllers/projectController');
const cookieController = require('../controllers/cookieController');
const router = express.Router();

router.post(
  '/signup',
  userController.createUser,
  cookieController.setToken,
  (req, res) => {
    return res.status(200).json(res.locals.user);
  }
);

router.post(
  '/login',
  userController.verifyUser,
  cookieController.setToken,
  (req, res) => {
    return res.status(200).json(res.locals.user);
  }
);

router.post('/project', projectController.createProject, (req, res) => {
  return res.status(200).json(res.locals.project);
});

router.post('/task', projectController.pushTask, (req, res) => {
  return res.status(200).json(res.locals.project);
});

module.exports = router;
