import React from 'react';

export default function Task({ title, description, team }) {
  return (
    <>
      <h2>{title}</h2>
      <h3>{team}</h3>
      <p>{description}</p>
      {/* TODO: ADD BUTTON TO COMPLETE TASK */}
    </>
  );
}
