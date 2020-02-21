import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Header from './components/layouts/Header';
import Landing from './components/landing/Landing';
import Register from './components/auth/Register';

const App = () => (
    
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
);

export default App;