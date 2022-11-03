import React from 'react';

export default function Navbar({
  username,
  firstName,
  lastName,
  openProjectModal,
  isAdmin,
}) {
  return (
    <section id='navbar'>
      <p>
        Welcome back, <strong>{firstName}</strong>
      </p>
      <nav>
        <h1>Logo</h1>
        {isAdmin && (
          <button onClick={openProjectModal}>Create New Project</button>
        )}
        <div id='user-profile'>
          <img />
          <span>{username}</span>
        </div>
      </nav>
    </section>
  );
}
