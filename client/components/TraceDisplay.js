/* eslint-disable class-methods-use-this */
import { Divider } from 'antd';

import React from 'react';

function TraceDisplay() {
  return (
    <div id="tracedisplay">
      <Divider orientation="left">Tracing</Divider>
      <div id="tracerD3"></div>
    </div>
  );
}

export default TraceDisplay;
