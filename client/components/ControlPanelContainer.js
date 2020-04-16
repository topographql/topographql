import React from 'react';
import SubmitQuery from './SubmitQuery';
import QueryResult from './QueryResult';

import { Input } from 'antd';
const { TextArea } = Input;

function ControlPanelContainer(props) {
  return (
      <div id="control-panel-container">
         {/* <textarea id="queryeditor" rows="2" cols="50" placeholder="Enter your GraphQL query" ></textarea> */}
        <TextArea id='queryeditor' rows={4} placeholder='Enter your GraphQL query'/>
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