import React from 'react';
import { Input } from 'antd';
import QueryEditor from '../components/QueryEditor';

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
          selectedQuery={props.selectedQuery}
          queryError={props.queryError}
          schema={props.schema}
          result={props.result}
        />
      </div>
  );
}

export default ControlPanelContainer;
