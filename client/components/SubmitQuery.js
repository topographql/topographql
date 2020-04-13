import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';

import '../styles/codemirror.css';


function SubmitQuery(props) {
  //codemirror-graphql options
  const options = {
    mode: 'graphql',
    lint: {
      schema: props.schema,
    },
    hintOptions: {
      schema: props.schema,
    },
  };

  // const options = {
  //   mode: 'javascript',
  //   theme: 'dracula',
  //   lineNumbers: true
  // };

  return (
      <div id="submitquery">
        <CodeMirror
          className="codemirror"
          value={props.query}
          options={options}
          onChange={(editor, data, value) => props.onChangeQuery(value)}
        />
        <br/>
        <button onClick={props.onSubmitQuery}> Submit </button>
      </div>
  );
}

export default SubmitQuery;
