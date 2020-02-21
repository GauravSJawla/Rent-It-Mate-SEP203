import React, { Fragment , useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Header from './components/layouts/Header';
import Landing from './components/landing/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';


import {Provider} from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
    return (
      <Provider store = {store}>
        <Router>
          <Fragment>
            <Header/>
            <Route exact path = '/' component = {Landing} />
            <section className="container">
               <Switch>
                  <Route exact path='/login' component = {Login}/>
                  <Route exact path='/register' component = {Register}/>
               </Switch>
            </section>
          </Fragment>
        </Router>
      </Provider>
);
};
  

export default App;