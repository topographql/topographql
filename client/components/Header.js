/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Alert } from 'antd';
import LoadServer from './LoadServer';
import LogoBar from './LogoBar';

function Header(props) {
  // error handling logic
  const [visible, setVisible] = useState(true);
  const handleClose = () => {
    setVisible(false);
  };
  const isError = props.endpointError;
  let message;
  if (isError === null) message = null;
  else if (!isError) {
    message = (
    <div>
      {visible ? (
        <Alert message="Server successfully connected" type="success" closable showIcon afterClose={handleClose} />
      ) : null}
    </div>
    );
  } else {
    message = (
    <div>
      {visible ? (
        <Alert message="Server cannot be reached" type="error" closable showIcon afterClose={handleClose} />
      ) : null}
    </div>
    );
  }

  return (
      <div id="header">
          <LogoBar />
          <LoadServer
            onChange={props.onChange}
            onSubmitEndpoint={props.onSubmitEndpoint}
          />
        {message}
      </div>
  );
}

export default Header;
