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
  pushTask: async (req, res, next) => {
    console.log('pushing task');
    const { projectId, title, description, team } = req.body;
    try {
      const currentProject = await Project.findOne({ _id: projectId });
      if (!currentProject) {
        console.log('project not found');
        next({ log: 'Error in projectController.pushTask: project not found' });
      }
      console.log(`found project: ${currentProject}`);
      currentProject.tasks.push({ title, description, team });
      console.log(`Task pushed. Current tasks: ${currentProject.tasks}`);
      await currentProject.save();
      console.log(`current project updated succesfully`);
      res.locals.project = currentProject;
      next();
    } catch (err) {
      next({ log: `error in projectController.pushTask. ${err}` });
    }
  },
};

module.exports = projectController;
