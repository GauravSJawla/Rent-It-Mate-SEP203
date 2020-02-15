import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const Landing = () => {
    return(
        <section className='landing'>
          <div className='dark-overlay'>
            <div className='landing-inner'>
              <h1 className='x-large'>Developer Connector</h1>
              <p className='lead'>
              Create a developer profile/portfolio, share posts and get help from
              other developers
              Welcome to react
              </p>
            </div>
          </div>
        </section>

    );
};

export default Landing;