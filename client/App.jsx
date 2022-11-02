import React, { Component } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Dashboard from './pages/Dashboard';

class App extends Component {
  render() {
    return (
      <>
        <nav>
          <ul>
            <li>
              <Link to='/login'>Log In</Link>
              <Link to='/signup'>Sign Up</Link>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path='/'
            element={<Dashboard />}
          />
          <Route
            path='/signup'
            element={<SignUp />}
          />
          <Route
            path='/dashboard'
            element={<Dashboard />}
          />
          <Route
            path='/login'
            element={<LogIn />}
          />
        </Routes>
      </>
    );
  }
}

export default App;
