/* eslint-disable class-methods-use-this */
import { Divider } from 'antd';

import React from 'react';

function TraceDisplay() {
  let tracingAvailable = true;
  return (
    <div id="tracedisplay">
      <div id="trace-header">
        <Divider orientation="left">Tracing</Divider>
      </div>
  { !tracingAvailable ? <h4>Tracing data unavailable. Please make sure Apollo Tracing is enabled on your server.</h4> : <div id="tracerD3"></div> }
    </div>
  );
}

export default TraceDisplay;
