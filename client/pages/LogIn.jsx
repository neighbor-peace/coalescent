import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function LogIn() {
  const initialFormState = {
    username: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialFormState);
  const [loginFailed, setLoginFailed] = useState(false);
  const [pwdIsHidden, setPwdIsHidden] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log({ formData, loginFailed, pwdIsHidden });
  });

  const togglePwdIsHidden = () => setPwdIsHidden((prevState) => !prevState);
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post('/api/login', formData)
      .then((res) => {
        console.log('login successful. Response: ', res);
        return navigate('/dashboard');
      })
      .catch((err) => {
        console.log('login error', err);
        setLoginFailed(true);
      });
    // if successful, reroute
    // if unsuccessful, set loginFailed
  }
  function handleChange(e, inputId) {
    return setFormData((prevState) => ({
      ...prevState,
      [inputId]: e.target.value,
    }));
  }

  return (
    <section
      id='login'
      className='page'
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Enter your username</label>
        <input
          id='username'
          type='text'
          value={formData.username}
          onChange={(e) => handleChange(e, 'username')}
          placeholder='USERNAME'
        />
        <label htmlFor='password'>Enter your password</label>
        <div>
          <input
            id='password'
            type={pwdIsHidden ? 'password' : 'text'}
            value={formData.password}
            onChange={(e) => handleChange(e, 'password')}
            placeholder='PASSWORD'
          />

          <button
            type='button'
            onClick={togglePwdIsHidden}
          >
            {pwdIsHidden ? 'Show Password' : 'Hide Password'}
          </button>
        </div>
        <button className='submit'>Log In</button>
      </form>
      {loginFailed && <p>Incorrect username or password</p>}
      <p>
        Need an account? <Link to='/signup'>Sign Up</Link>
      </p>
    </section>
  );
}
