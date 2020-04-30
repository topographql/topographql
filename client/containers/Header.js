/* eslint-disable react/prop-types */
import React from 'react';
import { Alert, message } from 'antd';
import LoadServer from '../components/LoadServer';

function Header(props) {
  // error handling logic
  const isError = props.endpointError;
  let message;
  if (isError === null) message = null;
  else if (isError === 'tracingerror') message = <Alert message="Query successful but tracing data not found" type="warning" showIcon />;

  return (
      <div id="header">
          <LoadServer
            onChange={props.onChange}
            onSubmitEndpoint={props.onSubmitEndpoint}
          />
        {message}
      </div>
  );
}

export default Header;
