import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Dashboard() {
  const devState = {
    username: 'mike dev',
    password: 'admin',
    createdAt: '2022-11-02T14:39:57.597Z',
    isAdmin: true,
    firstName: 'Michael',
    lastName: 'Costello',
    _id: '63628278d4be152d1e888bac',
    __v: 0,
  };
  const location = useLocation();
  // const [userData, setUserData] = useState(location.state.user);
  const [userData, setUserData] = useState(devState);
  const [projectData, setProjectData] = useState();
  console.log('user data', userData);
  useEffect(() => {
    axios.get('/api/project').then((res) => {
      // set state with project data
      console.log('project data found', res);
    });
  }, []);

  // TODO: build out dashboard
  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
}
export default Dashboard;
