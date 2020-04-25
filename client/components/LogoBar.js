import React from 'react';
import { Link } from 'react-router-dom';
import { GithubOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function LogoBar(props) {
  return (
    <div id="logo-bar">
        <img id='logo' src='../img/logopink2line.svg'></img>
        <div id='icons'>
            <Link to="/login">Login</Link>
            <Button type="link">About</Button>
            <Button type="link">Docs</Button>
            <a href='https://github.com/xerographica/gql-health-prototyper'><GithubOutlined /></a>
        </div>
    </div>
  );
}

export default LogoBar;
