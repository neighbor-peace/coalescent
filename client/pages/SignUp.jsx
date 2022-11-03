import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Switch } from '@fluentui/react-components';
export default function SignUp() {
  const initialFormState = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    team: '',
    isAdmin: false,
  };
  const [formData, setFormData] = useState(initialFormState);
  const [pwdIsHidden, setPwdIsHidden] = useState(true);
  const [usernameIsTaken, setUsernameIsTaken] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post('/api/signup', formData)
      .then((res) => {
        setFormData(initialFormState);
        console.log('signup successful. Response: ', res);
        // check response for token. if good, link to dashboard
        return navigate('/dashboard');
      })
      .catch((err) => {
        console.log('my post error catcher', err);
        if (err.response.status === 409) {
          return setUsernameIsTaken(true);
        }
      });
  }

  function handleChange(e, inputId) {
    if (inputId === 'username') setUsernameIsTaken(false);
    if (inputId === 'isAdmin') {
      return setFormData((prevFormData) => ({
        ...prevFormData,
        isAdmin: !prevFormData.isAdmin,
        team: !prevFormData.isAdmin ? '' : prevFormData.team,
      }));
    } else {
      return setFormData((prevFormData) => ({
        ...prevFormData,
        [inputId]: e.target.value,
      }));
    }
  }

  const togglePwdIsHidden = () => setPwdIsHidden((prevState) => !prevState);
  return (
    <section
      id='signup'
      className='page'
    >
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className='input-container'>
            <input
              className='firstName'
              type='text'
              value={formData.firstName}
              onChange={(e) => handleChange(e, 'firstName')}
              placeholder='FIRST NAME'
            />
          </div>

          <div className='input-container'>
            <input
              className='lastName'
              type='text'
              value={formData.lastName}
              onChange={(e) => handleChange(e, 'lastName')}
              placeholder='LAST NAME'
            />
          </div>
          {usernameIsTaken && (
            <div className='valErr'>
              <p>This username is taken</p>
            </div>
          )}
          <div className='input-container'>
            <input
              className='username'
              type='text'
              value={formData.username}
              onChange={(e) => handleChange(e, 'username')}
              placeholder='USERNAME'
            />
          </div>

          <div className='input-container'>
            <input
              className='password'
              type={pwdIsHidden ? 'password' : 'text'}
              value={formData.password}
              onChange={(e) => handleChange(e, 'password')}
              placeholder='PASSWORD'
            />
            <button
              type='button'
              className='togglePwd'
              onClick={togglePwdIsHidden}
            >
              {pwdIsHidden ? 'Show' : 'Hide'}
            </button>
          </div>

          <Switch
            labelPosition='before'
            label='Create project manager account?'
            checked={formData.isAdmin}
            onChange={() => handleChange(null, 'isAdmin')}
          />

          {!formData.isAdmin && (
            <div className='input-container'>
              <input
                className='team'
                type='text'
                value={formData.team}
                onChange={(e) => handleChange(e, 'team')}
                placeholder='TEAM NAME'
              ></input>
            </div>
          )}
          <button className='submit'>SIGN UP</button>
        </form>
        <p className='link'>
          Already have an account?{' '}
          <Link to='/login'>
            <span>Log In</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
