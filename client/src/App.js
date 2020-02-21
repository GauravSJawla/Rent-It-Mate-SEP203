// eslint-disable-next-line
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'assets/scss/material-kit-react.scss?v=1.8.0';

// pages for this product
import Header from 'components/Header/Header';
import HeaderLinks from 'components/Header/HeaderLinks';
import LandingPage from 'views/LandingPage/LandingPage';
import LoginPage from 'views/LoginPage/LoginPage';
import RegisterPage from 'views/RegisterPage/RegisterPage';
import ProfilePage from 'views/ProfilePage/ProfilePage';
import {Provider} from 'react-redux';
import store from './store';

const App = () => (
  <Provider store = {store}>
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
        <Route exact path='/profile' component={ProfilePage} />
      </Switch>
    </Fragment>
  </Router>

  </Provider>
  
);

export default App;
