import React from 'react';

export default function Task({
  title,
  description,
  team,
  openTaskEditor,
  projectId,
  taskId,
  deleteTask,
  isAdmin,
}) {
  return (
    <div className='task'>
      <h2>{title}</h2>
      {isAdmin && (
        <button
          onClick={() =>
            openTaskEditor({ title, description, team, projectId, taskId })
          }
        >
          Edit Task
        </button>
      )}
      <h3>{team}</h3>
      <p>{description}</p>
      <button onClick={() => deleteTask(projectId, taskId)}>
        Complete Task
      </button>
    </div>
  );
}
