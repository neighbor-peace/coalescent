import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
import ProjectsContainer from '../containers/ProjectsContainer.jsx';
import ProjectModal from '../modals/ProjectModal.jsx';
import TaskModal from '../modals/TaskModal.jsx';

function Dashboard() {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [projectData, setProjectData] = useState([]);
  const [modalState, setModalState] = useState({
    projectModal: false,
    taskModal: {
      isOpen: false,
      activeProject: '',
    },
  });
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

  const openProjectModal = () =>
    setModalState((prevState) => ({ ...prevState, projectModal: true }));
  const closeProjectModal = () =>
    setModalState((prevState) => ({ ...prevState, projectModal: false }));
  const openTaskModal = (projectId, projectTitle) => {
    setModalState((prevState) => {
      return {
        ...prevState,
        taskModal: {
          isOpen: true,
          activeProject: {
            id: projectId,
            title: projectTitle,
          },
        },
      };
    });
  };
  const closeTaskModal = () =>
    setModalState((prevState) => ({
      ...prevState,
      taskModal: {
        isOpen: false,
        activeProject: '',
      },
    }));

  function createProject(formData) {
    closeProjectModal();
    axios
      .post('/api/project', {
        title: formData.title,
      })
      .then((res) => {
        console.log('project created successfully');
        setProjectData((prevState) => {
          return [...prevState, res.data];
        });
      })
      .catch((err) => {
        console.log(`Error in createProject. ${err}`);
      });
  }

  function pushTask(formData) {
    closeTaskModal();
    console.log('pushing task with form data: ', formData);
    axios
      .post('/api/task', formData)
      .then((res) => {
        console.log('task pushed successfully. res: ', res);
        setProjectData(res.data);
      })
      .catch((err) => console.log(`Error in pushTask. ${err}`));
  }
  // TODO: IMPLEMENT openProjectModal AND createProject funcs
  return (
    <>
      {modalState.projectModal && (
        <ProjectModal
          createProject={createProject}
          closeProjectModal={closeProjectModal}
        />
      )}
      {modalState.taskModal.isOpen && (
        <TaskModal
          projectId={modalState.taskModal.activeProject.id}
          projectTitle={modalState.taskModal.activeProject.title}
          closeTaskModal={closeTaskModal}
          pushTask={pushTask}
        />
      )}
      <Navbar
        username={userData.username}
        firstName={userData.firstName}
        lastName={userData.lastName}
        openProjectModal={openProjectModal}
      />
      <ProjectsContainer
        projectData={projectData}
        openTaskModal={openTaskModal}
      />
    </>
  );
}
export default Dashboard;
