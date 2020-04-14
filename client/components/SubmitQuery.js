import React from 'react';
import { Button } from 'antd';
import '../styles/codemirror.css';

// import 'codemirror/addon/hint/show-hint';
// import 'codemirror/addon/lint/lint';
//import 'codemirror-graphql/hint';
// import 'codemirror-graphql/mode';

import { UnControlled as ReactCodeMirror } from 'react-codemirror2';


function SubmitQuery(props) {
  //codemirror-graphql options
  const options = {
    mode: 'graphql',
    theme: 'dracula',
    lineNumbers: true,
    lint: {
      schema: props.schema,
    },
    hintOptions: {
      schema: props.schema,
    },
  };


  return (
      <div id="submitquery">
        <ReactCodeMirror
          className="codemirror"
          value={props.query}
          options={options}
          onChange={(editor, data, value) => props.onChangeQuery(value)}
        />
        <Button onClick={props.onSubmitQuery} >Submit</Button>
      </div>
  );
}

export default SubmitQuery;
