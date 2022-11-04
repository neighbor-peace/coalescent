import React, { useState } from 'react';

export default function CreateProject({ createProject, closeProjectModal }) {
  // conditionally rendered
  // higher z level
  // TODO: css transition swipes it in
  const [formData, setFormData] = useState({
    title: '',
  });
  function updateForm(e) {
    setFormData({ title: e.target.value });
  }
  return (
    <div className='modal'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createProject(formData);
        }}
      >
        <h1>Create Project</h1>
        <div className='input-container'>
          <input
            id='projectTitle'
            type='text'
            value={formData.title}
            onChange={updateForm}
            placeholder='TITLE'
          />
        </div>
        <button className='submit'>Create project</button>
        <button
          type='button'
          onClick={closeProjectModal}
          className='submit cancel'
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
