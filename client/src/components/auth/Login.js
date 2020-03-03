import React, { Fragment, useState , useEffect} from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import queryString from 'query-string';
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
     var query = queryString.parse(window.location.search);
     console.log( query.token + " token is" );
      if(query.token){
        window.localStorage.setItem('jwt', query.token);
        window.history.push('/');
      }
  });


  const { username, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(username, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <div>
        <form className='form' onSubmit={e => onSubmit(e)}>
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
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Login' />
          <Link to='/register'>Sign Up ?</Link>
          <a href="/auth/google" class="button">
          <div>
            <span class="svgIcon t-popup-svg">
              <svg
                class="svgIcon-use"
                width="25"
                height="37"
                viewBox="0 0 25 25"
              >
                  <g fill="none" fill-rule="evenodd">
                    <path
                      d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                      fill="#34A853"
                    />
                    <path
                      d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                      fill="#EA4335"
                    />
                  </g>
                </svg>
        </span>
      <span class="button-label">Sign in with Google</span>
    </div>
  </a>
          </form>
        </div>
      </Fragment>
    );
  };

  Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });

  export default connect(mapStateToProps, { login })(Login);
