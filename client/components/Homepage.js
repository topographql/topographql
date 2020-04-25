import React from 'react';
import { Link } from 'react-router-dom';
import LogoBar from './LogoBar';

const Homepage = (props) => {
 return (
   <div>
    <LogoBar isAuthed={props.isAuthed} user={props.user} logout={props.logout}/>
    <h1>Welcome to TopoGraphQL!</h1> <br/>
    <Link to="/login">Login</Link> <br/>
    <Link to="/register">Register</Link> <br/>
    <Link onClick={props.continueGuest} to="/">Or continue as a guest</Link>
   </div>
 )
};

export default Homepage;