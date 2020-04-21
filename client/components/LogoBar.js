import React from 'react';
import { GithubOutlined } from '@ant-design/icons';

function LogoBar(props) {
  return (
    <div id="logo-bar">
        <img id='logo' src='../img/logosvg.svg'></img>
        <GithubOutlined />
        <GithubOutlined />
        <GithubOutlined />
    </div>
  );
}

export default LogoBar;
