/* eslint-disable class-methods-use-thiss */
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainApp from './containers/MainApp';
import Register from './components/Register';
import Login from './components/Login';
import Homepage from './components/Homepage';
import NavBar from './components/NavBar';

const App = () => {
  const [isAuthed, setIsAuthed] = useState(sessionStorage.isAuthed || false);
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(sessionStorage.isGuest || false);

  const login = (username) => {
    setIsAuthed(true);
    setUser(username);
    sessionStorage.setItem('isAuthed', true);
  };

  const logout = () => {
    setIsAuthed(false);
    setUser(null);
    setIsGuest(false);
    sessionStorage.clear();
    fetch('/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
  };

  const continueGuest = () => {
    setIsGuest(true);
    sessionStorage.setItem('isGuest', true);
  };

  return (
    <div>
      <Router>
        <NavBar isAuthed={isAuthed} user={user} logout={logout}/>
        <Switch>
          <Route path="/home"><Homepage continueGuest={continueGuest}/></Route>
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
  );
};

export default App;
