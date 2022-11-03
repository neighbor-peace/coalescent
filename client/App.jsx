import React, { Component } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp.jsx';
import LogIn from './pages/LogIn.jsx';
import Dashboard from './pages/Dashboard.jsx';
import axios from 'axios';
import { Spinner } from '@fluentui/react-components';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      hasLoaded: false,
    };
  }
  componentDidMount() {
    axios
      .get('/api/user')
      .then((res) => this.setState({ isLoggedIn: true, hasLoaded: true }))
      .catch((err) => this.setState({ hasLoaded: true }));
  }
  render() {
    const { isLoggedIn } = this.state;
    return (
      <>
        {this.state.hasLoaded || (
          <div id='spinner'>
            <Spinner size='huge' />
          </div>
        )}
        {this.state.hasLoaded && (
          <Routes>
            <Route
              path='/'
              element={isLoggedIn ? <Dashboard /> : <LogIn />}
            />
            <Route
              path='/signup'
              element={<SignUp />}
            />
            <Route
              path='/dashboard/'
              element={<Dashboard />}
            />
            <Route
              path='/login'
              element={<LogIn />}
            />
          </Routes>
        )}
      </>
    );
  }
}

export default App;
