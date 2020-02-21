import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import {Provider} from 'react-redux';
import Header from './components/layouts/Header';
import Landing from './components/landing/Landing';
import Register from './components/auth/Register';
import store from './store';

const App = () => (
    <Provider store = {store}>
      <Router>
        <Fragment>
            <Header/>
            <Route exact path = '/' component = {Landing} />
            <section className="container">
                <Switch>
                    <Route exact path="/register" component = {Register}/>
                </Switch>
            </section>
        </Fragment>
    </Router>

    </Provider>
   
  
);

export default App;