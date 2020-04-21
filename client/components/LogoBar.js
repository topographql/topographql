import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function LogoBar(props) {
  return (
    <div id="logo-bar">
        <img id='logo' src='../img/logopink.svg'></img>
        <div id='icons'>
            <Button type="link">About</Button>
            <Button type="link">Docs</Button>
            <a href='https://github.com/xerographica/gql-health-prototyper'><GithubOutlined /></a>
        </div>
    </div>
  );
}

export default LogoBar;
