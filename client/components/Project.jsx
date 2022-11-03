import React from 'react';
import Task from './Task.jsx';

export default function Project({
  title,
  tasksArr,
  openTaskModal,
  projectId,
  openProjectEditor,
  openTaskEditor,
  deleteTask,
  isAdmin,
  userTeam,
}) {
  if (!isAdmin) {
    tasksArr = tasksArr.filter((task) => task.team === userTeam);
  }
  const tasks = tasksArr.map((task) => (
    <Task
      key={task._id}
      title={task.title}
      description={task.description}
      team={task.team}
      openTaskEditor={openTaskEditor}
      projectId={projectId}
      taskId={task._id}
      deleteTask={deleteTask}
      isAdmin={isAdmin}
    />
  ));
  return (
    <div className='project'>
      <div className='project-title'>
        <h2>{title}</h2>
        <div className='buttons-container'>
          {isAdmin && (
            <button onClick={(e) => openProjectEditor(projectId, title)}>
              Edit Project
            </button>
          )}
          {isAdmin && (
            <button onClick={(e) => openTaskModal(projectId, title)}>
              Add task
            </button>
          )}
        </div>
      </div>
      {tasks}
    </div>
  );
}
