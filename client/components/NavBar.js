/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GithubOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const NavBar = (props) => {
  const location = useLocation();

  return (
    <div id="nav-bar">
        <Link to="/home"><img id='logo' src='../img/logopink.svg'></img></Link>
        <div id='icons'>
            {props.user ? <h4>Welcome, {props.user}</h4> : null }
            {
              location.pathname === '/'
                ? props.isAuthed
                  ? <Link onClick={props.logout} to="/">Logout</Link>
                  : <Link to="/login">Login</Link>
                : null
            }
            <Link to="/about">About</Link>
            <a href='https://github.com/topographql/topographql'><GithubOutlined /></a>
        </div>
    </div>
  );
};

export default NavBar;
