import React, { useState, useEffect } from 'react';

export default function LogIn() {
  const initialFormState = {
    username: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialFormState);
  const [loginFailed, setLoginFailed] = useState(false);
  const [pwdIsHidden, setPwdIsHidden] = useState(true);

  useEffect(() => {
    console.log({ formData, loginFailed, pwdIsHidden });
  });

  const togglePwdIsHidden = () => setPwdIsHidden((prevState) => !prevState);
  function handleSubmit(e) {
    e.preventDefault();
    // TODO: FINISH LOGIN SUBMIT HANDLER
    // send combo to route handler
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
      {loginFailed && <p>Incorrect username or password</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Enter your username</label>
        <input
          id='username'
          type='text'
          value={formData.username}
          onChange={(e) => handleChange(e, 'username')}
        />
        <label htmlFor='password'>Enter your password</label>
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
        <button>Log In</button>
      </form>
    </section>
  );
}
