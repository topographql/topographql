import React from 'react';
import { Alert } from 'antd';
import LoadServer from './LoadServer';

function Header(props) {
  const isError = props.endpointError;
  let message;
  if (isError === null) message = null;
  else if (isError) message = <Alert message="Can't Find Server" type="error" showIcon />;
  else message = <Alert id='endpoint-success' message="Server Connected" type="success" showIcon />;

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
