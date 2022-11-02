import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  const [userData, setUserData] = useState();
  // const [userData, setUserData] = useState(devState);
  const [projectData, setProjectData] = useState();
  useEffect(() => {
    async function fetchState() {
      try {
        const userRes = await axios.get('/api/user');
        const projectRes = await axios.get('/api/project');
        setUserData(userRes.data);
        setProjectData(projectRes.data);
      } catch (err) {
        console.log(`error fetching state: ${err}`);
      }
    }
    fetchState();
  }, []);

  useEffect(() => {
    console.log('Latest state');
    console.log({ userData, projectData });
  });

  // TODO: build out dashboard
  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
}
export default Dashboard;
