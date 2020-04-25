import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
 return (
   <div>
    <h1>Welcome to TopoGraphQL!</h1> <br/>
    <Link to="/login">Login</Link> <br/>
    <Link to="/register">Register</Link> <br/>
    <Link to="/">Or continue as a guest</Link>
   </div>
 )
};

export default Homepage;