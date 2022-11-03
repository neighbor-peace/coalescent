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
    <div className='modal'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateTask({ ...formData, projectId, taskId });
        }}
      >
        <h1>Edit Task</h1>
        <div className='input-container'>
          <input
            type='text'
            value={formData.title}
            onChange={(e) => updateForm(e, 'title')}
            placeholder='TITLE'
          />
        </div>
        <div className='input-container'>
          <input
            type='text'
            value={formData.description}
            onChange={(e) => updateForm(e, 'description')}
            placeholder='DESCRIPTION'
          />
        </div>
        <div className='input-container'>
          <input
            type='text'
            value={formData.team}
            onChange={(e) => updateForm(e, 'team')}
            placeholder='TEAM'
          />
        </div>
        <button className='submit'>Submit Changes</button>
        <button
          type='button'
          onClick={closeTaskEditor}
          className='submit cancel'
        >
          Cancel
        </button>
        <button
          type='button'
          onClick={() => deleteTask(projectId, taskId)}
          className='submit delete'
        >
          Delete Task
        </button>
      </form>
    </div>
  );
}
