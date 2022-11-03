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
}) {
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
    />
  ));
  return (
    <div className='project'>
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
    </div>
  );
}
