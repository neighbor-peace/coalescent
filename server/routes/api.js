const express = require('express');
const userController = require('../controllers/userController');
const projectController = require('../controllers/projectController');
const cookieController = require('../controllers/cookieController');
const router = express.Router();

router.get('/healthCheck', (req, res) => res.sendStatus(200));

router.post(
  '/user/signup',
  userController.createUser,
  cookieController.setToken,
  (req, res) => {
    return res.status(200).json(res.locals.user);
  }
);

router.post(
  '/user/login',
  userController.verifyUser,
  cookieController.setToken,
  (req, res) => {
    return res.status(200).json(res.locals.user);
  }
);

router.get('/user', userController.readUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

router.post('/project', projectController.createProject, (req, res) => {
  return res.status(200).json(res.locals.project);
});

router.get('/project', projectController.readProject, (req, res) => {
  return res.status(200).json(res.locals.projectArr);
});

router.patch(
  '/project',
  projectController.updateProject,
  projectController.readProject,
  (req, res) => {
    return res.status(200).json(res.locals.projectArr);
  }
);

router.delete(
  '/project',
  projectController.deleteProject,
  projectController.readProject,
  (req, res) => {
    return res.status(200).json(res.locals.projectArr);
  }
);

router.post(
  '/task',
  projectController.pushTask,
  projectController.readProject,
  (req, res) => {
    return res.status(200).json(res.locals.projectArr);
  }
);

router.patch(
  '/task',
  projectController.updateTask,
  projectController.readProject,
  (req, res) => {
    return res.status(200).json(res.locals.projectArr);
  }
);

router.delete(
  '/task',
  projectController.deleteTask,
  projectController.readProject,
  (req, res) => {
    return res.status(200).json(res.locals.projectArr);
  }
);

module.exports = router;
