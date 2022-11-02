import React from 'react';
import Task from './Task.jsx';

export default function Project({
  title,
  tasksArr,
  openTaskModal,
  projectId,
  openProjectEditor,
}) {
  const tasks = tasksArr.map((task) => (
    <Task
      key={task._id}
      title={task.title}
      description={task.description}
      team={task.team}
    />
  ));
  return (
    <>
      <div>
        <h1>{title}</h1>
        <button onClick={(e) => openTaskModal(projectId, title)}>
          Add task
        </button>
        <button onClick={(e) => openProjectEditor(projectId, title)}>
          Edit Project
        </button>
      </div>
      {tasks}
    </>
  );
}
