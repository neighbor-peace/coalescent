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

router.get('/user', userController.readUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

// TODO: set project owner from cookie data
router.post('/project', projectController.createProject, (req, res) => {
  return res.status(200).json(res.locals.project);
});

router.get('/project', projectController.readProject, (req, res) => {
  return res.status(200).json(res.locals.projectArr);
});

router.post('/task', projectController.pushTask, (req, res) => {
  return res.status(200).json(res.locals.project);
});

module.exports = router;
