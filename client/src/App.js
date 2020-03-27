// eslint-disable-next-line
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'assets/scss/material-kit-react.scss?v=1.8.0';

// pages for this product
import Header from 'components/Header/Header';
import HeaderLinks from 'components/Header/HeaderLinks';
import PrivateRoute from 'components/Routing/PrivateRoute';
import LandingPage from 'views/LandingPage/LandingPage';
import LoginPage from 'views/LoginPage/LoginPage';
import RegisterPage from 'views/RegisterPage/RegisterPage';
//import ProfilePage from 'views/ProfilePage/ProfilePage';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Dashboard from 'views/Dashboard/Dashboard';
import EmailVerifyPage from 'views/EmailVerifyPage/EmailVerifyPage';
import CreateProfile from 'views/ProfilePage/CreateProfile';
import EditProfile from 'views/ProfilePage/EditProfile';
import Alert from './components/Layouts/Alert/Alert';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Alert />
          <Header
            relative
            color='primary'
            brand='Rent It Mate!'
            rightLinks={<HeaderLinks />}
          />
          <Route exact path='/' component={LandingPage} />
          <Switch>
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/register' component={RegisterPage} />
            <PrivateRoute
              exact
              path='/create-profile'
              component={CreateProfile}
            />
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <Route exact path='/emailVerifyPage' component={EmailVerifyPage} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
