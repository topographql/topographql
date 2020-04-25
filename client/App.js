/* eslint-disable class-methods-use-this */
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainApp from './containers/MainApp';
import Register from './components/Register';
import Login from './components/Login';
import Homepage from './components/Homepage';
import NavBar from './components/NavBar';

const App = (props) => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [user, setUser] = useState(null);
  const [guest, setGuest] = useState(false);

  const auth = (username) => {
    setIsAuthed(true);
    setUser(username);
  };

  const logout = () => {
    setIsAuthed(false);
    setUser(null);
    setGuest(false);
  };

  const continueGuest = () => {
    setGuest(true);
  };

  return (

    <div>
      <Router>
        <NavBar isAuthed={isAuthed} user={user} logout={logout}/>
        <Switch>
          <Route path="/register"> <Register/> </Route>
          <Route path="/login"> <Login auth={auth}/> </Route>
          <Route path="/">
            {/* Render homepage if user has not logged in or continued as guest */}
            {(isAuthed || guest)
              ? <MainApp isAuthed={isAuthed} user={user} logout={logout}/>
              : <Homepage continueGuest={continueGuest}/>}
          </Route>
        </Switch>
      </Router>

    </div>
  )
}

export default App;