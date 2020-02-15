import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Register from './Components/Register';

const App = () => {
  return (
      <Router>
          <Navbar />
            <Route path='/register' component={Register} />
      </Router>
  );
}

export default App;
