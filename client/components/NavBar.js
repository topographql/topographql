/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GithubOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const NavBar = (props) => {
  const location = useLocation();

  return (
    <div id="logo-bar">
        <img id='logo' src='../img/logopink2line.svg'></img>
        <div id='icons'>
            {props.user ? <h4>Welcome, {props.user}</h4> : null }
            {
              location.pathname === '/'
                ? props.isAuthed
                  ? <Link onClick={props.logout} to="/">Logout</Link>
                  : <Link to="/login">Login</Link>
                : null
            }
            <Button type="link">About</Button>
            <Button type="link">Docs</Button>
            <a href='https://github.com/xerographica/gql-health-prototyper'><GithubOutlined /></a>
        </div>
    </div>
  );
};

export default NavBar;
