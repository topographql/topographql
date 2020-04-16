import React from 'react';
import { Input } from 'antd';
import SubmitQuery from './SubmitQuery';
import QueryResult from './QueryResult';

const { TextArea } = Input;

function ControlPanelContainer(props) {

  return (
      <div id="control-panel-container">
        <TextArea id='queryeditor' rows={4} placeholder='GraphQL query'/>
        <SubmitQuery
          onChangeQuery={props.onChangeQuery}
          onSubmitQuery={props.onSubmitQuery}
          query={props.query}
          queryError={props.queryError}
          schema={props.schema}
          result={props.result}
        />
        <QueryResult result={props.result}/>
      </div>
  );
}

export default ControlPanelContainer;