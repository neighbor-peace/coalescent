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
    <>
      <h1>Edit your project</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateProject({ ...formData, projectId });
        }}
      >
        <label htmlFor='updateProjectTitle'>Edit Title</label>
        <input
          type='text'
          value={formData.projectTitle}
          onChange={handleChange}
        />
        <button
          type='button'
          onClick={(e) => deleteProject(projectId)}
        >
          Delete Project
        </button>
        <button
          type='button'
          onClick={closeProjectEditor}
        >
          Cancel
        </button>
        <button>Submit Changes</button>
      </form>
    </>
  );
}
