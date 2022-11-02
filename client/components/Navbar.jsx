import React from 'react';

export default function Navbar({
  username,
  firstName,
  lastName,
  openCreateProject,
}) {
  return (
    <>
      <h1>Logo</h1>
      <button onClick={openCreateProject}>Create New Project</button>
      <p>Welcome back, {`${firstName} ${lastName}`}</p>
      <div id='user-profile'>
        <img />
        <span>{username}</span>
      </div>
    </>
  );
}
