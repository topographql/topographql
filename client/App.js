/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MainApp from './components/MainApp';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={MainApp} />
        </Switch>
      </Router>

    </div>
  )
}

export default App;