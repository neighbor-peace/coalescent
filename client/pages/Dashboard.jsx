import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
import ProjectsContainer from '../containers/ProjectsContainer.jsx';
import CreateProject from './CreateProject.jsx';

function Dashboard() {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [projectData, setProjectData] = useState([]);
  const [createProjectIsOpen, setCreateProjectIsOpen] = useState(false);
  // fetches state on componentDidMount
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

  const openCreateProject = () => setCreateProjectIsOpen(true);
  const closeCreateProject = () => setCreateProjectIsOpen(false);

  function createProject(formData) {
    axios
      .post('/api/project', {
        title: formData.title,
      })
      .then((res) => {
        console.log('project created successfully');
        setProjectData((prevState) => {
          return [...prevState, res.data];
        });
        return closeCreateProject();
      })
      .catch((err) => {
        console.log(`Error in createProject. ${err}`);
      });
  }
  // TODO: IMPLEMENT openCreateProject AND createProject funcs
  return (
    <>
      {createProjectIsOpen && <CreateProject createProject={createProject} />}
      <Navbar
        username={userData.username}
        firstName={userData.firstName}
        lastName={userData.lastName}
        openCreateProject={openCreateProject}
      />
      <ProjectsContainer projectData={projectData} />
    </>
  );
}
export default Dashboard;
