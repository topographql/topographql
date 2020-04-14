/* eslint-disable class-methods-use-this */
import { Divider } from 'antd';

import React, { Component } from 'react';

class TraceDisplay extends Component {
  render() {
    return (
    <div id="tracedisplay">
      <Divider orientation="left">Tracing</Divider>
      <div id="tracerD3"></div>
    </div>
    );
  }
}


export default TraceDisplay;
