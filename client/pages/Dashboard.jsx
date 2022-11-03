import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
import ProjectsContainer from '../containers/ProjectsContainer.jsx';
import ProjectModal from '../modals/ProjectModal.jsx';
import ProjectEditor from '../modals/ProjectEditor.jsx';
import TaskModal from '../modals/TaskModal.jsx';
import TaskEditor from '../modals/TaskEditor.jsx';
import { updateTask } from '../../server/controllers/projectController.js';

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
    projectEditor: {
      isOpen: false,
      projectId: '',
      projectTitle: '',
    },
    taskModal: {
      isOpen: false,
      activeProject: '',
    },
    taskEditor: {
      isOpen: false,
      projectId: '',
      taskId: '',
      title: '',
      description: '',
      team: '',
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

  const openProjectModal = () =>
    setModalState((prevState) => ({ ...prevState, projectModal: true }));
  const closeProjectModal = () =>
    setModalState((prevState) => ({ ...prevState, projectModal: false }));
  const openProjectEditor = (projectId, projectTitle) => {
    setModalState((prevState) => ({
      ...prevState,
      projectEditor: {
        isOpen: true,
        projectId,
        projectTitle,
      },
    }));
  };
  const closeProjectEditor = () => {
    setModalState((prevState) => ({
      ...prevState,
      projectEditor: {
        isOpen: false,
        projectId: '',
        projectTitle: '',
      },
    }));
  };
  const openTaskEditor = (state) => {
    setModalState((prevState) => ({
      ...prevState,
      taskEditor: {
        isOpen: true,
        ...state,
      },
    }));
  };

  const closeTaskEditor = () => {
    setModalState((prevState) => ({
      ...prevState,
      taskEditor: {
        isOpen: false,
        projectId: '',
        taskId: '',
        title: '',
        description: '',
        team: '',
      },
    }));
  };

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

  function updateProject(formData) {
    closeProjectEditor();
    axios
      .patch('/api/project', { ...formData })
      .then((res) => {
        console.log('project successfully updated');
        setProjectData(res.data);
      })
      .catch((err) => console.log(err));
  }

  function deleteProject(projectId) {
    closeProjectEditor();
    axios
      .delete('/api/project', { data: { projectId } })
      .then((res) => {
        console.log('project deleted successfully');
        setProjectData(res.data);
      })
      .catch((err) => console.log(`Error in deleteProject. ${err}`));
  }

  function pushTask(formData) {
    closeTaskModal();
    axios
      .post('/api/task', formData)
      .then((res) => {
        console.log('task pushed successfully.');
        setProjectData(res.data);
      })
      .catch((err) => console.log(`Error in pushTask. ${err}`));
  }
  function updateTask(formData) {
    closeTaskEditor();
    console.log('updating task');
    axios
      .patch('/api/task', { ...formData })
      .then((res) => {
        console.log('task updated succesfully');
        setProjectData(res.data);
      })
      .catch((err) => console.log(err));
  }
  function deleteTask(projectId, taskId) {
    closeTaskEditor();
    console.log('deleting task');
    axios
      .delete('/api/task', { data: { projectId, taskId } })
      .then((res) => {
        console.log('task deleted successfully');
        setProjectData(res.data);
      })
      .catch((err) => console.log(err));
  }
  return (
    <section
      id='dashboard'
      className='page'
    >
      {/* MODALS */}
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
      {modalState.projectEditor.isOpen && (
        <ProjectEditor
          projectId={modalState.projectEditor.projectId}
          projectTitle={modalState.projectEditor.projectTitle}
          updateProject={updateProject}
          deleteProject={deleteProject}
          closeProjectEditor={closeProjectEditor}
        />
      )}
      {modalState.taskEditor.isOpen && (
        <TaskEditor
          projectId={modalState.taskEditor.projectId}
          taskId={modalState.taskEditor.taskId}
          title={modalState.taskEditor.title}
          description={modalState.taskEditor.description}
          team={modalState.taskEditor.team}
          closeTaskEditor={closeTaskEditor}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      )}

      {/* COMPONENTS */}
      <Navbar
        username={userData.username}
        firstName={userData.firstName}
        lastName={userData.lastName}
        openProjectModal={openProjectModal}
      />
      <ProjectsContainer
        projectData={projectData}
        openTaskModal={openTaskModal}
        openProjectEditor={openProjectEditor}
        openTaskEditor={openTaskEditor}
        deleteTask={deleteTask}
      />
    </section>
  );
}
export default Dashboard;
