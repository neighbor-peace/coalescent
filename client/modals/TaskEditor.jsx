import React, { useState } from 'react';

export default function TaskEditor({
  projectId,
  taskId,
  title,
  description,
  team,
  closeTaskEditor,
  updateTask,
  deleteTask,
}) {
  const [formData, setFormData] = useState({
    title,
    description,
    team,
  });
  function updateForm(e, key) {
    setFormData((prevState) => ({
      ...prevState,
      [key]: e.target.value,
    }));
  }
  return (
    <>
      <h1>Edit the task</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateTask({ ...formData, projectId, taskId });
        }}
      >
        <label htmlFor='editTaskTitle'>Edit task title</label>
        <input
          type='text'
          value={formData.title}
          onChange={(e) => updateForm(e, 'title')}
        />
        <label htmlFor='editTaskDescription'>Edit task description</label>
        <textarea
          type='text'
          value={formData.description}
          onChange={(e) => updateForm(e, 'description')}
        ></textarea>
        <label htmlFor='editTaskTeam'>Edit task team</label>
        <input
          type='text'
          value={formData.team}
          onChange={(e) => updateForm(e, 'team')}
        />
        <button
          type='button'
          onClick={() => deleteTask(projectId, taskId)}
        >
          Delete Task
        </button>
        <button
          type='button'
          onClick={closeTaskEditor}
        >
          Cancel
        </button>
        <button>Submit Changes</button>
      </form>
    </>
  );
}
