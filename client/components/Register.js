import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const history = useHistory();

  const register = () => {
    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, email }),
    })
      .then(res => {
        if (res.status === 200) history.push('/login'); // redirect to login if successful
        else console.log(res.json());
      });
  };

  return (
    <div id="register-wrapper">
      <div className="form">
        <h1>Create an account</h1>
        <Form name="normal_login" className="login-form">
          <Form.Item
            name="email"
            rules={[{ message: 'Please input your Email!' }]}
          >
            <Input onChange={(e) => setEmail(e.target.value)} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>

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
            <Button onClick={register} type="primary" className="login-form-button" block>
              Submit
            </Button>
          </Form.Item>
          <span>Already have an account? <Link to="/login">Sign in</Link></span>
        </Form>
      </div>
  </div>
  );
};

export default Register;
