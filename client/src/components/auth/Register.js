//import statements from core packages
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

//Import register from other component
import { register } from '../../actions/auth';

//Component for Register
const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, username, email, password, password2 } = formData;

  //OnChange event Handler
  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  // On submit event handler
  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      alert('Passwords do not match');
    } else {
      register({ name, username, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return (
    <Fragment>
      <h2 className='page-title'>Create your Account</h2>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Username'
            name='username'
            value={username}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Id'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Retype Password'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div>
          <input
            type='submit'
            className='btn btn-primary'
            value='Create your account'
          />
        </div>
      </form>
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);
