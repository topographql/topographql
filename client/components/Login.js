import React, { useState } from 'react';
import {
  Form, Input, Button, Alert,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const history = useHistory();
  const login = () => {
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          props.auth(username); // set app state to authed
          history.push('/'); // redirect to main app
          return res.json();
        }
        return res.json().then((err) => { throw err; });
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.err);
      });
  };

  return (
    <div id="login-wrapper">
      <div className="form">
        <h1>Sign In</h1>
        <Form name="normal_login" className="login-form">
          <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input onChange={(e) => setUsername(e.target.value)} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
                onChange={(e) => setPassword(e.target.value)}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={login} type="primary" className="login-form-button" block>
              Sign in
            </Button>
          </Form.Item>
          { message ? <Alert type="error" message={message} banner /> : null }
        </Form>
        <span>New to TopoGraphQL? <Link to="/register">Create an Account</Link></span>
        <br/>
        <Link to="/">Continue as a guest</Link>
    </div>
  </div>
  );
};

export default Login;
