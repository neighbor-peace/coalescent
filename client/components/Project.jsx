import React from 'react';
import Task from './Task.jsx';

export default function Project({ title, tasksArr }) {
  const tasks = tasksArr.map((task) => (
    <Task
      key={task._id}
      title={task.title}
      description={task.description}
      team={task.team}
    />
  ));
  return (
    <>
      <h1>{title}</h1>
      {tasks}
    </>
  );
}
