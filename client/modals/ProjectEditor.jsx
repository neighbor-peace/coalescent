import React, { useEffect, useState } from 'react';

export default function ProjectEditor({
  projectId,
  projectTitle,
  updateProject,
  deleteProject,
  closeProjectEditor,
}) {
  const [formData, setFormData] = useState({
    projectTitle,
  });

  function handleChange(e) {
    setFormData({ projectTitle: e.target.value });
  }
  return (
    <div className='modal'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateProject({ ...formData, projectId });
        }}
      >
        <h1>Edit Project</h1>
        <div className='input-container'>
          <input
            type='text'
            value={formData.projectTitle}
            onChange={handleChange}
            placeholder='TITLE'
          />
        </div>
        <button className='submit'>Submit Changes</button>
        <button
          type='button'
          onClick={closeProjectEditor}
          className='submit cancel'
        >
          Cancel
        </button>
        <button
          type='button'
          onClick={(e) => deleteProject(projectId)}
          className='submit delete'
        >
          Delete Project
        </button>
      </form>
    </div>
  );
}
