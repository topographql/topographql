/* eslint-disable react/prop-types */
import React from 'react';
import LoadServer from '../components/LoadServer';

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
