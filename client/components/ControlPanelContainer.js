import React from 'react';
import LoadServer from './LoadServer';
import SubmitQuery from './SubmitQuery';
import TraceDisplay from './TraceDisplay';

function ControlPanelContainer(props) {
  return (
      <div id="control-panel-container">
         <LoadServer onChange={props.onChange} />
         <SubmitQuery onChange={props.onChange} />
         <TraceDisplay />
      </div>
  );
}

export default ControlPanelContainer;