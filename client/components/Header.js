import React from 'react';
import LoadServer from './LoadServer';

function Header(props) {
  return (
      <div id="header">
          <LoadServer
            onChange={props.onChange}
            onSubmitEndpoint={props.onSubmitEndpoint}
          />
      </div>
  );
}

export default Header;
