/* eslint-disable class-methods-use-this */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MainApp from './components/MainApp';
import Register from './components/Register';
import Login from './components/Login';
import Homepage from './components/Homepage';

const App = () => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [guest, setGuest] = useState(false);

  const auth = () => {
    setIsAuthed(true);
  };

  const logout = () => {
    setIsAuthed(false);
    setGuest(false);
  };

  const continueGuest = () => {
    setGuest(true);
  };

  return (

    <div>
      <Router>
        <Switch>
          <Route path="/register"> <Register/> </Route>
          <Route path="/login"> <Login auth={auth}/> </Route>
          <Route path="/">
            {/* Render homepage if user has not logged in or continued as guest */}
            {(isAuthed || guest)
              ? <MainApp isAuthed={isAuthed} logout={logout}/>
              : <Homepage continueGuest={continueGuest}/>}
          </Route>
        </Switch>
      </Router>

    </div>
  )
}

export default App;