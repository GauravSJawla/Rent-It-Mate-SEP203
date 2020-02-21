// eslint-disable-next-line
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import 'assets/scss/material-kit-react.scss?v=1.8.0';

// pages for this product
import Header from 'components/Header/Header.js';
import HeaderLinks from 'components/Header/HeaderLinks.js';
import LandingPage from 'views/LandingPage/LandingPage.js';
import LoginPage from 'views/LoginPage/LoginPage.js';
import RegisterPage from 'views/RegisterPage/RegisterPage';

const App = () => (
  <Router>
    <Fragment>
      <Header
        absolute
        color='transparent'
        brand='Rent It Mate!'
        rightLinks={<HeaderLinks />}
      />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/login-page' component={LoginPage} />
        <Route exact path='/register-page' component={RegisterPage} />
      </Switch>
    </Fragment>
  </Router>
);

export default App;
