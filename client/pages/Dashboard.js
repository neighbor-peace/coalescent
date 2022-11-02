import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Dashboard() {
  //this.handleClick = this.handleClick.bind(this);
  // login or signup attaches cookie token
  // request for state contains cookie token
  // server serves proper state
  // axios.get(/api/user)
  // this.setState({user: })
  const location = useLocation();
  const [userData, setUserData] = useState(location.state.user);
  const [projectData, setProjectData] = useState();
  console.log('user data', userData);
  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
}
export default Dashboard;
