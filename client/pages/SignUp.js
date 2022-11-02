import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
      .then((response) => {
        setFormData(initialFormState);
        console.log('signup successful', response);
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
    <section id='signup-page'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='firstName'>Enter your first name</label>
        <input
          id='firstName'
          type='text'
          value={formData.firstName}
          onChange={(e) => handleChange(e, 'firstName')}
        />

        <label htmlFor='lastName'>Enter your last name</label>
        <input
          id='lastName'
          type='text'
          value={formData.lastName}
          onChange={(e) => handleChange(e, 'lastName')}
        />
        {usernameIsTaken && (
          <p>This username is taken. Please try a different username.</p>
        )}
        <label htmlFor='username'>Enter your username</label>
        <input
          id='username'
          type='text'
          value={formData.username}
          onChange={(e) => handleChange(e, 'username')}
        />

        <label htmlFor='password'>Enter your password</label>
        {/* TODO: ADD BUTTON TO CHANGE WHETHER PW IS HIDDEN (INPUT TYPE) */}
        <input
          id='password'
          type={pwdIsHidden ? 'password' : 'text'}
          value={formData.password}
          onChange={(e) => handleChange(e, 'password')}
        />
        <button
          type='button'
          onClick={togglePwdIsHidden}
        >
          {pwdIsHidden ? 'Show Password' : 'Hide Password'}
        </button>

        <label htmlFor='isAdmin'>
          Are you creating a project manager account?
        </label>
        <input
          id='isAdmin'
          type='checkbox'
          value={formData.isAdmin}
          onChange={(e) => handleChange(e, 'isAdmin')}
        ></input>

        {!formData.isAdmin && (
          <label htmlFor='team'>Enter your team name</label>
        )}
        {!formData.isAdmin && (
          <input
            id='team'
            type='text'
            value={formData.team}
            onChange={(e) => handleChange(e, 'team')}
          ></input>
        )}
        <button>Submit</button>
      </form>
    </section>
  );
}
