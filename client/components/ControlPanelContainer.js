import React from 'react';
import LoadServer from './LoadServer';
import SubmitQuery from './SubmitQuery';
import TraceDisplay from './TraceDisplay';

function ControlPanelContainer(props) {
  return (
      <div id="control-panel-container">
         <LoadServer
          onChange={props.onChange}
          onSubmitEndpoint={props.onSubmitEndpoint}
         />
         <SubmitQuery
          onChange={props.onChange}
          onSubmitQuery={props.onSubmitQuery}
          query={props.query}
          schema={props.schema}
         />
         <TraceDisplay />
      </div>
  );
}

export default ControlPanelContainer;