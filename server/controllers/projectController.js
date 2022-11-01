const mongoose = require('mongoose');
const Project = require('../models/projectModel');

const projectController = {
  createProject(req, res, next) {
    console.log('creating project');
    const { title } = req.body;
    Project.create({ title })
      .then((project) => {
        console.log(`Project created: ${project}`);
        res.locals.project = project;
        return next();
      })
      .catch((err) =>
        next({ log: `Error in projectController.createProject: ${err}` })
      );
  },
};

module.exports = projectController;
