const mongoose = require('mongoose');
const Project = require('../models/projectModel');

const projectController = {
  createProject(req, res, next) {
    console.log('creating project');
    const { title } = req.body;
    const owner_id = req.cookies.id;
    Project.create({ title, owner_id })
      .then((project) => {
        console.log(`Project created`);
        res.locals.project = project;
        return next();
      })
      .catch((err) =>
        next({ log: `Error in projectController.createProject: ${err}` })
      );
  },
  readProject(req, res, next) {
    console.log('reading project');
    console.log('cookies on req', req.cookies);
    const owner_id = req.cookies.id;
    console.log(`searching for project with id: ${owner_id}`);
    Project.find({ owner_id })
      .then((projects) => {
        // handle empty array on client side
        console.log(`found projects`);
        res.locals.projectArr = projects;
        return next();
      })
      .catch((err) => {
        return next({ log: `Error in projectController.readProject. ${err}` });
      });
  },
  updateProject(req, res, next) {
    console.log('updating project');
    const { projectId, title } = req.body;
    console.log(`will search for projectId: ${projectId}`);
    Project.findOneAndUpdate({ _id: projectId }, { title }, { new: true })
      .then((project) => {
        if (project) {
          console.log(`updated project: ${project}`);
          return next();
        } else
          return next({
            log: 'Error in projectController.updateProject. Project not found',
          });
      })
      .catch((err) =>
        next({ log: `Error in projectController.updateProject. ${err}` })
      );
  },
  deleteProject(req, res, next) {
    console.log('deleting project');
    const { projectId } = req.body;
    console.log(`will search for projectId: ${projectId}`);
    Project.findOneAndDelete({ _id: projectId })
      .then((project) => {
        if (project) {
          console.log(`found and will delete project: ${project}`);
          return next();
        } else
          return next({
            log: `Error in projectController.findOneAndDelete. Project not found`,
          });
      })
      .catch((err) =>
        next({ log: `Error in projectController.findOneAndDelete. ${err}` })
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
      console.log(`found project`);
      currentProject.tasks.push({ title, description, team });
      console.log(`Task pushed`);
      await currentProject.save();
      next();
    } catch (err) {
      next({ log: `error in projectController.pushTask. ${err}` });
    }
  },
};

module.exports = projectController;
