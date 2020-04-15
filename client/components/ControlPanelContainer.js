import React from 'react';
import SubmitQuery from './SubmitQuery';

function ControlPanelContainer(props) {
  return (
      <div id="control-panel-container">
         <SubmitQuery
          onChangeQuery={props.onChangeQuery}
          onSubmitQuery={props.onSubmitQuery}
          query={props.query}
          schema={props.schema}
         />
      </div>
  );
}

export default ControlPanelContainer;