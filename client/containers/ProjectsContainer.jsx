import React from 'react';
import Project from '../components/Project.jsx';

export default function ProjectsContainer({ projectData }) {
  const projects = projectData.map((project) => (
    <Project
      key={project._id}
      title={project.title}
      tasksArr={project.tasks}
    />
  ));
  return <>{projects}</>;
}
