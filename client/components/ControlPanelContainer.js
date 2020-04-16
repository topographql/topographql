import React from 'react';
import SubmitQuery from './SubmitQuery';
import QueryResult from './QueryResult';

import { Input } from 'antd';
const { TextArea } = Input;

function ControlPanelContainer(props) {
  return (
      <div id="control-panel-container">
        <TextArea id='queryeditor' rows={4} placeholder='GraphQL query'/>
        <SubmitQuery
          onChangeQuery={props.onChangeQuery}
          onSubmitQuery={props.onSubmitQuery}
          query={props.query}
          schema={props.schema}
          result={props.result}
        />
      </div>
  );
}

export default ControlPanelContainer;