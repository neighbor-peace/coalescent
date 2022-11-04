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
      <div className='task-info'>
        <div>
          <h3>{title}</h3>
          {isAdmin && <span>{team}</span>}
        </div>
        <p>{description}</p>
      </div>
      <div className='buttons-container'>
        {isAdmin && (
          <button
            onClick={() =>
              openTaskEditor({ title, description, team, projectId, taskId })
            }
          >
            Edit
          </button>
        )}
        <button onClick={() => deleteTask(projectId, taskId)}>Complete</button>
      </div>
    </div>
  );
}
