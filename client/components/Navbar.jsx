import React from 'react';

export default function Navbar({
  username,
  openProjectModal,
  isAdmin,
  userTeam,
}) {
  return (
    <nav
      id='navbar'
      className={isAdmin ? 'sticky' : ''}
    >
      {isAdmin ? (
        <button onClick={openProjectModal}>Create Project</button>
      ) : (
        <div className='username'>{username}</div>
      )}
      <div id='user-profile'>
        {/* <img /> */}
        {isAdmin && <div className='username'>{username}</div>}
        {isAdmin ? (
          <div className='userteam'>Project Manager</div>
        ) : (
          <div className='userteam'>{userTeam} Team</div>
        )}
      </div>
    </nav>
  );
}
