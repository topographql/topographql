/* eslint-disable class-methods-use-this */
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainApp from './containers/MainApp';
import Register from './components/Register';
import Login from './components/Login';
import Homepage from './components/Homepage';
import NavBar from './components/NavBar';

const App = () => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  const login = (username) => {
    setIsAuthed(true);
    setUser(username);
  };

  const logout = () => {
    setIsAuthed(false);
    setUser(null);
    setIsGuest(false);
  };

  const continueGuest = () => {
    setIsGuest(true);
  };

  return (

    <div>
      <Router>
        <NavBar isAuthed={isAuthed} user={user} logout={logout}/>
        <Switch>
          <Route path="/register"> <Register/> </Route>
          <Route path="/login"> <Login auth={login}/> </Route>
          <Route path="/">
            {/* Render homepage if user has not logged in or continued as guest */}
            {(isAuthed || isGuest)
              ? <MainApp isAuthed={isAuthed} user={user} logout={logout}/>
              : <Homepage continueGuest={continueGuest}/>}
          </Route>
        </Switch>
      </Router>

    </div>
  )
}

export default App;