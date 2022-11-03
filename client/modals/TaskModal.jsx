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
    <div className='modal'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          pushTask({ ...formData, projectId });
        }}
      >
        <h1>Add Task To {projectTitle}</h1>
        <div className='input-container'>
          <input
            id='taskTitle'
            type='text'
            value={formData.title}
            onChange={(e) => updateForm(e, 'title')}
            placeholder='TITLE'
          />
        </div>
        <div className='input-container'>
          <input
            name='taskDescription'
            id='taskDescription'
            // cols='30'
            // rows='10'
            value={formData.description}
            onChange={(e) => updateForm(e, 'description')}
            placeholder='DESCRIPTION'
          />
        </div>
        {/*  TODO: Change this to a dropdown, create teams in database */}
        <div className='input-container'>
          <input
            id='taskTeam'
            type='text'
            value={formData.team}
            onChange={(e) => updateForm(e, 'team')}
            placeholder='TEAM'
          />
        </div>
        <button className='submit'>Add task</button>
        <button
          type='button'
          onClick={closeTaskModal}
          className='submit cancel'
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
