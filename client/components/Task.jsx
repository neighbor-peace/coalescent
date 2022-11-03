import React from 'react';

export default function Task({
  title,
  description,
  team,
  openTaskEditor,
  projectId,
  taskId,
}) {
  return (
    <>
      <h2>{title}</h2>
      <button
        onClick={() =>
          openTaskEditor({ title, description, team, projectId, taskId })
        }
      >
        Edit Task
      </button>
      <h3>{team}</h3>
      <p>{description}</p>
      {/* TODO: ADD BUTTON TO COMPLETE TASK */}
    </>
  );
}
