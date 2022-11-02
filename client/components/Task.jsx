import React from 'react';

export default function Task({ title, description, team }) {
  return (
    <>
      <h1>{title}</h1>
      <h2>{team}</h2>
      <p>{description}</p>
    </>
  );
}
