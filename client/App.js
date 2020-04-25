/* eslint-disable class-methods-use-this */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MainApp from './components/MainApp';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
  const [isAuthed, setIsAuthed] = useState(false);

  const auth = () => {
    setIsAuthed(true);
  };
  console.log(isAuthed);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/register"> <Register/> </Route>
          <Route path="/login"> <Login auth={auth}/> </Route>
          <Route exact path="/"> <MainApp/> </Route>
        </Switch>
      </Router>

    </div>
  )
}

export default App;