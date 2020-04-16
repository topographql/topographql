import React from 'react';
import SubmitQuery from './SubmitQuery';
import QueryResult from './QueryResult';
import { Alert } from 'antd';

function ControlPanelContainer(props) {
  const isError = true;
  let message;
  if (isError === null) message = null;
  else if (isError) message = <Alert message="Can't Find Server" type="error" showIcon />;
  else message = <Alert id='endpoint-success' message="Server Connected" type="success" showIcon />;

  return (
      <div id="control-panel-container">
         <SubmitQuery
          onChangeQuery={props.onChangeQuery}
          onSubmitQuery={props.onSubmitQuery}
          query={props.query}
          schema={props.schema}
         />
         {message}
         <QueryResult result={props.result}/>
      </div>
  );
}

export default ControlPanelContainer;