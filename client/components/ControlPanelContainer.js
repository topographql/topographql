import React from 'react';
import LoadServer from './LoadServer';
import SubmitQuery from './SubmitQuery';

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
         />
      </div>
  );
}

export default ControlPanelContainer;