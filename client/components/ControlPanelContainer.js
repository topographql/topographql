import React from 'react';
import SubmitQuery from './SubmitQuery';
import QueryResult from './QueryResult';

function ControlPanelContainer(props) {

  return (
      <div id="control-panel-container">
         <SubmitQuery
          onChangeQuery={props.onChangeQuery}
          onSubmitQuery={props.onSubmitQuery}
          query={props.query}
          queryError={props.queryError}
          schema={props.schema}
         />
         <QueryResult result={props.result}/>
      </div>
  );
}

export default ControlPanelContainer;