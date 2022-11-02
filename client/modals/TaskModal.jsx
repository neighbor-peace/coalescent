import React, { useState } from 'react';

export default function TaskModal({
  projectId,
  projectTitle,
  closeTaskModal,
  pushTask,
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    team: '',
  });
  function updateForm(e, stateKey) {
    setFormData((prevState) => ({
      ...prevState,
      [stateKey]: e.target.value,
    }));
  }
  return (
    <>
      <h1>Add a task to {projectTitle}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          pushTask({ ...formData, projectId });
        }}
      >
        <label htmlFor='taskTitle'>Enter a task title</label>
        <input
          id='taskTitle'
          type='text'
          value={formData.title}
          onChange={(e) => updateForm(e, 'title')}
        />
        <label htmlFor='taskDescription'>Enter a task description</label>
        <textarea
          name='taskDescription'
          id='taskDescription'
          cols='30'
          rows='10'
          value={formData.description}
          onChange={(e) => updateForm(e, 'description')}
        ></textarea>
        {/*  TODO: Change this to a dropdown, create teams in database */}
        <label htmlFor='taskTeam'>Assign a team</label>
        <input
          id='taskTeam'
          type='text'
          value={formData.team}
          onChange={(e) => updateForm(e, 'team')}
        />
        <button
          type='button'
          onClick={closeTaskModal}
        >
          Cancel
        </button>
        <button>Add task</button>
      </form>
    </>
  );
}
