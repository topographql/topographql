import React from 'react';
import { Input } from 'antd';
import QueryEditor from './QueryEditor';

const { TextArea } = Input;

function ControlPanelContainer(props) {
  return (
      <div id="control-panel-container">
        <TextArea id='queryeditor' rows={4} placeholder= 'GraphQL query'/>
        <QueryEditor
          onChangeQuery={props.onChangeQuery}
          onSubmitQuery={props.onSubmitQuery}
          handleSaveQuery={props.handleSaveQuery}
          query={props.query}
          queryError={props.queryError}
          schema={props.schema}
          result={props.result}
        />
      </div>
  );
}

export default ControlPanelContainer;
